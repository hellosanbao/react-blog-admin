import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

class BookSimpleList extends Component {
    render() {
        const { booksimplelist } = this.props
        return (
            <div className="book-simple-list flex">
                {
                    booksimplelist.map((item,index)=>{
                        return (
                            <Link to={`/BookDetail?id=${item._id}&title=${item.title.trimHash()}`} key={item._id} className="item">
                                <img src={item.cover} alt=""/>
                                <div className="line-clamp2">{item.title}</div>
                            </Link>
                        )
                    })
                }
            </div>
        )
    }
}

export default BookSimpleList