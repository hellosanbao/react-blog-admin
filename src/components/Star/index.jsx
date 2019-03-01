import React, { Component } from 'react'

import './index.scss'

class Star extends Component {
    render(){
        const score = this.props.score/2
        const z = Math.floor(score)
        const h = 4-z
        return (
            <div className="Star">
            {
                z.toArray().map((item)=>{
                    return(
                        <img key={item} src={require('@assets/img/star.png')} alt=""/>
                    )
                })
            }
            {
                score>z
                ?
                (<img  src={require('@assets/img/starb.png')} alt=""/>)
                :
                (<img src={require('@assets/img/starg.png')} alt=""/>)
            }
            {
                h.toArray().map((item)=>{
                    return(
                        <img key={item} src={require('@assets/img/starg.png')} alt=""/>
                    )
                })
            }
                
            </div>
        )
    }
}

export default Star