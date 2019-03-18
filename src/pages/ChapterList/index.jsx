import React, { Component } from 'react'
import querystring from 'querystring'
import { inject, observer } from 'mobx-react'
import { scrollBottom } from '@src/util/util'
import { local } from '@src/util/util'

import './index.scss'

//components
import Loading from '@src/components/Loading'
@inject('ChapterListState')
@observer
class ChapterList extends Component {
    constructor(props) {
        super(props)
        const { title, id } = querystring.parse(this.props.location.search.replace('?', ''))
        let currentChapters = local('curChapters') || {}
        let currentChapter = currentChapters[id] || 0
        document.title = title
        this.state = {
            id,
            loading: true,
            chapterList: [],
            title,
            currentChapter
        }
    }
    async componentDidMount() {
        const { getChapterListInfo } = this.props.ChapterListState
        let chapterListInfo = await getChapterListInfo(this.state.id, this),
            start = 0
        this.setState({
            loading: false,
            chapterList: this.getCurentList(start, chapterListInfo.chapters)
        })
        start += 20
        scrollBottom(200, async () => {
            if (start < chapterListInfo.chapters.length) {
                let chapterList = this.state.chapterList.concat(this.getCurentList(start, chapterListInfo.chapters))
                this.setState({
                    chapterList
                })
                start += 20
            }
        })
    }
    getCurentList(start, array) {
        let arr = []
        for (let i = 0; i < 20; i++) {
            if (array[start + i]) {
                arr.push(array[start + i])
            }
        }
        return arr
    }
    handleClick(id,index) {
        this.setchapters(index)
        this.props.history.push(`Read?id=${id}&title=${this.state.title}`)
    }
    handleHref(link,index){
        this.setchapters(index)
        window.location.href = link
    }
    setchapters(index){
        let Chapters = local('curChapters') || {}
        let curent = {}
        curent[this.state.id] = index
        local('curChapters',{...Chapters,...curent})
    }
    componentWillUnmount() {
        this.cancelRequest()
    }
    render() {
        const { chapterList, title, loading, currentChapter } = this.state
        if (loading) {
            return (<Loading />)
        }
        return (
            <div className="chapterList">
                {
                    chapterList.map((item, index) => {
                        if (item.id) {
                            return (
                                // <Link key={item.id || item.link} className={`chapterListItem ${index == currentChapter?'active':'' }`} to={`Read?id=${item.id || encodeURIComponent(item.link)}&title=${title}`}>
                                //   {index+1}. {item.title}
                                // </Link>
                                <div
                                    key={item.id || item.link}
                                    className={`chapterListItem ${index == currentChapter ? 'active' : ''}`}
                                    onClick={() => { this.handleClick(item.id,index) }}
                                    to={`Read?id=${item.id || encodeURIComponent(item.link)}&title=${title}`}>
                                    {index + 1}. {item.title}
                                </div>
                            )
                        } else {
                            return (
                                <div
                                    key={item.link}
                                    className={`chapterListItem ${index == currentChapter ? 'active' : ''}`}
                                    onClick={()=>{this.handleHref(item.link,index)}}>
                                    {item.title}
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    }
}

export default ChapterList