import React, { Component } from 'react'
import './controldown.css'
import { Slider, Button} from 'antd';


export default class Controldown extends Component {
  state = {
    initialValue: 50,
    cityScore: '',
    reputationScore: '',
    doubleFirstClassScore: '',
    curriculumJudgement4th: '',
    electronicsScienceAndTechnology: '',
    informationAndCommunicationEngineering: '',
    controlScienceAndEngineering: '',
    computerScienceAndTechnology: '',
    softwareEngineering: '',
    confirm: '确定',
    change: '重新选值'
  };
  changeCityScore (value) {
    this.setState(
      { cityScore: value }
    )
  }
  changeReputationScore (value) {
    this.setState(
      { reputationScore: value }
    )
  }
  changeDoubleFirstClassScore (value) {
    this.setState(
      { doubleFirstClassScore: value }
    )
  }
  changeCurriculumJudgement4th (value) {
    this.setState(
      { curriculumJudgement4th: value }
    )
  }
  changeElectronicsScienceAndTechnology (value) {
    this.setState(
      { electronicsScienceAndTechnology: value }
    )
  }
  changeInformationAndCommunicationEngineering (value) {
    this.setState(
      { informationAndCommunicationEngineering: value }
    )
  }
  changeControlScienceAndEngineering (value) {
    this.setState(
      { controlScienceAndEngineering: value }
    )
  }
  changeComputerScienceAndTechnology (value) {
    this.setState(
      { computerScienceAndTechnology: value }
    )
  }
  changeSoftwareEngineering (value) {
    this.setState(
      { softwareEngineering: value }
    )
  }

  handleDisabledChange = disabled => {
    this.setState({ disabled });
  }

  initialValueFun () {
    // console.log("hhh")
    this.setState({
      cityScore: this.state.initialValue,
      reputationScore: this.state.initialValue,
      doubleFirstClassScore: this.state.initialValue,
      curriculumJudgement4th: this.state.initialValue,
      electronicsScienceAndTechnology: this.state.initialValue,
      informationAndCommunicationEngineering: this.state.initialValue,
      controlScienceAndEngineering: this.state.initialValue,
      computerScienceAndTechnology: this.state.initialValue,
      softwareEngineering: this.state.initialValue
    })
  }

  handleDisabledChange() {
    // if(this.state.disabled == false){
    //   this.setState({
    //     disabled: true
    //    })
    // } else{
    //   this.setState({
    //     disabled: false
    //    })
    // }
    
    // if (this.state.disabled == true) {
    //   var data = []
    //   data['cityScore'] = this.state.cityScore
    //   data['reputationScore'] = this.state.reputationScore
    //   data['doubleFirstClassScore'] = this.state.doubleFirstClassScore
    //   data['curriculumJudgement4th'] = this.state.curriculumJudgement4th
    //   data['electronicsScienceAndTechnology'] = this.state.electronicsScienceAndTechnology
    //   data['informationAndCommunicationEngineering'] = this.state.informationAndCommunicationEngineering
    //   data['controlScienceAndEngineering'] = this.state.controlScienceAndEngineering
    //   data['computerScienceAndTechnology'] = this.state.computerScienceAndTechnology
    //   data['softwareEngineering'] = this.state.softwareEngineering
    //   // console.log(data)
    //   // console.log(this);
    //   this.props.handleChildData(data);//step0 将数据上传给父组件control
    //   //console.log(this.props.value);
    //   this.setState({
    //     confirm: 'nmsl'
    //   })
    //   console.log(this.state.confirm)
    // } else{
    //   this.setState({
    //     confirm: '确定'
    //   })
    // }
  };

  componentDidMount () {
    this.initialValueFun()
  }
  testNmsl(){
    var data = []
    data['cityScore'] = this.state.cityScore
    data['reputationScore'] = this.state.reputationScore
    data['doubleFirstClassScore'] = this.state.doubleFirstClassScore
    data['curriculumJudgement4th'] = this.state.curriculumJudgement4th
    data['electronicsScienceAndTechnology'] = this.state.electronicsScienceAndTechnology
    data['informationAndCommunicationEngineering'] = this.state.informationAndCommunicationEngineering
    data['controlScienceAndEngineering'] = this.state.controlScienceAndEngineering
    data['computerScienceAndTechnology'] = this.state.computerScienceAndTechnology
    data['softwareEngineering'] = this.state.softwareEngineering
    // console.log(data)
    // console.log(this);
    this.props.handleChildData(data);//step0 将数据上传给父组件control
    console.log(data);
  }
  render () {
    const { initialValue, cityScore, reputationScore, doubleFirstClassScore, curriculumJudgement4th,
      electronicsScienceAndTechnology, informationAndCommunicationEngineering, controlScienceAndEngineering,
      computerScienceAndTechnology, softwareEngineering} = this.state;

    return (
      <div id='controldown'>
        
        {/* <Switch size="default" checkedChildren="重新取值" unCheckedChildren="确定" checked={disabled} onChange={this.handleDisabledChange.bind(this)} /> */}
        <div>城市评分:{cityScore}</div>
        <Slider defaultValue={initialValue} onAfterChange={this.changeCityScore.bind(this)} />
        <div>知名度评分:{reputationScore}</div>
        <Slider defaultValue={initialValue} onAfterChange={this.changeReputationScore.bind(this)} />
        <div>双一流评分:{doubleFirstClassScore}</div>
        <Slider defaultValue={initialValue} onAfterChange={this.changeDoubleFirstClassScore.bind(this)} />
        <div>第四轮学科评估评分:{curriculumJudgement4th}</div>
        <Slider defaultValue={initialValue} onAfterChange={this.changeCurriculumJudgement4th.bind(this)} />
        <div>电子科学与技术评分:{electronicsScienceAndTechnology}</div>
        <Slider defaultValue={initialValue} onAfterChange={this.changeElectronicsScienceAndTechnology.bind(this)} />
        <div>信息与通信工程评分:{informationAndCommunicationEngineering}</div>
        <Slider defaultValue={initialValue} onAfterChange={this.changeInformationAndCommunicationEngineering.bind(this)} />
        <div>控制科学与工程评分:{controlScienceAndEngineering}</div>
        <Slider defaultValue={initialValue} onAfterChange={this.changeControlScienceAndEngineering.bind(this)} />
        <div>计算机科学与技术评分:{computerScienceAndTechnology}</div>
        <Slider defaultValue={initialValue} onAfterChange={this.changeComputerScienceAndTechnology.bind(this)} />
        <div>软件工程评分:{softwareEngineering}</div>
        <Slider defaultValue={initialValue} onAfterChange={this.changeSoftwareEngineering.bind(this)} />
        <button id="ButtonP" onClick={this.testNmsl.bind(this)} >确定</button>
      </div>
    );

  };
}
