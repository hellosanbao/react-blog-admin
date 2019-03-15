import React, { Component } from 'react'
import { inject, observer } from "mobx-react";
import { scrollBottom } from "@src/util/util";
import './index.scss'

//components
import BookListItem from '@src/components/BookListItem'
import LoadMore from '@src/components/LoadMore'
import TabList from './components/TabList'


@inject('ThemeBookListState')
@observer
class ThemeBookList extends Component {
    constructor(props){
        super(props)
        document.title = '主题书单'
        this.state = {
            hasMore:true
        }
    }

    async componentWillMount(){
        const { getBooksByTag, setBookList } = this.props.ThemeBookListState
        //初始化获取本周最热的全部书籍
        let books = await getBooksByTag({
            sort:"last-seven-days",
            start:0,
        })
        if(books.length<20){
            this.setState({hasMore:false})
        }
        setBookList(books.bookLists)
        this.scrollBottom()
    }
    scrollBottom(){
        const { getBooksByTag, setBookList } = this.props.ThemeBookListState
        let start = 20
        scrollBottom(100,async ()=>{
            const { bookList } = this.props.ThemeBookListState
            let books = await getBooksByTag({
                start,
            })
            if(books.bookLists.length<20){
                this.setState({hasMore:false})
            }
            start+=20
            setBookList(bookList.concat(books.bookLists))
        })
    }
    render(){
        const { bookList } = this.props.ThemeBookListState
        const { hasMore } = this.state
        return(
            <div className="ThemeBookList">
                <TabList />
                {/* <video controls src="http://1256502851.vod2.myqcloud.com/cb286f0avodtransgzp1256502851/01735ca05285890786739267852/v.f220.m3u8"></video> */}
                {
                    bookList.length?<div className="animated fadeIn"><BookListItem sdList={bookList} /></div>:''
                }
                
                <LoadMore more={hasMore}/>
            </div>
        )
    }
}

export default ThemeBookList