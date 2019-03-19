import React, { Component } from 'react'
import './index.scss'


class Edit extends Component {
    state={
        showEdit:false
    }
    showEditHandle(){
        this.setState({
            showEdit:!this.state.showEdit
        })
    }
    hideEdit(){
        this.setState({
            showEdit:false
        })
    }
    render(){
        const { showEdit } = this.state
        return(
            <div className="Edit white"> 
                <div className="mask" onClick={this.hideEdit.bind(this)}></div>
                <div className={`editContainer ${showEdit?'show':''}`}></div>
                <div className="simpleBar flex-middle" onClick={this.showEditHandle.bind(this)}>
                    <i className="flex1 iconfont icon-fenlei"></i>
                    <i className="flex1 iconfont icon-fenlei"></i>
                    <i className="flex1 iconfont icon-fenlei"></i>
                </div>
            </div>
        )
    }
}

export default Edit