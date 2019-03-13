import React, { Component } from 'react'
import { inject, observer } from "mobx-react";
import './index.scss'

//components
import BookListItem from '@src/components/BookListItem'
import TabList from './components/TabList'


@inject('ThemeBookListState')
@observer
class ThemeBookList extends Component {
    constructor(props){
        super(props)
        document.title = '主题书单'
        this.state = {
            sdList:[]
        }
    }

    async componentWillMount(){
        const { getBooksByTag, setBookList } = this.props.ThemeBookListState
        //初始化获取本周最热的全部书籍
        let books = await getBooksByTag({
            sort:"last-seven-days",
            start:0,
        })
        setBookList(books.bookLists)
    }
    render(){
        const { bookList } = this.props.ThemeBookListState
        return(
            <div className="ThemeBookList">
                <TabList />
                {/* <video controls src="http://1256502851.vod2.myqcloud.com/cb286f0avodtransgzp1256502851/01735ca05285890786739267852/v.f220.m3u8"></video> */}
                <BookListItem sdList={bookList} />
            </div>
        )
    }
}

export default ThemeBookList