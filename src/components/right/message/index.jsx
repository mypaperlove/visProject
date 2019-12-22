import React, { Component } from 'react'
import './message.css'
import echarts from 'echarts'
import itemStyle from './itemstyle.json'
import table3 from '../../../json/table3.json'
export default class Message extends Component {
  state = {
    id: '10003'
  }
  render () {
    return (

      <div id='mess'>
        <div id='panel'>Label</div>
        <div id='message'></div>
      </div>

    )
  }
  componentDidMount () {
    // console.log(this.state.id);
    this.draw(this.state.id);
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
      // color: ['#fff', '#fff', '#fff'],
      series: [{
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: 100,
          edgeLength: 10
        },
        roam: true,
        label: {
          color: '#4d4d4d',
          normal: {
            show: true
          },
        },
        data: data
      }]
    }
    let mychart = echarts.init(document.getElementById('message'));
    mychart.setOption(option);
    // console.log('asddsasda');
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
        "label": {
          color: 'auto',
          normal: {
            show: true
          },
        },
      };
      data.push(obj);
    }
    // console.log(findData);
    return data;
  }
  static getDerivedStateFromProps (nextProps, prevState) {
    // console.log(nextProps.maptoMessage);
    return {
      id: nextProps.maptoMessage
    }
  }

  componentDidUpdate () {
    this.draw(this.state.id);
  }
}
