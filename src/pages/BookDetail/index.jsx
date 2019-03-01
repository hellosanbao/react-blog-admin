import React, { Component } from 'react'
import { formatCountTime } from '@src/util/util'

import './index.scss'

import Detil from './data/dataDetail'

//components
import Star from '@src/components/Star'

class BookDetail extends Component {
    constructor(props) {
        super(props)
        document.title = '书籍详情'
    }
    state = {
        showAllIntro: false,
        bookData:Detil
    }
    handleMoreIntroClick() {
        this.setState({
            showAllIntro: true
        })
    }
    render() {
        const { showAllIntro, bookData } = this.state
        return (
            <div className="BookDetail">
                <div className="simperInfo flex">
                    <div className="pic">
                        <img src={bookData.cover.replace('/agent/','')} alt="" />
                    </div>
                    <div className="info">
                        <div className="title">{bookData.title}</div>
                        <div className="tip">
                            <span>{bookData.author}</span> | {bookData.majorCate}
                        </div>
                        <div className="size">{Math.floor(bookData.wordCount/10000)} 万字</div>
                    </div>
                </div>
                <div className="views flex-middle">
                    <div className="point frist">
                        <div className="til flex-middle">
                            <span>{bookData.rating.score} </span>
                            <Star score={bookData.rating.score}/>
                        </div>
                        <p>237人参与评论</p>
                    </div>
                    <div className="point flex1">
                        <p className="til">{bookData.retentionRatio}%</p>
                        <p>读者留存</p>
                    </div>
                    <div className="point">
                        <p className="til">{bookData.latelyFollower}</p>
                        <p>追书人气</p>
                    </div>
                </div>
                <div className="intro">
                    <div className="title">简介</div>
                    <div className={`tx ${showAllIntro?'':'line-clamp3'}`}>{bookData.longIntro}</div>
                    {
                        showAllIntro ? '' : (
                            <i
                                onClick={this.handleMoreIntroClick.bind(this)}
                                className="iconfont icon-Down">
                            </i>
                        )
                    }

                </div>
                <div className="tree flex-middle flex-between">
                    <p className="til">目录</p>
                    <p className="line-clamp1 up">
                        <span className="time">{formatCountTime(Date.now()- new Date(bookData.updated).getTime())}更新</span>
                        {bookData.lastChapter}
                    </p>
                </div>
                <div className="coment">
                    <div className="title">
                        <p><span>热门评论</span> 204条</p>
                    </div>
                    <div className="contentList">
                        <div className="item">
                            <div className="user flex-middle">
                                <img src={bookData.cover.replace('/agent/','')} alt="" className="avatar"/>
                                <div className="name">是肯定就是</div>
                                <div className="level">Lv.10</div>
                            </div>
                            <div className="score flex-middle">
                                <Star score={8.1}/>
                                &nbsp;&nbsp;&nbsp;非常喜欢
                            </div>
                            <div className="txt">
                                {bookData.longIntro}
                            </div>
                        </div>
                    </div>
                    <div className="more">查看全部204条热评</div>
                </div>
            </div>
        )
    }
}

export default BookDetail