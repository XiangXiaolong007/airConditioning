var monthArray = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] //各月天数
$(function () {
    //获取Ql   Hm HtAssemble 
    var Ql = sessionStorage.getItem("Ql")
    var Hm = sessionStorage.getItem("Hm")
    var HtAssemble = JSON.parse(sessionStorage.getItem("HtAssemble"));
    var monthbeginVal = +sessionStorage.getItem("monthbeginVal");
    var monthEndVal = +sessionStorage.getItem("monthEndVal");
    var QcAssemble = JSON.parse(sessionStorage.getItem("QcAssemble"))
    //获取经纬度及地区
    var province = sessionStorage.getItem("province");
    var longitude = sessionStorage.getItem("longitude");
    var latitude = sessionStorage.getItem("latitude");
    var city = sessionStorage.getItem("city");
    var status = false;
    if (province && city) {
        $(".location").append("<span>" + province + "</span><span style='margin-left:20px;'>" + city + "</span>");
        $(".coordinate").append("<span>经度" + longitude + "°</span><span style='margin-left:20px;'>纬度" + latitude + "°</span>");
    }
    var effNote = $("#eff-note")
    $("#eff-loop-one").focus(function () {
        noteBlock(effNote)
    }).blur(function () {
        noteNone(effNote)
    })
    $("#eff-loop-two").focus(function () {
        noteBlock(effNote)
    }).blur(function () {
        noteNone(effNote)
    })
    $("#power-budget-btn").click(function(){
        $("#power-budget").empty();
        var eff1 = +$("#eff-loop-one").val();
        sessionStorage.setItem("eff1",eff1)
        var eff2 = +$("#eff-loop-two").val();
        sessionStorage.setItem("eff2",eff2)
        var Imin = Ql / (Hm * eff1 * eff2);
        var arrHt = [];
        var days = $("#days").val();
        var lossAssemble = {};//各月发电盈亏量
        var QgAssemble = {};
        for(var i = monthbeginVal;i <= monthEndVal;i++) {
            arrHt.push(HtAssemble["Ht" + i])
        }
        var HtMin = Math.min.apply(null,arrHt);
        var Imax = Ql / (HtMin * eff1 * eff2);
        var tmparr = getElectricity(Imin,Imax,QcAssemble,HtAssemble,days,monthbeginVal,monthEndVal,eff1,eff2,Ql,QgAssemble,lossAssemble)
        var electricity = tmparr[0];
        var min = Math.abs(tmparr[1].toFixed(2))
        var QgTable = "<div class='Qg'><table class='table table-bordered'><caption class='text-center'>方阵各月发电量Qg(A·h/㎡)</caption><thead><tr id='month'><th style='width:250px'>月份</th></tr></thead><tbody><tr id='QgVal'><td style='width:250px'>方阵各月发电量Qg</td></tr></tbody></table></div>";
        var QTable = "<div class='ΔQ'><table class='table table-bordered'><caption class='text-center'>方阵各月发电盈亏量ΔQ(A·h/㎡)</caption><thead><tr id='month-Q'><th style='width:250px'>月份</th></tr></thead><tbody><tr id='loss-table'><td style='width:250px'>方阵各月发电盈亏量ΔQ</td></tr></tbody></table></div><p class='distance-top' style='font-weight:700'>累计亏欠量Σ|-ΔQi|=<span class='inline-block'>"+min+"</span>(A·h/㎡)</p><p>说明：当出现1个月份ΔQ &lt; 0，则累计亏欠量为该月亏欠量；当出现2个及以上连续亏欠月份，则累计亏欠量为该连续月份亏欠量之和；当出现2个及以上不连续亏欠期，则累计亏欠量为不连续亏欠期中各亏欠期亏欠量之和最大的值，其中亏欠期的计算原则为：若两个不连续亏欠期之间的ΔQi为正的月份的盈余量之和大于前一个亏欠期亏欠量，则两个亏欠期分开计算；若两个不连续亏欠期之间的ΔQi为正的月份的盈余量之和小于前一个亏欠期亏欠量，则两个亏欠期合并为一个亏欠期，其亏欠量应扣除盈余量部分；</p>";

        $("#power-budget").append("<p class='distance-top' style='font-weight:700'>方阵输出的最小电流Imin=<span class='inline-block'>"+Imin.toFixed(2)+"</span>A/㎡</p><p class='distance-top' style='font-weight:700'>方阵输出的最大电流Imax=<span class='inline-block'>"+Imax.toFixed(2)+"</span>A/㎡</p><p class='distance-top' style='font-weight:700'>方阵输出的实际电流I=<span class='inline-block'>"+electricity.toFixed(2)+"</span>A/㎡</p>"+QgTable+QTable)
        var monthTable = $("#month")
        var QgValTable = $("#QgVal")
        var monthQTable = $("#month-Q");
        var lossTable = $("#loss-table")
        for(var i = monthbeginVal;i <= monthEndVal;i++){
            monthTable.append("<th>"+i+"月</th>")
            monthQTable.append("<th>"+i+"月</th>")
            QgValTable.append("<td>"+QgAssemble["Qg" + i].toFixed(2)+"</td>")
            lossTable.append("<td>"+lossAssemble["loss" + i].toFixed(2)+"</td>")
        }
        status = true;
        sessionStorage.setItem("electricity",electricity)
    })
    $("#next-four").click(function(){
        if(status){
            location.href = "./pagefive.html"
        }else {
            alert("请完成计算！")
        }   
    })
})

function noteNone(name) {
    name.css("display", "none");
}

function noteBlock(name) {
    name.css("display", "block");
}

function Sum(arr) {
    var sum = 0;
    arr.forEach(function (item) {
        sum += item;
    });
    return sum;
};
