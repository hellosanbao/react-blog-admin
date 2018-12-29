import React, { Component } from 'react'
import connect from '../../util/redux-connect'
import { action } from './store'

import './index.scss'
import { Button } from 'antd';

@connect('home',action)
class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            msg:'hello world'
        }
    }
    test(text){
        // this.props.todoapp(text)
        this.props.history.push('/artlist')
    }
    render(){
        return (
            <div>
                <Button onClick={()=>this.test('222')} type="primary">Button2</Button>
                {this.props.text}
            </div>
        )
    }
}

export default Home
