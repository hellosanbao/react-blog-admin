import React, { Component } from 'react'
import ReactScroll from '@src/components/ReactScroll'


import './index.scss'

class Test extends Component {
    componentDidMount(){
        console.log(this.refs.warp.ScrollObject)
    }
    render() {
        let option = {
            startY:-300
        }
        return (
            <div className="Test">
                <ReactScroll ref='warp' option={option} className="warp">
                    <div className="content">
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                        <p>asjdashdkasdhkajskkahsldja</p>
                    </div>
                </ReactScroll>
            </div>
        )
    }
}

export default Test