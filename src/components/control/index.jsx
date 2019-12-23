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



  render () {
    return (
      <div className='col-md-3' id='control'>
        <Controlup buttontoMap={this.props.buttontoMap} />
        {/* step1 从controldown组件获取数据 */}
        <Controldown handleChildData={this.props.handleChildData} />

      </div>
    )
  }
}
