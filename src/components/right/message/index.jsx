import React, { Component } from 'react'
import './message.css'
import echarts from 'echarts'
import itemStyle from './itemstyle.json'
import table3 from '../../../json/table3.json'
export default class Message extends Component {
  render () {
    return (
      <div id='message'></div>
    )
  }
  componentDidMount () {
    this.draw("10002");
  }

  draw (id) {
    let data = this.solveData(id);
    let option = {
      backgroundColor: '#fff',
      tooltip: {},
      animationDurationUpdate: function (idx) {
        // 越往后的数据延迟越大
        return idx * 100;
      },
      animationEasingUpdate: 'bounceIn',
      color: ['#fff', '#fff', '#fff'],
      series: [{
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: 100,
          edgeLength: 10
        },
        roam: true,
        label: {
          normal: {
            show: true
          },
        },
        data: data
      }]
    }
    let mychart = echarts.init(document.getElementById('message'));
    mychart.setOption(option);
    console.log('asddsasda');
  }
  solveData (id) {
    let data = [];
    let findData = {}
    table3.forEach((params) => {
      if (params['学校编号'] === id) {
        findData = params;
      }
    })

    var titleString = findData['学校简介'].split('、');
    for (let i = 0; i < titleString.length; i++) {
      let obj = {
        "name": titleString[i],
        "symbolSize": 50,
        "draggable": true,
        "itemStyle": itemStyle[i],
      };
      data.push(obj);
    }
    console.log(findData);
    return data;
  }
}
