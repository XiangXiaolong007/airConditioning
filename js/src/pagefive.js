var nArray = [15, 46, 75, 106, 136, 167, 197, 228, 259, 289, 320, 350]; //各月日期序号
var monthArray = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] //各月天数
$(function () {
    //获取经纬度及地区
    var province = sessionStorage.getItem("province");
    var longitude = sessionStorage.getItem("longitude");
    var latitude = sessionStorage.getItem("latitude");
    var city = sessionStorage.getItem("city");
    var dip = sessionStorage.getItem("dip")
    var electricity = +sessionStorage.getItem("electricity")
    var roofStatus; //平屋面还是坡屋面
    var reflectivity = sessionStorage.getItem("reflectivity")
    var eff1 = sessionStorage.getItem("eff1")
    var eff2 = sessionStorage.getItem("eff2")
    var Ql = sessionStorage.getItem("Ql")
    var HmArr = [];
    var monthbeginVal = +sessionStorage.getItem("monthbeginVal");
    var monthEndVal = +sessionStorage.getItem("monthEndVal");
    var azimuth = sessionStorage.getItem("azimuth");
    var QcAssemble = JSON.parse(sessionStorage.getItem("QcAssemble"))
    var HzAssemble = JSON.parse(sessionStorage.getItem("HzAssemble"));
    var HsAssemble = JSON.parse(sessionStorage.getItem("HsAssemble"))
    var days = sessionStorage.getItem("days")
    var QgAssemble = {};
    var lossAssemble = {}; //各月发电盈亏量
    if (province && city) {
        $(".location").append("<span>" + province + "</span><span style='margin-left:20px;'>" + city + "</span>");
        $(".coordinate").append("<span>经度" + longitude + "°</span><span style='margin-left:20px;'>纬度" + latitude + "°</span>");
    }
    $("#btn-Im").click(function () {
        var roof = document.getElementsByName("roof");
        var pitchedRoofC = $("#pitched-roof-c"); //坡屋面
        pitchedRoofC.empty();
        var flatRoofC = $("#flat-roof-c"); //平屋面
        flatRoofC.empty();
        var dipMin = 0; //最佳倾角范围下线
        var dipMax = 90; //最佳倾角范围上线
        var bestDip;
        var Im;
        if($("#enter")) {
            $("#enter").empty()
        }
        for (var i = 0; i < roof.length; i++) {
            if (roof[i].checked) {
                roofStatus = roof[i].value
            }
        }
        sessionStorage.setItem("roofStatus",roofStatus)
        if (roofStatus == 0) {
            flatRoofC.css("display", "none");
            pitchedRoofC.css("display", "block");
            sessionStorage.setItem("typeRoof","坡屋面")
            bestDip = dip;
            Im = electricity;
            sessionStorage.setItem("bestDip",bestDip)
            pitchedRoofC.append("<h4>坡屋面：</h4><p>计算方阵倾角不变β=<span class='inline-block'>" + dip + "</span>°</p><p>计算方阵输出电流Im=<span class='inline-block'>" + electricity.toFixed(2) + "</span>A</p>")
            
        } else if (roofStatus == 1) {
            sessionStorage.setItem("typeRoof","平屋面")
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
                    sunangleAssemble["sunangle" + i] = 23.45 * Math.sin(Math.PI / 180 * (360 * (284 + nArray[i-1]) / 365));
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
                    HtSum += HtAssemble["Ht" + i] * monthArray[i-1];
                    daySum += monthArray[i-1]
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
                var numI = tmparr[0];
                if (numI !== undefined) {
                    arr.push(numI);
                    arrDip.push(j)
                }
            }
            // console.log(arr)
            // console.log(arrDip)
            Im = Math.min.apply(null, arr);
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == Im) {
                    bestDip = arrDip[i];
                    break;
                }
            }
            sessionStorage.setItem("bestDip",bestDip)
            flatRoofC.css("display", "block");
            pitchedRoofC.css("display", "none")
            flatRoofC.append("<h4>平屋面：</h4><p>计算方阵最佳倾角βopt=<span class='inline-block'>" + bestDip + "</span>°</p><p>计算方阵输出电流Im=<span class='inline-block'>" + Im.toFixed(2) + "</span>A</p>")
        }
         $("#enter").append("<h4 style='font-weight:700'>请输入：</h4><form class='form-inline'><div class='form-group'><label for='accumulator'>蓄电池放电深度DOD=</label><input type='number' class='form-control' id='accumulator'><span style='display:inline-block;width:200px;margin-left:50px;'>DOD通常取0.3-0.8</span></div></form><form class='form-inline'><div class='form-group'><label for='safe-eff'>安全系数μ=</label><input type='number' class='form-control' id='safe-eff'><span style='display:inline-block;width:200px;margin-left:50px;' class='distance-top'>μ通常取1.05-1.3</span></div></form><form class='form-inline'><div class='form-group distance-top'><label for='ub-number'>蓄电池充电电压Ub = U × 1.2 = </label><span id='ub-number'>456V</span></div></form><form class='form-inline'><div class='form-group'><label for='voltageDrop'>防反冲二极管及线路等的电压降Ud = </label><input type='text' class='form-control' value='1' id='voltageDrop' disabled>V<span style='display:inline-block;width:200px;margin-left:50px;'' class='distance-top'>Ud取为1</span></div></form><button class='btn btn-calculate distance-top' id='btn-Bn-Pn'>开始计算蓄电池容量Bn和方阵容量Pn</button><div id='pn-bn'></div>")
        $("#btn-Bn-Pn").click(function(){
            var DOD = +$("#accumulator").val();
            sessionStorage.setItem("DOD",DOD)
            var safeEff = +$("#safe-eff").val();
            sessionStorage.setItem("safeEff",safeEff)
            if($("#pn-bn")) {
                $("#pn-bn").empty()
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
                sunangleAssemble["sunangle" + i] = 23.45 * Math.sin(Math.PI / 180 * (360 * (284 + nArray[i-1]) / 365));
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
                HtSum += HtAssemble["Ht" + i] * monthArray[i-1];
                daySum += monthArray[i-1]
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
            var tmparr = getElectricity(Imin,Imax,QcAssemble,HtAssemble,days,monthbeginVal,monthEndVal,eff1,eff2,Ql,QgAssemble,lossAssemble)
            var electricity = tmparr[0];
            // console.log(electricity)
            var min = Math.abs(tmparr[1].toFixed(2))
            // console.log(min);
            var Bn = Math.abs(min.toFixed(5)) / (DOD * eff2);
            // console.log(Bn)
            var Pn = safeEff*Im*457
            sessionStorage.setItem("Bn",Bn);
            sessionStorage.setItem("Pn",Pn)
            // console.log(Pn)
            $("#pn-bn").append("<p class='distance-top' style='font-weight:700'>蓄电池容量Bn=<span class='inline-block text-center' style='width:100px;'>"+ Bn.toFixed(2) +"</span>A·h/㎡</p><p class='distance-top' style='font-weight:700'>方阵容量Pn=<span class='inline-block text-center' style='width:100px;'>"+ Pn.toFixed(2) +"</span>W/㎡</p>")
        })
    })
    $("#next-five").click(function(){
        if(roofStatus == 0){
            location.href = "./pageseven.html"
        } else if(roofStatus == 1){
            location.href = "./pagesix.html"
        }
    })
})