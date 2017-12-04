$(function () {
    //获取经纬度及地区
    var province = sessionStorage.getItem("province");
    var longitude = sessionStorage.getItem("longitude");
    var latitude = sessionStorage.getItem("latitude");
    var city = sessionStorage.getItem("city");
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
    

})

function noteNone(name) {
    name.css("display", "none");
}

function noteBlock(name) {
    name.css("display", "block");
}