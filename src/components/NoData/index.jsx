import React, { Component } from 'react'

import './index.scss'

class NoData extends Component {
    render() {
        return (
            <div {...this.props}>
                <div className="noData">
                    <i className="iconfont icon-Expression"></i>
                    <p>没有任何数据</p>
                </div>
            </div>
        )
    }
}

export default NoData