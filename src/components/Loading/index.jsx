import React, { Component } from 'react'
import './index.scss'

class Loading extends Component {
    render() {
        return (
            <div className="loading">
                <div className="warp">
                    <div className="k-ball7a" ></div>
                    <div className="k-ball7b" ></div>
                    <div className="k-ball7c" ></div>
                    <div className="k-ball7d" ></div>
                </div>
            </div>
        )
    }
}

export default Loading