import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

class Title extends Component {
    render(){
        return (
            <Link to={this.props.href || ''} className={`title-component flex-between flex-middle ${this.props.className}`}>
                <div className="title">{this.props.title || '追书神器'}</div>
                <div className="more">查看更多 <i className="iconfont icon-right"></i></div>
            </Link>
        )
    }
}

export default Title