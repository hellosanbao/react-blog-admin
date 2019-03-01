import React, { Component } from 'react'


class ReactSwiper extends Component {
    render() {
        return (
            <div style={this.props.style} className={`swiper-slide ${this.props.className || ''}`}>{this.props.children}</div>
        )
    }
}

export default ReactSwiper