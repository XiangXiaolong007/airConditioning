$(function() {
    //获取经纬度及地区
    var province = sessionStorage.getItem("province");
    var longitude = sessionStorage.getItem("longitude");
    var latitude = sessionStorage.getItem("latitude");
    var city = sessionStorage.getItem("city");
    var bestDip = sessionStorage.getItem("bestDip")
    var slopStatus;
    var slopparallel = $(".slopparallel");
    var slopupdown = $(".slopupdown")
    if (province && city) {
        $(".location").append("<span>" + province + "</span><span style='margin-left:20px;'>" + city + "</span>");
        $(".coordinate").append("<span>经度" + longitude + "°</span><span style='margin-left:20px;'>纬度" + latitude + "°</span>");
    }
    slopparallel.click(function(){
        slopStatus = 0;
        sessionStorage.setItem("roofType","坡屋面平行架空安装")
        $("#largest-capacity").empty()
        slopparallel.css("border","1px dashed #ccc");
        slopupdown.css("border","none");
        $("#largest-capacity").append("<h4>2.光伏阵列最大安装容量计算</h4><p>①请输入光伏组件参数</p><form class='form-inline distance-top'><div class='form-group'><label for='sunHeight'>太阳能电池组件高度L = </label><input type='number' class='form-control' id='sunHeight'>m</div></form><form class='form-inline distance-top'><div class='form-group'><label for='sunWidth'>太阳能电池组件宽度W = </label><input type='number' class='form-control' id='sunWidth'>m</div></form><form class='form-inline distance-top'><div class='form-group'><label for='sunPower'>单片光伏组件功率Wp = </label><input type='number' class='form-control' id='sunPower'>W</div></form><form class='form-inline distance-top'><div class='form-group'><label for='usefulArea'>光伏组件有效面积系数ρ = </label><input type='number' class='form-control' value='0.9' id='usefulArea' disabled></div></form><h5>ρ为光伏组件有效面积系数，是考虑屋面检修疏散通道占用屋面面积，且屋面不能安全安装光伏组件时的系数；</h5><h5>考虑坡屋面平行架空安装需设置检修疏散通道，因此ρ取0.9；</h5><form class='form-inline distance-top'><div class='form-group'><label for='location2'>屋面安装方位系数Γ = </label><input type='number' class='form-control' id='location2'></div></form><h5>Γ为坡屋面上安装光伏板的某朝向屋面占总坡屋面面积的比例；</h5><button class='btn btn-calculate' id='btn-Pm'>开始计算</button><p class='distance-top' style='font-weight:700' id='cal-number'></p>")

        $("#btn-Pm").click(function(){
            $("#cal-number").empty();
            var height = +$("#sunHeight").val();
            var width = +$("#sunWidth").val()
            var Spv = height * width * Math.cos(Math.PI / 180 * bestDip);
            var Wp = +$("#sunPower").val();
            var areaEff = +$("#usefulArea").val()
            var Pm = (Wp / Spv) * areaEff;
            $("#cal-number").append("光伏阵列最大安装容量Pm=<span class='inline-block text-center' style='width:80px;'>"+Pm+"</span>W/㎡")
            sessionStorage.setItem("Pm",Pm)
        })
    })
    slopupdown.click(function(){
        slopStatus = 1;
        sessionStorage.setItem("roofType","坡屋面顺坡镶嵌安装")
        $("#largest-capacity").empty();
        slopupdown.css("border","1px dashed #ccc");
        slopparallel.css("border","none");
        $("#largest-capacity").append("<h4>2.光伏阵列最大安装容量计算</h4><p>①请输入光伏组件参数</p><form class='form-inline distance-top'><div class='form-group'><label for='sunHeight'>太阳能电池组件高度L = </label><input type='number' class='form-control' id='sunHeight'>m</div></form><form class='form-inline distance-top'><div class='form-group'><label for='sunWidth'>太阳能电池组件宽度W = </label><input type='number' class='form-control' id='sunWidth'>m</div></form><form class='form-inline distance-top'><div class='form-group'><label for='sunPower'>单片光伏组件功率Wp = </label><input type='number' class='form-control' id='sunPower'>W</div></form><form class='form-inline distance-top'><div class='form-group'><label for='usefulArea'>光伏组件有效面积系数ρ = </label><input type='number' class='form-control' value='0.9' id='usefulArea' disabled></div></form><h5>ρ为光伏组件有效面积系数，是考虑屋面检修疏散通道占用屋面面积，且屋面不能安全安装光伏组件时的系数；</h5><h5>考虑坡屋面平行架空安装需设置检修疏散通道，因此ρ取0.9；</h5><form class='form-inline distance-top'><div class='form-group'><label for='location2'>屋面安装方位系数Γ = </label><input type='number' class='form-control' id='location2'></div></form><h5>Γ为坡屋面上安装光伏板的某朝向屋面占总坡屋面面积的比例；</h5><form class='form-inline distance-top'><div class='form-group'><label for='temperature'>温度修正系数μ = </label><input type='text' class='form-control' value='0.9' id='temperature' disabled></div></form><h5>μ为温度修正系数，是考虑坡屋面顺坡镶嵌安装光伏板背板通风散热不好，对光伏组件效率的影响，取0.9；</h5><button class='btn btn-calculate' id='btn-Pm'>开始计算</button><p class='distance-top' style='font-weight:700' id='cal-number'></p>")
        $("#btn-Pm").click(function(){
            $("#cal-number").empty();
            var height = +$("#sunHeight").val();
            var width = +$("#sunWidth").val()
            var Spv = height * width * Math.cos(Math.PI / 180 * bestDip);
            var Wp = +$("#sunPower").val();
            var areaEff = +$("#usefulArea").val()
            var tem = +$("#temperature").val()
            var Pm = (Wp / Spv) * areaEff * tem;
            $("#cal-number").append("光伏阵列最大安装容量Pm=<span class='inline-block text-center' style='width:80px;'>"+Pm+"</span>W/㎡")
            sessionStorage.setItem("Pm",Pm)
        })
    })
    $("#next-seven").click(function() {
        location.href = "./pageeight.html"
    })
})