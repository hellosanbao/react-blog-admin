import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

class ReactSwiper extends Component {
    render() {
        return (
            <div className="home-nav flex">
                <Link to="/Classify" className="nav-item">
                    <img src={require('@src/assets/img/fenlei.png')} alt=""/>
                    <p>分类</p>
                </Link>
                <Link to="/Rank" className="nav-item">
                    <img src={require('@src/assets/img/jiangbei.png')} alt=""/>
                    <p>排行</p>
                </Link>
                <Link to="/ThemeBookList" className="nav-item">
                    <img src={require('@src/assets/img/shudan.png')} alt=""/>
                    <p>书单</p>
                </Link>
                <Link to="/ShuHuang" className="nav-item">
                    <img src={require('@src/assets/img/shuhuang.png')} alt=""/>
                    <p>书荒</p>
                </Link>
            </div>
        )
    }
}

export default ReactSwiper