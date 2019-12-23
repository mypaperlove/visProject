import React, { Component } from 'react'
import echarts from 'echarts'
import { getSchoolsIds, schools } from '../matrix/matrix';
import { getIds, getSchoolsNames, getData } from './radar';



export default class Radar extends Component {

    state = {
        legend: [],//['qinghua','beida']
        data: {},//
        schoolids: [],

    }

    render() {
        return (
            <div className='col-md-4' id='radar'></div>
        )
    }
    componentDidMount() {
        let that = this;
        let option = {
            color: ["rgba(0,183,238, 1)", "rgba(86,199,60, 1)"],
            tooltip: {
                show: true,
                trigger: "item",
                position: 'right'
            },
            legend: {
                data: ['a', 'b'],
                orient: "horizontal",
                center: 0,
                bottom: 10,
                textStyle: {
                    fontSize: 10,
                    color: '#8C8C8C'
                },
            },
            radar: {
                center: ["50%", "45%"],
                radius: "60%",
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
                    // formatter: '{a|{value}}{abg|}\n{hr|}\n{b|1234}',
                    // backgroundColor: '#eee',
                    // borderColor: '#aaa',
                    // borderWidth: 1,
                    // borderRadius: 0,
                    color: '#00b7ee',
                    // rich: {

                    //     a: {
                    //         color: '#00b7ee',

                    //         lineHeight: 25,
                    //         padding: [0, 0, 0, 8],
                    //         height: 25,
                    //         backgroundColor: '#fff',

                    //         borderRadius: 0
                    //     },

                    //     hr: {
                    //         borderColor: '#aaa',
                    //         width: '100%',
                    //         borderWidth: 0.1,
                    //         align: 'left',
                    //         height: 1
                    //     },
                    //     b: {
                    //         color: '#333',
                    //         lineHeight: 25,
                    //         padding: [0, 0, 0, 8],
                    //         height: 25,
                    //         backgroundColor: '#fff',
                    //         width: '100%',
                    //         align: 'left',
                    //         borderRadius: 0
                    //     },
                    //     per: {
                    //         color: '#eee',
                    //         backgroundColor: '#ffffff',
                    //         borderWidth: 0.5,
                    //         borderRadius: 0,
                    //         borderColor: '#fff',
                    //     }
                    // }

                },
                indicator: [{
                    name: '城市评分',
                    max: 185,
                },
                {
                    name: '知名度评分',
                    max: 94.6,
                },
                {
                    name: '双一流评分',
                    max: 91,
                },
                {
                    name: '双一流学科数',
                    max: 5,
                },
                {
                    name: '第四次学科评估',
                    max: 97.55,
                }
                ]
            },

            series: [
                {
                    name: '高校对比',
                    type: 'radar',
                    //areaStyle: {normal: {}},
                    symbol: "circle",
                    symbolSize: 10,
                }
                //     {
                //     name: "预算分配（Allocated Budget）",
                //     type: "radar",
                //     symbol: "circle",
                //     symbolSize: 10,
                // areaStyle: {
                //     normal: {
                //         color: "rgba(86,199,60, 0.3)"
                //     }
                // },
                // itemStyle: {
                //     color: 'rgba(86,199,60, 1)',
                //     borderColor: 'rgba(86,199,60, 0.3)',
                //     borderWidth: 10,
                // },
                // lineStyle: {
                //     normal: {
                //         color: "rgba(86,199,60, 1)",
                //         width: 2
                //     }
                // },
                //     data: [
                //         [50, 50, 50, 2, 90]
                //     ]
                // }, {
                //     name: "实际开销（Actual Spending）",

                // itemStyle: {
                //     normal: {
                //         color: 'rgba(0,183,238, 1)',
                //         borderColor: "rgba(0,183,238, 0.4)",
                //         borderWidth: 10
                //     }
                // },
                // areaStyle: {
                //     normal: {
                //         "color": "rgba(0,183,238, 0.3)"
                //     }
                // },
                // lineStyle: {
                //     normal: {
                //         color: "rgba(0,183,238, 1)",
                //         width: 2,
                //     }
                // },
                //     data: [
                //         [50, 60, 80, 3, 60]
                //     ]
                // }
            ]
        };
        let radar = echarts.init(document.getElementById('radar'));
        radar.setOption(option);
        radar.on('dblclick', function (params) {
            console.log("schoolsids",that.state.schoolids)
            let ids = that.state.schoolids.slice();
            let legend = [];
            let data = {};
            console.log(params);
            if (params.componentType == 'series') {
                for (let index in that.state.legend) {
                    if (that.state.legend[index] == params.name) {
                        ids.splice(index, 1);
                        break;
                    }
                }
                legend = getSchoolsNames(ids);
                data = getData(ids);
                that.setState({
                    legend:legend,
                    data:data,
                    schoolids:ids
                });
            }
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('radar got id', nextProps.id)
        let legend = [];//['qinghua','beida']
        let data = {};//
        let schoolids = [];

        schoolids = getIds(nextProps.id, prevState.schoolids);
        legend = getSchoolsNames(schoolids);
        data = getData(schoolids);
        console.log("现有data", data);
        if (schoolids !== prevState.schoolids) {
            return {
                legend: legend,
                data: data,
                schoolids: schoolids
            }
        } else {
            onclose.log('props与prestate相同')
            return;
        }

    }

    componentDidUpdate() {
        let option = {
            legend: {
                data: this.state.legend,
                orient: "horizontal",
                center: 0,
                bottom: 10,
                textStyle: {
                    fontSize: 10,
                    color: '#8C8C8C'
                },
            },
            series: {
                data: this.state.data
            }
        };
        let radar = echarts.init(document.getElementById('radar'));
        radar.setOption(option);
    }
}