import React, { Component } from 'react'
import querystring from 'querystring'
import { inject, observer} from 'mobx-react'
import { Link } from 'react-router-dom'
import { scrollBottom } from '@src/util/util'

import './index.scss'

//components
import Loading from '@src/components/Loading'

@inject('ChapterListState')
@observer
class ChapterList extends Component {
    constructor(props){
        super(props)
        const  { title, id }  = querystring.parse(this.props.location.search.replace('?',''))
        document.title = title
        this.state={
            id,
            loading:true,
            chapterList:[],
            title
        }
    }
    async componentDidMount(){
        const { getChapterListInfo } = this.props.ChapterListState
        let chapterListInfo = await getChapterListInfo(this.state.id,this),
            start = 0
        this.setState({
            loading:false,
            chapterList:this.getCurentList(start,chapterListInfo.chapters)
        })
        start += 20
        scrollBottom(200,async ()=>{
            if(start<chapterListInfo.chapters.length){
                let chapterList = this.state.chapterList.concat(this.getCurentList(start,chapterListInfo.chapters))
                this.setState({
                    chapterList
                })
                start += 20
            }
        })
    }
    getCurentList(start,array){
        let arr = []
        for(let i=0; i<20; i++){
            if(array[start+i]){
                arr.push(array[start+i])
            }
        }
        return arr
    }
    componentWillUnmount(){
        console.log(111)
        this.cancelRequest()
    }
    render(){
        const { chapterList, title, loading } = this.state
        if(loading){
            return (<Loading/>)
        }
        return (
            <div className="chapterList">
                {
                   chapterList.map((item,index)=>{
                       if(item.id) {
                           return (
                            <Link key={item.id || item.link} className="chapterListItem" to={`Read?id=${item.id || encodeURIComponent(item.link)}&title=${title}`}>
                              {index+1}. {item.title}
                            </Link>
                           )
                       }else{
                           return (<a key={item.link} className="chapterListItem" href={item.link}>{item.title}</a>)
                       }
                   }) 
                }
            </div>
        )
    }
}

export default ChapterList