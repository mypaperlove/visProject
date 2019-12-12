import React, { Component } from 'react'
import './martix.css'
// import ReactEcharts from 'echarts-for-react'
import echarts from 'echarts'

export default class Matrix extends Component {


  render () {
    return (
      <div className='col-md-7' id='matrix'></div>
    )
  }
  componentDidMount () {
    let hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
      '7a', '8a', '9a', '10a', '11a',
      '12p', '1p'
    ];
    let days = ['Saturday', 'Friday', 'Thursday',
      'Wednesday', 'Tuesday', 'Monday', 'Sunday'
    ];

    let data = [
      [0, 0, 5],
      [0, 1, 1],
      [0, 2, 0],
      [0, 3, 0],
      [0, 4, 0],
      [0, 5, 0],
      [0, 6, 0],
      [0, 7, 0],
      [0, 8, 0],
      [0, 9, 0],
      [0, 10, 0],
      [0, 11, 2],
      [0, 12, 4],
      [0, 13, 1],
      [1, 0, 7],
      [1, 1, 0],
      [1, 2, 0],
      [1, 3, 0],
      [1, 4, 0],
      [1, 5, 0],
      [1, 6, 0],
      [1, 7, 0],
      [1, 8, 0],
      [1, 9, 0],
      [1, 10, 5],
      [1, 11, 2],
      [1, 12, 2],
      [1, 13, 6],
      [2, 0, 1],
      [2, 1, 1],
      [2, 2, 0],
      [2, 3, 0],
      [2, 4, 0],
      [2, 5, 0],
      [2, 6, 0],
      [2, 7, 0],
      [2, 8, 0],
      [2, 9, 0],
      [2, 10, 3],
      [2, 11, 2],
      [2, 12, 1],
      [2, 13, 9],
      [3, 0, 7],
      [3, 1, 3],
      [3, 2, 0],
      [3, 3, 0],
      [3, 4, 0],
      [3, 5, 0],
      [3, 6, 0],
      [3, 7, 0],
      [3, 8, 1],
      [3, 9, 0],
      [3, 10, 5],
      [3, 11, 4],
      [3, 12, 7],
      [3, 13, 14],
      [4, 0, 1],
      [4, 1, 3],
      [4, 2, 0],
      [4, 3, 0],
      [4, 4, 0],
      [4, 5, 1],
      [4, 6, 0],
      [4, 7, 0],
      [4, 8, 0],
      [4, 9, 2],
      [4, 10, 4],
      [4, 11, 4],
      [4, 12, 2],
      [4, 13, 4],
      [5, 0, 2],
      [5, 1, 1],
      [5, 2, 0],
      [5, 3, 3],
      [5, 4, 0],
      [5, 5, 0],
      [5, 6, 0],
      [5, 7, 0],
      [5, 8, 2],
      [5, 9, 0],
      [5, 10, 4],
      [5, 11, 1],
      [5, 12, 5],
      [5, 13, 10],
      [6, 0, 1],
      [6, 1, 0],
      [6, 2, 0],
      [6, 3, 0],
      [6, 4, 0],
      [6, 5, 0],
      [6, 6, 0],
      [6, 7, 0],
      [6, 8, 0],
      [6, 9, 0],
      [6, 10, 1],
      [6, 11, 0],
      [6, 12, 2],
      [6, 13, 1]
    ];

    data = data.map(function (item) {
      return [item[1], item[0], item[2] || '-'];
    });

