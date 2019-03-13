import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { observer, inject} from 'mobx-react'

import './index.scss'

@inject('SearchState')
@observer
class HotRecommend extends Component {
    render() {
        const { initData } = this.props.SearchState
        if(!initData.newHotWords) return ''
        return (
            <div className="HotRecommend">
                <div className="title flex-between flex-middle">
                    <div className="txt">热门推荐</div>
                    {/* <div className="right">换一批 <i className="iconfont icon-refresh"></i></div> */}
                </div>
                <div className="list flex-between flex-content">
                    {
                        initData.newHotWords.map(item => {
                            return (
                                <Link to={`/BookDetail?id=${item.book}&title=${item.word}`} className="item flex-middle line-clamp1" key={item.book}>
                                    <i className="iconfont icon-wodedingdan"></i>{item.word}
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default HotRecommend