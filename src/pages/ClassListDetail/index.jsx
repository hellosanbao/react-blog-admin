import React, { Component } from 'react'
import './index.scss'

import data from './data'

//components 
import BookList from './components/BookList'

class ClassListDetail extends Component {
    render(){
        return(
            <div className="ClassListDetail">
                <BookList booklist={data} />
            </div>
        )
    }
}
export default ClassListDetail