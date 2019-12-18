import React, { Component } from 'react'
import './bar.css'
import echarts from 'echarts'
import { Drawer } from 'antd'
import table3 from '../../../json/table3.json'

export default class Bar extends Component {
  render () {
    return (
      <div id='bar'>
      </div>
    )
  }
  componentDidMount () {
    this.draw('10002');
  }
  draw (id) {
    let data = this.datasolve(id);
    let viewBar = echarts.init(document.getElementById('bar'));
    let optionBar = {
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        show: false,
        containLabel: true,
        tooltip: {},
        left: '5%',
        right: '5%',
        top: '5%',
        bottom: '5%'
      },
      xAxis: {
        show: false,
        type: 'value',
        max: 100,
        inverse: true,
        axisLabel: {
          formatter: function (value, index) {
            return Math.abs(value)
          }
        },
      },
      yAxis: {
        type: 'category',
        data: ['文史', '理工', '经管', '医学', '农学', '艺术'],
        boundaryGap: true,
        axisTick: {
          alignWithLabel: true
        }
      },
      series: [{
        name: '学科建设',
        type: 'bar',
        stack: '1',
        barWidth: 15,
        itemStyle: {},
        label: {
          normal: {
            show: true,
            position: 'insideRight'
          }
        },
        data: [-data['文史数量'], -data['理工数量'], -data['经管数量'], -data['医学数量'], -data['农学数量'], -data['艺术数量']]
        // data: [-1, -2, -3, -4, -5, -6]
      },
      {
        name: '学科评估',
        type: 'bar',
        stack: '1',
        barWidth: 15,
        itemStyle: {},
        label: {
          normal: {
            show: true,
            position: 'insideRight',
            formatter: function (v) {
              return Math.abs(v.data)
            }
          }
        },
        // data: [1, 2, 3, 4, 5, 6]
        data: [data['文史分数'], data['理工分数'], data['经管分数'], data['医学分数'], data['农学分数'], data['艺术分数']]
      }]
    };
    viewBar.setOption(optionBar);
  }


  datasolve (id) {
    let targetSchool = [];
    for (let i = 0; i < table3.length; i++) {
      if (table3[i]['学校编号'] === id) {
        targetSchool = table3[i];
        break;
      }
    }
    return targetSchool;
  }

}
