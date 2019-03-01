import React, { Component } from 'react'

import './index.scss'

import data from './data'

//components
import BookList from './components/BookList'

class BookListDetail extends Component {
    render(){
        return (
            <div className="BookListDetail">
                <div className="user flex-middle">
                    <img className="avatar" src={data.author.avatar.formatImg()} alt=""/>
                    <div className="info">
                        <div className="name">{data.author.nickname}</div>
                        <div className="time">{new Date(data.updated).diff()}</div>
                    </div>
                </div>
                <div className="intro">
                    <div className="title">{data.title}</div>
                    <div className="desc">{data.desc}</div>
                </div>
                <BookList booklist = {data.books}/>
            </div>
        )
    }
}

export default BookListDetail