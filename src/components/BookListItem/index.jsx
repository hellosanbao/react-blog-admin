/** 
 * 书单列表
 * @param {array[itemData]} sdList 书单列表
 * @param {object} itemData 单个书单数据
 * @itemData title {string} 书单标题
 * @itemData covers {arrag[string]} 书单封面图地址数组
 * @itemData tags {array[string]} 书单标签
 * @itemData desc {string} 书单介绍
 * @itemData bookCount {number} 书籍数量
 * @itemData collectorCount {number} 收集数量
*/

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

//components
import Title from '@src/components/Title'

import './index.scss'

class BookListItem extends Component {
    render() {
        const { sdList, title, href } = this.props
        return (
            <div className={`BookListItem ${this.props.className || ''}`}>
                {title ? (<Title href={href} title={title} />) : ''}
                {
                    sdList.map((itemData, index) => {
                        return (
                            <Link to={`/BookListDetail?title=${itemData.title.trimHash()}&id=${itemData._id}`} key={itemData._id} className={`itemContent flex ${index + 1 === sdList.length ? 'last' : ''}`}>
                                <div className="info flex1">
                                    <div className="title line-clamp1">{itemData.title}</div>
                                    {
                                        itemData.tags ? (
                                            <div className="tags">
                                                {itemData.tags.map((item, index) => {
                                                    return (<span className={`tag tag${index}`} key={item + index}>{item}</span>)
                                                })}
                                            </div>
                                        ) : ''
                                    }
                                    <div className="desc line-clamp2">{itemData.desc}</div>
                                    <div className="tip">{itemData.bookCount}本 | {itemData.collectorCount}收藏</div>
                                </div>
                                <div className="cover">
                                    {
                                        itemData.covers.map((item, index) => {
                                            return (
                                                <img key={item} className={`img${index + 1}`} src={item.formatImg()} alt="" />
                                            )
                                        })
                                    }
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        )
    }
}

export default BookListItem