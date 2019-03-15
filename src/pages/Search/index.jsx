import React, { Component } from 'react'
import { parse } from 'querystring'
import { inject, observer } from 'mobx-react'
import { debounce } from '@src/util/util'
import './index.scss'

//components
import Loading from '@src/components/Loading'
import SearchInit from './components/SearchInit'
import SearchResult from './components/SearchResult'
import SearchSuggest from './components/SearchSuggest'
let suggesthandle
@inject('SearchState')
@observer
class Search extends Component {
    constructor(props){
        super(props)
        const { id, placeholder } = parse(this.props.location.search.replace('?',''))
        this.state ={
            id,
            placeholder,
            loading:true,
        }
    }
    async componentDidMount(){
        const { getSearchInit,getSuggestList } = this.props.SearchState
        suggesthandle = debounce(getSuggestList,100)
        await getSearchInit(this)
        this.setState({
            loading:false
        })
    }
    async submit(event){
        event.preventDefault();
        const { id, placeholder } = this.state
        const { submit, searchKey} = this.props.SearchState
        // console.log(event.target)
        this.refs.searchReault.blur()
        if(searchKey){
            submit(searchKey,this)
        }else{
            this.props.history.push(`/BookDetail?id=${id}&title=${placeholder.trimHash()}`)
        }
    }
    onFocus(){
        this.props.SearchState.cancelSearchResult()
        suggesthandle(this.props.SearchState.searchKey)
    }
    onChange(event){
        let keyword = event.target.value || ''
        this.props.SearchState.searchKey = keyword
        suggesthandle(keyword)
    }
    componentWillUnmount(){
        this.cancelRequest()
        this.props.SearchState.clear()
    }
    render() {
        const { placeholder, loading } = this.state
        const { isSearchResult, suggestList, searching, searchKey } = this.props.SearchState
        if(loading) {
            return <Loading/>
        }
        return (
            <div className="Search animated fadeIn">
                <form action="" onSubmit={this.submit.bind(this)}>
                    <div className="searchHeader flex-middle">
                        <input 
                            ref='searchReault'
                            className="flex1 flex-middle" 
                            value={searchKey}
                            placeholder={placeholder} 
                            onFocus={this.onFocus.bind(this)}
                            onChange={this.onChange.bind(this)}
                            type="search" />
                        <div className="cancel" onClick={()=>{this.props.history.go(-1)}}>取消</div>
                    </div>
                </form>
                {
                    suggestList.length?(<SearchSuggest list={suggestList}/>):''
                }
                {
                    isSearchResult?(<SearchResult />):(<SearchInit />)
                }
                {
                    searching?<Loading/>:''
                }
            </div>
        )
    }
}

export default Search