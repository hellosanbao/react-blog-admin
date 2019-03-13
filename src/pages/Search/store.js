import $axios from '@src/util/request'
import { local } from '@src/util/util'
import { uniq } from 'lodash'
import {
    action,
    observable
} from 'mobx'

class SearchState {
    //搜索初始化数据
    @observable initData = {}

    //搜索结果
    @observable searchResult = {}

    //是否处于搜索结果状态
    @observable isSearchResult = false

    //搜索提示列表
    @observable suggestList = []

    //搜索中标识
    @observable searching = false

    //搜索框中的搜索关键字
    @observable searchKey = ''

    //搜索历史记录
    @observable historySaerch = local('historySaerch') || []

    //搜索事件
    @action.bound
    async getSearchResult(data, context) {
        let fetchDate = await $axios({
            url: '/search_result',
            data
        }, context)
        return fetchDate
    }

    //搜索事件
    @action.bound
    async submit(keyword, content) {
        //将搜索关键字存入localStorage
        this.historySaerch.push(keyword)
        this.historySaerch = uniq(this.historySaerch.splice(0,15))
        local('historySaerch',this.historySaerch)

        //搜索时显示loading状态
        this.searching = true

        //搜索时将搜索的内容写到input框
        this.searchKey = keyword
        let  fetchDate = await this.getSearchResult({ keyword,start:0,limit:20 }, content)
        this.searchResult = fetchDate.data
        this.isSearchResult = true
        //执行搜索请求后关闭搜索提示
        this.suggestList = []
        //搜索完毕关掉loading
        this.searching = false

    }

    //搜索框获得焦点的时候关闭搜索结果界面
    @action.bound
    cancelSearchResult() {
        // if(this.isSearchResult)
        this.searchResult = {}
        this.isSearchResult = false
    }

    //失去焦点，清空搜索提示
    @action.bound
    cancelSuggest() {
        this.suggestList = []
    }

    @action.bound
    async getSuggestList(keyword) {
        let fetchDate = await $axios({
            url: '/search_suggest',
            data: { keyword }
        })
        if (fetchDate.data.ok) {
            this.suggestList = fetchDate.data.keywords
        } else {
            this.suggestList = []
        }
    }

    //获取搜索初始化数据
    @action.bound
    async getSearchInit(context) {
        let fetchDate = await $axios([
            {
                url: '/hot_search'
            },
            {
                url: '/hot_recommend'
            }
        ], context)

        let result = {}
        result.hotKeys = fetchDate[0].data.searchHotWords.splice(0, 15)
        result.newHotWords = fetchDate[1].data.newHotWords.splice(0, 6)
        this.initData = result
    }

    //清除搜索历史记录
    @action.bound
    clearHistory(){
        this.historySaerch = []
        local('historySaerch',[])
    }

    @action.bound
    clear() {
        //搜索初始化数据
        this.initData = {}
        //搜索结果
        this.searchResult = {}
        //是否处于搜索结果状态
        this.isSearchResult = false
        //搜索提示列表
        this.suggestList = []
        //搜索中标识
        this.searching = false
        //搜索框中的搜索关键字
        this.searchKey = ''
    }
}

export default new SearchState()
