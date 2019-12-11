import React, { Component } from 'react'
import echarts from 'echarts'
import bmap from '../../../node_modules/echarts/extension/bmap/bmap'

import './map.css'

import geoJson from './china.json'
// import './china'

export default class Map extends Component {
  render () {
    return (
      <div className='col-md-9' id='map'></div>
    )
  }
  componentDidMount () {
    console.log(geoJson);
    // let datap = this.solveData();
    // echarts.registerMap('china', geoJson);
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
        roam: false,
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
    // console.log(datap);
    var midMap = echarts.init(document.getElementById('map'));
    midMap.setOption(midMapOption);

    let bmap = midMap.getModel().getComponent('bmap').getBMap();
    bmap.setMapStyleV2({
      styleId: '8497ad4f7da6e5683f4f5c8e6a9c107d'
    });

    console.log(midMap.convertToPixel({ geoIndex: 0 }, [214.114129, 37.550339]));


    midMapOption.series.push({
      name: '访问来源',
      type: 'pie',
      radius: '10%',
      center: midMap.convertToPixel({ seriesIndex: 0 }, [234.114129, 57.550339]),
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

    midMap.setOption(midMapOption);
  }

  solveData () {
    let datap = [{
      name: '江苏省',
      value: 5.3
    },
    {
      name: '北京市',
      value: 3.8
    },
    {
      name: '上海',
      value: 4.6
    },
    {
      name: '重庆',
      value: 3.6
    },
    {
      name: '河北',
      value: 3.4
    },
    {
      name: '河南',
      value: 3.2
    },
    {
      name: '云南',
      value: 1.6
    },
    {
      name: '辽宁',
      value: 4.3
    },
    {
      name: '黑龙江',
      value: 4.1
    },
    {
      name: '湖南',
      value: 2.4
    },
    {
      name: '安徽',
      value: 3.3
    },
    {
      name: '山东',
      value: 3.0
    },
    {
      name: '新疆',
      value: 1
    },
    {
      name: '江苏',
      value: 3.9
    },
    {
      name: '浙江',
      value: 3.5
    },
    {
      name: '江西',
      value: 2.0
    },
    {
      name: '湖北',
      value: 2.1
    },
    {
      name: '广西',
      value: 3.0
    },
    {
      name: '甘肃',
      value: 1.2
    },
    {
      name: '山西',
      value: 3.2
    },
    {
      name: '内蒙古',
      value: 3.5
    },
    {
      name: '陕西',
      value: 2.5
    },
    {
      name: '吉林',
      value: 4.5
    },
    {
      name: '福建',
      value: 2.8
    },
    {
      name: '贵州',
      value: 1.8
    },
    {
      name: '广东',
      value: 3.7
    },
    {
      name: '青海',
      value: 0.6
    },
    {
      name: '西藏',
      value: 0.4
    },
    {
      name: '四川',
      value: 3.3
    },
    {
      name: '宁夏',
      value: 0.8
    },
    {
      name: '海南',
      value: 1.9
    },
    {
      name: '台湾',
      value: 0.1
    },
    {
      name: '香港',
      value: 0.1
    },
    {
      name: '澳门',
      value: 0.1
    }
    ];
    return datap;
  }
}
