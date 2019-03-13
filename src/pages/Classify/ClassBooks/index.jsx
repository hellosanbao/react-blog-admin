/**
 * 分类列表组件
 * @param {string} title 分类标题 
 * @param {array} list 分类列表数据
 * @list {string} name 书单分类名称
 * @list {number} books 书单分类书籍总数
 * @list {array[string]} imgs 书单分类 封面图
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '@src/config'

import './index.scss'


class ClassBooks extends Component {
    state = {
        titleMap: {
            'male': '男生',
            'female': '女生',
            'picture': '漫画',
            'press': '出版'
        }
    }
    render() {
        const { title, list } = this.props
        const { titleMap } = this.state
        return (
            <div className="ClassBooks">
                <div id={title} className="title flex-middle flex-center">
                    <span>{titleMap[title]}</span>
                </div>
                <div className="list flex-between flex-content">
                    {
                        list.map(item => {
                            return (
                                <Link to={`/ClassListDetail/${item.alias}/${item.name}`} key={item.name} className="item flex">
                                    <div className="info">
                                        <p className="name">{item.name}</p>
                                        <p className="books">{item.bookCount}本</p>
                                    </div>
                                    <div className="pic">
                                    {
                                        item.bookCover.map((item,index)=>{
                                            return(
                                                <img key={item} className={`img${index}`} src={config.imgBaseUrl+item} alt="" />
                                            )
                                        })
                                    }
                                    </div>
                                </Link>
                            )
                        })
                    }

                </div>
            </div>
        )
    }
}

export default ClassBooks