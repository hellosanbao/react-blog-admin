import React, { Component } from 'react'

import './index.scss'

import data from './data'

let hotdata = data.splice(0,15)

console.log(hotdata)

class HotKeyword extends Component {
    render() {
        return (
            <div className="HotKeyword">
                <div className="title flex-between flex-middle">
                    <div className="txt">搜索热词</div>
                    {/* <div className="right">查看更多 <i className="iconfont icon-right"></i></div> */}
                </div>
                <div className="keyWordList">
                    {
                        hotdata.map(item => {
                            return (<span key={item.word} className="item">{item.word}</span>)
                        })
                    }
                </div>
            </div>
        )
    }
}

export default HotKeyword