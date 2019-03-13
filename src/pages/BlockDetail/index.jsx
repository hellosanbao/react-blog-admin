/**
 * 推荐书单详情页面
 */
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import querystring from 'querystring'
import { scrollBottom } from '@src/util/util'
import './index.scss'


//components 
import BookList from '@src/components/BookList/'
import Loading from '@src/components/Loading/'
import LoadMore from '@src/components/LoadMore/'

@inject('BlockDetailState')
@observer
class BlockDetail extends Component {
    constructor(props){
        super(props)
        const  { title, id }  = querystring.parse(this.props.location.search.replace('?',''))
        document.title = title
        this.state = {
            id,
            booklist:[],
            loading:true,
            hasMore:true
        }
    }
    
    async componentDidMount(){
        const { getBlockDetailList } = this.props.BlockDetailState
        const { id } = this.state
        let start = 1,hasMore = true
        const booklist = await getBlockDetailList({
            id,
            start,
            limit:20
        },this)
        if(booklist.length<20){
            hasMore = false
        }
        start+=20
        this.setState({
            booklist,
            loading:false,
            hasMore
        })

        scrollBottom(100,async ()=>{
            if(!hasMore) return
            let newList = await getBlockDetailList({
                id,
                start,
                limit:20
            },this)
            if(newList.length<20){
                hasMore = false
            }
            start+=20
            this.setState({
                booklist:this.state.booklist.concat(newList),
                hasMore
            })
        })
    }
    componentWillUnmount(){
        this.cancelRequest()
    }
    render() {
        const { booklist, loading, hasMore } =this.state
        if(loading){
            return (<Loading/>)
        }
        return (
            <div className="BlockDetail animated fadeIn" >
                <BookList booklist={booklist}/>
                <LoadMore more={hasMore}/>
            </div>
        )
    }
}

export default BlockDetail