import React, { Component } from 'react'
import './bar.css'
import echarts from 'echarts'
import { Drawer } from 'antd'
import table3 from '../../../json/table3.json'

export default class Bar extends Component {
  state = {
    id: '10003'
  }
  render () {
    return (
      <div id='ba'>
        <div id='panel'>学科门类建设和评估</div>
        <div id='name' class='row no-gutters' style={{ padding: '8px' }}>
          <div className='col-md-6 textstyledd'>学科评估</div>
          <div className='col-md-6 textstyledd' style={{ textAlign: 'right', }}>学科建设</div>
        </div>
        <div id='bar'></div>
      </div>
    )
  }
  componentDidMount () {
    this.draw(this.state.id);
  }
  static getDerivedStateFromProps (nextProps, prevState) {
    // console.log(nextProps.maptoMessage);
    return {
      id: nextProps.maptoBar
    }
  }
  componentDidUpdate () {
    this.draw(this.state.id);
  }
  draw (id) {
    let data = this.datasolve(id);
    let viewBar = echarts.init(document.getElementById('bar'));
    let optionBar = {
      tooltip: {
        // trigger: 'item'
        trigger: 'axis',
        formatter: function (params) {
          let label = params[0].data.label.split(',');
          let string = '一流学科建设名单<br />';
          // console.log(label);
          for (let i = 0; i < label.length; i++) {
            string += (label[i] + '<br />')
          }
          return string;
        },
        label: {
          show: false,
          color: '#333'
        }
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
        max: 20,
        inverse: true,
        axisLabel: {
          formatter: function (value, index) {
            return Math.abs(value)
          }
        },
      },
      yAxis: {
        type: 'category',
        data: ['医学', '农学', '艺术', '文史', '理工', '经管'],
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
            position: 'insideRight',
            formatter: function (v) {
              return Math.abs(v.value)
            }
          }
        },
        data: [{ value: -data['医学数量'], label: data['医学名称'] },
        { value: -data['农学数量'], label: data['农学名称'] },
        { value: -data['艺术数量'], label: data['艺术名称'] },
        { value: -data['文史数量'], label: data['文史名称'] },
        { value: -data['理工数量'], label: data['理工名称'] },
        { value: -data['经管数量'], label: data['经管名称'] }],
        itemStyle: {
          color: "#ef8a62"
        }
      },
      {
        name: '学科评估',
        type: 'bar',
        stack: '1',
        barWidth: 15,
        itemStyle: { color: "#4575b4" },
        label: {
          normal: {
            show: true,
            position: 'insideRight',
            formatter: function (v) {
              return parseInt(v.data * 100)
            }
          }
        },
        // data: [1, 2, 3, 4, 5, 6]
        data: [data['医学分数'] / 100, data['农学分数'] / 100, data['艺术分数'] / 100, data['文史分数'] / 100, data['理工分数'] / 100, data['经管分数'] / 100]
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
