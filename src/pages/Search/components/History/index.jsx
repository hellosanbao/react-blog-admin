import React, { Component } from 'react'
import { observer, inject} from 'mobx-react'

import './index.scss'

@inject('SearchState')
@observer
class History extends Component {
    render() {
        const { historySaerch, submit, clearHistory } = this.props.SearchState
        if(historySaerch.length==0) return ''
        return (
            <div className="History">
                <div className="title flex-between flex-middle">
                    <div className="txt">历史搜索</div>
                    <div className="right" onClick={ clearHistory }>删除历史 <i className="iconfont icon-delete"></i></div>
                </div>
                <div className="list">
                    {
                        historySaerch.map(item=>{
                            return (
                                <div key={item} className="item" onClick={()=>{submit(item)}}><i className="iconfont icon-time"></i>{item}</div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default History