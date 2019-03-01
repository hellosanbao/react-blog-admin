import React, { Component } from 'react'
import './index.scss'

//components
import Title from '@src/components/Title'
import BookList from '@src/components/BookList'
import BookSimpleList from '@src/components/BookSimpleList'

class ListBlock extends Component {
    render() {
        const { blockData, title, href } = this.props
        return (
            <div className={`list-lock ${this.props.className}`}>
                {title?<Title href={href} title={title} />:''}
                <BookList booklist={blockData.booklist}/>
                <BookSimpleList booksimplelist={blockData.booksimplelist} />
            </div>
        )
    }
}

export default ListBlock