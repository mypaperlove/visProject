import React, { Component } from 'react'
import echarts from 'echarts'



export default class Radar extends Component {

  state = {

  }

  render () {
    return (
      <div className='col-md-4' id='radar'></div>
    )
  }
  componentDidMount () {
    let option = {
      color: ["rgba(0,183,238, 1)", "rgba(86,199,60, 1)"],
      tooltip: {
          show: true,
          trigger: "item",
          position:'right'
      },
      legend: {
          data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
      },
      radar: {
          center: ["50%", "50%"],
          radius: "70%",
          startAngle: 90,
          splitNumber: 4,
          shape: "circle",
          splitArea: {
              areaStyle: {
                  color: ["transparent"]
              }
          },
          axisLabel: {
              show: false,
              fontSize: 20,
              color: "#000",
              fontStyle: "normal",
              fontWeight: "normal"
          },
          axisLine: {
              show: true,
              lineStyle: {
                  type: "dashed",
                  color: "#999"
              }
          },
          splitLine: {
              show: true,
              lineStyle: {
                  type: "dashed",
                  color: "#999"
              }
          },
          // shape: 'circle',
          name: {
              formatter: '{a|{value}}{abg|}\n{hr|}\n{b|1234}',
              backgroundColor: '#eee',
              borderColor: '#aaa',
              borderWidth: 1,
              borderRadius: 0,
  
              rich: {
  
                  a: {
                      color: '#00b7ee',
  
                      lineHeight: 25,
                      padding: [0, 0, 0, 8],
                      height: 25,
                      backgroundColor: '#fff',
  
                      borderRadius: 0
                  },
  
                  hr: {
                      borderColor: '#aaa',
                      width: '100%',
                      borderWidth: 0.1,
                      align: 'left',
                      height: 1
                  },
                  b: {
                      color: '#333',
                      lineHeight: 25,
                      padding: [0, 0, 0, 8],
                      height: 25,
                      backgroundColor: '#fff',
                      width: '100%',
                      align: 'left',
                      borderRadius: 0
                  },
                  per: {
                      color: '#eee',
                      backgroundColor: '#ffffff',
                      borderWidth: 0.5,
                      borderRadius: 0,
                      borderColor: '#fff',
                  }
              }
  
          },
          indicator: [{
                  name: '销售（sales）',
                  max: 6500,
                  aaa: 'assdfasdf',
                  
              },
              {
                  name: '管理（Administration）',
                  max: 16000,
                  aaa: 'assdfasdf'
              },
              {
                  name: '信息技术（Information Techology）',
                  max: 30000,
                  aaa: 'assdfasdf'
              },
              {
                  name: '客服（Customer Support）',
                  max: 38000,
                  aaa: 'assdfasdf'
              },
              {
                  name: '研发（Development）',
                  max: 52000,
                  aaa: 'assdfasdf'
              },
              {
                  name: '市场（Marketing）',
                  max: 25000,
                  aaa: 'assdfasdf'
              }
          ]
      },
  
      series: [{
          name: "预算分配（Allocated Budget）",
          type: "radar",
          symbol: "circle",
          symbolSize: 10,
          areaStyle: {
              normal: {
                  color: "rgba(86,199,60, 0.3)"
              }
          },
          itemStyle: {
              color: 'rgba(86,199,60, 1)',
              borderColor: 'rgba(86,199,60, 0.3)',
              borderWidth: 10,
          },
          lineStyle: {
              normal: {
                  color: "rgba(86,199,60, 1)",
                  width: 2
              }
          },
          data: [
              [5000, 14000, 28000, 31000, 42000, 21000]
          ]
      }, {
          name: "实际开销（Actual Spending）",
          type: "radar",
          symbol: "circle",
          symbolSize: 10,
          itemStyle: {
              normal: {
                  color: 'rgba(0,183,238, 1)',
                  borderColor: "rgba(0,183,238, 0.4)",
                  borderWidth: 10
              }
          },
          areaStyle: {
              normal: {
                  "color": "rgba(0,183,238, 0.3)"
              }
          },
          lineStyle: {
              normal: {
                  color: "rgba(0,183,238, 1)",
                  width: 2,
              }
          },
          data: [
              [4300, 10000, 28000, 35000, 50000, 19000]
          ]
      }]
  
  
  };
    let radar = echarts.init(document.getElementById('radar'));
    radar.setOption(option);
  }
}