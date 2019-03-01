import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { wrapAnimation } from '@src/util/wrapAnimation'
import { observer, inject } from 'mobx-react'

//components
import ReactSwiper from '@src/components/ReactSwiper'
import SwiperItem from '@src/components/ReactSwiper/components/SwiperItem'
import HomeHead from './components/HomeHead'
import HomeMenu from './components/HomeMenu'
import Featured from './components/Featured'

import './index.scss'

@inject('HomeState')
@observer
class Home extends Component {
    constructor(props) {
        super(props)
        document.title = '书城'
        let self = this
        this.state = {
            options: {
                on: {
                    slideChangeTransitionStart: function () {
                        self.refs.HomeMenu.setCurrent(this.activeIndex);//切换结束时，告诉我现在是第几个slide
                    },
                }
            },
            menuList: [
                { name: '精选' },
                { name: 'vip免费看' },
                { name: '出版' },
                { name: '男频' },
                { name: '女频' },
                { name: '漫画' },
                { name: '限免' }
            ]
        }
    }
    menuChangeEnd(index) {
        const { homeContainer } = this.refs.homeContainer
        if(homeContainer.realIndex === index) return
        homeContainer.slideTo(index, 0, false)
    }
    render() {
        return (
            <div className="home">
                <div className="headFix">
                    <HomeHead />
                    {/* <HomeMenu
                        menuList={this.state.menuList}
                        ref="HomeMenu"
                        changeEnd={this.menuChangeEnd.bind(this)} /> */}
                </div>
                <Featured />
                {/* <ReactSwiper ref="homeContainer" newClass="homeContainer" options={this.state.options} className="homeContainer flex1">
                    <SwiperItem>
                        <Featured />
                    </SwiperItem>
                    <SwiperItem>222</SwiperItem>
                    <SwiperItem>333</SwiperItem>
                    <SwiperItem>444</SwiperItem>
                    <SwiperItem>555</SwiperItem>
                    <SwiperItem>666</SwiperItem>
                    <SwiperItem>777</SwiperItem>
                </ReactSwiper> */}
            </div>
        )
    }
}

export default wrapAnimation(Home)
