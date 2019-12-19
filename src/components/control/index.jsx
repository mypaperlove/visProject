import React, { Component } from 'react'
import './control.css'

import Controldown from './controldown'
import Controlup from './controlup'

export default class Control extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '一路向北',
    };
  }

  // handleData(data){
  //     // console.log(data);
  //     this.setState({
  //       data:data
  //     })
  //     this.props.handlechildData(data);//step2 上传给app组件
  //     // console.log(this.state.data)
  // }

  render () {
    return (
      <div className='col-md-3' id='control'>
        <Controlup />
        {/* step1 从controldown组件获取数据 */}
        <Controldown handleChildData={this.props.handleChildData}/>
        
      </div>
    )
  }
}
