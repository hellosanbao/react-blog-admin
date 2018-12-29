import React, { Component } from 'react'
class ArtList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            msg:'artlist'
        }
    }
    render(){
        return (
            <div>{this.state.msg}</div>
        )
    }
}

export default ArtList