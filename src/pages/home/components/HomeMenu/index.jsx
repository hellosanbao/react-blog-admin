import React, { Component } from 'react'
import './index.scss'

class HomeMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentIndex: 0
        }
    }
    componentDidMount() {
        console.log(this.props.menuList)
    }
    setCurrent(currentIndex) {
        if (currentIndex === this.state.currentIndex) return
        this.setState({
            currentIndex
        }, this.props.changeEnd && this.props.changeEnd(currentIndex))
    }
    render() {
        return (
            <div className="HomeMenu flex-middle">
                <div className="menu-list">
                    {
                        this.props.menuList.map((item, index) => (
                            <span
                                key={item.name + index}
                                onClick={() => { this.setCurrent(index) }}
                                className={`menu-item ${index === this.state.currentIndex ? 'active' : ''}`}>
                                {item.name}
                            </span>
                        ))
                    }
                </div>

            </div>
        )
    }
}

export default HomeMenu