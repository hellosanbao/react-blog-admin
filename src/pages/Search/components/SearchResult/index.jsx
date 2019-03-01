import React, { Component } from 'react'

import './index.scss'
import sdList from './data/sd'
import books from './data/bookList'

//components

import ReactSwiper from '@src/components/ReactSwiper'
import SwiperItem from '@src/components/ReactSwiper/components/SwiperItem'
import BookList from '@src/components/BookList'
import SearchShuDanList from '../SearchShuDanList'


class SearchResult extends Component {
    constructor(props){
        super(props)
        const self = this
        this.state = {
            currentMenu:0,
            menu:['书籍','书单','漫画'],
            options: {
                autoHeight:true,
                on: {
                    slideChangeTransitionStart: function () {
                        self.setState({currentMenu:this.activeIndex});//切换结束时，告诉我现在是第几个slide
                    },
                }
            },
        }
    }
    handleMenuClick(currentMenu){
        const { swipe } = this.refs.swipe
        if(swipe.realIndex === currentMenu) return
        swipe.slideTo(currentMenu, 0, false)
        this.setState({currentMenu})
    }
    render() {
        const { menu, currentMenu, options } = this.state
        return (
            <div className="SearchResult">
                <div className="header">
                    <div className="list flex">
                    {
                       menu.map((item,index)=>{
                           return(
                               <div
                                    onClick={()=>{this.handleMenuClick(index)}}
                                    key={item}
                                    className={`flex1 item ${currentMenu===index?'active':''}`}>
                                    <span>{item}</span>
                                </div>
                           )
                       }) 
                    }
                    </div>
                </div>

                <ReactSwiper options={options} ref="swipe" newClass="swipe">
                    <SwiperItem className="swiper-no-swiping">
                        <div className="resultList">
                            <BookList booklist={books} />
                        </div>
                    </SwiperItem>
                    <SwiperItem className="swiper-no-swiping">
                        <div className="resultList">
                            <SearchShuDanList sdList={sdList} />
                        </div>
                    </SwiperItem>
                </ReactSwiper>
            </div>
        )
    }
}

export default SearchResult