$(function(){
    //获取经纬度及地区
    var province = sessionStorage.getItem("province");
    var longitude = sessionStorage.getItem("longitude");
    var latitude = sessionStorage.getItem("latitude");
    var city = sessionStorage.getItem("city");
    var dip = sessionStorage.getItem("dip")
    var electricity = +sessionStorage.getItem("electricity")
    var roofStatus;//平屋面还是坡屋面
    var reflectivity = sessionStorage.getItem("reflectivity")
    var eff1 = sessionStorage.getItem("eff1")
    var eff2 = sessionStorage.getItem("eff2")
    var Ql = sessionStorage.getItem("Ql")
    var HmArr = [];
    
    var monthbeginVal = +sessionStorage.getItem("monthbeginVal");
    var monthEndVal = +sessionStorage.getItem("monthEndVal");
    if (province && city) {
        $(".location").append("<span>" + province + "</span><span style='margin-left:20px;'>" + city + "</span>");
        $(".coordinate").append("<span>经度" + longitude + "°</span><span style='margin-left:20px;'>纬度" + latitude + "°</span>");
    }
    $("#btn-Im").click(function(){
        var roof = document.getElementsByName("roof");
        var pitchedRoofC = $("#pitched-roof-c");//坡屋面
        pitchedRoofC.empty();
        var flatRoofC = $("#flat-roof-c");//平屋面
        flatRoofC.empty();
        var dipMin = 0;//最佳倾角范围下线
        var dipMax = 90;//最佳倾角范围上线

        for(var i = 0;i<roof.length;i++){
            if(roof[i].checked){
                roofStatus = roof[i].value
            }
        }
        if(roofStatus == 0) {
            flatRoofC.css("display","none");
            pitchedRoofC.css("display","block");
            pitchedRoofC.append("<h4>坡屋面：</h4><p>计算方阵倾角不变β=<span class='inline-block'>"+dip+"</span>°</p><p>计算方阵输出电流Im=<span class='inline-block'>"+ electricity.toFixed(2)+"</span>A</p>")
        }else if(roofStatus == 1) {

            for(var j = dipMin;j<=dipMax;j++){
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
                var HtSum = 0;
                var daySum = 0;
                
                var HzAssemble = JSON.parse(sessionStorage.getItem("HzAssemble"));
                var HsAssemble = JSON.parse(sessionStorage.getItem("HsAssemble"))
                for (var i = monthbeginVal; i <= monthEndVal; i++) {
                    sunangleAssemble["sunangle" + i] = 23.45 * Math.sin(Math.PI / 180 * (360 * (284 + nArray[i]) / 365));
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
        
                    monthTable.append("<th>" + i + "月</th>");
                    HtValTable.append("<td>" + HtAssemble["Ht" + i].toFixed(2) + "</td>")
                    HtSum += HtAssemble["Ht" + i] * monthArray[i];
                    daySum += monthArray[i]
                }
                Hm = HtSum / daySum;
                // sessionStorage.setItem("Hm",Hm);
                // sessionStorage.setItem("HtAssemble",JSON.stringify(HtAssemble))
            }
            flatRoofC.css("display","block");
            pitchedRoofC.css("display","none")
            flatRoofC.append("<h4>平屋面：</h4><p>计算方阵最佳倾角βopt=<span class='inline-block'></span>°</p><p>计算方阵输出电流Im=<span class='inline-block'></span>A</p>")
        }
    })
})