import React, { Component } from 'react'
import { Button } from 'antd';
class ArtList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            msg:'artlist'
        }
    }
    render(){
        return (
            <div>
                <Button>{this.state.msg}</Button>
            </div>
        )
    }
}

export default ArtList