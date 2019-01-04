import React, { Component } from 'react'
import './index.scss'
import CherryBlossomsInit from './xShare.script.js'

class CherryBlossoms extends Component {
    componentDidMount(){
        CherryBlossomsInit()
    }
    render(){
        return(
            <div>
                <canvas id="sakura" width="1368" height="718"></canvas>
                <div class="btnbg">{this.props.children}</div>
            </div>
        )
    }
}

export default CherryBlossoms