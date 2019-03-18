import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import querystring from 'querystring'
import { Link } from 'react-router-dom'
import { local } from "@src/util/util";
import { findIndex } from "lodash";

import './index.scss'

// import Detil from './data/dataDetail'

//components
import Star from '@src/components/Star'
import Loading from '@src/components/Loading'
import Modal from '@src/components/Modal'
import Toast from '@src/components/Toast'

@inject('BookDetailState')
@observer
class BookDetail extends Component {
    constructor(props) {
        super(props)
        const { title, id } = querystring.parse(this.props.location.search.replace('?', ''))
        document.title = title
        let collect = local('collectBooks') || []
        this.state = {
            showAllIntro: false,
            bookData: {},
            id,
            loading: true,
            showSource: false,
            isCollect: findIndex(collect,{id})>=0
        }
    }
    async componentDidMount() {
        const { getBookDetailInfo } = this.props.BookDetailState
        const bookData = await getBookDetailInfo(this.state.id, this)
        this.setState({
            bookData,
            loading: false
        })
    }
    handleMoreIntroClick() {
        this.setState({
            showAllIntro: true
        })
    }
    handleTreeClick() {
        if (this.state.bookData.chapterLast.length > 1) {
            this.setState({
                showSource: true
            })
        } else {
            let item = this.state.bookData.chapterLast[0]
            this.props.history.push(`/ChapterList?id=${item._id}&title=${this.state.bookData.title}`)
        }
    }
    getratingText(rating) {
        let text = '非常难看'
        if (rating == 10) {
            text = '必看神作'
        } else if (rating >= 8) {
            text = '非常喜欢'
        } else if (rating >= 6) {
            text = '值得一看'
        } else if (rating >= 4) {
            text = '比较一般'
        } else if (rating) {
            text = '不推荐看'
        }
        return text
    }
    collectBook() {
        const { id, bookData } = this.state
        let collect = local('collectBooks') || []
        if (this.state.isCollect) {
            this.setState({
                isCollect: false
            })
            let dropCollect = collect.filter(item => {
                return item.id != id
            })
            local('collectBooks', dropCollect)
        } else {
            this.setState({
                isCollect: true
            })
            let cBook = {
                id: id,
                name: bookData.title,
                cover:bookData.cover.formatImg(),
                sub:`${new Date(bookData.updated).diff()}更新 ${bookData.lastChapter}`
            }
            local('collectBooks', [cBook,...collect])
            Toast.show({content:'收藏成功'})
        }
    }
    componentWillUnmount() {
        this.cancelRequest()
    }
    render() {
        const { showAllIntro, bookData, loading, showSource, isCollect } = this.state
        if (loading) {
            return (<Loading />)
        }
        return (
            <div className="BookDetail">
                <div className="simperInfo flex">
                    <div className="pic">
                        <img src={bookData.cover.formatImg()} alt="" />
                    </div>
                    <div className="info">
                        <div className="title">{bookData.title}</div>
                        <div className="tip">
                            <span>{bookData.author}</span> | {bookData.majorCate}
                        </div>
                        {bookData.wordCount > 0 ? <div className="size">{bookData.wordCount.format()} 字</div> : ''}
                    </div>
                </div>
                <div className="views flex-middle">
                    <div className="point frist">
                        <div className="til flex-middle">
                            <span>{bookData.rating ? bookData.rating.score : '暂无评分'} </span>
                            <Star score={bookData.rating ? bookData.rating.score : 0} />
                        </div>
                        <p>{bookData.rating ? bookData.rating.count.format() : 0}人参与评论</p>
                    </div>
                    <div className="point flex1">
                        <p className="til">{bookData.retentionRatio}%</p>
                        <p>读者留存</p>
                    </div>
                    <div className="point">
                        <p className="til">{bookData.latelyFollower.format()}</p>
                        <p>追书人气</p>
                    </div>
                </div>
                <div className="intro">
                    <div className="title">简介</div>
                    <div className={`tx ${showAllIntro ? '' : 'line-clamp3'}`}>{bookData.longIntro}</div>
                    {
                        showAllIntro ? '' : (
                            <i
                                onClick={this.handleMoreIntroClick.bind(this)}
                                className="iconfont icon-Down">
                            </i>
                        )
                    }

                </div>
                {
                    <Modal show={showSource}>
                        <div className="sourceContent">
                            <div className="title">选择书源</div>
                            <div className="sourceList">
                                {
                                    bookData.chapterLast.map(((item, index) => {
                                        return (
                                            <Link key={item._id} to={`/ChapterList?id=${item._id}&title=${bookData.title}`} className={`item ${index == 0 ? 'gf' : ''}`}>{item.name}</Link>
                                        )
                                    }))
                                }
                            </div>
                        </div>
                    </Modal>
                }

                <div className="tree flex-middle flex-between" onClick={() => { this.handleTreeClick() }}>
                    <p className="til">目录</p>
                    <p className="line-clamp1 up">
                        <span className="time">{new Date(bookData.updated).diff()}更新</span>
                        {bookData.lastChapter}
                    </p>
                </div>

                {
                    bookData.coment.total > 0 ? (
                        <div className="coment">
                            <div className="title">
                                <p><span>热门评论</span> {bookData.coment.total.format()}</p>
                            </div>
                            <div className="contentList">
                                {
                                    bookData.coment.reviews.map(coment => {
                                        return (
                                            <div className="item" key={coment._id}>
                                                <div className="user flex-middle">
                                                    <img src={coment.author.avatar.formatImg()} alt="" className="avatar" />
                                                    <div className="name">{coment.author.nickname}</div>
                                                    <div className="level">Lv.{coment.author.lv}</div>
                                                </div>
                                                <div className="score flex-middle">
                                                    <Star score={coment.rating} />
                                                    &nbsp;&nbsp;&nbsp;{this.getratingText(coment.rating)}
                                                </div>
                                                <div className="txt">
                                                    <p className="coment-title">{coment.title}</p>
                                                    {coment.content}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {bookData.coment.total > 3 ? <div className="more">查看全部{bookData.coment.total.format()}条热评</div> : ''}
                        </div>
                    ) : ''
                }
                <Link to={`/Read?id=59155493efe79f2c46184c69&title=追书神器`} className="readbtn">开始阅读</Link>
                <div className={`collectbtn ${isCollect ? 'collect' : ''}`} onClick={() => { this.collectBook(isCollect) }}>
                    {isCollect ? '取消收藏' : '收藏书籍'}
                </div>
            </div>
        )
    }
}

export default BookDetail