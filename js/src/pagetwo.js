//定义全局变量
let q = $("#coolingIndex"); //冷指标
let k = $("#coefficient"); //系数k
let h = $("#hour"); //空调开启时长
let Nmax = $("#Nmax"); //冷负荷最大月天数
let z = $("#floor"); //建筑层数
let monthBegin = $("#month-begin"); //起始月份
let monthEnd = $("#month-end"); //结束月份
let monthbeginVal,monthEndVal;//用于保存起止月份的数值

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
    series: [{
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20]
    }]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
myChartTab.setOption(option);

$(function () {
    //获取经纬度及地区
    let province = sessionStorage.getItem("province");
    let longitude = sessionStorage.getItem("longitude");
    let latitude = sessionStorage.getItem("latitude");
    let city = sessionStorage.getItem("city");
    if (province && city) {
        $(".location").append("<span>" + province + "</span><span style='margin-left:20px;'>" + city + "</span>")
        $(".coordinate").append("<span>经度" + longitude + "°</span><span style='margin-left:20px;'>纬度" + latitude + "°</span>")
    }
    //冷指标q
    var coolingIndexNote = $("#coolingIndex-note");
    q
        .focus(function () {
            noteBlock(coolingIndexNote);
        })
        .blur(function () {
            noteNone(coolingIndexNote);
        });
    //系数k
    var coefficientNote = $("#coefficient-note");
    k
        .focus(function () {
            noteBlock(coefficientNote);
        })
        .blur(function () {
            noteNone(coefficientNote);
        });
    //日空调开启时长
    var hourNote = $("#hour-note");
    h
        .focus(function () {
            noteBlock(hourNote);
        })
        .blur(function () {
            noteNone(hourNote);
        });
    //系数ki
    var testReg = /^(1[0-2]|[1-9])$/;
    var coolingMNote = $("#cooling-m-note");
    $("#confirm").click(function () {
        monthbeginVal = monthBegin.val();
        monthEndVal = monthEnd.val();
        if (!monthBegin.val() || !monthEnd.val()) {
            alert("请输入起止月份！");
            return false
        } else if (!testReg.test(monthbeginVal) || !testReg.test(monthEndVal)) {
            alert("月份只能是1-12的数字！");
            return false
        } else if (Number(monthEndVal) <= Number(monthbeginVal)) {
            alert("结束月份必须大于起始月份！");
            return false
        } else {
            let eachK = $("#each-k");
            eachK.empty();
            eachK.append("<p>请输入各月系数：</p>")
            for (var i = parseInt(monthbeginVal); i <= parseInt(monthEndVal); i++) {
                eachK.append("<div class='form-group'><label for='k" + i + "'>" + i + "月</label><input type='text' class='form-control' placeholder='' id='k" + i + "' style='margin-left:0;width:60px;'></div>")
            };
            $("#elseCooling").css("display","block")
            return false
        }
    })
});

function noteNone(name) {
    name.css("display", "none");
}

function noteBlock(name) {
    name.css("display", "block");
}

function calCooling(){
    console.log(monthbeginVal)
}