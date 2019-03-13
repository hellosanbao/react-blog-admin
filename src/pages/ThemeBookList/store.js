import $axios from '@src/util/request'
import { observable, action } from "mobx";

class ThemeBookListState {
    filterOpt = {}

    //分类标签列表
    @observable FilterTags = []

    //书籍列表
    @observable bookList = []

    //获取分类tag
    @action.bound
    async getFilterTags(context) {
        let fetchData = await $axios({
            url: '/theme_tags'
        }, context)
        let cat = {
            "name": "性别",
            "tags": [
                "男生",
                "女生",
            ]
        }
        this.FilterTags = fetchData.data.data
        this.FilterTags.unshift(cat)
    }

    //获取分类下的书籍列表
    @action.bound
    async getBooksByTag(data,context){
        this.filterOpt = {...this.filterOpt,...data}
        let fetchData = await $axios({
            url:'/theme_books',
            data:this.filterOpt
        },context)
        return fetchData.data
    }

    //赋值书籍列表
    @action.bound
    setBookList(list){
        this.bookList = list
    }
}

export default new ThemeBookListState()