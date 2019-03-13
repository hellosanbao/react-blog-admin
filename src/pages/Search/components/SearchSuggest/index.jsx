import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './index.scss'

@inject('SearchState')
@observer
class SearchSuggest extends Component{
    handleClick(keyword){
        const { submit } = this.props.SearchState
        submit(keyword,this)
    }
    render(){
        const { list } = this.props
        return (
            <div className="searchSuggest">
                {
                    list.map((item,index)=>{
                        return (
                            <div onClick={()=>{ this.handleClick(item.text) }} className="item flex-middle" key={item.text+index}>
                                <i className="iconfont icon-Articlesvg"></i> {item.text}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default SearchSuggest