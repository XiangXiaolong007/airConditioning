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
        var HzAssemble = sessionStorage.getItem("HzAssemble");
        var HsAssemble = sessionStorage.getItem("HsAssemble")
        for (var i = monthbeginVal; i <= monthEndVal; i++) {
            sunangleAssemble["sunangle" + i] = 23.45 * Math.sin(Math.PI / 180 * (360 * (284 + nArray[i]) / 365));
            WsAssemble["Ws" + i] = Math.acos(-Math.tan(Math.PI / 180 * latitude) * Math.tan(Math.PI / 180 * sunangleAssemble["sunangle" + i])) * 180 / Math.PI;
            BAssemble["B" + i] = Math.cos(Math.PI / 180 * WsAssemble["Ws" + i]) * Math.cos(Math.PI / 180 * dip) + Math.tan(Math.PI / 180 * sunangleAssemble["sunangle" + i]) * Math.sin(Math.PI / 180 * dip) * Math.cos(Math.PI / 180 * azimuth);
            aAssemble["a" + i] = 0.409 + 0.5016 * Math.sin(Math.PI / 180 * (WsAssemble["Ws" + i] - 60));
            bAssemble["b" + i] = 0.6609 - 0.4767 * Math.sin(Math.PI / 180 * (WsAssemble["Ws" + i] - 60));
            dAssemble["d" + i] = Math.sin(Math.PI / 180 * WsAssemble["Ws" + i]) - Math.PI / 180 * WsAssemble["Ws" + i] * Math.cos(Math.PI / 180 * WsAssemble["Ws" + i]);
            a_Assemble["a_" + i] = aAssemble["a" + i] - (HsAssemble["Hs" + i] / HzAssemble["Hz" + i]);

        }
        console.log(monthbeginVal)
        console.log(HzAssemble.Hz4)
        console.log(sunangleAssemble)
        console.log(WsAssemble)
        console.log(BAssemble)
        console.log(aAssemble)
        console.log(bAssemble)
        console.log(dAssemble)
        console.log(a_Assemble)
    });
});