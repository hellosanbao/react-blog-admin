import $axios from '@src/util/request'
import {
    action
} from 'mobx'
class BookDetailState {
    @action
    async getBookDetailInfo(id,context) {
        let fetchData = await $axios([
            {
                url: '/book',
                data: { id }
            },
            {
                url:'/hot_coment',
                data:{ id }
            }
        ],context)
        let result = fetchData[0].data
        result.coment = fetchData[1].data
        return result
    }
}

export default new BookDetailState()