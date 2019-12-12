import React, { Component } from 'react'
import echarts from 'echarts'
import bmap from '../../../node_modules/echarts/extension/bmap/bmap'


import china from './china.json'
import table1 from './json/table.json'
import './map.css'

import geoJson from './china.json'
// import './china'
//llx ssss
export default class Map extends Component {
  render () {
    return (
      <div className='col-md-9' id='map'>

      </div>
    )
  }
  componentDidMount () {
    echarts.registerMap('china', china);
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

      series: [{
        name: 'mapSer',
        type: 'map',
        roam: true,
        geoIndex: 0,
        label: {
          show: true,
        },
        data: [
          { name: '北京市', value: 1 },
          { name: '四川省', value: 1 },
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
    //----------------------------------------------------------------------------------------------------------------------

    let functionPieChart = this.pieChart;
    console.log(midMapOption);
    //-------------------------------------------------------------------------------------------------------------------
    midMap.on('click', function (params) {
      // midMap.clear();
      // midMapOption.geo['map'] = 'sichuan';
      // midMapOption.geo['center'] = '[104.27606327539083,30.556972940437905]';
      console.log(midMap.convertToPixel({ geoId: 'geo1' }, [107, 108]));
      midMap.convertToPixel({ geoId: 'geo1' }, [107, 108]);

      table1.forEach(element => {
        if (element['省份'] === params.name) {
          let series = functionPieChart(element, midMap.convertToPixel('geo', [element['lng'], element['lat']]));
          midMapOption.series.push(series);
        }
      });
      // console.log(midMapOption);
      midMap.setOption(midMapOption);
    })
    midMap.on('georoam', { seriesName: 'mapSer' }, function (params) {
      midMapOption.series.forEach(element => {
        if (element.name !== 'mapSer') {
          element.center = ma
        }
      })
      // console.log(params);
    })
  }

  pieChart (obj, position) {
    console.log();
    let option = {
      name: '访问来源',
      type: 'pie',
      radius: '10%',
      center: position,
      data: [
        { value: 335, name: '直接访问', lng: '' },
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
    }
    return option;
  }

}
