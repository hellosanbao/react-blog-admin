import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { scrollBottom } from '@src/util/util'
// import { toJS } from 'mobx'

import './index.scss'

//components

import ReactSwiper from '@src/components/ReactSwiper'
import BookList from '@src/components/BookList'
import Loading from '@src/components/Loading'
import LoadMore from '@src/components/LoadMore'
import NoData from '@src/components/NoData'
import SearchShuDanList from '../SearchShuDanList'

@inject('SearchState')
@observer
class SearchResult extends Component {
    constructor(props) {
        super(props)
        const { searchResult } = this.props.SearchState
        const self = this
        this.state = {
            currentMenu: 0,
            books: searchResult.books,
            book_list: [],
            pics: [],
            picLoaded: false,
            bookListLoaded: false,
            loading: false,
            hasMoreBooks: searchResult.books.length == 20,
            hasMorePic: true,
            menu: [
                { title: '书籍', type: 'book', hasRequest: true },
                { title: '书单', type: 'book_list', hasRequest: false },
                { title: '漫画', type: 'pic', hasRequest: false }
            ],
            options: {
                autoHeight: true,
                on: {
                    slideChangeTransitionStart: function () {
                        self.setState({ currentMenu: this.activeIndex });//切换结束时，告诉我现在是第几个slide
                        self.getTabData(this.activeIndex)
                    },
                }
            },
        }
    }
    componentDidMount() {
        let bookStart = 0, picStart = 0, limit = 20, hasMoreBooks = this.state.hasMoreBooks, hasMorePic = true
        const { getSearchResult, searchKey } = this.props.SearchState
        //书籍分页
        scrollBottom(100, async () => {
            if (!this.state.hasMoreBooks) return
            bookStart += 20
            let tabData = await getSearchResult({ limit, start: bookStart, keyword: searchKey }, this)
            if (tabData.data.books.length <= 0) {
                hasMoreBooks = false
            }
            this.setState({
                books: this.state.books.concat(tabData.data.books),
                hasMoreBooks
            })
        }, this.refs.bookList)

        //漫画分类
        scrollBottom(100, async () => {
            if (!this.state.hasMorePic) return
            picStart += 20
            let tabData = await getSearchResult({ limit, start: picStart, type: 'pic', keyword: searchKey }, this)
            if (tabData.data.books.length <= 0) {
                hasMorePic = false
            }
            this.setState({
                pics: this.state.pics.concat(tabData.data.books),
                hasMorePic
            })

        }, this.refs.picList)
    }
    handleMenuClick(currentMenu) {
        const { swipe } = this.refs.swipe
        if (swipe.realIndex === currentMenu) return
        swipe.slideTo(currentMenu, 0, false)
        this.setState({ currentMenu })
        this.getTabData(currentMenu)
    }
    async getTabData(index) {
        const { getSearchResult, searchKey } = this.props.SearchState
        const { menu } = this.state
        let type = menu[index].type
        //如果该tab已经请求过，则不再请求
        if (menu[index].hasRequest) return
        menu[index].hasRequest = true
        this.setState({ loading: true })
        let tabData = await getSearchResult({ type, keyword: searchKey, start: 0, limit: 20 }, this)
        this.setState({ loading: false })
        if (type == 'book_list') {
            this.setState({ book_list: tabData.data.ugcbooklists, bookListLoaded: true })
        } else if (type == 'pic') {
            this.setState({ pics: tabData.data.books, hasMorePic: tabData.data.books.length == 20, picLoaded: true })
        }
    }
    render() {
        let { menu, currentMenu, options, book_list, loading, pics, books, hasMoreBooks, hasMorePic, picLoaded, bookListLoaded} = this.state
        return (
            <div className="SearchResult animated fadeIn">
                <div className="header">
                    <div className="list flex">
                        {
                            menu.map((item, index) => {
                                return (
                                    <div
                                        onClick={() => { this.handleMenuClick(index) }}
                                        key={item.type}
                                        className={`flex1 item ${currentMenu === index ? 'active' : ''}`}>
                                        <span>{item.title}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {
                    loading ? <Loading /> : ''
                }
                <ReactSwiper options={options} ref="swipe" newClass="swipe" className="searchResultSwiper">
                    <div className="swiper-slide swiper-no-swiping" ref="bookList">
                        {
                            books.length ? (
                                <div className="resultList animated fadeIn">
                                    <BookList booklist={books} />
                                    <LoadMore more={hasMoreBooks} />
                                    <div className="__MORE"></div>
                                </div>
                            ) : (<NoData style={{ marginTop: '100px' }} />)
                        }
                    </div>
                    <div className="swiper-slide swiper-no-swiping">
                        {
                            book_list.length ? (
                                <div className="resultList animated fadeIn">
                                    <SearchShuDanList sdList={book_list} />
                                    <LoadMore more={false} />
                                </div>
                            ) : bookListLoaded ? (<NoData style={{ marginTop: '100px' }} />):''
                        }
                    </div>
                    <div className="swiper-slide swiper-no-swiping" ref="picList">
                        {
                            pics.length ? (
                                <div className="resultList animated fadeIn">
                                    <BookList booklist={pics} />
                                    <LoadMore more={hasMorePic} />
                                    <div className="__MORE"></div>
                                </div>
                            ) : picLoaded?(<NoData style={{ marginTop: '100px' }} />):''
                        }
                    </div>
                </ReactSwiper>
            </div>
        )
    }
}

export default SearchResult