import React, { Component } from 'react'

import './index.scss'

class BookShelf extends Component {
    constructor(props){
        super(props)
        document.title = '书架'
    }
    render(){
        return (
            <div className="BookShelf">
                <div className="list"> 
                    <div className="item flex-middle">
                        <div className="pic">
                            <img src="http://img.1391.com/api/v1/bookcenter/cover/1/683354/683354_f01a24b90d6a429c8c052614cc2d6ede.jpg" alt=""/>
                        </div>
                        <div className="info">
                            <div className="title line-clamp1">是可敬的黄寺大街</div>
                            <div className="desc line-clamp1">开手机店何时可掇圣诞快乐开手机店何时可掇圣诞快乐开手机店何时可掇圣诞快乐开手机店何时可掇圣诞快乐</div>
                        </div>
                    </div>
                    <div className="item flex-middle">
                        <div className="pic">
                            <img src="http://img.1391.com/api/v1/bookcenter/cover/1/683354/683354_f01a24b90d6a429c8c052614cc2d6ede.jpg" alt=""/>
                        </div>
                        <div className="info">
                            <div className="title line-clamp1">是可敬的黄寺大街</div>
                            <div className="desc line-clamp1">开手机店何时可掇圣诞快乐开手机店何时可掇圣诞快乐开手机店何时可掇圣诞快乐开手机店何时可掇圣诞快乐</div>
                        </div>
                    </div>
                    <div className="item flex-middle">
                        <div className="pic">
                            <img src="http://img.1391.com/api/v1/bookcenter/cover/1/683354/683354_f01a24b90d6a429c8c052614cc2d6ede.jpg" alt=""/>
                        </div>
                        <div className="info">
                            <div className="title line-clamp1">是可敬的黄寺大街</div>
                            <div className="desc line-clamp1">开手机店何时可掇圣诞快乐开手机店何时可掇圣诞快乐开手机店何时可掇圣诞快乐开手机店何时可掇圣诞快乐</div>
                        </div>
                    </div>
                    <div className="item flex-middle">
                        <div className="pic">
                            <img src="http://img.1391.com/api/v1/bookcenter/cover/1/683354/683354_f01a24b90d6a429c8c052614cc2d6ede.jpg" alt=""/>
                        </div>
                        <div className="info">
                            <div className="title line-clamp1">是可敬的黄寺大街</div>
                            <div className="desc line-clamp1">开手机店何时可掇圣诞快乐开手机店何时可掇圣诞快乐开手机店何时可掇圣诞快乐开手机店何时可掇圣诞快乐</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookShelf