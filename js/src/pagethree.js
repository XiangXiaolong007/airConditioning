var nArray = [15, 46, 75, 106, 136, 167, 197, 228, 259, 289, 320, 350]; //各月日期序号

$(function () {
    $("#btn-Ht-Hm").click(function () {
        var monthbeginVal = +sessionStorage.getItem("monthbeginVal");
        var monthEndVal = +sessionStorage.getItem("monthEndVal");
        var latitude = sessionStorage.getItem("latitude")
        var dip = +$("#dip").val();
        var azimuth = +$("#azimuth").val();
        var reflectivity = +$("#reflectivity").val();
        var A = Math.cos(Math.PI / 180 * dip) + Math.tan(Math.PI / 180 * latitude) * Math.cos(Math.PI / 180 * azimuth) * Math.sin(Math.PI / 180 * dip);
        var sunangleAssemble = {}; //各月份太阳赤纬角
        var WsAssemble = {}; //各月水平面的日落时角
        var BAssemble = {}; //各月参数B
        var C = Math.sin(Math.PI / 180 * dip) * Math.sin(Math.PI / 180 * azimuth) / Math.cos(Math.PI / 180 * latitude); //参数C
        var aAssemble = {}; //各月参数a
        var bAssemble = {}; //各月参数b
        var dAssemble = {}; //各月参数d
        var a_Assemble = {}; //各月参数a′
        var mAssemble = {};//各月Wsr第二个参数
        var tAssemble = {};//各月Wsr第二个参数
        var ssAssemble = {};//|Wss|中的较小值的集合
        var srAssemble = {};//|Wsr|中的较小值的集合
        var WsrAssemble = {};//Wsr倾斜面日出时角集合
        var WssAssemble = {};//Wss倾斜面日落时角
        var G1Assemble = {};//G(Wss,Wsr)集合
        var G2Assemble = {};//G(Wss,-Ws)集合
        var G3Assemble = {};//G(Ws,Wsr)集合
        var G4Assemble = {};//G(Wss,-Ws)+G(Ws,Wsr)集合
        var HzAssemble = JSON.parse(sessionStorage.getItem("HzAssemble"));
        var HsAssemble = JSON.parse(sessionStorage.getItem("HsAssemble"))
        for (var i = monthbeginVal; i <= monthEndVal; i++) {
            sunangleAssemble["sunangle" + i] = 23.45 * Math.sin(Math.PI / 180 * (360 * (284 + nArray[i]) / 365));
            WsAssemble["Ws" + i] = Math.acos(-Math.tan(Math.PI / 180 * latitude) * Math.tan(Math.PI / 180 * sunangleAssemble["sunangle" + i])) * 180 / Math.PI;
            BAssemble["B" + i] = Math.cos(Math.PI / 180 * WsAssemble["Ws" + i]) * Math.cos(Math.PI / 180 * dip) + Math.tan(Math.PI / 180 * sunangleAssemble["sunangle" + i]) * Math.sin(Math.PI / 180 * dip) * Math.cos(Math.PI / 180 * azimuth);
            aAssemble["a" + i] = 0.409 + 0.5016 * Math.sin(Math.PI / 180 * (WsAssemble["Ws" + i] - 60));
            bAssemble["b" + i] = 0.6609 - 0.4767 * Math.sin(Math.PI / 180 * (WsAssemble["Ws" + i] - 60));
            dAssemble["d" + i] = Math.sin(Math.PI / 180 * WsAssemble["Ws" + i]) - Math.PI / 180 * WsAssemble["Ws" + i] * Math.cos(Math.PI / 180 * WsAssemble["Ws" + i]);
            a_Assemble["a_" + i] = aAssemble["a" + i] - (HsAssemble["Hs" + i] / HzAssemble["Hz" + i]);
            mAssemble["m" + i] = Math.acos((A*BAssemble["B" + i] + (C * Math.sqrt(Math.pow(A,2) - Math.pow(BAssemble["B" + i],2) + Math.pow(C,2)))) / (Math.pow(A,2) + Math.pow(C,2))) * 180 / Math.PI;
            tAssemble["t" + i] = Math.acos((A*BAssemble["B" + i] - (C * Math.sqrt(Math.pow(A,2) - Math.pow(BAssemble["B" + i],2) + Math.pow(C,2)))) / (Math.pow(A,2) + Math.pow(C,2))) * 180 / Math.PI;
            WsAssemble["Ws" + i] < tAssemble["t" + i]?ssAssemble["ss" + i] = WsAssemble["Ws" + i]:ssAssemble["ss" + i] = tAssemble["t" + i]
            WsAssemble["Ws" + i] < mAssemble["m" + i]?srAssemble["sr" + i] = WsAssemble["Ws" + i] : srAssemble["sr" + i] = mAssemble["m" + i];

            if(A>0&&BAssemble["B" + i]>0) {
                WsrAssemble["Wsr" + i] = -srAssemble["sr" + i];
                WssAssemble["Wss" + i] = ssAssemble["ss" + i]
            }else if(A>=BAssemble["B" + i]>0) {
                WsrAssemble["Wsr" + i] = -srAssemble["sr" + i];
                WssAssemble["Wss" + i] = ssAssemble["ss" + i]
            }else {
                WsrAssemble["Wsr" + i] = srAssemble["sr" + i];
                WssAssemble["Wss" + i] = -ssAssemble["ss" + i]
            }
            G1Assemble["G1" + i] = 1 / (2 * dAssemble["d" + i])*((bAssemble["b" + i] * A / 2 - (a_Assemble["a_" + i] * BAssemble["B" + i])) * (WssAssemble["Wss" + i] - WsrAssemble["Wsr" + i]) * (Math.PI / 180) + ((a_Assemble["a_" + i] * A - bAssemble["b" + i] * BAssemble["B" + i]) * (Math.sin(Math.PI / 180 * WssAssemble["Wss" + i]) - Math.sin(Math.PI / 180 * WsrAssemble["Wsr" + i]))) - (a_Assemble["a_" + i] * C * (Math.cos(Math.PI / 180 * WssAssemble["Wss" + i]) - Math.cos(Math.PI / 180 * WsrAssemble["Wsr" + i]))) + (bAssemble["b" + i] * A / 2 * (Math.sin(Math.PI / 180 * WssAssemble["Wss" + i]) * Math.cos(Math.PI / 180 * WsrAssemble["Wsr" + i]) - (Math.sin(Math.PI / 180 * WsrAssemble["Wsr" + i]) * Math.cos(Math.PI / 180 * WsrAssemble["Wsr" + i])))) + (bAssemble["b" + i] * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * WssAssemble["Wss" + i]),2) - Math.pow(Math.sin(Math.PI / 180 * WsrAssemble["Wsr" + i]),2))))
            G2Assemble["G2" + i] = 1 / (2 * dAssemble["d" + i])*((bAssemble["b" + i] * A / 2 - (a_Assemble["a_" + i] * BAssemble["B" + i])) * (WssAssemble["Wss" + i] + WsAssemble["Ws" + i]) * (Math.PI / 180) + ((a_Assemble["a_" + i] * A - bAssemble["b" + i] * BAssemble["B" + i]) * (Math.sin(Math.PI / 180 * WssAssemble["Wss" + i]) - Math.sin(Math.PI / 180 * (-WsAssemble["Ws" + i])))) - (a_Assemble["a_" + i] * C * (Math.cos(Math.PI / 180 * WssAssemble["Wss" + i]) - Math.cos(Math.PI / 180 * (-WsAssemble["Ws" + i])))) + (bAssemble["b" + i] * A / 2 * (Math.sin(Math.PI / 180 * WssAssemble["Wss" + i]) * Math.cos(Math.PI / 180 * (-WsAssemble["Ws" + i])) - (Math.sin(Math.PI / 180 * (-WsAssemble["Ws" + i])) * Math.cos(Math.PI / 180 * (-WsAssemble["Ws" + i]))))) + (bAssemble["b" + i] * C / 2 * (Math.pow(Math.sin(Math.PI / 180 * WssAssemble["Wss" + i]),2) - Math.pow(Math.sin(Math.PI / 180 * (-WsAssemble["Ws" + i])),2)))) 
        }
        console.log(G2Assemble)
    });
});