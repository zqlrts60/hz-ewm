// 点击显示二维码
$('body *').click(function (e) {
    // 触发该事件的直接元素
    var type = e.target;
    // 点击其他地方，悬浮框失去焦点隐藏,3种情况
    // 1、点击的不是作者名称；2、点击的不是悬浮框；3、点击的直接元素不是悬浮框内某一个子元素
    if (type.className != "showf") {
        $('.ewmCut').hide();
    } else {
        $('.ewmCut').show();
    }
});


// 下拉/收起

$('.sbtn').click(function () {
    if ($(this).hasClass('upfla')) {
        $(this).prev().slideUp()
        $(this).removeClass('upfla');
    } else {
        $(this).prev().slideDown()
        $(this).addClass('upfla');
    }
})
// 获取下拉框列表
qSlvRiver()
function qSlvRiver() {
    $.ajax({
        url: 'http://hzz.cstor.cn:8967/hzz/myRiver',
        type: 'post',
        dataType: "json",
        data: {
            userId: 9
        },
        success: function (res) {
            var checkRiver_html = ''
            for (var i = 0; i < res.data.myRiverList.length; i++) {
                checkRiver_html += "<option  conId=" + res.data.myRiverList[i].connectRiverId + " value=" + res.data.myRiverList[i].riverId + ">" + res.data.myRiverList[i].riverName + "</option>"
            }
            $('#checkRiver').html(checkRiver_html)

        }
    })
}

// 获取河流详情
qRiverMain(2, 22)
function qRiverMain(a, b) {
    $.ajax({
        url: 'http://hzz.cstor.cn:8967/hzz/oneRiverMes',
        type: 'post',
        dataType: "json",
        data: {
            riverId: a,
            connectRiverId: b,
        },
        success: function (res) {
            console.log(res.data.grade1RiverMes[0])

            // $('#r_riverName').html(res.data.grade1RiverMes[0].riverName)
            // $('#r_origin').html(res.data.grade1RiverMes[0].origin)
            // $('#r_destination').html(res.data.grade1RiverMes[0].destination)
            // $('#r_hzName').html(res.data.grade1RiverMes[0].userName)

        }
    })
}

$('#checkRiver').change(function () {
    var s_riverId = $(this).val()
    var s_conId = $("#checkRiver").find("option:selected").attr("conId")
    qRiverMain(s_riverId, s_conId)
})