    let midHeatmapOption = {
      tooltip: {
        position: 'top'
      },
      animation: true,
      grid: {
        //height: '50%',
        //y: '10%'
      },
      xAxis: {
        position: 'top',
        type: 'category',
        data: hours,
        splitArea: {
          show: true
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: 'category',
        data: days,
        splitArea: {
          show: true
        },
        axisTick: {
          show: false
        }
      },
      visualMap: {
        min: 0,
        max: 10,
        calculable: true,
        orient: 'vertical',
        right: 'right',
        color: ["#3686e7", "#bcfdd6"],
        bottom: '15%'
      },
      series: [{
        name: 'Punch Card',
        type: 'heatmap',
        data: data,
        label: {
          normal: {
            show: true
          }
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };

    let option = 
    {
      "grid": {
          "top": 80
      },
      "tooltip": {
          "show": true
      },
      "xAxis": {
          "position": "top",
          "name": "月份",
          "type": "category",
          "data": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "合计"],
          "splitArea": {
              "show": true
          },
          "axisLine": {
              "show": false
          },
          "axisTick": {
              "show": false
          }
      },
      "yAxis": {
          "nameLocation": "end",
          "type": "category",
          "data": ["合计", "昆明", "玉溪", "城市名称", "或者", "站点名称", "*国控站点"],
          "axisLine": {
              "show": false
          },
          "axisTick": {
              "show": false
          },
          "axisLabel": {
              "rich": {
                  "red": {
                      "color": "#f00"
                  }
              }
          },
          "splitArea": {
              "show": true
          }
      },
      "visualMap": {
          "min": 0,
          "max": 31,
          "calculable": true,
          "orient": "horizontal",
          "right": "30%",
          "top": "10",
          "color": ["#3686e7", "#bcfdd6"]
      },
      "series": [{
          "name": "优良天数",
          "type": "heatmap",
          "data": [
              [0, 0, 180],
              [0, 1, 13],
              [0, 2, 5],
              [0, 3, 15],
              [0, 4, 16],
              [0, 5, 17],
              [0, 6, 5],
              [1, 0, 180],
              [1, 1, 15],
              [1, 2, 1],
              [1, 3, 16],
              [1, 4, 17],
              [1, 5, 18],
              [1, 6, 1],
              [2, 0, 50],
              [2, 1, 16],
              [2, 2, 2],
              [2, 3, 17],
              [2, 4, 18],
              [2, 5, 5],
              [2, 6, 2],
              [3, 0, 80],
              [3, 1, 17],
              [3, 2, 13],
              [3, 3, 18],
              [3, 4, 5],
              [3, 5, 8],
              [3, 6, 13],
              [4, 0, 30],
              [4, 1, 18],
              [4, 2, 15],
              [4, 3, 5],
              [4, 4, 8],
              [4, 5, 30],
              [4, 6, 15],
              [5, 0, 180],
              [5, 1, 5],
              [5, 2, 16],
              [5, 3, 8],
              [5, 4, 30],
              [5, 5, 18],
              [5, 6, 16],
              [6, 0, 50],
              [6, 1, 8],
              [6, 2, 17],
              [6, 3, 30],
              [6, 4, 18],
              [6, 5, 5],
              [6, 6, 17],
              [7, 0, 21],
              [7, 1, 30],
              [7, 2, 18],
              [7, 3, 18],
              [7, 4, 5],
              [7, 5, 1],
              [7, 6, 18],
              [8, 0, 21],
              [8, 1, 18],
              [8, 2, 5],
              [8, 3, 5],
              [8, 4, 1],
              [8, 5, 2],
              [8, 6, 5],
              [9, 0, null],
              [9, 1, 5],
              [9, 2, 8],
              [9, 3, 1],
              [9, 4, 2],
              [9, 5, 13],
              [9, 6, 8],
              [10, 0, null],
              [10, 1, 1],
              [10, 2, 30],
              [10, 3, 2],
              [10, 4, 13],
              [10, 5, 15],
              [10, 6, 30],
              [11, 0, null],
              [11, 1, null],
              [11, 2, null],
              [11, 3, 13],
              [11, 4, 15],
              [11, 5, 16],
              [11, 6, null]
          ],
          "label": {
              "normal": {
                  "show": true
              }
          },
          "itemStyle": {
              "normal": {
                  "borderColor": "rgba(255, 255, 255, 0.8)"
              },
              "emphasis": {
                  "shadowBlur": 10,
                  "shadowColor": "rgba(255, 255, 255, 0.5)"
              }
          }
      }]
  };
    var midHeatmap = echarts.init(document.getElementById('matrix'));
    midHeatmap.setOption(midHeatmapOption);
  }
}