import React, { Component } from 'react'
import { observer, inject } from "mobx-react";
import { scrollBottom } from '@src/util/util'
import './index.scss'

//components 
import BookList from './components/BookList'
import Loading from "@src/components/Loading";
import NoData from "@src/components/NoData";
import LoadMore from "@src/components/LoadMore";

@inject('ClassListDetailState')
@observer
class ClassListDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            alias: props.match.params.alias,
            classbookList: [],
            loading: true,
            hasLoad: false,
            hasMore: true
        }
        document.title = props.match.params.title || '分类书单'
    }
    async componentDidMount() {
        const { getClassListData } = this.props.ClassListDetailState
        let start = 0, limit = 20, alias = this.state.alias
        let fetachData = await getClassListData({ start, limit, alias }, this)
        this.setState({
            classbookList: fetachData.books,
            loading: false,
            hasLoad: true,
            hasMore: fetachData.books.length == limit
        })
        start += 20
        scrollBottom(100, async () => {
            if (!this.state.hasMore) return
            let fetachData = await getClassListData({ start, limit, alias }, this)
            this.setState({
                classbookList: this.state.classbookList.concat(fetachData.books),
                hasMore: fetachData.books.length == limit
            })
        })
    }
    componentWillUnmount(){
        this.cancelRequest()
    }
    render() {
        let { classbookList, loading, hasLoad, hasMore } = this.state
        if (loading) return <Loading />
        return (
            <div className="ClassListDetail">
                {
                    (hasLoad && classbookList.length == 0) ?
                        (<NoData className='center' />) :
                        (<BookList booklist={classbookList} />)
                }
                <LoadMore more={hasMore} />
            </div>
        )
    }
}
export default ClassListDetail