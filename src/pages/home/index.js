import React, { Component } from 'react'
import connect from '../../util/redux-connect'
import { action } from './store'
import CherryBlossoms from '../../components/CherryBlossoms/index'
import './index.scss'

@connect('home',action)
class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            msg:'hello world'
        }
    }
    render(){
        return (
            <div>
                <CherryBlossoms>
                    <div>
                        hello
                        <div> world</div>
                    </div>
                </CherryBlossoms>
            </div>
        )
    }
}

export default Home
