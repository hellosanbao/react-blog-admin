import React, { Component } from 'react'

import './index.scss'

import data from './data'

let rdata = data.splice(0,6)

class HotRecommend extends Component {
    render() {
        return (
            <div className="HotRecommend">
                <div className="title flex-between flex-middle">
                    <div className="txt">热门推荐</div>
                    <div className="right">换一批 <i className="iconfont icon-refresh"></i></div>
                </div>
                <div className="list flex-between flex-content">
                    {
                        rdata.map(item => {
                            return (
                                <div className="item flex-middle line-clamp1" key={item.book}>
                                    <i className="iconfont icon-wodedingdan"></i>{item.word}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default HotRecommend