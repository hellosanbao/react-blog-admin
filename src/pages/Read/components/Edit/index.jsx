import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import ReactScroll from '@src/components/ReactScroll'
import './index.scss'

@inject('ChapterListState', 'ReadState')
@observer
class Edit extends Component {
    state = {
        showEdit: false,
        showTool: false,
        chapterList: [],
        showChapter: false,
        removeChapter: true
    }
    async componentWillMount() {
        const { bookId } = this.props
        const { getChapterListInfo } = this.props.ChapterListState
        const { initChapterList } = this.props.ReadState
        this.chapterListInfo = await getChapterListInfo(bookId, this)
        this.start = 0
        this.limit = 100
        initChapterList(this.chapterListInfo.chapters)
        this.setState({
            chapterList: this.getCurentList(this.start, this.chapterListInfo.chapters)
        })
        this.start += this.limit
    }
    scrollBottom() {
        let start = this.start, chapterListInfo = this.chapterListInfo, limit = this.limit
        if (start < chapterListInfo.chapters.length) {
            let chapterList = this.state.chapterList.concat(this.getCurentList(start, chapterListInfo.chapters))
            this.setState({
                chapterList
            }, () => {
                this.refs.leftChapter.ScrollObject.refresh()
            })
            this.start += limit
        }
    }
    getCurentList(start, array) {
        let arr = []
        for (let i = 0; i < this.limit; i++) {
            if (array[start + i]) {
                arr.push(array[start + i])
            }
        }
        return arr
    }
    changeChapter(index){
        const { checkChapter } = this.props.ReadState
        this.hideChapter()
        checkChapter(index)
    }
    showEditHandle() {
        this.setState({
            showEdit: !this.state.showEdit
        })
    }
    toggleEdit() {
        this.setState({
            showEdit: false,
            showTool: !this.state.showTool
        })
    }
    hideTool() {
        this.setState({
            showEdit: false,
            showTool: false
        })
    }
    hideChapter() {
        this.setState({
            showChapter: false,
            showTool: true
        })
    }
    showChapterFn() {
        this.setState({
            showChapter: true,
            removeChapter: false,
            showEdit: false,
            showTool: false
        }, () => {
            this.animationEnd()
        })
    }
    animationEnd() {
        this.refs.chapterMask && this.refs.chapterMask.addEventListener('webkitAnimationEnd', () => {
            if (!this.state.showChapter) {
                this.setState({
                    removeChapter: true
                })
            }
        })
    }
    render() {
        const { showEdit, showTool, showChapter, removeChapter, chapterList } = this.state
        const { themeList, setTheme, dark, setDark, themeStyle, setFontSize, fontSize } = this.props.ReadState
        const scrollOpt = {
            bottomDir: 300
        }
        return (
            <div className="Edit">
                {/* <div className="mask" onClick={this.hideEdit.bind(this)}></div> */}
                {
                    removeChapter ? '' : (
                        <div className="chapters">
                            <div ref='chapterMask' className={`chapterMask animated ${showChapter ? 'fadeIn' : 'fadeOut'}`} onClick={this.hideChapter.bind(this)}></div>
                            <ReactScroll
                                option={scrollOpt}
                                ref='leftChapter'
                                scrollEnd={this.scrollBottom.bind(this)}
                                className={`leftChapter animated ${showChapter ? 'fadeInLeft' : 'fadeOutLeft'}`}>
                                {
                                    chapterList.map((item, index) => {
                                        return <div
                                                className="chapter line-clamp1"
                                                onClick={()=>{this.changeChapter(index)}}
                                                key={item.id + index || item.link + index}>
                                                <span className="index">{index+1}.</span>
                                                {item.title}
                                        </div>
                                    })
                                }
                            </ReactScroll>
                        </div>
                    )
                }
                <div className={`editContainer ${showEdit ? 'show' : ''}`} style={themeStyle}>
                    <div className="editItem flex-middle" style={{color:dark?'#bbb':'#555'}}>
                        <div className="title">字号</div>
                        <div className="fontContent flex1">
                            <div className="cal flex-middle">
                                <p className="sub" onClick={()=>{setFontSize(-1)}}> - </p>
                                <p className="num"> {(fontSize*10).toFixed(2)} </p>
                                <p className="add" onClick={()=>{setFontSize(1)}}> + </p>
                            </div>
                        </div>
                        <div className="default">默认</div>
                    </div>
                    <div className="editItem flex-middle" style={{color:dark?'#bbb':'#555'}}>
                        <div className="title">主题</div>
                        <div className="theme flex1 flex">
                            {
                                themeList.map((item, index) => {
                                    return <p key={item} className="zt" onClick={() => { setTheme(index) }} style={{ backgroundImage: `url(${item})` }}></p>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className={`simpleBar flex-middle ${showTool ? 'show' : ''}`} style={themeStyle}>
                    <i className="flex1 iconfont icon-mulu" onClick={this.showChapterFn.bind(this)}></i>
                    <i className="flex1 iconfont icon-yueliang1" onClick={() => { setDark(!dark) }}></i>
                    <i className="flex1 iconfont icon-Setup" onClick={this.showEditHandle.bind(this)}></i>
                </div>
            </div>
        )
    }
}

export default Edit