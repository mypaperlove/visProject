import React, { Component } from 'react'
import './controlup.css'
import { Layout, Button, Cascader, Icon } from 'antd';
import CH_PRO_CITY from '../controlup/CH_PRO_CITY'

export default class Controlup extends Component {

  state = {
    province: '省份',
    city: '城市',
  }

  clsA = 'Button';
  clsB = 'Button';
  clsC = 'Button';
  clsD = 'Button';

  onChange (value) {
    this.setState({
      province: value[0],
      city: value[1]
    })
    console.log(value);
  }

  componentDidMount () {
    //显示中国城市数据
    //console.log(CH_PRO_CITY)
  }
  clickButton = (params, e) => {
    this.props.buttontoMap(params);
    if(params == '985'){
      this.clsA = 'ButtonClickedA'
      this.clsB = 'Button'
      this.clsC = 'Button'
      this.clsD = 'Button'
    } else if(params == '211'){
      this.clsB = 'ButtonClickedB'
      this.clsA = 'Button'
      this.clsC = 'Button'
      this.clsD = 'Button'
    } else if(params == '双一流'){
      this.clsC = 'ButtonClickedC'
      this.clsA = 'Button'
      this.clsB = 'Button'
      this.clsD = 'Button'
    }else if(params == '一流学科建设高校'){
      this.clsD = 'ButtonClickedD'
      this.clsA = 'Button'
      this.clsB = 'Button'
      this.clsC = 'Button'
    }
    
    // console.log(params);
    // console.log(this);
  }
  render () {
    const { Header, Content } = Layout;
    const options = CH_PRO_CITY['data'];
    return (
      <div id='controlup'>
        <Layout>
          <Header>
            <Icon type="user" />
            控制面板
          </Header>

          <Content>
            {/* <div id="filter">
              筛选
            </div> */}
            <div id="label">
              <Button  shape="round" className={this.clsA} onClick={this.clickButton.bind(this, '985')}>985</Button>
              <Button  shape="round" className={this.clsB} onClick={this.clickButton.bind(this, '211')}>211</Button>

            </div>
            <div id="label">
              <Button  shape="round" className={this.clsC} onClick={this.clickButton.bind(this, '双一流')}>一流高校</Button>
              <Button  shape="round" className={this.clsD} onClick={this.clickButton.bind(this, '一流学科建设高校')}>一流学科高校</Button>
            </div>
            {/* <div>
              <Cascader
                defaultValue={['北京市', '海淀区']}
                showSearch='true'
                options={options}
                onChange={this.onChange.bind(this)}
              />
            </div> */}
          </Content>
        </Layout>
      </div>
    )
  }
}
