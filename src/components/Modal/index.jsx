import React, { Component } from 'react'
import './index.scss'

class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: this.props.show,
            fristMounted: !this.props.show,
            removeMask: false
        }
    }
    componentDidMount(){
        this.animationEnd()
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            show: newProps.show
        })
        if (newProps.show) {
            this.setState({
                fristMounted: false,
                removeMask: false
            }, () => {
                this.animationEnd()
            })
        }
    }
    animationEnd(){
        this.refs.mask && this.refs.mask.addEventListener('webkitAnimationEnd', () => {
            this.setState({
                removeMask: !this.state.show
            })
            if(this.state.removeMask){
                this.props.onClose()
            }
        })
    }
    Close() {
        this.setState({
            show: false
        })
    }
    render() {
        const { show, fristMounted, removeMask } = this.state
        if (fristMounted) return ''
        let maskClass = `mask animated ${show ? 'fadeIn' : 'fadeOut'}`
        let contentClass = `content animated ${show ? 'fadeInDown' : 'fadeOutUp'}`
        return (
            <div className="Modal">
                {removeMask ? '' : <div className={maskClass} onClick={() => { this.Close() }} ref='mask'></div>}
                <div className={contentClass}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Modal