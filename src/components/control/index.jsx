import React, { Component } from 'react'
import './control.css'

import Controldown from './controldown'
import Controlup from './controlup'

export default class Control extends Component {
  render () {
    return (
      <div className='col-md-3' id='control'>
        <Controlup />
        <Controldown />
      </div>
    )
  }
}
