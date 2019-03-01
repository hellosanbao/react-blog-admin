import React, { Component } from 'react'

import './index.scss'

//components

import HotKeyword from '../HotKeyword'
import HotRecommend from '../HotRecommend'
import History from '../History'

class SearchInit extends Component {
    render(){
        return (
            <div className="SearchInit">
                <HotKeyword/>
                <HotRecommend/>
                <History/>
            </div>
        )
    }
}

export default SearchInit