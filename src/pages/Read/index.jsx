import React, { Component } from 'react'
import querystring from 'querystring'
import { inject, observer} from 'mobx-react'
import ReactScroll from '@src/components/ReactScroll'
import './index.scss'

//components
import Loading from '@src/components/Loading'
import Edit from './components/Edit'

@inject('ReadState')
@observer
class Read extends Component {
    constructor(props){
        super(props)
        const  { title, id, bookId }  = querystring.parse(this.props.location.search.replace('?',''))
        document.title = title
        this.state={
            id:decodeURIComponent(id),
            loading:true,
            content:'',
            readInfo:{},
            bookId
        }
    }
    async componentDidMount(){
        const { getReadInfo } = this.props.ReadState
        await getReadInfo(this.state.id,this)
        this.setState({
            loading:false
        })
    }
    toggleEdit(){
        this.refs.edit.wrappedInstance.toggleEdit()
    }
    scrollbottom(){
        console.log(123)
    }
    scroll(){
        this.refs.edit.wrappedInstance.hideTool()
    }
    componentWillUnmount(){
        this.cancelRequest()
    }
    render(){
        const { loading, bookId } = this.state
        const { themeStyle, readInfo } = this.props.ReadState
        let content = readInfo.cpContent
        if(loading){
            return (
                <Loading/>
            )
        }
        if(readInfo.isVip){
            return (<div>该章节为收费章节</div> )
        }
        if(!content){
            return (<div>没有获取到任何内容</div> )
        }
        let contentArr = content.split('\n')
        return(
            <div className="readComponent theme1">
                <div className="bg" style={themeStyle}></div>
                <div className="title" style={themeStyle}>{readInfo.title}</div>
                    <ReactScroll  
                        scrollEnd={this.scrollbottom.bind(this)} 
                        scroll={this.scroll.bind(this)}
                        className="readWarp" 
                        onClick={this.toggleEdit.bind(this)}>
                        {
                            contentArr.map((item,index)=>{
                                if(item){
                                    return <p onClick={this.toggleEdit.bind(this)} className='contentText' key={`content-${index}`}>{item}</p>
                                }else{
                                    return ''
                                }
                            })
                        }
                    </ReactScroll>
                <Edit bookId={bookId} ref='edit'/>
            </div>
        )
    }
} 

export default Read