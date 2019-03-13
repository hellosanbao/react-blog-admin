import React, { Component } from 'react'

import './index.scss'

class LoadMore extends Component {
    render(){
        const { more } = this.props
        return (
            <div className="loadmore flex-middle flex-center">
                {
                    more?(
                        <div className="flex-middle">
                            {/* <p className="loadtext">加载中</p> */}
                            <div className="warp">
                                <div className="k-ball7a" ></div>
                                <div className="k-ball7b" ></div>
                                <div className="k-ball7c" ></div>
                                <div className="k-ball7d" ></div>
                            </div>
                        </div>
                    ):'到底啦~'
                }
            </div>
        )
    }
}

export default LoadMore


