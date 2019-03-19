import React, { Component } from 'react'
import querystring from 'querystring'
import { inject, observer} from 'mobx-react'
import './index.scss'

//components
import Loading from '@src/components/Loading'
import Edit from './components/Edit'

@inject('ReadState')
@observer
class Read extends Component {
    constructor(props){
        super(props)
        const  { title, id }  = querystring.parse(this.props.location.search.replace('?',''))
        document.title = title
        this.state={
            id:decodeURIComponent(id),
            loading:true,
            content:'',
            readInfo:{}
        }
    }
    async componentDidMount(){
        const { getReadInfo } = this.props.ReadState
        if(this.state.id.indexOf('http://')<0){
            var readInfo = await getReadInfo(this.state.id,this)
            this.setState({
                content:readInfo.cpContent || '',
                loading:false,
                readInfo
            })
        }else{
            this.setState({
                content:this.state.id,
                readInfo,
                loading:false
            }) 
        }
    }
    componentWillUnmount(){
        this.cancelRequest()
    }
    render(){
        const { loading, content, readInfo } = this.state
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
            <div className="readComponent">
                {
                    contentArr.map((item,index)=>{
                        if(item){
                            return <p className='contentText' key={`content-${index}`}>{item}</p>
                        }else{
                            return ''
                        }
                    })
                }
                <Edit ref='edit'/>
            </div>
        )
    }
} 

export default Read