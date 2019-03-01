import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

class HomeHead extends Component {
    render() {
        return (
            <div className="homeHead flex-between">
                <Link to="/Search" className="search flex1">
                    <i className="iconfont icon-search"></i>
                    搜索
                </Link>
                <Link to="/BookShelf" className="classify">
                    <i className="iconfont icon-shujia"></i>
                    <p>书架</p>
                </Link>
            </div>
        )
    }
}

export default HomeHead