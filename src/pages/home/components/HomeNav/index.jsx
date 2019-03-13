import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

class ReactSwiper extends Component {
    render() {
        const { navlist } = this.props
        return (
            <div className="home-nav flex">
                {
                    navlist.map((item,index) => {
                        if(index == 3) return ''
                        return (
                            <Link key={item.img} to={item.route} className="nav-item">
                                <img src={item.img} alt="" />
                                <p>{item.title}</p>
                            </Link>
                        )
                    })
                }
            </div>
        )
    }
}

export default ReactSwiper