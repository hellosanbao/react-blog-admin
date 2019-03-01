import React, { Component } from 'react'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

class ReactSwiper extends Component {
    componentDidMount() {
        const { options, newClass } = this.props
        // let sClass = newClass ? `.${newClass}` : '.swiper-container'
        if (newClass) {
            this[newClass] = new Swiper(this.refs.lun, options)
        } else {
            new Swiper(this.refs.lun, options)
        }
    }
    render() {
        return (
            <div className={`swiper-container ${this.props.className}`} ref='lun'>
                <div className="swiper-wrapper">
                    {this.props.children}
                </div>
                {/* <div class="swiper-pagination"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-scrollbar"></div> */}
            </div>
        )
    }
}

export default ReactSwiper