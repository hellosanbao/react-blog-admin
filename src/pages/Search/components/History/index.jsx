import React, { Component } from 'react'

import './index.scss'

class History extends Component {
    render() {
        return (
            <div className="History">
                <div className="title flex-between flex-middle">
                    <div className="txt">历史搜索</div>
                    <div className="right">删除历史 <i className="iconfont icon-delete"></i></div>
                </div>
                <div className="list">
                    <div className="item"><i className="iconfont icon-time"></i>斗罗大陆</div>
                    <div className="item"><i className="iconfont icon-time"></i>斗罗大陆</div>
                    <div className="item"><i className="iconfont icon-time"></i>斗罗大陆</div>
                </div>
            </div>
        )
    }
}

export default History