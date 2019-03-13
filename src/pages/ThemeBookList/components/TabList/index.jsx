/**
 * 主题书单分类tab组件
 */

import React, { Component } from 'react'
import { findIndex } from 'lodash'
import { observer, inject } from "mobx-react";
import { ModalHelper } from '@src/util/util'
import './index.scss'

@inject('ThemeBookListState')
@observer
class TabList extends Component {
    state = {
        nameIndex: -1,
        tagIndex: -1,
        showFilter: false,
        currentHead: 0,
        currentSub: 0,
        head: ['本周最热', '最新发布', '最多收藏'],
        sub: [
            {
                nameIndex: 0,
                tagIndex: 0,
                name: '男生'
            },
            {
                nameIndex: 0,
                tagIndex: 1,
                name: '女生'
            },
            {
                nameIndex: 4,
                tagIndex: 5,
                name: '玄幻'
            },
            {
                nameIndex: 1,
                tagIndex: 0,
                name: '都市'
            },
            {
                nameIndex: 3,
                tagIndex: 4,
                name: '职场'
            }
        ],
    }
    async componentWillMount() {
        const { getFilterTags } = this.props.ThemeBookListState
        await getFilterTags(this)
    }
    toogleFilter() {
        const { onToggleFilter } = this.props
        this.setState({
            showFilter: !this.state.showFilter
        })
        onToggleFilter && onToggleFilter(!this.state.showFilter)
    }
    async handleHeadClick(index) {
        this.setState({
            currentHead: index
        })
        let sort = 'collectorCount', duration = 'all'
        if(index == 0){
            duration= 'last-seven-days'
        }else if(index ==1){
            sort = 'created'
        }
        this.changeTag({
            sort,
            duration
        })

    }
    async handleSubClick(index) {
        if(index == this.state.currentSub) return
        let sub = [{ nameIndex: -1, tagIndex: -1, name: '全部' }, ...this.state.sub]
        let { tagIndex, nameIndex, name } = sub[index]
        this.setState({
            currentSub: index,
            tagIndex,
            nameIndex
        })
        this.changeTag({tag:name})
        
    }
    handleCoverTagClick(nameIndex, tagIndex) {
        const { sub } = this.state
        const { FilterTags } = this.props.ThemeBookListState
        this.setState({
            nameIndex,
            tagIndex,
            showFilter: false
        })
        let currentTag = {
            nameIndex,
            tagIndex,
            name: FilterTags[nameIndex].tags[tagIndex]
        }
        let currentIndex = findIndex(sub, { name: currentTag.name })
        if (currentIndex < 0) {
            sub.unshift(currentTag)
            sub.splice(sub.length - 1, 1)
            this.setState({
                currentSub: 1
            })
        } else {
            this.setState({
                currentSub: currentIndex + 1
            })
        }
        this.changeTag({tag:currentTag.name})
    }
    async changeTag(opt){
        const { getBooksByTag, setBookList } = this.props.ThemeBookListState
        let books = await getBooksByTag({
            ...opt,
            start:0
        })
        setBookList(books.bookLists)
    }
    render() {
        const { showFilter, sub } = this.state
        const { FilterTags } = this.props.ThemeBookListState
        let sublist = [{ nameIndex: -1, tagIndex: -1, name: '全部' }, ...sub]
        if(showFilter){
            ModalHelper.afterOpen()
        }else{
            ModalHelper.beforeClose()
        }
        return (
            <div className="TabList">
                <div className="warp">
                    <div className="content">
                        <div className="head">
                            {this.state.head.map((item, index) => {
                                return (
                                    <span
                                        className={this.state.currentHead === index ? 'current' : ''}
                                        onClick={() => { this.handleHeadClick(index) }}
                                        key={item}>
                                        {item}
                                    </span>
                                )
                            })}
                            {/* <span className="current">最多收藏</span> */}
                        </div>
                        <div className="sub">
                            <div className="simple flex-between">
                                <div className="tab">
                                    {sublist.map((item, index) => {
                                        return (
                                            <span
                                                className={this.state.currentSub === index ? 'current' : ''}
                                                onClick={() => { this.handleSubClick(index) }}
                                                key={item.name}>
                                                {item.name}
                                            </span>
                                        )
                                    })}
                                </div>
                                <div
                                    onClick={this.toogleFilter.bind(this)}
                                    className="filterBtn">
                                    筛选 <i className={`iconfont icon-down ${showFilter ? 'show' : ''}`}></i>
                                </div>
                            </div>
                        </div>

                        {showFilter ? (
                            <div className="mask animated fadeIn" onClick={this.toogleFilter.bind(this)}></div>
                        ) : ''}

                        <div className={`coverTabs ${showFilter ? 'show' : ''}`}>
                            {FilterTags.map((item, nameIndex) => {
                                return (
                                    <div key={item.name} className="block">
                                        <div className="title">{item.name}</div>
                                        <div className="list">
                                            {item.tags.map((tag, tagIndex) => {
                                                let className = ''
                                                if (nameIndex === this.state.nameIndex && tagIndex === this.state.tagIndex) {
                                                    className = 'current'
                                                }
                                                return (
                                                    <span
                                                        onClick={() => { this.handleCoverTagClick(nameIndex, tagIndex) }}
                                                        className={className} key={tag}>
                                                        {tag}
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )

                            })}
                        </div>
                    </div></div>
            </div>
        )
    }
}

export default TabList