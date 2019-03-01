import React, { Component } from 'react'

import './index.scss'

//components
// import SearchInit from './components/SearchInit'
import SearchResult from './components/SearchResult'

class Search extends Component {
    render() {
        return (
            <div className="Search">
                <form action="">
                    <div className="searchHeader flex-middle">
                        <input className="flex1 flex-middle" placeholder="关键字" type="search" />
                        <div className="cancel">取消</div>
                    </div>
                </form>
                {/* <SearchInit /> */}
                <SearchResult/>
            </div>
        )
    }
}

export default Search