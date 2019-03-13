import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

import './index.scss'

//components
import ReactSwiper from '@src/components/ReactSwiper'
import SwiperItem from '@src/components/ReactSwiper/components/SwiperItem'
import ListBlock from '@src/components/ListBlock'
import BookListItem from '@src/components/BookListItem'
import HomeNav from '../HomeNav'
import Loading from '@src/components/Loading'

@withRouter
@inject('HomeState')
@observer
class HomeMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            swiperOptions: {
                loop: true,
                autoplay: {
                    autoplay: true
                }
            },
            blocks:[],
            banner:[],
            sdList:[],
            nav:[]
        }
    }
    async componentDidMount() {
        const { getHomeInitData } = this.props.HomeState
        let HomeInitData = await getHomeInitData(this)
        this.setState({
            loading: false,
            ...HomeInitData
        })
    }
    componentWillUnmount(){
        this.cancelRequest()
    }
    handleBannerClick(adv){
        if(adv.type == 'c-bookdetail'){
            this.props.history.push(`/BookDetail?id=${adv.link}&title=${adv.title.trimHash()}`)
        }
    }
    render() {
        const { loading, blocks, banner, bookList, nav } = this.state
        if (loading) {
            return (
                <Loading />
            )
        }
        return (
            <div className="featurn-component animated fadeIn">
                <div className="banner-warp">
                    <ReactSwiper options={this.state.swiperOptions} className="banner-container" newClass="banner-container">
                        {
                            banner.map(item=>{
                                return (
                                    <SwiperItem key={item.link} className="banner">
                                        <img onClick={()=>{this.handleBannerClick(item)}} src={item.img} alt="" />
                                    </SwiperItem>
                                )
                            })
                        }
                    </ReactSwiper>
                </div>
                <HomeNav navlist={nav}/>
                {
                    blocks.map(item=>{
                        let blockData = {
                            booklist:[item.books[0]],
                            booksimplelist:item.books.splice(1,4)
                        }
                        return (
                            <ListBlock key={item._id} href={`/BlockDetail?id=${item._id}&title=${item.title}`} title={item.title} blockData={blockData} className='block' />
                        )
                    })
                }
                <BookListItem href="/ThemeBookList" title="━━●精品书单●━━━━" sdList={bookList.items} className='block' />
            </div>
        )
    }
}

export default HomeMenu