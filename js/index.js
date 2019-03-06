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
$("body").undelegate();
$("body").delegate(".sbtn", "click", function () {
    if ($(this).hasClass('upfla')) {
        $(this).prev().slideUp()
        $(this).removeClass('upfla');
    } else {
        $(this).prev().slideDown()
        $(this).addClass('upfla');
    }
});

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
qRiverMain(5)
function qRiverMain(a) {
    $.ajax({
        url: 'http://hzz.cstor.cn:8967/hzzDemo/RiverManage/riverByRiverId',
        type: 'post',
        dataType: "json",
        data: {
            riverId: a,
        },
        success: function (res) {
            console.log(res[0])
            var riverData = res[0]
            // 一级河流信息
            $('#r_riverName').html(riverData.riverData)
            $('#r_origin').html(riverData.origin)
            $('#r_destination').html(riverData.destination)
            $('#r_hzName').html(riverData.userName)
            $('#r_duty').html(riverData.duty)
            $('#r_tel').html(riverData.tel)
            $('#r_loginTime').html(riverData.loginTime)
            $('#r_riverChief').html(riverData.riverChief)
            // 模板渲染
            var html = template('rt-jd-data', riverData);
            $('#rt-jd').html(html);
            // 地图标点
            var bXY = [riverData.bXY.split('#')[0], riverData.bXY.split('#')[1]]
            var mXY = [riverData.mXY.split('#')[0], riverData.mXY.split('#')[1]]
            var eXY = [riverData.eXY.split('#')[0], riverData.eXY.split('#')[1]]
            map.clearMap();
            
            if(bXY[0]){
                addMarker(bXY,mXY,eXY)
            }

        }
    })
}

$('#checkRiver').change(function () {
    var s_riverId = $(this).val()
    qRiverMain(s_riverId)
})


