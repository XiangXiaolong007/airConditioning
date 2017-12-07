"use strict";
//定义数组，存储省份信息
var provinceArray = [];
//定义省份数据列表
var provinceData;
// 定义省份编码
var pcode;
//定义数组，存储城市信息
var cityData = []

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
            var latitude = Number(cpArray[1]).toFixed(2);
            var nasa = JSON.parse(n.Nasa);
            console.log(nasa);
            var ssehrz = nasa.SSEHRZ;
            var diffuse = nasa.Diffuse;

            $("#longi-lati-value").append("<form class='form-inline'><div class='form-group col-sm-3'><label for='longitude'>经度：</label><span id='longitude'>" + longitude + "</span></div><div class='form-group col-sm-3'><label for='latitude'>纬度：</label><span id='latitude'>" + latitude + "</span></div></form>");

            //平均太阳总辐照量数据
            var ssehzData = "<td>平均太阳总辐照量<spanstyle='text-decoration:overline'>H</span></td>";
            //平均太阳散射辐照量
            var diffuseData = "<td>平均太阳散射辐照量<span style='text-decoration:overline'>Hd</span></td>"
            var HzAssemble = {};//各月平均太阳总辐照量集合
            var HsAssemble = {};//各月平均太阳散射辐照量集合
            for (var i = 1; i <= 12; i++) {
                HzAssemble["Hz" + i] = +ssehrz[i];
                HsAssemble["Hs" + i] = +diffuse[i];
                ssehzData += "<td id='Hz" + i + "'>" + Number(ssehrz[i]) + "</td>";
                diffuseData += "<td id='Hs" + i + "'>" + Number(diffuse[i]) + "</td>"
            }
            sessionStorage.setItem("HzAssemble",JSON.stringify(HzAssemble));
            sessionStorage.setItem("HsAssemble",JSON.stringify(HsAssemble))
            $("#ssehrz").append(ssehzData);
            $("#diffuse").append(diffuseData);
            //本地缓存经纬度
            sessionStorage.setItem("longitude",longitude);
            sessionStorage.setItem("latitude",latitude)
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
    $("#next-one").on("click", function () {
        if ($("#longitude").html()) {
            location.href = "./pagetwo.html";
        } else {
            alert("请确定位置信息！");
        }
    });
    
});