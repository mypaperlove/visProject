import React, { Component } from 'react'
import './scatter.css'
import echarts from 'echarts'
import table4 from '../../../json/table4.json'

export default class Scatter extends Component {
  render () {
    return (
      <div id='scatt'>
        <div id='pane'>投影视图</div>
        <div id='scatter'></div>
      </div>

    )
  }
  componentDidMount () {
    let datalist = [];
    table4.forEach(params => {
      let data = [params['x'], params['y'], params['学校称号'], params['学校名称']];
      datalist.push(data);
    })
    let viewScatter = echarts.init(document.getElementById('scatter'));
    let optionScatter = {
      grid: {
        show: false,
        containLabel: true,
        tooltip: {},
        left: '3%',
        right: '3%',
        top: '3%',
        bottom: '3%'
      },
      xAxis: {
        show: true,
        scale: true
      },
      yAxis: {
        show: true,
        scale: true
      },
      dataZoom: [{
        type: 'inside',
        xAxisIndex: 0,
        start: 0,
        end: 100
      }, {
        type: 'inside',
        yAxisIndex: 0,
        start: 0,
        end: 100
      }],
      series: [{
        type: 'scatter',
        symbolSize: 7,
        data: datalist.sort(function (a, b) { return a.value - b.value; }),
        label: {
          emphasis: {
            show: true,
            formatter: function (param) {
              return param.data[3];
            },
            // position: 'top'
          }
        },
      }]
    };
    viewScatter.setOption(optionScatter);

  }

}
