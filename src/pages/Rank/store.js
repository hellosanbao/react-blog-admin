import $axios from '@src/util/request'
import { action } from "mobx";

class RankState {

    //获取排行分类
    @action.bound
    async getMenuData(context){
        let fetchData = await $axios({
            url:'/rank_cate'
        },context)

        return fetchData.data.data.nodes
    }

    //根据id获取分类书籍
    async getRankBookList(data,context){
        let fetchData = await $axios({
            url:'/rank_books',
            data
        },context)

        return fetchData.data.book
    }

}

export default new RankState()