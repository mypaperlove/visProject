import React, { Component } from 'react'
import echarts from 'echarts'
import bmap from '../../../node_modules/echarts/extension/bmap/bmap'

import china from './china2.json'
import './map.css'


export default class Map extends Component {
  render () {
    return (
      <div className='col-md-9' id='map'></div>
    )
  }
  componentDidMount () {
    echarts.registerMap('china', china);
    console.log(china);

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
      geo: {
        id: 'geo1',
        map: 'china',
        roam: true,
        zoom: 1.7,
        center: [105.97, 35.71]
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
        mapType: 'china',
        roam: false,
        geoIndex: 0,
        label: {
          show: true,
        },
        data: [
          { name: '北京市', value: 1 },
          { name: '天津市', value: 2 },
          { name: '上海市', value: 3 },
          { name: '广东省', value: 4 },
          { name: '台湾省', value: 5 },
          { name: '香港特别行政区', value: 6 },
          { name: '澳门特别行政区', value: 7 }
        ]
      }]
    };

    var midMap = echarts.init(document.getElementById('map'));
    midMap.setOption(midMapOption);

    midMapOption.series.push({
      name: '访问来源',
      type: 'pie',
      // coordinateSystem: 'geo',
      radius: '10%',
      center: midMap.convertToPixel({ geoIndex: 0 }, [105.97, 35.71]),
      data: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 274, name: '联盟广告' },
        { value: 235, name: '视频广告' },
        { value: 400, name: '搜索引擎' }
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
      itemStyle: {
        normal: {
          color: '#c23531',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },

      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return Math.random() * 200;
      }
    })
    console.log(midMapOption.series);
    midMap.setOption(midMapOption);
    midMap.on('click', function (params) {
      console.log(params);
    })
  }


}
