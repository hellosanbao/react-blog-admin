import React, { Component } from 'react'
import { Button } from 'antd';
import {
    observer,
    inject,
} from 'mobx-react'

@inject('ArtListState')
@observer
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
                <Button>{this.props.ArtListState.title}</Button>
            </div>
        )
    }
}

export default ArtList