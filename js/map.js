
var map = new AMap.Map('mainMap', {
    resizeEnable: true,
    zoom: 16
});
var polygons = [];
function drawBounds() {
    //实例化DistrictSearch
    var opts = {
        subdistrict: 0,   //获取边界不需要返回下级行政区
        extensions: 'all',  //返回行政区边界坐标组等具体信息
        level: 'district'  //查询行政级别为 市
    };
    district = new AMap.DistrictSearch(opts);

    //行政区查询
    district.setLevel('district')
    district.search('秦淮区', function (status, result) {
        map.remove(polygons)//清除上次结果
        polygons = [];
        var bounds = result.districtList[0].boundaries;
        if (bounds) {
            for (var i = 0, l = bounds.length; i < l; i++) {
                //生成行政区划polygon
                var polygon = new AMap.Polygon({
                    strokeWeight: 1,
                    path: bounds[i],
                    fillOpacity: 0,
                    strokeColor: "#D13D61", //线颜色
                    strokeOpacity: 1, //线透明度
                    strokeWeight: 2, //线宽
                    strokeStyle: "solid", //线样式

                });
                polygons.push(polygon);
            }
        }
        map.add(polygons)
        // map.setFitView(polygons);//视口自适应
    });
}
// 实例化点标记
function addMarker(a,b,c) {
    
    var marker1 = new AMap.Marker({
        icon: "./img/s.png",
        position: new AMap.LngLat(a[0],a[1]),   
        title: '起点'
    });
    var marker2 = new AMap.Marker({
        icon: "./img/c.png",
        position: new AMap.LngLat(b[0],b[1]),   
        title: '经点'
    });
    var marker3 = new AMap.Marker({
        icon: "./img/e.png",
        position: new AMap.LngLat(c[0],c[1]),  
        title: '终点'
    });
    var markerList=[marker1,marker2,marker3]
    // 将创建的点标记添加到已有的地图实例：
    map.add(markerList);
    // map.setZoomAndCenter(15, [resdata.bXY.split('#')[0], resdata.bXY.split('#')[1]]);
    map.setZoomAndCenter(15, [b[0],b[1]]);
  
}
drawBounds();


