import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

class BookList extends Component {
    render() {
        const { booklist } = this.props
        return (
            <div className="BookList">
                <div className="list">
                    {
                        booklist.map(item => {
                            return (
                                <Link to={`BookDetail?id=${item.book._id}&title=${item.book.title.trimHash()}`} className="item" key={item.book._id}>
                                    <div className="book flex-middle">
                                        <img src={item.book.cover.formatImg()} alt="" />
                                        <div className="info">
                                            <div className="title">{item.book.title}</div>
                                            <div className="auth">{item.book.author}</div>
                                            <div className="tip">
                                                <span>{item.book.latelyFollower.format()} 人气</span>
                                                <span>{item.book.majorCate}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        item.comment?(<div className="bookIntro">{`"${item.comment}"`}</div>):""
                                    }
                                    
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default BookList