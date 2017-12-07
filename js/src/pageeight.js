$(function () {
    //获取经纬度及地区
    var province = sessionStorage.getItem("province");
    var longitude = sessionStorage.getItem("longitude");
    var latitude = sessionStorage.getItem("latitude");
    var city = sessionStorage.getItem("city");
    var roofType = sessionStorage.getItem("roofType")
    var typeRoof = sessionStorage.getItem("typeRoof");
    var calStatus = sessionStorage.getItem("calStatus");
    var days = sessionStorage.getItem("days");
    var kVal = sessionStorage.getItem("kVal");
    var hVal = sessionStorage.getItem("hVal");
    var NmaxVal = sessionStorage.getItem("NmaxVal");
    var monthbeginVal = +sessionStorage.getItem("monthbeginVal");
    var monthEndVal = +sessionStorage.getItem("monthEndVal");
    var kAssemble = JSON.parse(sessionStorage.getItem("kAssemble"));
    var scale = sessionStorage.getItem("scale")
    var zVal = sessionStorage.getItem("zVal");
    var COP = sessionStorage.getItem("COP");
    var dip = sessionStorage.getItem("dip");
    var azimuth = sessionStorage.getItem("azimuth");
    var reflectivity = sessionStorage.getItem("reflectivity");
    var eff1 = sessionStorage.getItem("eff1");
    var eff2 = sessionStorage.getItem("eff2");
    var roofStatus = sessionStorage.getItem("roofStatus")
    var DOD = sessionStorage.getItem("DOD");
    var safeEff = sessionStorage.getItem("safeEff")
    var HzAssemble = JSON.parse(sessionStorage.getItem("HzAssemble"));
    var HsAssemble = JSON.parse(sessionStorage.getItem("HsAssemble"))
    var HtAssemble = JSON.parse(sessionStorage.getItem("HtAssemble"))
    var Hm = sessionStorage.getItem("Hm")
    var bestDip = sessionStorage.getItem("bestDip");
    var Bn = +sessionStorage.getItem("Bn");
    var Pn = +sessionStorage.getItem("Pn");
    var Pm = +sessionStorage.getItem("Pm");

    var monthArray = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var nArray = [15, 46, 75, 106, 136, 167, 197, 228, 259, 289, 320, 350]; //各月日期序号
    var BnEchartArr = [];
    var PnEchartArr = [];
    for (var h = 50; h <= 200; h += 10) {
        var Qmax = h * hVal * zVal * kVal * NmaxVal;
        var QAssemble = {};
        var QcAssemble = {};
        var QcSum = 0; //计算耗电量和
        var monthSum = 0; //计算月份的天数和
        var arrHt = [];
        var lossAssemble = {}; //各月发电盈亏量
        var QgAssemble = {};
        var dipMin = 0; //最佳倾角范围下线
        var dipMax = 90; //最佳倾角范围上线
        var Im;
        var HmArr = [];
        for (var i = +monthbeginVal; i <= +monthEndVal; i++) {
            QAssemble["Q" + i] = Qmax * kAssemble["k" + i];
            QcAssemble["Qc" + i] = QAssemble["Q" + i] / (380 * COP * scale);
            monthSum += monthArray[i - 1];
            QcSum += +QcAssemble["Qc" + i];
            arrHt.push(HtAssemble["Ht" + i])

        }

        var Ql = QcSum / monthSum;
        var Imin = Ql / (Hm * eff1 * eff2);
        var HtMin = Math.min.apply(null, arrHt);
        var Imax = Ql / (HtMin * eff1 * eff2);
        var tmparr = getElectricity(Imin, Imax, QcAssemble, HtAssemble, days, monthbeginVal, monthEndVal, eff1, eff2, Ql, QgAssemble, lossAssemble)
        var electricity = tmparr[0];
        var min = Math.abs(tmparr[1])
        // console.log(electricity)
        if (roofStatus == 0) {
            Im = electricity;
        } else if (roofStatus == 1) {
            var arr = [];
            var arrDip = [];
            for (var j = dipMin; j <= dipMax; j++) {
                var A = Math.cos(Math.PI / 180 * j) + Math.tan(Math.PI / 180 * latitude) * Math.cos(Math.PI / 180 * azimuth) * Math.sin(Math.PI / 180 * j);
                var sunangleAssemble = {}; //各月份太阳赤纬角
                var WsAssemble = {}; //各月水平面的日落时角
                var BAssemble = {}; //各月参数B
                var C = Math.sin(Math.PI / 180 * j) * Math.sin(Math.PI / 180 * azimuth) / Math.cos(Math.PI / 180 * latitude); //参数C
                var aAssemble = {}; //各月参数a
                var bAssemble = {}; //各月参数b
                var dAssemble = {}; //各月参数d
                var a_Assemble = {}; //各月参数a′
                var mAssemble = {}; //各月Wsr第二个参数
                var tAssemble = {}; //各月Wsr第二个参数
                var ssAssemble = {}; //|Wss|中的较小值的集合
                var srAssemble = {}; //|Wsr|中的较小值的集合
                var WsrAssemble = {}; //Wsr倾斜面日出时角集合
                var WssAssemble = {}; //Wss倾斜面日落时角
                var G1Assemble = {}; //G(Wss,Wsr)集合
                var G2Assemble = {}; //G(Wss,-Ws)集合
                var G3Assemble = {}; //G(Ws,Wsr)集合
                var G4Assemble = {}; //G(Wss,-Ws)+G(Ws,Wsr)集合
                var G5Assemble = {}; //Wss>=Wsr时的D
                var G6Assemble = {}; //Wss<Wsr时的D
                var DAssemble = {}; //参数D集合
                var RAssemble = {}; //参数R集合
                var HtAssemble = {}; //倾斜面上各月日均太阳辐射量Ht集合;
                var Hm;
                var HtSum = 0;
                var daySum = 0;
                var arrHt = [];
                for (var i = monthbeginVal; i <= monthEndVal; i++) {
                    sunangleAssemble["sunangle" + i] = 23.45 * Math.sin(Math.PI / 180 * (360 * (284 + nArray[i - 1]) / 365));
                    WsAssemble["Ws" + i] = Math.acos(-Math.tan(Math.PI / 180 * latitude) * Math.tan(Math.PI / 180 * sunangleAssemble["sunangle" + i])) * 180 / Math.PI;
                    BAssemble["B" + i] = Math.cos(Math.PI / 180 * WsAssemble["Ws" + i]) * Math.cos(Math.PI / 180 * j) + Math.tan(Math.PI / 180 * sunangleAssemble["sunangle" + i]) * Math.sin(Math.PI / 180 * j) * Math.cos(Math.PI / 180 * azimuth);
                    aAssemble["a" + i] = 0.409 + 0.5016 * Math.sin(Math.PI / 180 * (WsAssemble["Ws" + i] - 60));
                    bAssemble["b" + i] = 0.6609 - 0.4767 * Math.sin(Math.PI / 180 * (WsAssemble["Ws" + i] - 60));
                    dAssemble["d" + i] = Math.sin(Math.PI / 180 * WsAssemble["Ws" + i]) - Math.PI / 180 * WsAssemble["Ws" + i] * Math.cos(Math.PI / 180 * WsAssemble["Ws" + i]);
                    a_Assemble["a_" + i] = aAssemble["a" + i] - (HsAssemble["Hs" + i] / HzAssemble["Hz" + i]);
                    mAssemble["m" + i] = Math.acos((A * BAssemble["B" + i] + (C * Math.sqrt(Math.pow(A, 2) - Math.pow(BAssemble["B" + i], 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
                    tAssemble["t" + i] = Math.acos((A * BAssemble["B" + i] - (C * Math.sqrt(Math.pow(A, 2) - Math.pow(BAssemble["B" + i], 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
                    WsAssemble["Ws" + i] < tAssemble["t" + i] ? ssAssemble["ss" + i] = WsAssemble["Ws" + i] : ssAssemble["ss" + i] = tAssemble["t" + i]
                    WsAssemble["Ws" + i] < mAssemble["m" + i] ? srAssemble["sr" + i] = WsAssemble["Ws" + i] : srAssemble["sr" + i] = mAssemble["m" + i];

                    if (A > 0 && BAssemble["B" + i] > 0) {
                        WsrAssemble["Wsr" + i] = -srAssemble["sr" + i];
                        WssAssemble["Wss" + i] = ssAssemble["ss" + i]
                    } else if (A >= BAssemble["B" + i] > 0) {
                        WsrAssemble["Wsr" + i] = -srAssemble["sr" + i];
                        WssAssemble["Wss" + i] = ssAssemble["ss" + i]
                    } else {
                        WsrAssemble["Wsr" + i] = srAssemble["sr" + i];
                        WssAssemble["Wss" + i] = -ssAssemble["ss" + i]
                    }
                    G1Assemble["G1" + i] = 1 / (2 * dAssemble["d" + i]) * ((bAssemble["b" + i] * A / 2 - (a_Assemble["a_" + i] * BAssemble["B" + i])) * (WssAssemble["Wss" + i] - WsrAssemble["Wsr" + i]) * (Math.PI / 180) + ((a_Assemble["a_" + i] * A - bAssemble["b" + i] * BAssemble["B" + i]) * (Math.sin(Math.PI / 180 * WssAssemble["Wss" + i]) - Math.sin(Math.PI / 180 * WsrAssemble["Wsr" + i]))) - (a_Assemble["a_" + i] * C * (Math.cos(Math.PI / 180 * WssAssemble["Wss" + i]) - Math.cos(Math.PI / 180 * WsrAssemble["Wsr" + i]))) + (bAssemble["b" + i] * A / 2 * (Math.sin(Math.PI / 180 * WssAssemble["Wss" + i]) * Math.cos(Math.PI / 180 * WsrAssemble["Wsr" + i]) - (Math.sin(Math.PI / 180 * WsrAssemble["Wsr" + i]) * Math.cos(Math.PI / 180 * WsrAssemble["Wsr" + i])))) + (bAssemble["b" + i] * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * WssAssemble["Wss" + i]), 2) - Math.pow(Math.sin(Math.PI / 180 * WsrAssemble["Wsr" + i]), 2))));
                    G2Assemble["G2" + i] = 1 / (2 * dAssemble["d" + i]) * ((bAssemble["b" + i] * A / 2 - (a_Assemble["a_" + i] * BAssemble["B" + i])) * (WssAssemble["Wss" + i] + WsAssemble["Ws" + i]) * (Math.PI / 180) + ((a_Assemble["a_" + i] * A - bAssemble["b" + i] * BAssemble["B" + i]) * (Math.sin(Math.PI / 180 * WssAssemble["Wss" + i]) - Math.sin(Math.PI / 180 * (-WsAssemble["Ws" + i])))) - (a_Assemble["a_" + i] * C * (Math.cos(Math.PI / 180 * WssAssemble["Wss" + i]) - Math.cos(Math.PI / 180 * (-WsAssemble["Ws" + i])))) + (bAssemble["b" + i] * A / 2 * (Math.sin(Math.PI / 180 * WssAssemble["Wss" + i]) * Math.cos(Math.PI / 180 * (-WsAssemble["Ws" + i])) - (Math.sin(Math.PI / 180 * (-WsAssemble["Ws" + i])) * Math.cos(Math.PI / 180 * (-WsAssemble["Ws" + i]))))) + (bAssemble["b" + i] * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * WssAssemble["Wss" + i]), 2) - Math.pow(Math.sin(Math.PI / 180 * (-WsAssemble["Ws" + i])), 2))));
                    G3Assemble["G3" + i] = 1 / (2 * dAssemble["d" + i]) * ((bAssemble["b" + i] * A / 2 - (a_Assemble["a_" + i] * BAssemble["B" + i])) * (WsAssemble["Ws" + i] - WsrAssemble["Wsr" + i]) * (Math.PI / 180) + ((a_Assemble["a_" + i] * A - bAssemble["b" + i] * BAssemble["B" + i]) * (Math.sin(Math.PI / 180 * WsAssemble["Ws" + i]) - Math.sin(Math.PI / 180 * WsrAssemble["Wsr" + i]))) - (a_Assemble["a_" + i] * C * (Math.cos(Math.PI / 180 * WsAssemble["Ws" + i]) - Math.cos(Math.PI / 180 * WsrAssemble["Wsr" + i]))) + (bAssemble["b" + i] * A / 2 * (Math.sin(Math.PI / 180 * WsAssemble["Ws" + i]) * Math.cos(Math.PI / 180 * WsrAssemble["Wsr" + i]) - (Math.sin(Math.PI / 180 * WsrAssemble["Wsr" + i]) * Math.cos(Math.PI / 180 * WsrAssemble["Wsr" + i])))) + (bAssemble["b" + i] * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * WsAssemble["Ws" + i]), 2) - Math.pow(Math.sin(Math.PI / 180 * WsrAssemble["Wsr" + i]), 2))));
                    G4Assemble["G4" + i] = G2Assemble["G2" + i] + G3Assemble["G3" + i];
                    0 > G1Assemble["G1" + i] ? G5Assemble["G5" + i] = 0 : G5Assemble["G5" + i] = G1Assemble["G1" + i];
                    0 > G4Assemble["G4" + i] ? G6Assemble["G6" + i] = 0 : G6Assemble["G6" + i] = G4Assemble["G4" + i];
                    WssAssemble["Wss" + i] < WsrAssemble["Wsr" + i] ? DAssemble["D" + i] = G6Assemble["G6" + i] : DAssemble["D" + i] = G5Assemble["G5" + i];
                    RAssemble["R" + i] = DAssemble["D" + i] + (HsAssemble["Hs" + i] / (2 * HzAssemble["Hz" + i]) * (1 + Math.cos(Math.PI / 180 * j))) + (reflectivity / 2 * (1 - Math.cos(Math.PI / 180 * j)));
                    HtAssemble["Ht" + i] = RAssemble["R" + i] * HzAssemble["Hz" + i];
                    HtSum += HtAssemble["Ht" + i] * monthArray[i - 1];
                    daySum += monthArray[i - 1]
                    arrHt.push(HtAssemble["Ht" + i])
                }
                Hm = HtSum / daySum;
                HmArr.push(Hm)
                var Imin = Ql / (Hm * eff1 * eff2);
                // console.log(Imin)
                var HtMin = Math.min.apply(null, arrHt);
                var Imax = Ql / (HtMin * eff1 * eff2);
                var tmparr = getElectricity(Imin, Imax, QcAssemble, HtAssemble, days, monthbeginVal, monthEndVal, eff1, eff2, Ql, QgAssemble, lossAssemble)
                var numI = tmparr[0];
                if (numI !== undefined) {
                    arr.push(numI);
                    arrDip.push(j)
                }
            }
            // console.log(arr)
            // console.log(arrDip)
            Im = Math.min.apply(null, arr);
        }
        var A = Math.cos(Math.PI / 180 * bestDip) + Math.tan(Math.PI / 180 * latitude) * Math.cos(Math.PI / 180 * azimuth) * Math.sin(Math.PI / 180 * bestDip);
        var sunangleAssemble = {}; //各月份太阳赤纬角
        var WsAssemble = {}; //各月水平面的日落时角
        var BAssemble = {}; //各月参数B
        var C = Math.sin(Math.PI / 180 * bestDip) * Math.sin(Math.PI / 180 * azimuth) / Math.cos(Math.PI / 180 * latitude); //参数C
        var aAssemble = {}; //各月参数a
        var bAssemble = {}; //各月参数b
        var dAssemble = {}; //各月参数d
        var a_Assemble = {}; //各月参数a′
        var mAssemble = {}; //各月Wsr第二个参数
        var tAssemble = {}; //各月Wsr第二个参数
        var ssAssemble = {}; //|Wss|中的较小值的集合
        var srAssemble = {}; //|Wsr|中的较小值的集合
        var WsrAssemble = {}; //Wsr倾斜面日出时角集合
        var WssAssemble = {}; //Wss倾斜面日落时角
        var G1Assemble = {}; //G(Wss,Wsr)集合
        var G2Assemble = {}; //G(Wss,-Ws)集合
        var G3Assemble = {}; //G(Ws,Wsr)集合
        var G4Assemble = {}; //G(Wss,-Ws)+G(Ws,Wsr)集合
        var G5Assemble = {}; //Wss>=Wsr时的D
        var G6Assemble = {}; //Wss<Wsr时的D
        var DAssemble = {}; //参数D集合
        var RAssemble = {}; //参数R集合
        var HtAssemble = {}; //倾斜面上各月日均太阳辐射量Ht集合;
        var Hm;
        var HtSum = 0;
        var daySum = 0;
        var arrHt = [];
        for (var i = monthbeginVal; i <= monthEndVal; i++) {
            sunangleAssemble["sunangle" + i] = 23.45 * Math.sin(Math.PI / 180 * (360 * (284 + nArray[i - 1]) / 365));
            WsAssemble["Ws" + i] = Math.acos(-Math.tan(Math.PI / 180 * latitude) * Math.tan(Math.PI / 180 * sunangleAssemble["sunangle" + i])) * 180 / Math.PI;
            BAssemble["B" + i] = Math.cos(Math.PI / 180 * WsAssemble["Ws" + i]) * Math.cos(Math.PI / 180 * bestDip) + Math.tan(Math.PI / 180 * sunangleAssemble["sunangle" + i]) * Math.sin(Math.PI / 180 * bestDip) * Math.cos(Math.PI / 180 * azimuth);
            aAssemble["a" + i] = 0.409 + 0.5016 * Math.sin(Math.PI / 180 * (WsAssemble["Ws" + i] - 60));
            bAssemble["b" + i] = 0.6609 - 0.4767 * Math.sin(Math.PI / 180 * (WsAssemble["Ws" + i] - 60));
            dAssemble["d" + i] = Math.sin(Math.PI / 180 * WsAssemble["Ws" + i]) - Math.PI / 180 * WsAssemble["Ws" + i] * Math.cos(Math.PI / 180 * WsAssemble["Ws" + i]);
            a_Assemble["a_" + i] = aAssemble["a" + i] - (HsAssemble["Hs" + i] / HzAssemble["Hz" + i]);
            mAssemble["m" + i] = Math.acos((A * BAssemble["B" + i] + (C * Math.sqrt(Math.pow(A, 2) - Math.pow(BAssemble["B" + i], 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
            tAssemble["t" + i] = Math.acos((A * BAssemble["B" + i] - (C * Math.sqrt(Math.pow(A, 2) - Math.pow(BAssemble["B" + i], 2) + Math.pow(C, 2)))) / (Math.pow(A, 2) + Math.pow(C, 2))) * 180 / Math.PI;
            WsAssemble["Ws" + i] < tAssemble["t" + i] ? ssAssemble["ss" + i] = WsAssemble["Ws" + i] : ssAssemble["ss" + i] = tAssemble["t" + i]
            WsAssemble["Ws" + i] < mAssemble["m" + i] ? srAssemble["sr" + i] = WsAssemble["Ws" + i] : srAssemble["sr" + i] = mAssemble["m" + i];

            if (A > 0 && BAssemble["B" + i] > 0) {
                WsrAssemble["Wsr" + i] = -srAssemble["sr" + i];
                WssAssemble["Wss" + i] = ssAssemble["ss" + i]
            } else if (A >= BAssemble["B" + i] > 0) {
                WsrAssemble["Wsr" + i] = -srAssemble["sr" + i];
                WssAssemble["Wss" + i] = ssAssemble["ss" + i]
            } else {
                WsrAssemble["Wsr" + i] = srAssemble["sr" + i];
                WssAssemble["Wss" + i] = -ssAssemble["ss" + i]
            }
            G1Assemble["G1" + i] = 1 / (2 * dAssemble["d" + i]) * ((bAssemble["b" + i] * A / 2 - (a_Assemble["a_" + i] * BAssemble["B" + i])) * (WssAssemble["Wss" + i] - WsrAssemble["Wsr" + i]) * (Math.PI / 180) + ((a_Assemble["a_" + i] * A - bAssemble["b" + i] * BAssemble["B" + i]) * (Math.sin(Math.PI / 180 * WssAssemble["Wss" + i]) - Math.sin(Math.PI / 180 * WsrAssemble["Wsr" + i]))) - (a_Assemble["a_" + i] * C * (Math.cos(Math.PI / 180 * WssAssemble["Wss" + i]) - Math.cos(Math.PI / 180 * WsrAssemble["Wsr" + i]))) + (bAssemble["b" + i] * A / 2 * (Math.sin(Math.PI / 180 * WssAssemble["Wss" + i]) * Math.cos(Math.PI / 180 * WsrAssemble["Wsr" + i]) - (Math.sin(Math.PI / 180 * WsrAssemble["Wsr" + i]) * Math.cos(Math.PI / 180 * WsrAssemble["Wsr" + i])))) + (bAssemble["b" + i] * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * WssAssemble["Wss" + i]), 2) - Math.pow(Math.sin(Math.PI / 180 * WsrAssemble["Wsr" + i]), 2))));
            G2Assemble["G2" + i] = 1 / (2 * dAssemble["d" + i]) * ((bAssemble["b" + i] * A / 2 - (a_Assemble["a_" + i] * BAssemble["B" + i])) * (WssAssemble["Wss" + i] + WsAssemble["Ws" + i]) * (Math.PI / 180) + ((a_Assemble["a_" + i] * A - bAssemble["b" + i] * BAssemble["B" + i]) * (Math.sin(Math.PI / 180 * WssAssemble["Wss" + i]) - Math.sin(Math.PI / 180 * (-WsAssemble["Ws" + i])))) - (a_Assemble["a_" + i] * C * (Math.cos(Math.PI / 180 * WssAssemble["Wss" + i]) - Math.cos(Math.PI / 180 * (-WsAssemble["Ws" + i])))) + (bAssemble["b" + i] * A / 2 * (Math.sin(Math.PI / 180 * WssAssemble["Wss" + i]) * Math.cos(Math.PI / 180 * (-WsAssemble["Ws" + i])) - (Math.sin(Math.PI / 180 * (-WsAssemble["Ws" + i])) * Math.cos(Math.PI / 180 * (-WsAssemble["Ws" + i]))))) + (bAssemble["b" + i] * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * WssAssemble["Wss" + i]), 2) - Math.pow(Math.sin(Math.PI / 180 * (-WsAssemble["Ws" + i])), 2))));
            G3Assemble["G3" + i] = 1 / (2 * dAssemble["d" + i]) * ((bAssemble["b" + i] * A / 2 - (a_Assemble["a_" + i] * BAssemble["B" + i])) * (WsAssemble["Ws" + i] - WsrAssemble["Wsr" + i]) * (Math.PI / 180) + ((a_Assemble["a_" + i] * A - bAssemble["b" + i] * BAssemble["B" + i]) * (Math.sin(Math.PI / 180 * WsAssemble["Ws" + i]) - Math.sin(Math.PI / 180 * WsrAssemble["Wsr" + i]))) - (a_Assemble["a_" + i] * C * (Math.cos(Math.PI / 180 * WsAssemble["Ws" + i]) - Math.cos(Math.PI / 180 * WsrAssemble["Wsr" + i]))) + (bAssemble["b" + i] * A / 2 * (Math.sin(Math.PI / 180 * WsAssemble["Ws" + i]) * Math.cos(Math.PI / 180 * WsrAssemble["Wsr" + i]) - (Math.sin(Math.PI / 180 * WsrAssemble["Wsr" + i]) * Math.cos(Math.PI / 180 * WsrAssemble["Wsr" + i])))) + (bAssemble["b" + i] * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * WsAssemble["Ws" + i]), 2) - Math.pow(Math.sin(Math.PI / 180 * WsrAssemble["Wsr" + i]), 2))));
            G4Assemble["G4" + i] = G2Assemble["G2" + i] + G3Assemble["G3" + i];
            0 > G1Assemble["G1" + i] ? G5Assemble["G5" + i] = 0 : G5Assemble["G5" + i] = G1Assemble["G1" + i];
            0 > G4Assemble["G4" + i] ? G6Assemble["G6" + i] = 0 : G6Assemble["G6" + i] = G4Assemble["G4" + i];
            WssAssemble["Wss" + i] < WsrAssemble["Wsr" + i] ? DAssemble["D" + i] = G6Assemble["G6" + i] : DAssemble["D" + i] = G5Assemble["G5" + i];
            RAssemble["R" + i] = DAssemble["D" + i] + (HsAssemble["Hs" + i] / (2 * HzAssemble["Hz" + i]) * (1 + Math.cos(Math.PI / 180 * bestDip))) + (reflectivity / 2 * (1 - Math.cos(Math.PI / 180 * bestDip)));
            HtAssemble["Ht" + i] = RAssemble["R" + i] * HzAssemble["Hz" + i];
            HtSum += HtAssemble["Ht" + i] * monthArray[i - 1];
            daySum += monthArray[i - 1]
        }
        Hm = HtSum / daySum;
        HmArr.push(Hm)
        var Imin = Ql / (Hm * eff1 * eff2);
        // console.log(Imin)
        for (var i = monthbeginVal; i <= monthEndVal; i++) {
            arrHt.push(HtAssemble["Ht" + i])
        }
        var HtMin = Math.min.apply(null, arrHt);
        var Imax = Ql / (HtMin * eff1 * eff2);
        var tmparr = getElectricity(Imin, Imax, QcAssemble, HtAssemble, days, monthbeginVal, monthEndVal, eff1, eff2, Ql, QgAssemble, lossAssemble)
        var electricity = tmparr[0];
        // console.log(electricity)
        var min = Math.abs(tmparr[1].toFixed(2))
        // console.log(min);
        var BnEchart = (Math.abs(min.toFixed(5)) / (DOD * eff2)).toFixed(2);
        //  console.log(BnEchart)
        var PnEchart = (safeEff * Im * 457).toFixed(2)
        // console.log(PnEchart)
        BnEchartArr.push(BnEchart);
        PnEchartArr.push(PnEchart)
    }
    if (province && city) {
        $(".location").append("<span>" + province + "</span><span style='margin-left:20px;'>" + city + "</span>");
        $(".coordinate").append("<span>经度" + longitude + "°</span><span style='margin-left:20px;'>纬度" + latitude + "°</span>");
    }
    $("#roof-status").append("<p class='distance-top'><strong>建筑层数：</strong><span class='inline-block'>" + zVal + "</span>层</p><p><strong>屋面形式：</strong><span class='inline-block' style='width:200px;'>" + typeRoof + "</span></p><p><strong>制冷机组COP=</strong><span class='inline-block' style='width:200px;'>" + COP + "</span></p><p><strong>蓄电池维持天数n=</strong><span class='inline-block' style='width:200px;'>" + days + "</span></p><p><strong>光伏方阵安装方式：</strong><span class='inline-block' style='width:200px;'>" + roofType + "</span></p><p><strong>光伏方阵倾角β=</strong><span class='inline-block' style='width:200px;'>" + bestDip + "°</span></p>")
    if (calStatus == 0) {
        var qVal = sessionStorage.getItem("qVal")
        $("#check-status").append("<p><strong>冷指标q=</strong><span class='inline-block'>" + qVal + "</span>W/㎡时：</p><p><strong>单位面积蓄电池容量Bn=</strong><span class='inline-block text-center' style='width:80px'>" + Bn.toFixed(2) + "</span>A·h/㎡；</p><p><strong>单位面积光伏方阵容量Pn=</strong><span class='inline-block text-center' style='width:80px'>" + Pn.toFixed(2) + "</span>W/㎡；</p><p><strong>单位面积光伏阵列最大安装容量Pm=</strong><span class='inline-block text-center' style='width:80px'>" + Pm.toFixed(2) + "</span>W/㎡；</p>")
    } else {
        $("#check-status").append("<p><strong>单位面积蓄电池容量Bn=</strong><span class='inline-block text-center' style='width:80px'>" + Bn.toFixed(2) + "</span>A·h/㎡；</p><p><strong>单位面积光伏方阵容量Pn=</strong><span class='inline-block text-center' style='width:80px'>" + Pn.toFixed(2) + "</span>W/㎡；</p><p><strong>单位面积光伏阵列最大安装容量Pm=</strong><span class='inline-block text-center' style='width:80px'>" + Pm.toFixed(2) + "</span>W/㎡；</p>")
    }
    if (Pm >= Pn) {
        $(".alert-success").css("display", "block");
        $(".alert-danger").css("display", "none")
    } else {
        $(".alert-danger").css("display", "block");
        $(".alert-success").css("display", "none")
    }





    var oMyChart = echarts.init(document.getElementById("PV-content"));
    var option = {
        backgroundColor: "#FBFBFB",
        tooltip: {
            trigger: "axis"
        },
        legend: {
            data: ["单位面积光伏方阵容量","光伏阵列最大安装容量"]
        },

        calculable: true,

        xAxis: [{
            axisLabel: {
                rotate: 30,
                interval: 0
            },
            axisLine: {
                lineStyle: {
                    color: "#999999"
                }
            },
            name: "冷指标q(W/㎡)",
            type: "category",
            nameLocation: "middle",
            nameGap: 30,
            boundaryGap: false,
            data: (function () {
                var list = [];
                for (var i = 50; i <= 200; i = i + 10) {
                    list.push(i);
                }
                return list;
            })()
        }],
        yAxis: [{
            type: "value",
            name: "Pn(W/㎡)",
            axisLine: {
                lineStyle: {
                    color: "#999999"
                }
            }
        }],
        series: [{
            name: "单位面积光伏方阵容量",
            type: "line",
            smooth: 0.2,
            color: ["#66AEDE"],
            data: PnEchartArr,
            markLine: {
                lineStyle: {
                    normal: {
                        color: '#dc143c',
                        type:'solid'
                    }
                },
                label: {
                    show: true,
                    position: 'right'
                },
                
                data: [{
                    value: Pm.toFixed(2),
                    yAxis: Pm.toFixed(2),
                }]
            }
        },
        {
            name: "光伏阵列最大安装容量",
            type: 'line',
            color: ['#dc143c'],
            data:[]
        }
    ]
    };
    oMyChart.setOption(option);

    var xMyChart = echarts.init(document.getElementById("accumulator-content"));
    var xoption = {
        backgroundColor: "#FBFBFB",
        tooltip: {
            trigger: "axis"
        },
        legend: {
            data: ["单位面积蓄电池容量"]
        },

        calculable: true,

        xAxis: [{
            axisLabel: {
                rotate: 30,
                interval: 0
            },
            axisLine: {
                lineStyle: {
                    color: "#999999"
                }
            },
            name: "冷指标q(W/㎡)",
            nameLocation: "middle",
            nameGap: 30,
            type: "category",
            boundaryGap: false,
            data: (function () {
                var list = [];
                for (var i = 50; i <= 200; i = i + 10) {
                    list.push(i);
                }
                return list;
            })()
        }],
        yAxis: [{
            type: "value",
            name: "Bn(A·h/㎡)",
            axisLine: {
                lineStyle: {
                    color: "#999999"
                }
            }
        }],
        series: [{
            name: "单位面积蓄电池容量",
            type: "line",
            smooth: 0.2,
            color: ["#90EC7D"],
            data: BnEchartArr
        }]
    };
    xMyChart.setOption(xoption);
    $("#choiceness-loading").css("display", "none");
});