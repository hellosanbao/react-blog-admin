import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { local } from "@src/util/util";

import './index.scss'


//components
import Toast from '@src/components/Toast'

class BookShelf extends Component {
    constructor(props) {
        super(props)
        document.title = '书架'
        this.state = {
            bookList: local('collectBooks') || [],
            edit:false
        }
    }
    bookClickHandle(item) {
        const { edit } = this.state
        if(!edit){
            this.props.history.push(`/BookDetail?id=${item.id}&title=${item.name.trimHash()}`)
        }else{
            item.checked = !item.checked
            this.setState({
                bookList:this.state.bookList
            })
        }
    }
    changeEdit(){
        this.setState({
            edit:!this.state.edit
        })
        this.checkAll(false)
    }
    delChecked(){
        this.setState({
            bookList:this.state.bookList.filter(item=>!item.checked),
            edit:false
        },()=>{
            Toast.show({content:'删除成功'})
            local('collectBooks', this.state.bookList)
        })
    }
    checkAll(o){
        const { bookList } = this.state
        this.setState({
            bookList: bookList.map(item=>{
                item.checked = o
                return item
            })
        })
    }
    handleCheckAllClick(){
        let isCheckAll = this.state.bookList.filter(item=>!item.checked).length
        if(isCheckAll == 0){
            this.checkAll(false)
        }else{
            this.checkAll(true)
        }
    }
    render() {
        const { bookList, edit } = this.state
        let checkedList = bookList.filter(item=>item.checked)
        let isCheckAll = (bookList.length == checkedList.length)
        if(bookList.length == 0) {
            return (
                <div className="BookShelf">
                    <div className="noCollect">
                        <i className="iconfont icon-Articlesvg"></i>
                        <div className="txt">还没有收藏书籍，赶紧去<Link className="add" to='/'>添加</Link>自己喜欢的书籍吧</div>
                    </div>
                </div>
            )
        }
        return (
            <div className="BookShelf">
                {
                    edit?(
                        <div className="checkAll flex-middle" onClick={this.handleCheckAllClick.bind(this)}>
                            <i className={`iconfont ${isCheckAll?'icon-radio-yes':'icon-radio-no'} `}></i> <p>全选</p>
                        </div>
                    ):''
                }
                <div className="list">
                    {
                        bookList.map(item => {
                            return (
                                <div key={item.id} onClick={() => { this.bookClickHandle(item) }} className="item flex-middle">
                                    {
                                        edit?(
                                            <div className="check">
                                                {
                                                    item.checked?(<i className="iconfont icon-radio-yes"></i>):(<i className="iconfont icon-radio-no"></i>)
                                                }
                                            </div>
                                        ):''
                                    }
                                    <div className="pic">
                                        <img src={item.cover} alt="" />
                                    </div>
                                    <div className="info">
                                        <div className="title line-clamp1">{item.name}</div>
                                        <div className="desc line-clamp1">{item.sub}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        edit?'':(
                            <Link to='/' className="item flex-middle">
                                <div className="pic"> + </div>
                                <div className="info">
                                    <div className="add title line-clamp1">添加你喜欢的小说</div>
                                </div>
                            </Link>
                        )
                    }
                </div>
                {
                    checkedList.length?(
                        <div
                            onClick={this.delChecked.bind(this)}
                            className="delbtn">
                                <i className="iconfont icon-delete"></i>
                        </div>
                    ):''
                }
                <div
                    onClick={this.changeEdit.bind(this)}
                    className="editbtn">
                    {edit?'取消':<i className="iconfont icon-ceping"></i>}
                </div>
            </div>
        )
    }
}

export default BookShelf