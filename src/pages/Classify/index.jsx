import React, { Component } from 'react'
import { inject, observer } from "mobx-react";
import './index.scss'

//components
import ClassBooks from './ClassBooks'
import Loading from '@src/components/Loading'


@inject('ClassifyState')
@observer
class Classify extends Component {
    state = {
        swiperOptions: {
            direction: 'vertical',
            freeMode: true,
            slidesPerView: 'auto'
        },
        loading:true,
        currentMenu: 0,
        leftMenu: [
            { name: '男生', alias: 'male' },
            { name: '女生', alias: 'female' },
            { name: '漫画', alias: 'picture' },
            { name: '出版', alias: 'press' },
        ]
    }
    async componentDidMount(){
        const { getClassData } = this.props.ClassifyState
        await getClassData(this)
        this.setState({
            loading:false
        })
        this.listenScroll()
    }
    listenScroll(){
        let doms = document.querySelectorAll('.ClassBooks .title')
        document.addEventListener('scroll',()=>{
            doms.forEach((dom,index)=>{
                if(index<doms.length-1){
                    if(dom.getBoundingClientRect().top<0 && doms[index+1].getBoundingClientRect().top>1){
                        this.setState({
                            currentMenu: index
                        })
                    }
                }else{
                    if(dom.getBoundingClientRect().top<0){
                        this.setState({
                            currentMenu: index
                        })
                    }
                }
            })
        })
    }
    handleClassData(data){
        const { male, female, picture, press} = data
        const nData = { male, female, picture, press }
        let classData = Object.keys(nData).map(key=>{
            let o = {}
            o.name = key
            o.list = nData[key]
            return o
        })
        return classData
    }
    handleLeftMenuClick(index) {
        let doms = document.querySelectorAll('.ClassBooks .title')
        this.setState({
            currentMenu: index
        })
        window.scrollTo(0,doms[index].offsetTop)
    }
    render() {
        const { leftMenu, currentMenu, loading } = this.state
        const { classData } = this.props.ClassifyState
        if(loading) return (<Loading/>)
        let classifyData = this.handleClassData(classData)
        return (
            <div className="Classify flex">
                <div className="leftMenu">
                    {
                        leftMenu.map((item, index) => {
                            return (
                                <div  
                                    key={item.name}
                                    onClick={() => { this.handleLeftMenuClick(index) }}
                                    className={`item ${currentMenu === index ? 'active' : ''}`}>
                                    <span>{item.name}</span>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="rightClass flex1">
                    {
                        classifyData.map((item,index)=>{
                            return(<ClassBooks title={item.name} list={item.list} key={item.name}/>)
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Classify