/**
 * 旁行榜书籍列表组件
 * @param {array} list 书籍列表
 * @list {string} cover 封面
 * @list {string} title 标题
 * @list {string} shortIntro 介绍
 * @list {string} minorCate tag
 * @list {string} bookIndicator 热度
 * @list {string} author 作者
 */
import React, { Component } from 'react'
import './index.scss'

class BookList extends Component {
    render() {
        const { list } = this.props
        return (
            <div className="BookList">
                {
                    list.map(item => {
                        return (
                            <div className="item flex-middle flex-between">
                                <div className="pic">
                                    <img src={item.cover.replace('//statics.zhuishushenqi.com/agent/','')} alt="" />
                                </div>
                                <div className="info flex1">
                                    <div className="title line-clamp1">{item.title}</div>
                                    <div className="desc line-clamp2">{item.shortIntro}</div>
                                    <div className="tip flex-between">
                                        <div className="auth">{item.author}</div>
                                        <div className="tag flex">
                                            <span>{item.minorCate}</span>
                                            <span className="rd">{item.bookIndicator}</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default BookList