$(function() {
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
