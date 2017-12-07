//定义数组，存储省份信息
var provinceArray = [];
//定义省份数据列表
var provinceData;
// 定义省份编码
var pcode;
//定义数组，存储城市信息
var cityData = []
//纬度
var latitude;
var HzAssemble;//各月平均太阳总辐照量集合
var HsAssemble;//各月平均太阳散射辐照量集合
var nArray = [15, 46, 75, 106, 136, 167, 197, 228, 259, 289, 320, 350]; //各月日期序号
var monthArray = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] //各月天数
//根据选中的省份获取对应的城市
function setCity(province) {
    console.log(province)
    var $city = $("#selCity");
    var proCity, option, modelVal;
    //先清空之前绑定的值
    $city.empty();
    //存储城市信息
    var cityArray = [];
    //通过省份名称，获取省份对应城市的数组名
    if (!province) {
        $city.append("<option value='请选择'>请选择</option>")
    } else {
        $.get("http://nuantong.aikeapi.cn/api/area/list", {
            pcode: province
        }, function (data) {
            $city.append("<option value='请选择'>请选择</option>")
            console.log(data)
            //设置对应省份的城市
            if (data && data.code == 0) {
                cityData = data.info.List
                $.map(cityData, function (n) {
                    cityArray.push(n.Name)
                })
            }
            for (var i = 0, len = cityArray.length; i < len; i++) {
                modelVal = cityArray[i];
                option = "<option value='" + modelVal + "'>" + modelVal + "</option>";
                //添加
                $city.append(option);
            }
            //设置背景
            setBgColor();
        })
    }
}

//设置下拉列表间隔背景样色
function setBgColor() {
    var $option = $("select option:odd");
    $option.css({
        "background-color": "#DEDEDE"
    });
}

