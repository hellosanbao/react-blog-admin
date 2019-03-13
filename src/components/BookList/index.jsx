/**
 * 书籍列表组件
 * @param {array[book]} booklist 书籍列表
 * @book {staring} cover  封面图
 * @book {string} title 标题
 * @book {string} desc 简介
 * @book {string} author 作者，不传则不显示
 * @book {string} majorCate 标签，不传则不显示
 * @book {string} minorCate 简单分类，不传则不显示
 * @book {number} wordCount 书籍字数，不传则不显示
 * @book {number} human 人气，不传则不显示
 * @book {number} retain 读者留存，不传则不显示
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

class BookList extends Component {
    render() {
        const { booklist } = this.props
        return (
            <div className="book-list">
                {
                    booklist.map((item, index) => {
                        return (
                            <Link to={`/BookDetail?id=${item._id}&title=${item.title.trimHash()}`} key={item._id+index} className="book-item flex">
                                <div>
                                    <img src={ item.cover.formatImg() } alt="" className="book-cover" />
                                </div>
                                <div className={`info flex1 ${booklist.length === index + 1 ? 'last' : ''}`}>
                                    <h1 className="book-title">{item.title}</h1>
                                    <div className="book-desc line-clamp2">{item.shortIntro}</div>
                                    <div className="hot flex">
                                        {item.human ? (<p className="txt"><span>{item.human}</span> 人气</p>) : ''}
                                        {item.retain ? (<p className="txt"><span>{item.retain}</span> 读者留存</p>) : ''}
                                    </div>
                                    <div className="tip flex-between">
                                        {item.author ? (
                                            <div className="auth">
                                                <i className="iconfont icon-Percapita"></i>
                                                {item.author}
                                            </div>
                                        ) : ''}
                                        <div className="tag">
                                            {item.majorCate ? (<span>{item.majorCate}</span>) : ''}
                                            {item.minorCate ? (<span>{item.minorCate}</span>) : ''}
                                            {/* {item.wordCount ? (<span>{item.wordCount.format()}字</span>) : ''} */}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        )
    }
}

export default BookList