import React, { Component } from 'react'
import { inject, observer} from 'mobx-react'
import querystring from 'querystring'

import './index.scss'

//components
import BookList from './components/BookList'
import Loading from '@src/components/Loading'
import LoadMore from '@src/components/LoadMore'

@inject('BookListDetailState')
@observer
class BookListDetail extends Component {
    constructor(props){
        super(props)
        const  { title, id }  = querystring.parse(this.props.location.search.replace('?',''))
        document.title = title
        this.state = {
            data:{},
            loading:true,
            id
        }
    }
    async componentDidMount(){
        const { getBokkListDetail } = this.props.BookListDetailState
        const booListInfo = await getBokkListDetail(this.state.id,this)
        this.setState({
            loading:false,
            data:booListInfo
        })
    }
    componentWillUnmount(){
        this.cancelRequest()
    }
    render(){
        const { data, loading } = this.state
        if(loading) {
            return (<Loading/>)
        }
        return (
            <div className="BookListDetail">
                <div className="user flex-middle">
                    <img className="avatar" src={data.author.avatar.formatImg()} alt=""/>
                    <div className="info">
                        <div className="name">{data.author.nickname}</div>
                        <div className="time">{new Date(data.updated).diff()}</div>
                    </div>
                </div>
                <div className="intro">
                    <div className="title">{data.title}</div>
                    <div className="desc">{data.desc}</div>
                </div>
                <BookList booklist = {data.books}/>
                <LoadMore more={false}/>
            </div>
        )
    }
}

export default BookListDetail