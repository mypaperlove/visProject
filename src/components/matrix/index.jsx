import React, { Component } from 'react'
import './martix.css'
// import ReactEcharts from 'echarts-for-react'
import echarts from 'echarts'
import { deleteRow } from './matrix.js'
export default class Matrix extends Component {

  state = {
    data: [],
    schools: [],
    //行属性
    allschools: ['北京大学', 'Friday', 'Thursday',
      'Wednesday', 'Tuesday', 'Monday', 'Sunday'
    ],
    //热力图值
    alldata: [
      [0, 0, 7],
      [0, 1, 1],
      [0, 2, 3],
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
    ],
  }

  render() {
    return (
      <div className='col-md-7' id='matrix'></div>
    )
  }
  componentDidMount() {
    let fontsize = 12;
    //列属性
    let items = [{
      value: '城市',
      textStyle: {
        width: '100%',
        fontSize: fontsize,
      }
    },
    {
      value: '知名度',
      textStyle: {
        width: '100%',
        fontSize: fontsize
      }
    },
    {
      value: '双一流',
      textStyle: {
        width: '100%',
        fontSize: fontsize
      }
    },
    {
      value: '电子科学\n与技术',
      textStyle: {
        width: '100%',
        fontSize: fontsize
      }
    },
    {
      value: '信息与通\n信工程',
      textStyle: {
        width: '100%',
        fontSize: fontsize
      }
    },
    {
      value: '控制科学\n与工程',
      textStyle: {
        width: '100%',
        fontSize: fontsize
      }
    },
    {
      value: '计算机科学\n与技术',
      textStyle: {
        width: '100%',
        fontSize: fontsize
      }
    },
    {
      value: '软件工程',
      textStyle: {
        width: '100%',
        fontSize: fontsize
      }
    },
    {
      value: '第四次学\n科评估',
      textStyle: {
        width: '100%',
        fontSize: fontsize
      }
    },
    {
      value: '电子科学\n与技术',
      textStyle: {
        width: '100%',
        fontSize: fontsize
      }
    },
    {
      value: '信息与通\n信工程',
      textStyle: {
        width: '100%',
        fontSize: fontsize
      }
    },
    {
      value: '控制科学\n与工程',
      textStyle: {
        fontSize: fontsize,
      }
    },
    {
      value: '计算机科\n学与技术',
      textStyle: {
        width: '100%',
        fontSize: fontsize,
      }
    },
    {
      value: '软件工程',
      textStyle: {
        width: '100%',
        fontSize: fontsize
      }
    },
    ];

    let { schools,data} = this.state;
    let that = this;

    //横纵坐标转换
    this.state.alldata = this.state.alldata.map(function (item) {
      return [item[1], item[0], item[2] || '-'];
    });

    let midHeatmapOption = {
      tooltip: {
        position: 'top',
        formatter: function (params) {
          return params.data[2].toFixed(2);
        }
      },
      animation: true,
      grid: {
        //height: '50%',
        //y: '10%'
      },
      xAxis: [{
        offset: 1,
        position: 'top',
        type: 'category',
        data: items,
        axisLabel: {
          interval: 0,
          rotate: -30
        }
        ,
        splitArea: {
          show: true
        },
        axisTick: {
          show: false
        }
      }],
      yAxis: {
        type: 'category',
        data: this.state.schools,
        triggerEvent: true,
        offset: 1,
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
        calculable: false,
        orient: 'vertical',
        right: "3%",
        color: ["#3686e7", "#bcfdd6"],
        bottom: '20%'
      },
      series: [{
        name: 'HeatMap',
        type: 'heatmap',
        data: this.state.data,
        label: {
          normal: {
            show: false
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

    var midHeatmap = echarts.init(document.getElementById('matrix'));
    midHeatmap.setOption(midHeatmapOption);

    //事件
    midHeatmap.on('click', function (params) {
      if (params.componentType == 'yAxis') {
      }
    });

    midHeatmap.on('dblclick', function (params) {
      if (params.componentType == 'yAxis') {
        for (let i = 0; i < schools.length; i++) {
          if (schools[i] == params.value) {
            schools.splice(i, 1);
            console.log(schools);
            deleteRow(data,i);
            midHeatmap.setOption(midHeatmapOption);
            break;
          }
        }
      }
    });

    let i = 0;
    setInterval(() => {
      if (i < 7) {
        this.state.schools.push(this.state.allschools[i]);
        let n = 0;
        for (n = 0; n < 14; n++) {
          this.state.data.push(this.state.alldata[i * 13 + n]);
        }
        midHeatmapOption.yAxis.data = this.state.schools;
        midHeatmap.setOption(midHeatmapOption);
        // console.log(i);
        // console.log(this.state.allschools[i]);
        console.log(this.state.alldata);
        i++;
      }
    }, 100)
  }
}