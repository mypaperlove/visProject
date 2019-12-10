import React, { Component } from 'react'
import './app.css'

import Right from '../right'
import Martix from '../matrix'
import Radar from '../radar'
import Control from '../control'
import Map from '../map'



export default class App extends Component {
  render () {
    return (
      <div className="row no-gutters" id='page'>
        <div className='col-md-10'>

          <div id='left-top' className='row no-gutters'>
            <Control />
            <Map />
          </div>

          <div id='left-bottom' className='row no-gutters'>
            <Radar />
            <Martix />
          </div>

        </div>

        <div className='col-md-2'>
          <Right />
        </div>
      </div>
    )
  }
}
