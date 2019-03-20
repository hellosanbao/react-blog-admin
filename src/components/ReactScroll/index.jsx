import React, { Component } from 'react'
import BScroll from 'better-scroll'

class ReactScroll extends Component {
    state = {
        show: true
    }
    ScrollObject = null
    componentDidMount() {
        this.opt = {
            probeType:3,
            bottomDir:100,
            click:true,
            ...this.props.option
        }
        this.ScrollObject = new BScroll(`.${this.props.className.split(' ')[0]}`,this.opt)
        this.scrollBottom()
    }
    scrollBottom(){
        const { scroll,scrollEnd  } = this.props
        let bottomDir = this.opt.bottomDir>=0?this.opt.bottomDir:0
        let end = false
        this.ScrollObject.on('scroll',()=>{
            scroll && scroll()
            if( this.ScrollObject.y - this.ScrollObject.maxScrollY <=bottomDir ){
                if(!end){
                    scrollEnd && scrollEnd()
                    end = true
                }
            }else{
                end = false
            }
            
        })
    }
    componentWillUnMount(){
        this.ScrollObject.destory()
    }
    render() {
        return (
            <div className={this.props.className}>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default ReactScroll