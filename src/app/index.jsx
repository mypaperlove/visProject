import React, { Component } from 'react'
import './app.css'

import Right from '../components/right'
import Martix from '../components/matrix'
import Radar from '../components/radar'
import Control from '../components/control'
import Map from '../components/map'
import '../../node_modules/antd/dist/antd.css'

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
