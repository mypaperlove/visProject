import React, { Component } from 'react'
import './controlup.css'
import { Layout, Button, Cascader, Icon } from 'antd';
import CH_PRO_CITY from '../controlup/CH_PRO_CITY'

export default class Controlup extends Component {

  state = {
    province: '省份',
    city: '城市',
  }
  //点击不同标签的事件函数
  clickButtonA () {
    console.log('点击A按钮事件触发')
  }
  clickButtonB () {
    console.log('点击B按钮事件触发')
  }
  clickButtonC () {
    console.log('点击C按钮事件触发')
  }
  clickButtonD () {
    console.log('点击D按钮事件触发')
  }

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
            <div>
              <Button id="ButtonA" onClick={this.clickButton.bind(this, '985')}>985</Button>
              <Button id="ButtonB" onClick={this.clickButton.bind(this, '211')}>211</Button>

            </div>
            <div>
              <Button id="ButtonC" onClick={this.clickButton.bind(this, '双一流')}>一流高校</Button>
              <Button id="ButtonD" onClick={this.clickButton.bind(this, '一流学科建设高校')}>一流学科高校</Button>
            </div>
            <div>
              <Cascader
                defaultValue={['北京市', '海淀区']}
                showSearch='true'
                options={options}
                onChange={this.onChange.bind(this)}
              />
            </div>
          </Content>
        </Layout>
      </div>
    )
  }
}
