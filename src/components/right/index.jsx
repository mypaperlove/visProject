import React, { Component } from 'react'
import './right.css'

import Bar from './bar'
import Scatter from './scatter'
import Message from './message'


export default class Right extends Component {
  render () {
    return (
      <>
        <Message maptoMessage={this.props.maptoMessage} />
        <Bar maptoBar={this.props.maptoBar} />
        <Scatter />
      </>
    )
  }
}
