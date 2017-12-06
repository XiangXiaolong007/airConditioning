//定义全局变量
let q = $("#coolingIndex"); //冷指标
let k = $("#coefficient"); //系数k
let h = $("#hour"); //空调开启时长
let Nmax = $("#Nmax"); //冷负荷最大月天数
let z = $("#floor"); //建筑层数
let monthBeginTab = $("#month-begin-tab");
let monthBegin = $("#month-begin"); //起始月份
let monthEndTab = $("#month-end-tab");
let monthEnd = $("#month-end"); //结束月份
let monthbeginVal, monthEndVal; //用于保存起止月份的数值
let COP = $("#COP"); //制冷机组COP
let scale = $("#scale"); //制冷机能耗比例ζ
let QAssemble = {}; //各月冷负荷集合

$(function () {
    var calStatus;
    //获取经纬度及地区
    let province = sessionStorage.getItem("province");
    let longitude = sessionStorage.getItem("longitude");
    let latitude = sessionStorage.getItem("latitude");
    let city = sessionStorage.getItem("city");
    if (province && city) {
        $(".location").append("<span>" + province + "</span><span style='margin-left:20px;'>" + city + "</span>");
        $(".coordinate").append("<span>经度" + longitude + "°</span><span style='margin-left:20px;'>纬度" + latitude + "°</span>");
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
        let kiNote = $("#cooling-m-note");

        if (!monthBegin.val() || !monthEnd.val()) {
            alert("请输入起止月份！");
            return false;
        } else if (!testReg.test(monthbeginVal) || !testReg.test(monthEndVal)) {
            alert("月份只能是1-12的数字！");
            return false;
        } else if (Number(monthEndVal) <= Number(monthbeginVal)) {
            alert("结束月份必须大于起始月份！");
            return false;
        } else {
            let eachK = $("#each-k");
            eachK.empty();
            eachK.append("<p>请输入各月系数ki：</p>");
            for (var i = +monthbeginVal; i <= +monthEndVal; i++) {
                eachK.append(
                    "<div class='form-group' style='margin-right:20px;'><label for='k" +
                    i +
                    "'>" +
                    i +
                    "月</label><input type='text' class='form-control' placeholder='' id='k" +
                    i +
                    "' style='margin-left:0;width:80px;'></div>"
                );
                $("#k" + i)
                    .focus(function () {
                        noteBlock(kiNote);
                    })
                    .blur(function () {
                        noteNone(kiNote);
                    });
            }
            $("#elseCooling").css("display", "block");
            return false;
        }
    });
    $("#elseCooling").click(function () {
        let qVal = q.val();
        sessionStorage.setItem("qVal",qVal)
        let kVal = k.val();
        let hVal = h.val();
        let NmaxVal = Nmax.val();
        let zVal = z.val();
        sessionStorage.setItem("zVal",zVal)
        let Qmax = qVal * hVal * zVal * kVal * NmaxVal;
        let kAssemble = {}; //各月系数集合;
        $(".month-cooling").empty();
        for (var i = +monthbeginVal; i <= +monthEndVal; i++) {
            kAssemble["k" + i] = $("#k" + i).val();
            QAssemble["Q" + i] = (Qmax * kAssemble["k" + i]).toFixed(2);
            $(".month-cooling").append(
                "<span>" +
                i +
                "月</span><span class='Qdata'>" +
                QAssemble["Q" + i] +
                "</span>"
            );
        }
    });
    //制冷机组COP
    let COPNote = $("#COP-note");
    COP.focus(function () {
        noteBlock(COPNote);
    }).blur(function () {
        noteNone(COPNote);
    });
    //制冷机能耗比例ζ
    let scaleNote = $("#scale-note");
    scale
        .focus(function () {
            noteBlock(scaleNote);
        })
        .blur(function () {
            noteNone(scaleNote);
        });
    //空调系统耗电量Qc
    $("#everyQc").click(function () {
        $("#Qc-echart").css("display", "block");
        $("#Ql").empty();
        calStatus = 0;
        sessionStorage.setItem("COP",COP.val())
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById("Qc-echart"));
        // 指定图表的配置项和数据
        var option = {
            color: ["#3398DB"],
            title: {
                text: "单位建筑基底面积空调系统耗电量Qc(A·h/㎡)"
            },
            tooltip: {},
            legend: {},
            xAxis: {
                data: [],
                name: "月份",
                nameLocation: "center",
                nameGap: 30,
                nameTextStyle: {
                    fontWeight: 700,
                    fontSize: 16
                }
            },
            yAxis: {
                name: "耗电量Qc(A·h/㎡)",
                nameGap: 30,
                nameLocation: "center",
                nameTextStyle: {
                    fontWeight: 700,
                    fontSize: 16
                }
            },
            series: [{
                name: "耗电量Qc",
                type: "bar",
                data: []
            }]
        };
        let QcAssemble = {}; //各月耗电量集合
        let monthArray = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //各月天数
        let monthSum = 0; //计算月份的天数和
        let QcSum = 0; //计算耗电量和
        for (var i = +monthbeginVal; i <= +monthEndVal; i++) {
            QcAssemble["Qc" + i] = (
                QAssemble["Q" + i] /
                (380 * COP.val() * scale.val())
            ).toFixed(2);
            option.xAxis.data.push(i + "月");
            option.series[0].data.push(QcAssemble["Qc" + i]);
            monthSum += monthArray[i];
            QcSum += +QcAssemble["Qc" + i];
            console.log(QcAssemble["Qc" + i] + "A·h/㎡");
        }
        sessionStorage.setItem("QcAssemble",JSON.stringify(QcAssemble))
        let Ql = (QcSum / monthSum).toFixed(2);
        // console.log(Ql);
        $("#Ql").append(
            "<span style='margin-bottom: 5px;font-weight: 700;'>单位建筑基底面积空调系统年日均耗电量QL:QL = </span><span style='display:inline-block;width:50px;'>" +
            Ql +
            "</span>(A·h/d/㎡)"
        );
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        if (isNaN(Ql)) {
            alert("请输入正确的参数值!")
        }
        sessionStorage.setItem("Ql",Ql)
    });
    //tab切换
    //输入冷负荷
    $("#confirm-tab").click(function () {
        monthbeginVal = monthBeginTab.val();
        monthEndVal = monthEndTab.val();
        if (!monthBeginTab.val() || !monthEndTab.val()) {
            alert("请输入起止月份！");
            return false;
        } else if (!testReg.test(monthbeginVal) || !testReg.test(monthEndVal)) {
            alert("月份只能是1-12的数字！");
            return false;
        } else if (+monthEndVal <= +monthbeginVal) {
            alert("结束月份必须大于起始月份！");
            return false;
        } else {
            let eachQc = $("#Q-tab");
            eachQc.empty();
            for (var i = +monthbeginVal; i <= +monthEndVal; i++) {
                eachQc.append(
                    "<div class='form-group' style='margin-right:20px'><label for='Q" +
                    i +
                    "-tab'>" +
                    i +
                    "月</label><input type='text' class='form-control' placeholder='' id='Q" +
                    i +
                    "-tab' style='margin-left:0;width:80px;'></div>"
                );
            }
            return false;
        }
    });
    //制冷机组COP
    let COPTabNote = $("#COP-tab-note");
    $("#COP-tab")
        .focus(function () {
            noteBlock(COPTabNote);
        })
        .blur(function () {
            noteNone(COPTabNote);
        });
    //制冷机能耗比例ζ
    let scaleTabNote = $("#scale-tab-note");
    $("#scale-tab")
        .focus(function () {
            noteBlock(scaleTabNote);
        })
        .blur(function () {
            noteNone(scaleTabNote);
        });
    //空调系统耗电量Qc
    $("#everyQc-tab").click(function () {
        $("#Qc-echart-tab").css("display", "block");
        $("#Ql-tab").empty();
        calStatus = 1;
        sessionStorage.setItem("COP",COP.val())
        sessionStorage.setItem("zVal",$("#floor-tab").val())
        // 基于准备好的dom，初始化echarts实例
        var myChartTab = echarts.init(document.getElementById("Qc-echart-tab"));
        // 指定图表的配置项和数据
        var option = {
            color: ["#3398DB"],
            title: {
                text: "单位建筑基底面积空调系统耗电量Qc(A·h/㎡)"
            },
            tooltip: {},
            legend: {},
            xAxis: {
                data: [],
                name: "月份",
                nameLocation: "center",
                nameGap: 30,
                nameTextStyle: {
                    fontWeight: 700,
                    fontSize: 16
                }
            },
            yAxis: {
                name: "耗电量Qc(A·h/㎡)",
                nameGap: 30,
                nameLocation: "center",
                nameTextStyle: {
                    fontWeight: 700,
                    fontSize: 16
                }
            },
            series: [{
                name: "耗电量Qc",
                type: "bar",
                data: []
            }]
        };
        let QcAssemble = {}; //各月耗电量集合
        let monthArray = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //各月天数
        let monthSum = 0; //计算月份的天数和
        let QcSum = 0; //计算耗电量和
        let QAssemble = {}; //各月冷负荷集合
        let COPTab = $("#COP-tab");
        let scaleTab = $("#scale-tab");
        for (var i = +monthbeginVal; i <= +monthEndVal; i++) {
            QAssemble["Q" + i] = $("#Q" + i + "-tab").val();
            QcAssemble["Qc" + i] = (
                QAssemble["Q" + i] /
                (380 * COPTab.val() * scaleTab.val())
            ).toFixed(2);
            option.xAxis.data.push(i + "月");
            option.series[0].data.push(QcAssemble["Qc" + i]);
            monthSum += monthArray[i];
            QcSum += +QcAssemble["Qc" + i];
            console.log(QcAssemble["Qc" + i] + "A·h/㎡");
        }
        sessionStorage.setItem("QcAssemble",JSON.stringify(QcAssemble))
        let Ql = (QcSum / monthSum).toFixed(2);
        console.log(Ql);
        $("#Ql-tab").append(
            "<span style='margin-bottom: 5px;font-weight: 700;'>单位建筑基底面积空调系统年日均耗电量QL:QL = </span><span style='display:inline-block;width:50px;'>" +
            Ql +
            "</span>(A·h/d/㎡)"
        );
        // 使用刚指定的配置项和数据显示图表。
        myChartTab.setOption(option);
        if (isNaN(Ql)) {
            alert("请输入正确的参数值!")
        }
        sessionStorage.setItem("Ql",Ql)
    });
    //查看所选位置的相关信息
    $("#next-two").on("click", function () {
        sessionStorage.setItem("monthbeginVal", monthbeginVal)
        sessionStorage.setItem("monthEndVal", monthEndVal);
        sessionStorage.setItem("calStatus",calStatus)
        // alert(monthbeginVal)
        location.href = "./pagethree.html";
    });
});

function noteNone(name) {
    name.css("display", "none");
}

function noteBlock(name) {
    name.css("display", "block");
}