import React, { Component } from 'react'
import { observer, inject} from 'mobx-react'

import './index.scss'

@inject('SearchState')
@observer
class HotKeyword extends Component {
    render() {
        const { submit } = this.props.SearchState
        const { initData } = this.props.SearchState
        if(!initData.hotKeys) return ''
        return (
            <div className="HotKeyword">
                <div className="title flex-between flex-middle">
                    <div className="txt">搜索热词</div>
                    {/* <div className="right">查看更多 <i className="iconfont icon-right"></i></div> */}
                </div>
                <div className="keyWordList">
                    {
                        initData.hotKeys.map(item => {
                            return (<span key={item.word} className="item" onClick={()=>{submit(item.word)}}>{item.word}</span>)
                        })
                    }
                </div>
            </div>
        )
    }
}

export default HotKeyword