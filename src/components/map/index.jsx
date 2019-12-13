import React, { Component } from 'react'
import echarts from 'echarts'
import bmap from '../../../node_modules/echarts/extension/bmap/bmap'
// import { baiduMap } from './complexCustomOverla
// import BMap from 'bmap'
import $ from 'jquery'

import table1 from './json/table.json'

import './map.css'
import geoJson from './china.json'

export default class Map extends Component {
  render () {
    return (
      <div className='col-md-9' id='map'></div>
    )
  }
  componentDidMount () {



    const { BMap } = window

    baiduMap(BMap);

    //画地图的option
    let midMapOption = {
      backgroundColor: 'transparent',
      title: {
        text: '全国大学城市分布',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      bmap: {
        center: [104.114129, 37.550339],
        zoom: 5,
        roam: true,
      },
      visualMap: {
        min: 0,
        max: 10,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],           // 文本，默认为数值文本
        calculable: true
      },
      series: [{
        name: 'mapSer',
        type: 'map',
        // map:
        roam: false,
        geoIndex: 0,
        label: {
          show: true,
        },
        data: [
          { name: '北京', value: 1 },
          { name: '天津', value: 2 },
          { name: '上海', value: 3 },
          { name: '广东', value: 4 },
          { name: '台湾', value: 5 },
          { name: '香港', value: 6 },
          { name: '澳门', value: 7 }
        ]
      }]
    };
    var midMap = echarts.init(document.getElementById('map'));
    midMap.setOption(midMapOption);


    //获取map实例   并设置地图样式
    let map = midMap.getModel().getComponent('bmap').getBMap();
    map.enableMapClick = false;
    map.setMapStyleV2({
      styleId: '8497ad4f7da6e5683f4f5c8e6a9c107d'
    });

    //绘制地图颜色
    let provList = [["黑龙江", "#F09ABD"], ["吉林", "#01933F"], ["辽宁", "#FAC300"], ["内蒙古", "#FCF502"], ["河北", "#F09ABD"], ["北京", "#FCF502"], ["天津", "#01933F"], ["山东", "#FCF502"], ["江苏", "#D8EDDA"], ["上海", "#B9B4C8"], ["浙江", "#FCF502"], ["福建", "#FAC300"], ["台湾", "#F09ABD"], ["广东", "#FCF502"], ["香港", "#F09ABD"], ["澳门", "#F09ABD"], ["海南", "#F09ABD"], ["广西", "#FAC300"], ["云南", "#FCF502"], ["西藏", "#B9B4C8"], ["新疆", "#FAC300"], ["甘肃", "#01933F"], ["青海", "#F09ABD"], ["四川", "#FAC300"], ["贵州", "#01933F"], ["重庆", "#B9B4C8"], ["湖南", "#F09ABD"], ["江西", "#01933F"], ["湖北", "#FCF502"], ["安徽", "#FAC300"], ["河南", "#B9B4C8"], ["陕西", "#F09ABD"], ["山西", "#01933F"], ["宁夏", "#FAC300"]];
    setTimeout(function () {
      provList.forEach(function (item) {
        getBoundary(item);
      });
    }, 20);


    let mycomOverlayList = [];     //存放当前省数据

    //滚轮缩放事件
    var scrollFunc = function (e) {
      e = e || window.event;
      // console.log(map.getZoom());
    }
    if (document.addEventListener) {
      document.addEventListener('DOMMouseScroll', scrollFunc, false);
    }
    window.onmousewheel = document.onmousewheel = scrollFunc;


    //地图拖拽事件
    map.addEventListener("dragend", function showInfo () {
    });

    //地图缩放事件
    // map.addEventListener('zoomend', function (e) {
    //   var zoom = e.target.getZoom();
    //   if (zoom < 17) { // 小于17级，统计图
    //     myCompOverlay.hide();
    //   } else {
    //     myCompOverlay.show();
    //   }
    // });


    //点击事件
    map.addEventListener('click', function (e) {
      var geocoder = new BMap.Geocoder();
      var point = new BMap.Point(e.point.lng, e.point.lat);
      geocoder.getLocation(point, function (geocoderResult, LocationOptions) {
        clearOverLay(geocoderResult.address);
        drawPieSum(geocoderResult.address.substr(0, 2));
        map.centerAndZoom(new BMap.Point(mycomOverlayList[0]['data']['lng'], mycomOverlayList[0]['data']['lat']), 10);
      });
    })

    //去色
    function clearOverLay (address) {
      address = address.substr(0, 2);
      let maplay = map.getOverlays();
      maplay.forEach(function (params) {
        if (address === params.id)
          map.removeOverlay(params);
      })
      // console.log(address);
    }

    //获取地图边界
    function getBoundary (provItem) {
      // console.log(provItem);   
      var bdary = new BMap.Boundary();
      bdary.get(provItem[0], function (rs) {       //获取行政区域
        var count = rs.boundaries.length; //行政区域的点有多少个
        var pointArray = [];
        for (var i = 0; i < count; i++) {
          let ply = new BMap.Polygon(rs.boundaries[i], { strokeWeight: 1, strokeColor: "#aaaaaa", fillColor: provItem[1] }); //建立多边形覆盖物
          map.addOverlay(ply);  //添加覆盖物
          ply.id = provItem[0];
          pointArray = pointArray.concat(ply.getPath());
        }
      });
    }






    function ComplexCustomOverlay (point) {
      this._point = point;
    }

    var drawPie = function (obj, data) {

      let echarts2 = echarts.init(obj);
      let option = {

        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '75%',
            center: ['50%', '50%'],
            data: [
              { value: data['A+'], name: 'A+' },
              { value: data['A'], name: 'A' },
              { value: data['A-'], name: 'A-' },
              { value: data['B+'], name: 'B+' },
              { value: data['B'], name: 'B' }
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200;
            }
          }
        ]
      };
      echarts2.setOption(option);
    };


    function baiduMap (baiduMap) {
      /**
       * 自定义覆盖物类, 取名 ComplexCustomOverlay 使用时直接 new ComplexCustomOverlay 即可
       * 示例 new ComplexCustomOverlay(121.620483, 31.291102, function(div_obj){});
       * @param {*} lng 经度
       * @param {*} lat 维度
       * @param {*} callback 回调方法
       */
      ComplexCustomOverlay = function (lng, lat, callback, data) {
        this._point = new baiduMap.Point(lng, lat);
        this._callback = callback;
        this._data = data;
      };
      //继承Overlay基类
      ComplexCustomOverlay.prototype = new baiduMap.Overlay();
      /**
       * 实现initialize方法，此方法在map.addOverlay(--)时会自动调用，完成初始化工作
       */
      ComplexCustomOverlay.prototype.initialize = function (map) {
        this._map = map;

        //生成div,用来承载ECharts
        var div = this._div = document.createElement("div");
        // 可以根据情况添加些样式信息
        // div.style.backgroundColor = "#fff";
        div.style.zIndex = baiduMap.Overlay.getZIndex(this._point.lat);
        div.style.width = "100px";
        div.style.height = "100px";
        // marginLeft marginTop 的设置可以让这个div的中心点和给定的经纬度重合
        div.style.marginLeft = '-50px';
        div.style.marginTop = '-50px';
        //必须是绝对定位，不然会偏离原来位置
        div.style.position = 'absolute';
        //将该覆盖物添加到标签覆盖物列表
        map.getPanes().labelPane.appendChild(div);
        //调用传入的回调方法
        this._callback(div, this._data);
        return div;
      };
      /**
       * 当地图发生变化，会自动调用此方法，进行覆盖物的重绘工作
       * 例如 拖动地图、地图放大缩小等操作，都会自动调用draw方法进行重绘
       */
      ComplexCustomOverlay.prototype.draw = function () {
        //饼图的位置设置,需要获取该地图点的像素位置x,y
        var pixel = this._map.pointToOverlayPixel(this._point);
        this._div.style.left = pixel.x + "px";
        this._div.style.top = (pixel.y - 30) + "px";
      }
    };


    // 实例化自定义Overlay,传入经纬度以及回调方法

    function drawPieSum (province) {
      table1.forEach(function (params) {

        if (params['省份'].substr(0, 2) === province) {
          console.log('111111');
          let myCompOverlay = new ComplexCustomOverlay(params.lng, params.lat, drawPie, params);
          map.addOverlay(myCompOverlay);
          let temp = {
            data: params,
            overlay: myCompOverlay
          };
          mycomOverlayList.push(temp);
        }
      })
    }

  }
}


