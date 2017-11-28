// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById("Qc-echart"));
var myChartTab = echarts.init(document.getElementById("Qc-echart-tab"));
// 指定图表的配置项和数据
var option = {
    title: {
        text: "ECharts 入门示例"
    },
    tooltip: {},
    legend: {
        data: ["销量"]
    },
    xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    },
    yAxis: {},
    series: [
        {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
myChartTab.setOption(option);

$(function() {
    //冷指标q
    var coolingIndex = $("#coolingIndex");
    var coolingIndexNote = $("#coolingIndex-note");
    coolingIndex
        .focus(function() {
            noteBlock(coolingIndexNote);
        })
        .blur(function() {
            noteNone(coolingIndexNote);
        });
    //系数k
    var coefficient = $("#coefficient");
    var coefficientNote = $("#coefficient-note");
    coefficient
        .focus(function() {
            noteBlock(coefficientNote);
        })
        .blur(function() {
            noteNone(coefficientNote);
        });
    //日空调开启时长
    var hour = $("#hour");
    var hourNote = $("#hour-note");
    hour
        .focus(function() {
            noteBlock(hourNote);
        })
        .blur(function() {
            noteNone(hourNote);
        });
    //系数ki
    var monthBegin = $("#month-begin");
    var monthEnd = $("#month-end");
    var coolingMNote = $("#cooling-m-note");
    $("#confirm").click(function(){
        if(!monthBegin.val()||!monthEnd.val()){
            alert("请输入起止月份！");
            return false
        }else if(monthBegin.val()){

        }
    })
});
function noteNone(name) {
    name.css("display", "none");
}
function noteBlock(name) {
    name.css("display", "block");
}
