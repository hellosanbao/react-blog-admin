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
                            <Link to="/BookDetail" key={item.title + index} className="item">
                                <img src={item.cover} alt=""/>
                                <p className="line-clamp2">{item.title}</p>
                            </Link>
                        )
                    })
                }
            </div>
        )
    }
}

export default BookSimpleList