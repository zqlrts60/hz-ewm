
document.documentElement.style.fontSize = document.documentElement.clientWidth / 75 + 'px';
$(window).resize(function () {
    var ob=document.documentElement.clientWidth / 75
    if(ob<=10){
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 75 + 'px';
    }else{
        document.documentElement.style.fontSize='10px'
    }
});

