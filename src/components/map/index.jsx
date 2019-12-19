import React, { Component } from 'react'
import echarts from 'echarts'
import bmap from '../../../node_modules/echarts/extension/bmap/bmap'
// import { baiduMap } from './complexCustomOverla
// import BMap from 'bmap'
import $ from 'jquery'
import table1 from '../.././json/table1.json'
import './map.css'
import geoJson from './china.json'
import { Switch } from 'antd';

export default class Map extends Component {

  state = {
    map: {},
    BMap: {},
    overLaylist: [],
    zoom: 5
  }
  render () {
    return (
      <>
        <div className='col-md-9' id='map'>
        </div>
        <div id='switchColor'>
          <Switch defaultChecked onChange={this.onChange.bind(this)} />
        </div>
      </>
    )
  }

  onChange (checked) {
    let map = this.state.map;
    let overLaylist = [];
    let BMap = this.state.BMap;
    if (checked == true) {
      if (this.state.overLaylist.length == 0) {
        // console.log(overLaylist);
        console.log('overLaylist.length 等于0');
        let provList = [["黑龙江", "#F09ABD"], ["吉林", "#01933F"], ["辽宁", "#FAC300"], ["内蒙古", "#FCF502"], ["河北", "#F09ABD"], ["北京", "#FCF502"], ["天津", "#01933F"], ["山东", "#FCF502"], ["江苏", "#D8EDDA"], ["上海", "#B9B4C8"], ["浙江", "#FCF502"], ["福建", "#FAC300"], ["台湾", "#F09ABD"], ["广东", "#FCF502"], ["香港", "#F09ABD"], ["澳门", "#F09ABD"], ["海南", "#F09ABD"], ["广西", "#FAC300"], ["云南", "#FCF502"], ["西藏", "#B9B4C8"], ["新疆", "#FAC300"], ["甘肃", "#01933F"], ["青海", "#F09ABD"], ["四川", "#FAC300"], ["贵州", "#01933F"], ["重庆", "#B9B4C8"], ["湖南", "#F09ABD"], ["江西", "#01933F"], ["湖北", "#FCF502"], ["安徽", "#FAC300"], ["河南", "#B9B4C8"], ["陕西", "#F09ABD"], ["山西", "#01933F"], ["宁夏", "#FAC300"]];
        setTimeout(function () {
          provList.forEach(function (item) {
            getBoundary(item);
          });
        }, 20);
        this.setState({ overLaylist: overLaylist });
      } else {
        this.state.overLaylist.forEach((ply) => {
          map.addOverlay(ply);
        })
      }
    } else {
      console.log(overLaylist);
      this.state.overLaylist.forEach((ply) => {
        console.log('object');
        map.removeOverlay(ply);
      })
    }
    function getBoundary (provItem) {
      // console.log(provItem);   
      var bdary = new BMap.Boundary();
      bdary.get(provItem[0], function (rs) {       //获取行政区域
        var count = rs.boundaries.length; //行政区域的点有多少个
        var pointArray = [];
        for (var i = 0; i < count; i++) {
          let ply = new BMap.Polygon(rs.boundaries[i], { strokeWeight: 1, strokeColor: "#aaaaaa", fillColor: provItem[1] }); //建立多边形覆盖物
          map.addOverlay(ply);  //添加覆盖物
          overLaylist.push(ply);
          ply.id = provItem[0];
          pointArray = pointArray.concat(ply.getPath());
        }
      });
    }
  }

