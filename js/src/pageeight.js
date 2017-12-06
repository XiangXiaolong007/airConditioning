$(function() {
    //获取经纬度及地区
    var province = sessionStorage.getItem("province");
    var longitude = sessionStorage.getItem("longitude");
    var latitude = sessionStorage.getItem("latitude");
    var city = sessionStorage.getItem("city");
    var bestDip = sessionStorage.getItem("bestDip")
    var roofType = sessionStorage.getItem("roofType")
    var typeRoof = sessionStorage.getItem("typeRoof");
    var calStatus = sessionStorage.getItem("calStatus");
    var days = sessionStorage.getItem("days");
    var zVal = sessionStorage.getItem("zVal");
    var COP = sessionStorage.getItem("COP")
    var bestDip = sessionStorage.getItem("bestDip");
    var Bn = +sessionStorage.getItem("Bn");
    var Pn = +sessionStorage.getItem("Pn");
    var Pm = +sessionStorage.getItem("Pm");
    if (province && city) {
        $(".location").append("<span>" + province + "</span><span style='margin-left:20px;'>" + city + "</span>");
        $(".coordinate").append("<span>经度" + longitude + "°</span><span style='margin-left:20px;'>纬度" + latitude + "°</span>");
    }
    $("#roof-status").append("<p class='distance-top'><strong>建筑层数：</strong><span class='inline-block'>"+zVal+"</span>层</p><p><strong>屋面形式：</strong><span class='inline-block' style='width:200px;'>"+typeRoof+"</span></p><p><strong>制冷机组COP=</strong><span class='inline-block' style='width:200px;'>"+COP+"</span></p><p><strong>蓄电池维持天数n=</strong><span class='inline-block' style='width:200px;'>"+days+"</span></p><p><strong>光伏方阵安装方式：</strong><span class='inline-block' style='width:200px;'>"+roofType+"</span></p><p><strong>光伏方阵倾角β=</strong><span class='inline-block' style='width:200px;'>"+bestDip+"°</span></p>")
    if(calStatus == 0){
        var qVal = sessionStorage.getItem("qVal")
        $("#check-status").append("<p><strong>冷指标q=</strong><span class='inline-block'>"+qVal+"</span>W/㎡时：</p><p><strong>单位面积蓄电池容量Bn=</strong><span class='inline-block text-center' style='width:80px'>"+ Bn.toFixed(2) +"</span>A·h/㎡；</p><p><strong>单位面积光伏方阵容量Pn=</strong><span class='inline-block text-center' style='width:80px'>"+ Pn.toFixed(2) +"</span>W/㎡；</p><p><strong>单位面积光伏阵列最大安装容量Pm=</strong><span class='inline-block text-center' style='width:80px'>"+ Pm.toFixed(2) +"</span>W/㎡；</p>")
    }else {
        $("#check-status").append("<p><strong>单位面积蓄电池容量Bn=</strong><span class='inline-block text-center' style='width:80px'>"+ Bn.toFixed(2) +"</span>A·h/㎡；</p><p><strong>单位面积光伏方阵容量Pn=</strong><span class='inline-block text-center' style='width:80px'>"+ Pn.toFixed(2) +"</span>W/㎡；</p><p><strong>单位面积光伏阵列最大安装容量Pm=</strong><span class='inline-block text-center' style='width:80px'>"+ Pm.toFixed(2) +"</span>W/㎡；</p>")
    }
    if(Pm>=Pn){
        $(".alert-success").css("display","block");
        $(".alert-danger").css("display","none")
    }else {
        $(".alert-danger").css("display","block");
        $(".alert-success").css("display","none")
    }

    for(var i = 50;i<=200;i += 10) {
        console.log(i)
        
    }


    var oMyChart = echarts.init(document.getElementById("PV-content"));
    var option = {
        backgroundColor: "#FBFBFB",
        tooltip: {
            trigger: "axis"
        },
        legend: {
            data: ["单位面积光伏方阵容量"]
        },

        calculable: true,

        xAxis: [
            {
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
                nameLocation:"middle",
                nameGap:30,
                boundaryGap: false,
                data: (function() {
                    var list = [];
                    for (var i = 50; i <= 200; i = i + 10) {
                        list.push(i);
                    }
                    return list;
                })()
            }
        ],
        yAxis: [
            {
                type: "value",
                name: "Pn(W/㎡)",
                axisLine: {
                    lineStyle: {
                        color: "#999999"
                    }
                }
            }
        ],
        series: [
            {
                name: "单位面积光伏方阵容量",
                type: "line",
                smooth: 0.2,
                color: ["#66AEDE"],
                data: [
                    800,
                    300,
                    500,
                    800,
                    300,
                    600,
                    500,
                    600,
                    100,
                    900,
                    300,
                    600,
                    500,
                    600,
                    100,
                    900
                ]
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

        xAxis: [
            {
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
                nameLocation:"middle",
                nameGap:30,
                type: "category",
                boundaryGap: false,
                data: (function() {
                    var list = [];
                    for (var i = 50; i <= 200; i = i + 10) {
                        list.push(i);
                    }
                    return list;
                })()
            }
        ],
        yAxis: [
            {
                type: "value",
                name: "Bn(W/㎡)",
                axisLine: {
                    lineStyle: {
                        color: "#999999"
                    }
                }
            }
        ],
        series: [
            {
                name: "单位面积蓄电池容量",
                type: "line",
                smooth: 0.2,
                color: ["#90EC7D"],
                data: [
                    800,
                    300,
                    500,
                    800,
                    300,
                    600,
                    500,
                    600,
                    100,
                    900,
                    300,
                    600,
                    500,
                    600,
                    100,
                    900
                ]
            }
        ]
    };
    xMyChart.setOption(xoption);
});
