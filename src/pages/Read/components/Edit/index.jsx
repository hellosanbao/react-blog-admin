import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from "react-router-dom";
import querystring from 'querystring'
import { scrollBottom } from '@src/util/util'
import './index.scss'

@inject('ChapterListState','ReadState')
@observer
class Edit extends Component {
    state={
        showEdit:false,
        showTool:false,
        chapterList:[],
        showChapter:false,
        removeChapter:true
    }
    async componentWillMount(){
        const { bookId} = this.props
        const { getChapterListInfo } = this.props.ChapterListState
        let chapterListInfo = await getChapterListInfo(bookId, this),
            start = 0

        this.setState({
            chapterList: this.getCurentList(start, chapterListInfo.chapters)
        })
        start += 20
        // console.log(this.state.chapterList)
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
    showEditHandle(){
        this.setState({
            showEdit:!this.state.showEdit
        })
    }
    toggleEdit(){
        this.setState({
            showEdit:false,
            showTool:!this.state.showTool
        })
    }
    hideTool(){
        this.setState({
            showEdit:false,
            showTool:false
        })
    }
    hideChapter(){
        this.setState({
            showChapter:false,
            showTool:true
        })
    }
    showChapterFn(){
        this.setState({
            showChapter:true,
            removeChapter:false,
            showEdit:false,
            showTool:false
        },()=>{
            this.animationEnd()
        })
    }
    animationEnd(){
        this.refs.chapterMask && this.refs.chapterMask.addEventListener('webkitAnimationEnd', () => {
            if(!this.state.showChapter){
                this.setState({
                    removeChapter:true
                })
            }
        })
    }
    render(){
        const { showEdit, showTool, showChapter,removeChapter, chapterList } = this.state
        const { themeList, setTheme, dark, setDark, themeStyle } = this.props.ReadState
        return(
            <div className="Edit"> 
                {/* <div className="mask" onClick={this.hideEdit.bind(this)}></div> */}
                {
                    removeChapter?'':(
                        <div className="chapters">
                            <div ref='chapterMask' className={`chapterMask animated ${showChapter?'fadeIn':'fadeOut'}`} onClick={this.hideChapter.bind(this)}></div>
                            <div className={`leftChapter animated ${showChapter?'fadeInLeft':'fadeOutLeft'}`}>
                                {
                                    chapterList.map(item=>{
                                        return <div className="chapter" key={item.id || item.link}>{item.title}</div>
                                    })
                                }
                            </div>
                        </div>
                    )
                }
                <div className={`editContainer ${showEdit?'show':''}`} style={themeStyle}>
                    <div className="editItem flex-middle">
                        <div className="title">字号</div>
                        <div className="fontContent flex1">
                            <div className="cal flex-middle">
                                <p className="sub"> - </p>
                                <p className="num"> 54 </p>
                                <p className="add"> + </p>
                            </div>
                        </div>
                        <div className="default">默认</div>
                    </div>
                    <div className="editItem flex-middle">
                        <div className="title">主题</div>
                        <div className="theme flex1 flex">
                            {
                                themeList.map((item,index)=>{
                                    return <p key={item} className="zt" onClick={()=>{setTheme(index)}} style={{backgroundImage:`url(${item})`}}></p>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className={`simpleBar flex-middle ${showTool?'show':''}`} style={themeStyle}>
                    <i className="flex1 iconfont icon-mulu" onClick={this.showChapterFn.bind(this)}></i>
                    <i className="flex1 iconfont icon-yueliang1" onClick={()=>{setDark(!dark)}}></i>
                    <i className="flex1 iconfont icon-Setup" onClick={this.showEditHandle.bind(this)}></i>
                </div>
            </div>
        )
    }
}

export default Edit