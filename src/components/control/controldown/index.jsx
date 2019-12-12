import React, { Component } from 'react'
import './controldown.css'
import { Slider } from 'antd';



export default class Controldown extends Component {
  state = {
    initialValue: 50,
    disabled: false,
    cityScore: '',
    reputationScore: '',
    doubleFirstClassScore: '',
    curriculumJudgement4th: '',
    electronicsScienceAndTechnology: '',
    informationAndCommunicationEngineering: '',
    controlScienceAndEngineering: '',
    computerScienceAndTechnology: '',
    softwareEngineering: ''
  };
  changeCityScore(value) {
    this.setState(
      {cityScore: value}
    )
    console.log('value:',value)
  }
  changeReputationScore(value) {
    this.setState(
      {reputationScore: value}
    )
    console.log('value:',value)
  }
  changeDoubleFirstClassScore(value) {
    this.setState(
      {doubleFirstClassScore: value}
    )
    console.log('value:',value)
  }
  changeCurriculumJudgement4th(value) {
    this.setState(
      {curriculumJudgement4th: value}
    )
    console.log('value:',value)
  }
  changeElectronicsScienceAndTechnology(value) {
    this.setState(
      {electronicsScienceAndTechnology: value}
    )
    console.log('value:',value)
  }
  changeInformationAndCommunicationEngineering(value) {
    this.setState(
      {informationAndCommunicationEngineering: value}
    )
    console.log('value:',value)
  }
  changeControlScienceAndEngineering(value) {
    this.setState(
      {controlScienceAndEngineering: value}
    )
    console.log('value:',value)
  }
  changeComputerScienceAndTechnology(value) {
    this.setState(
      {computerScienceAndTechnology: value}
    )
    console.log('value:',value)
  }
  changeSoftwareEngineering(value) {
    this.setState(
      {softwareEngineering: value}
    )
    console.log('value:',value)
  }

  handleDisabledChange = disabled => {
    this.setState({ disabled });
  }

  initialValueFun() {
    console.log("hhh")
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

  componentDidMount(){
    this.initialValueFun()
  }
  render () {
    const { initialValue, disabled, cityScore, reputationScore, doubleFirstClassScore, curriculumJudgement4th, 
      electronicsScienceAndTechnology, informationAndCommunicationEngineering, controlScienceAndEngineering, 
      computerScienceAndTechnology, softwareEngineering } = this.state;

    return (
      <div id='controldown'>
        <div>城市评分:{cityScore}</div>
        <Slider defaultValue={initialValue} disabled={disabled} onAfterChange={this.changeCityScore.bind(this)} />
        <div>知名度评分:{reputationScore}</div>
        <Slider defaultValue={initialValue} disabled={disabled} onAfterChange={this.changeReputationScore.bind(this)}/>
        <div>双一流评分:{doubleFirstClassScore}</div>
        <Slider defaultValue={initialValue} disabled={disabled} onAfterChange={this.changeDoubleFirstClassScore.bind(this)} />
        <div>第四轮学科评估评分:{curriculumJudgement4th}</div>
        <Slider defaultValue={initialValue} disabled={disabled} onAfterChange={this.changeCurriculumJudgement4th.bind(this)} />
        <div>电子科学与技术评分:{electronicsScienceAndTechnology}</div>
        <Slider defaultValue={initialValue} disabled={disabled} onAfterChange={this.changeElectronicsScienceAndTechnology.bind(this)}/>
        <div>信息与通信工程评分:{informationAndCommunicationEngineering}</div>
        <Slider defaultValue={initialValue} disabled={disabled} onAfterChange={this.changeInformationAndCommunicationEngineering.bind(this)} />
        <div>控制科学与工程评分:{controlScienceAndEngineering}</div>
        <Slider defaultValue={initialValue} disabled={disabled} onAfterChange={this.changeControlScienceAndEngineering.bind(this)} />
        <div>计算机科学与技术评分:{computerScienceAndTechnology}</div>
        <Slider defaultValue={initialValue} disabled={disabled} onAfterChange={this.changeComputerScienceAndTechnology.bind(this)}/>
        <div>软件工程评分:{softwareEngineering}</div>
        <Slider defaultValue={initialValue} disabled={disabled} onAfterChange={this.changeSoftwareEngineering.bind(this)} />
      </div>
    );
  
  };
}
