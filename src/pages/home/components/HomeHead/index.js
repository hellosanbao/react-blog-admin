import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { inject, observer} from 'mobx-react'
import './index.scss'

@inject('HomeState')
@observer
class HomeHead extends Component {
    state = {
        placholder:'',
        id:''
    }
    async componentDidMount(){
        const { getRecomendKey } = this.props.HomeState
        const res = await getRecomendKey(this)
        this.setState({
            placholder:res.data.title,
            id:res.data.id
        })
    }
    render() {
        const { placholder, id } = this.state
        let searchUrl = id?`/Search?id=${id}&placeholder=${placholder}`:'/Search'
        return (
            <div className="homeHead flex-between">
                <Link to={searchUrl} className="search flex1">
                    <i className="iconfont icon-search"></i>
                    {placholder}
                </Link>
                <Link to="/BookShelf" className="classify">
                    <i className="iconfont icon-shujia"></i>
                    <p>书架</p>
                </Link>
            </div>
        )
    }
}

export default HomeHead