import React, { Component } from 'react'

import './index.scss'

import menuData from './data/menu'
import books from './data/book'

//components
import BookList from './components/BookList'

class Rank extends Component {
    constructor(props) {
        super(props)
        document.title = "排行榜"
    }
    state = {
        currentMenuIndex: 0,
        currentSubMenuList: [],
        currentSubMenuIndex: 0,
        menu: [],
        bookList:[]
    }
    componentDidMount() {
        this.setState({
            menu: menuData,
            currentSubMenuList: menuData[0].nodes,
            bookList:books
        })
    }
    handleMenuClick(currentMenuIndex) {
        this.setState({
            currentMenuIndex,
            currentSubMenuIndex: 0,
            currentSubMenuList: menuData[currentMenuIndex].nodes
        })
    }
    handleSubMenuClick(currentSubMenuIndex) {
        this.setState({ currentSubMenuIndex })
    }
    render() {
        const {
            menu,
            currentMenuIndex,
            currentSubMenuList,
            currentSubMenuIndex,
            bookList
        } = this.state
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
                        <BookList list={bookList} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Rank