  componentDidMount () {
    const { BMap } = window

    baiduMap(BMap);
    //画地图的option
    let midMapOption = {
      backgroundColor: 'transparent',
      title: {
        text: '全国大学城市分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      bmap: {
        center: [104.114129, 37.550339],
        zoom: 5,
        roam: true,
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
    this.setState(
      {
        map: map,
        BMap: BMap
      }
    );
    map.enableMapClick = false;
    map.setMapStyleV2({
      styleId: '7d20b8a0d9e6a3a1c61e6e3f80bf4a44'
    });

    let mycomOverlayList = [];     //存放当前省数据




    //地图拖拽事件
    map.addEventListener("dragend", function showInfo () {
    })

    // 地图缩放事件
    map.addEventListener('zoomend', e => {
      var zoom = map.getZoom();
      console.log(zoom);
      this.setState({
        zoom: zoom
      })
      if (zoom <= 10) {
        let divs = document.getElementsByClassName('pie');
        // divs.forEach((div) => {
        //   console.log(div.show);
        // })
        for (let i = 0; i < divs.length; i++) {
          // console.log(divs[i].style.width);
          if (divs[i].value) {
            $(divs[i]).remove();
            mycomOverlayList = [];
          }
        }
      }
    });




    //点击事件
    map.addEventListener('click', e => {
      if (this.state.zoom <= 6) {
        console.log('object');
        var geocoder = new BMap.Geocoder();
        var point = new BMap.Point(e.point.lng, e.point.lat);
        geocoder.getLocation(point, function (geocoderResult, LocationOptions) {
          drawPieSum(geocoderResult.address.substr(0, 2));
          map.centerAndZoom(new BMap.Point(mycomOverlayList[0]['data']['lng'], mycomOverlayList[0]['data']['lat']), 11);
        });
      }
    });

    //去色


    //获取地图边界







    function ComplexCustomOverlay (point) {
      this._point = point;
    }

    //绘制单个饼图
    var drawPie = function (obj, data) {
      obj.addEventListener('mousedown', start);
      let originX, originY;
      function start (e) {
        map.disableDragging();
        originX = $(obj).offset().left;
        originY = $(obj).offset().top;
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', stop);
        // console.log('start', originX, originY);
        // console.log(obj.style.left, obj.style.top);
        return false;
      }
      function move (e) {
        let offsetX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        let offsetY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        let x = offsetX - 400 + 'px';
        let y = offsetY + 'px'
        obj.style.left = x;
        obj.style.top = y;
        console.log(offsetX, offsetY);
      }
      function stop (e) {
        let offsetX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        let offsetY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        // if(offsetX<400&offsetY>650) this.props.maptoRadar(data.['学校编号']);
        // else if(offsetY>650)   this.props.maptoMartix(data['学校编号']);

        map.enableDragging();
        obj.style.left = originX - 350 + 'px';
        obj.style.top = originY + 50 + 'px';
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', stop);
        console.log('stop', obj.style.left, obj.style.top);
      }
      let echarts2 = echarts.init(obj);
      let option = {
        title: {
          text: data['学校名称'],
          left: 'center',
          textStyle: {
            fontSize: 15,
            fontWeight: 100
          }

        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            z: 10,
            zlevel: 10,
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
      echarts2.on('dblclick', function (params) {
        obj.value = !obj.value;
        console.log(obj.value);
        // obj.style.width = "50px";
      })

    };
    map.disableDoubleClickZoom();
    //重定义ComplexCustomOverlay
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
        div.value = true;
        div.className = 'pie';
        // marginLeft marginTop 的设置可以让这个div的中心点和给定的经纬度重合
        div.style.marginLeft = '-50px';
        div.style.marginTop = '-50px';
        div.style.zIndex = "10";
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
      ComplexCustomOverlay.prototype.addEventListener = function (event, fun) {
        this._div['on' + event] = fun;
      }
    };


    // 实例化自定义Overlay,传入经纬度以及回调方法

    function drawPieSum (province) {
      table1.forEach(function (params) {
        if (params['省份'].substr(0, 2) === province) {
          // console.log('111111');
          let myCompOverlay = new ComplexCustomOverlay(params.lng, params.lat, drawPie, params);
          map.addOverlay(myCompOverlay);
          myCompOverlay.addEventListener('dblclick', () => {
            console.log(myCompOverlay._div);
            // let _div = myCompOverlay._div;

          })

          let temp = {
            data: params,
            overlay: myCompOverlay,
            show: true
          };
          mycomOverlayList.push(temp);
        }
      })
    }

  }
}


