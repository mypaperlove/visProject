import React, { Component } from 'react'
import './martix.css'
import echarts from 'echarts'
import { deleteRow, getYLables, getMatrixdata, modifyMatrixData, getHeatMapData, getSchoolsIds, addNewSchoolId } from './matrix.js'
export default class Matrix extends Component {

  state = {
    data: [],
    schools: [],
    schoolsIds: [10001, 10003, 10007,10055,10610],
    // schoolsIds: [],
  }

  render () {
    // console.log(this.state.schools)
    return (
      <div className='col-md-8' id='matrix'></div>
    )
  }

  componentDidMount () {
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
      value: '双一流评分',
      textStyle: {
        width: '100%',
        fontSize: fontsize
      }
    },
    {
      value: '电子科学与技术',
      textStyle: {
        width: '100%',
        fontSize: fontsize
      }
    },
    {
      value: '信息与通信工程',
      textStyle: {
        width: '100%',
        fontSize: fontsize
      }
    },
    {
      value: '控制科学与工程',
      textStyle: {
        width: '100%',
        fontSize: fontsize
      }
    },
    {
      value: '计算机科学与技术',
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
      value: '第四次学科评估',
      textStyle: {
        width: '100%',
        fontSize: fontsize
      }
    },
    {
      value: '电子科学与技术',
      textStyle: {
        width: '100%',
        fontSize: fontsize
      }
    },
    {
      value: '信息与通信工程',
      textStyle: {
        width: '100%',
        fontSize: fontsize
      }
    },
    {
      value: '控制科学与工程',
      textStyle: {
        fontSize: fontsize,
      }
    },
    {
      value: '计算机科学与技术',
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
    let that = this;

    // //横纵坐标转换
    // this.state.alldata = this.state.alldata.map(function (item) {
    //   return [item[1], item[0], item[2] || '-'];
    // });

    var midHeatmapOption = {
      tooltip: {
        show: false,
        position: 'top',
        formatter: function (params) {
          return params.data[2].toFixed(2);
        }
      },
      animation: true,
      grid: {
        height: '75%',
        // y: '10%'
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
        offset: 0,
        splitArea: {
          show: true
        },
        axisTick: {
          show: false
        }
      },
      visualMap: {
        min: 0,
        max: 100,
        calculable: false,
        text:['高',"低"],
        orient: 'vertical',
        right: "3%",
        color: ["#3686e7", "#bcfdd6"],
        bottom: '15%',
        hoverLink: false
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
    var TimeFn = null;
    midHeatmap.on('click', function (params) {
      clearTimeout(TimeFn);
      let schools = that.state.schools.slice();
      let ids = that.state.schoolsIds.slice();
      TimeFn = setTimeout(function(){
        if (params.componentType == 'yAxis') {
          for(let index in schools){
            if(params.value == schools[index]){
              console.log('被选中学校ID',ids[index]);
              that.props.matrixtoRadar(ids[index]);
              break;
            }
          }
        }
      },300)
      
    });

    midHeatmap.on('dblclick', function (params) {
      
      clearTimeout(TimeFn);
      let deletedSchools = that.state.schools.slice();
      let deletedSchollsIds = that.state.schoolsIds.slice();
      if (params.componentType == 'yAxis') {
        for (let i = 0; i < deletedSchools.length; i++) {
          if (deletedSchools[i] == params.value) {
            deletedSchools.splice(i, 1);
            deletedSchollsIds.splice(i, 1);
            let modifieddata = [];
            let YLebles = [];
            let HeatMap = [];
            modifieddata = modifyMatrixData(getMatrixdata(deletedSchollsIds), that.props.value);
            YLebles = getYLables(modifieddata);
            HeatMap = getHeatMapData(modifieddata);
            that.setState({
              data: HeatMap,
              schools: YLebles,
              schoolsIds: deletedSchollsIds
            });
            break;
          }
        }
      }
    });

    // let i = 0;
    // setInterval(() => {
    //   if (i < 7) {
    //     this.state.schools.push(this.state.allschools[i]);
    //     for (let n = 0; n < 14; n++) {
    //       this.state.data.push(this.state.alldata[i * 14 + n]);
    //     }
    //     midHeatmapOption.yAxis.data = this.state.schools;
    //     midHeatmap.setOption(midHeatmapOption);
    //     // console.log(i);
    //     // console.log(this.state.allschools[i]);
    //     i++;
    //   }
    // }, 1000);
    // getYLables(10019,[]);
    // let kkk = getMatrixdata([10019,10022]);
  }

  static getDerivedStateFromProps (Props, prevState) {
    let modifieddata = [];
    let YLebles = [];
    let HeatMap = [];
    let SchoolsId = [];
    // console.log('nextProps', nextProps)

    // console.log('传入的id',Props)
    modifieddata = modifyMatrixData(getMatrixdata(addNewSchoolId(Props.id,prevState.schoolsIds)), Props.value);
    YLebles = getYLables(modifieddata);
    SchoolsId = getSchoolsIds(modifieddata);
    HeatMap = getHeatMapData(modifieddata);
    if (SchoolsId !== prevState.schoolsIds) {
      // console.log('判断过')
      return {
        data: HeatMap,
        schools: YLebles,
        schoolsIds: SchoolsId
      }
    } else {
      return;
    }
  }

  componentDidUpdate () {
    let Option = {
      yAxis: {
        data: this.state.schools,
      },
      series: [{
        data: this.state.data,
      }]
    };
    var midHeatmap = echarts.init(document.getElementById('matrix'));
    midHeatmap.setOption(Option)
  }

}