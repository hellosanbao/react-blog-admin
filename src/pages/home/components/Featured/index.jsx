import React, { Component } from 'react'
import { getJson } from '@src/util/request'
import './index.scss'

import jsbooks from '../../data/jxbooks'
import sdList from '../../data/sdList'

//components
import ReactSwiper from '@src/components/ReactSwiper'
import SwiperItem from '@src/components/ReactSwiper/components/SwiperItem'
import ListBlock from '@src/components/ListBlock'
import BookListItem from '@src/components/BookListItem'
import HomeNav from '../HomeNav'

class HomeMenu extends Component {
    constructor(props){
        super(props)
        this.state = {
            swiperOptions:{
                loop:true,
                autoplay:{
                    autoplay:true
                }
            },
            kwList:{
                booklist:[jsbooks[0]],
                booksimplelist:[jsbooks[1],jsbooks[2],jsbooks[3],jsbooks[4]]
            },
            newBookList:{
                booklist:[jsbooks[5],jsbooks[6],jsbooks[7],jsbooks[8]], 
                booksimplelist:[]
            },
            sdList:sdList
        }
    }
    async componentDidMount(){
        let result = await getJson('/category/group-minlist?type=jx')
        console.log(result)
    }
    render() {
        return (
            <div className="featurn-component">
                <div className="banner-warp">
                    <ReactSwiper options={this.state.swiperOptions} className="banner-container" newClass="banner-container">
                        <SwiperItem className="banner"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550905138520&di=bb2de41a130feda0de1c55eaf73ef137&imgtype=0&src=http%3A%2F%2Fatt.bbs.duowan.com%2Fforum%2F201811%2F13%2F22063848omumxxcvox4aaa.jpg" alt="" /></SwiperItem>
                        <SwiperItem className="banner"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550905138520&di=9120824385737455d8085e5c6294c5e4&imgtype=0&src=http%3A%2F%2Fwww.th-gas.com%2Fimages%2Fobuwgmjoo5uw4nbqgayc4y3pnu%2Fwallpaper%2F1%2F548126645f3fa.jpg" alt="" /></SwiperItem>
                        <SwiperItem className="banner"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550905138518&di=2309325a8c1b16588c448a942dde917b&imgtype=0&src=http%3A%2F%2Fp18.qhimg.com%2Fbdr%2F__85%2Fd%2F_open360%2Fdesign0215%2F5.jpg" alt="" /></SwiperItem>
                    </ReactSwiper>
                </div>
                <HomeNav />
                <ListBlock href="/BlockDetail?title" title="和你同口味的书友们都在看" blockData={this.state.kwList} className='block'/>
                <ListBlock href="/BlockDetail" title="新书抢先" blockData={this.state.newBookList} className='block'/>
                <BookListItem href="/ThemeBookList" title="━━●精品书单●━━━━" sdList={this.state.sdList} className='block'/>
            </div>
        )
    }
}

export default HomeMenu