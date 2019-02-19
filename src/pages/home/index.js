import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'
import {
    observer,
    inject,
} from 'mobx-react'
@inject('HomeState')
@observer
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: 'hello233'
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.props.HomeState.add()
        }, 2000)
    }
    render() {
        return (
            <div>
                <button>
                <Link to="artList">跳转到artList路由</Link>
                </button>
                <p>name:{this.props.HomeState.name}</p>
                <p>count:{this.props.HomeState.count}</p>
                <p>total:{this.props.HomeState.total}</p>
            </div>
        )
    }
}

export default Home
