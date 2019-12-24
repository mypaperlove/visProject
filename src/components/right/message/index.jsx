import React, { Component } from 'react'
import './message.css'
import echarts from 'echarts'
import itemStyle from './itemstyle.json'
import table3 from '../../../json/table3.json'
export default class Message extends Component {
  state = {
    id: '10003',
    name: '清华大学'
  }
  render () {
    return (

      <div id='mess'>
        <div id='panel1'>学校属性</div>
        <div id='message'></div>
      </div>

    )
  }
  componentDidMount () {
    // console.log(this.state.id);
    this.draw(this.state.id);
  }

  draw (id) {
    let [data, name] = this.solveData(id);
    let option = {
      title: {
        text: name,

        textStyle: {
          fontSize: 16
        },
        // left: 'center'
      },
      backgroundColor: '#fff',
      tooltip: {},
      animationDurationUpdate: function (idx) {
        // 越往后的数据延迟越大
        return idx * 100;
      },
      label: {
        show: true,
        interval: 0
        // fontWeight: 'bolder',
        // fontSize: 29,
        // color: 'auto',

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
        data: data,
        label: {
          show: true,
          fontWeight: 'bolder',
          fontSize: 29,
          color: 'auto',
          normal: {
            show: true
          }
        }
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
        console.log(this);
        // this.setState({
        //   name: params['学校名称']
        // })
      }
    })
    var titleString = findData['学校简介'].split('、');
    for (let i = 0; i < titleString.length; i++) {
      let obj = {
        "name": titleString[i],
        "symbolSize": 50,
        "draggable": true,
        "itemStyle": itemStyle[i]

      };
      data.push(obj);
    }
    // console.log(findData);
    return [data, findData['学校名称']];
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
