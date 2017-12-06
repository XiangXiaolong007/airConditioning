$(function(){
    //获取经纬度及地区
    var province = sessionStorage.getItem("province");
    var longitude = sessionStorage.getItem("longitude");
    var latitude = sessionStorage.getItem("latitude");
    var city = sessionStorage.getItem("city");
    var bestDip = sessionStorage.getItem("bestDip")
    var paraStatus;
    var parallellean = $(".parallellean");
    var parallelparallel = $(".parallelparallel");
    var paralleltile = $(".paralleltile")
    if (province && city) {
        $(".location").append("<span>" + province + "</span><span style='margin-left:20px;'>" + city + "</span>");
        $(".coordinate").append("<span>经度" + longitude + "°</span><span style='margin-left:20px;'>纬度" + latitude + "°</span>");
    }
    parallellean.click(function() {
        $("#largest-capacity").empty()
        paraStatus = 0;
        sessionStorage.setItem("roofType","平屋面倾斜支架安装")
        paralleltile.css("border","none")
        parallelparallel.css("border","none")
        parallellean.css("border","1px dashed #ccc");

        $("#largest-capacity").append("<h4>2.光伏阵列最大安装容量计算</h4><p>①请输入光伏组件参数</p><form class='form-inline distance-top'><div class='form-group'><label for='sunHeight'>太阳能电池组件高度L = </label><input type='number' class='form-control' id='sunHeight'>m</div></form><form class='form-inline distance-top'><div class='form-group'><label for='sunWidth'>太阳能电池组件宽度W = </label><input type='number' class='form-control' id='sunWidth'>m</div></form><form class='form-inline distance-top'><div class='form-group'><label for='sunPower'>单片光伏组件功率Wp = </label><input type='number' class='form-control' id='sunPower'>W</div></form><form class='form-inline distance-top'><div class='form-group'><label for='usefulArea'>②请输入光伏组件有效面积系数ρ = </label><input type='number' class='form-control' id='usefulArea' value='0.9' disabled></div></form><h5>ρ为光伏组件有效面积系数，是考虑屋面检修疏散通道占用屋面面积，且屋面不能安全安装光伏组件时的系数</h5><h5>考虑平屋面倾斜支架安装光伏阵列前后间距可作为检修疏散通道，因此ρ取0.9；</h5><button class='btn btn-calculate' id='btn-Pm'>开始计算</button><div id='cal-number'></div>")
        $("#btn-Pm").click(function(){
            $("#cal-number").empty()
            var height = +$("#sunHeight").val();
            var width = +$("#sunWidth").val()
            var Spv = height * width * Math.cos(Math.PI / 180 * bestDip);
            var Wp = +$("#sunPower").val();
            var areaEff = +$("#usefulArea").val()
            var space = (height * Math.cos(Math.PI / 180 * bestDip)) + (height * Math.sin(Math.PI / 180 * bestDip) * (((0.707 * Math.tan(Math.PI / 180 * latitude)) + 0.4338) / (0.707 - (0.4338 * Math.tan(Math.PI / 180 * latitude)))))
            var spaceEff = (2 * height * Math.cos(Math.PI / 180 * bestDip)) / ((height * Math.cos(Math.PI / 180 * bestDip)) + space);
            var Pm = (Wp / Spv) * spaceEff * areaEff;
            $("#cal-number").append("<p class='distance-top' style='font-weight:700'>光伏阵列前后排间距D=<span class='inline-block text-center' style='width:80px;'>"+ space.toFixed(2) +"</span>m</p><p class='distance-top' style='font-weight:700'>屋面光伏组件间距系数γ=<span class='inline-block text-center' style='width:80px;'>"+ spaceEff.toFixed(2) +"</span></p><h5>系数γ是考虑方阵前后排间距的屋面面积无法使用</h5><p class='distance-top' style='font-weight:700'>光伏阵列最大安装容量Pm=<span class='inline-block text-center' style='width:80px;'>"+ Pm.toFixed(2) +"</span>W/㎡</p>")
            sessionStorage.setItem("Pm",Pm)
        })

    })
    parallelparallel.click(function (){
        $("#largest-capacity").empty()
        paraStatus = 1;
        sessionStorage.setItem("roofType","平屋面平行架空安装")
        parallellean.css("border","none")
        paralleltile.css("border","none")
        parallelparallel.css("border","1px dashed #ccc")

        $("#largest-capacity").append("<h4>2.光伏阵列最大安装容量计算</h4><p>①请输入光伏组件参数</p><form class='form-inline distance-top'><div class='form-group'><label for='sunHeight'>太阳能电池组件高度L = </label><input type='number' class='form-control' id='sunHeight'>m</div></form><form class='form-inline distance-top'><div class='form-group'><label for='sunWidth'>太阳能电池组件宽度W = </label><input type='number' class='form-control' id='sunWidth'>m</div></form><form class='form-inline distance-top'><div class='form-group'><label for='sunPower'>单片光伏组件功率Wp = </label><input type='number' class='form-control' id='sunPower'>W</div></form><form class='form-inline distance-top'><div class='form-group'><label for='usefulArea'>②请输入光伏组件有效面积系数ρ = </label><input type='number' class='form-control' id='usefulArea' value='0.9' disabled></div></form><h5>ρ为光伏组件有效面积系数，是考虑屋面检修疏散通道占用屋面面积，且屋面不能安全安装光伏组件时的系数</h5><h5>考虑平屋面平行架空安装检修疏散通道可在架空层完成，因此ρ取0.9；</h5><button class='btn btn-calculate' id='btn-Pm'>开始计算</button><div id='cal-number'></div>")
        $("#btn-Pm").click(function(){
            $("#cal-number").empty()
            var height = +$("#sunHeight").val();
            var width = +$("#sunWidth").val()
            var Spv = height * width * Math.cos(Math.PI / 180 * bestDip);
            var Wp = +$("#sunPower").val();
            var areaEff = +$("#usefulArea").val()
            var Pm = (Wp / Spv) * areaEff
            $("#cal-number").append("<p class='distance-top' style='font-weight:700'>光伏阵列最大安装容量Pm=<span class='inline-block text-center' style='width:80px;'>"+ Pm.toFixed(2) +"</span>W/㎡</p>")
            sessionStorage.setItem("Pm",Pm)
        })
    })
    paralleltile.click(function(){
        $("#largest-capacity").empty()
        paraStatus = 2;
        sessionStorage.setItem("roofType","平屋面平铺安装")
        parallelparallel.css("border","none")
        parallellean.css("border","none")
        paralleltile.css("border","1px dashed #ccc")

        $("#largest-capacity").append("<h4>2.光伏阵列最大安装容量计算</h4><p>①请输入光伏组件参数</p><form class='form-inline distance-top'><div class='form-group'><label for='sunHeight'>太阳能电池组件高度L = </label><input type='number' class='form-control' id='sunHeight'>m</div></form><form class='form-inline distance-top'><div class='form-group'><label for='sunWidth'>太阳能电池组件宽度W = </label><input type='number' class='form-control' id='sunWidth'>m</div></form><form class='form-inline distance-top'><div class='form-group'><label for='sunPower'>单片光伏组件功率Wp = </label><input type='number' class='form-control' id='sunPower'>W</div></form><form class='form-inline distance-top'><div class='form-group'><label for='usefulArea'>②请输入光伏组件有效面积系数ρ = </label><input type='number' class='form-control' id='usefulArea' value='0.8' disabled></div></form><h5>ρ为光伏组件有效面积系数，是考虑屋面检修疏散通道占用屋面面积，且屋面不能安全安装光伏组件时的系数</h5><h5>考虑平屋面平铺安装需设置检修疏散通道，因此ρ取0.8；</h5><button class='btn btn-calculate' id='btn-Pm'>开始计算</button><div id='cal-number'></div>")

        $("#btn-Pm").click(function(){
            $("#cal-number").empty()
            var height = +$("#sunHeight").val();
            var width = +$("#sunWidth").val()
            var Spv = height * width;
            var Wp = +$("#sunPower").val();
            var areaEff = +$("#usefulArea").val()
            var Pm = (Wp / Spv) * areaEff
            $("#cal-number").append("<p class='distance-top' style='font-weight:700'>光伏阵列最大安装容量Pm=<span class='inline-block text-center' style='width:80px;'>"+ Pm.toFixed(2) +"</span>W/㎡</p>")
            sessionStorage.setItem("Pm",Pm)
        })
    })
    $("#next-six").click(function() {
        location.href = "./pageeight.html"
    })
})