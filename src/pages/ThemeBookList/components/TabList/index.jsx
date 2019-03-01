/**
 * 主题书单分类tab组件
 */

import React, { Component } from 'react'
import { findIndex } from 'lodash'
import './index.scss'

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
        filterTag: [
            {
                "name": "性别",
                "tags": [
                    "男生",
                    "女生",
                ]
            },
            {
                "name": "时空",
                "tags": [
                    "都市",
                    "古代",
                    "科幻",
                    "架空",
                    "重生",
                    "未来",
                    "穿越",
                    "历史",
                    "快穿",
                    "末世",
                    "异界位面"
                ]
            },
            {
                "name": "情感",
                "tags": [
                    "纯爱",
                    "热血",
                    "言情",
                    "现言",
                    "古言",
                    "情有独钟",
                    "搞笑",
                    "青春",
                    "欢喜冤家",
                    "爽文",
                    "虐文"
                ]
            },
            {
                "name": "人设",
                "tags": [
                    "同人",
                    "娱乐明星",
                    "女强",
                    "帝王",
                    "职场",
                    "女配",
                    "网配",
                    "火影",
                    "金庸",
                    "豪门",
                    "扮猪吃虎",
                    "谋士",
                    "特种兵",
                    "教师"
                ]
            },
            {
                "name": "流派",
                "tags": [
                    "变身",
                    "悬疑",
                    "系统",
                    "网游",
                    "推理",
                    "玄幻",
                    "武侠",
                    "仙侠",
                    "恐怖",
                    "奇幻",
                    "洪荒",
                    "犯罪",
                    "百合",
                    "种田",
                    "惊悚",
                    "轻小说",
                    "技术流",
                    "耽美",
                    "竞技",
                    "无限"
                ]
            }
        ]
    }
    toogleFilter() {
        const { onToggleFilter } = this.props
        this.setState({
            showFilter: !this.state.showFilter
        })
        onToggleFilter && onToggleFilter(!this.state.showFilter)
    }
    handleHeadClick(index) {
        this.setState({
            currentHead: index
        })
    }
    handleSubClick(index) {
        let sub  = [{ nameIndex: -1, tagIndex: -1, name: '全部' },...this.state.sub]
        let { tagIndex, nameIndex } = sub[index]
        this.setState({
            currentSub: index,
            tagIndex, 
            nameIndex
        })
    }
    handleCoverTagClick(nameIndex, tagIndex) {
        const { sub } = this.state
        this.setState({
            nameIndex,
            tagIndex,
            showFilter: false
        })
        let currentTag = {
            nameIndex,
            tagIndex,
            name:this.state.filterTag[nameIndex].tags[tagIndex]
        }
        let currentIndex = findIndex(sub,{name:currentTag.name})
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

    }
    render() {
        const { showFilter, sub } = this.state
        let sublist = [{ nameIndex: -1, tagIndex: -1, name: '全部' },...sub]
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
                            {this.state.filterTag.map((item, nameIndex) => {
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