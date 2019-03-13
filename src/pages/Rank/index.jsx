import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { scrollBottom } from '@src/util/util'

import './index.scss'

//components
import BookList from './components/BookList'
import Loading from '@src/components/Loading'
import LoadMore from '@src/components/LoadMore'


@inject('RankState')
@observer
class Rank extends Component {
    constructor(props) {
        super(props)
        document.title = "排行榜"
        this.start = 1
    }
    state = {
        currentMenuIndex: 0,
        currentSubMenuList: [],
        currentSubMenuIndex: 0,
        currBookListId: -1,
        menu: [],
        bookList: [],
        loading: true,
        hasMore:true
    }
    async componentDidMount() {
        const { getMenuData } = this.props.RankState
        let MenuData = await getMenuData(this)
        let currentSubMenuList = MenuData[0].nodes
        await this.changeList(currentSubMenuList[0].id)
        this.start++
        this.setState({
            menu: MenuData,
            currentSubMenuList,
            currBookListId: currentSubMenuList[0].id,
            loading: false
        })

        scrollBottom(100, async () => {
            const { currBookListId, hasMore } = this.state
            if(!hasMore) return
            const { getRankBookList } = this.props.RankState
            let bookList = await getRankBookList({ start:this.start, limit:20, id:currBookListId }, this)
            this.start++
            this.setState({
                hasMore:bookList.length>0,
                bookList:this.state.bookList.concat(bookList)
            })
        })
    }
    async handleMenuClick(currentMenuIndex) {
        this.setState({
            currentMenuIndex,
            currentSubMenuIndex: 0,
            currentSubMenuList: this.state.menu[currentMenuIndex].nodes
        })
        this.changeList(this.state.menu[currentMenuIndex].nodes[0].id)
    }
    handleSubMenuClick(currentSubMenuIndex) {
        const { currentMenuIndex, menu } = this.state
        this.setState({ 
            currentSubMenuIndex
        })
        this.changeList(menu[currentMenuIndex].nodes[currentSubMenuIndex].id)
    }
    async changeList(id,start=1,limit=20) {
        const { getRankBookList } = this.props.RankState
        if (this.state.currBookListId == id) return
        this.start = 2
        this.setState({
            bookList: [],
            hasMore:true
        })
        let bookList = await getRankBookList({ start, limit, id }, this)
        this.setState({
            bookList,
            currBookListId: id
        })
    }
    render() {
        const {
            menu,
            currentMenuIndex,
            currentSubMenuList,
            currentSubMenuIndex,
            bookList,
            loading,
            hasMore
        } = this.state
        if (loading) return <Loading />
        return (
            <div className="Rank">
                <div className="header">
                    <div className="list flex">
                        {
                            menu.map((item, index) => {
                                return (
                                    <div
                                        onClick={() => { this.handleMenuClick(index) }}
                                        key={item.id}
                                        className={`flex1 item ${index === currentMenuIndex ? 'active' : ''}`}>
                                        <span>{item.title}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="content flex">
                    <div className="leftMenu">
                        <div className="list">
                            {
                                currentSubMenuList.map((item, index) => {
                                    return (
                                        <div
                                            key={item.id}
                                            onClick={() => { this.handleSubMenuClick(index) }}
                                            className={`item flex-middle ${index === currentSubMenuIndex ? 'active' : ''}`}>
                                            <p className="tx">{item.title}</p>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                    <div className="rightContent flex1">
                        {
                            bookList.length > 0 && (<BookList list={bookList} />)
                        }
                        <LoadMore more={hasMore} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Rank