//省份选中事件
function provinceChange() {
    var $pro = $("#selProvince");
    var $city = $("#selCity");
    //本地缓存省份
    sessionStorage.setItem("province",$pro.val())
    // console.log($pro.val());
    // console.log(provinceData)
    provinceData.some(function (n) {
        // console.log(n.Name)
        if ($pro.val() == "请选择") {
            pcode = null
        } else if ($pro.val() == n.Name) {
            // console.log(n.Code)
            pcode = n.Code;
            return true;
        }
    })
    setCity(pcode);
}
//城市选中事件
function cityChange() {
    // console.log(cityData);
    var cityName = $("#selCity").val();
    //缓存城市信息
    sessionStorage.setItem("city",cityName)
    $("#ssehrz").empty();
    $("#diffuse").empty()
    $("#longi-lati-value").empty();
    cityData.some(function (n) {
        if (cityName == "请选择") {
            alert("请选择正确的位置信息");
            return true;
        } else if (cityName == n.Name) {
            var cpArray = n.Cp.slice(1, -1).split(",");
            var longitude = Number(cpArray[0]).toFixed(2);
            latitude = Number(cpArray[1]).toFixed(2);
            var nasa = JSON.parse(n.Nasa);
            console.log(nasa);
            var ssehrz = nasa.SSEHRZ;
            var diffuse = nasa.Diffuse;

            $("#longi-lati-value").append("<form class='form-inline'><div class='form-group col-sm-3'><label for='longitude'>经度：</label><span id='longitude'>" + longitude + "</span></div><div class='form-group col-sm-3'><label for='latitude'>纬度：</label><span id='latitude'>" + latitude + "</span></div></form>");

            HzAssemble = {};//各月平均太阳总辐照量集合
            HsAssemble = {};//各月平均太阳散射辐照量集合
            for (var i = 1; i <= 12; i++) {
                HzAssemble["Hz" + i] = +ssehrz[i];
                HsAssemble["Hs" + i] = +diffuse[i];
            }
            return true;
        }
    })
}
$(function () {
    $.get("http://nuantong.aikeapi.cn/api/area/list", function (data) {
        if (data && data.code == 0) {
            // console.log(data.info.List);
            provinceData = data.info.List;
            $.map(provinceData, function (n) {
                provinceArray.push(n.Name);
            });
            // console.log(provinceArray);
            //设置省份数据
            //给省份下拉列表赋值
            var option, modelVal;
            var $sel = $("#selProvince");
            var $selCity = $("#selCity")
            $sel.append("<option value='请选择'>请选择</option>")
            $selCity.append("<option value='请选择'>请选择</option>")
            //获取对应省份城市
            for (var i = 0, len = provinceArray.length; i < len; i++) {
                modelVal = provinceArray[i];
                option = "<option value='" + modelVal + "'>" + modelVal + "</option>";
                //添加到 select 元素中
                $sel.append(option);
            }
        }
    });
    // var longitudeAndLatitude = $("#longitude-and-latitude");
    // var longiLatiValue = $("#longi-lati-value");
    // longitudeAndLatitude.on("click", function () {
    //     longitudeAndLatitude.css("display", "none");
    //     longiLatiValue.css("display", "block");
    // });

    //设置背景颜色
    setBgColor();
    //查看所选位置的相关信息
    var Hm; //全年平均太阳日总辐照量Hm
    $("#btn-Ht-Hm").click(function () {
        var monthbeginVal = 1;
        var monthEndVal = 12;
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
        var HtTable = $("#HtTable");
        HtTable.empty();
        if ($("#month")) {
            $("#month").empty()
        }
        if ($("#HtVal")) {
            $("#HtVal").empty()
        }
        HtTable.append("<caption class='text-center'>倾斜面太阳辐照量Ht(kW·h/(㎡·d))倾β=<spanstyle='width:40pxdisplay:inline-block'>" + dip + "</span><span>°</span></caption><thead><tr id='month'><th>月份</th></tr></thead><tbody><tr id='HtVal'><td>平均太阳总辐照量<span>Ht</span></td></tr></tbody>")
        if ($("#month")) {
            var monthTable = $("#month")
        }
        if ($("#HtVal")) {
            var HtValTable = $("#HtVal")
        }
        $("#HmVal").empty()
        for (var i = monthbeginVal; i <= monthEndVal; i++) {
            sunangleAssemble["sunangle" + i] = 23.45 * Math.sin(Math.PI / 180 * (360 * (284 + nArray[i-1]) / 365));
            WsAssemble["Ws" + i] = Math.acos(-Math.tan(Math.PI / 180 * latitude) * Math.tan(Math.PI / 180 * sunangleAssemble["sunangle" + i])) * 180 / Math.PI;
            BAssemble["B" + i] = Math.cos(Math.PI / 180 * WsAssemble["Ws" + i]) * Math.cos(Math.PI / 180 * dip) + Math.tan(Math.PI / 180 * sunangleAssemble["sunangle" + i]) * Math.sin(Math.PI / 180 * dip) * Math.cos(Math.PI / 180 * azimuth);
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
            RAssemble["R" + i] = DAssemble["D" + i] + (HsAssemble["Hs" + i] / (2 * HzAssemble["Hz" + i]) * (1 + Math.cos(Math.PI / 180 * dip))) + (reflectivity / 2 * (1 - Math.cos(Math.PI / 180 * dip)));
            HtAssemble["Ht" + i] = RAssemble["R" + i] * HzAssemble["Hz" + i];

            monthTable.append("<th>" + i + "月</th>");
            HtValTable.append("<td>" + HtAssemble["Ht" + i].toFixed(2) + "</td>")
            HtSum += HtAssemble["Ht" + i] * monthArray[i-1];
            daySum += monthArray[i-1]
        }
        console.log(HtAssemble)
        console.log(HsAssemble)
        console.log(HzAssemble)
        Hm = HtSum / daySum;
        $("#HmVal").append("<h4>全年平均太阳日总辐照量Hm(kW·h/(㎡·d))</h4><p>Hm=<span style='display:inline-block;width:50px'>" + Hm.toFixed(2) + "</span>(kW·h/(㎡·d))</p>");
        if (isNaN(Hm)) {
            alert("请输入正确的参数完成计算！")
        }
    })
});