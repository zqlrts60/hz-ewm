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