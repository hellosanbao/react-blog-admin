import React, { Component } from 'react'
import { wrapAnimation } from '@src/util/wrapAnimation'
import './index.scss'
import sdList from './data/booklist'

//components
import BookListItem from '@src/components/BookListItem'
import TabList from './components/TabList'

class ThemeBookList extends Component {
    constructor(props){
        super(props)
        document.title = '主题书单'
    }

    render(){
        return(
            <div className="ThemeBookList">
                <TabList />
                <BookListItem sdList={sdList} />
            </div>
        )
    }
}

export default wrapAnimation(ThemeBookList)