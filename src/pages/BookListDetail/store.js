import { action } from 'mobx'
import $axios from '@src/util/request'

class BookListDetailState {
    @action
    async getBokkListDetail(id,context){
        const fetchData = await $axios({
            url:'book_list_detail',
            data:{id}
        },context)

        let result = fetchData.data
        return result
    }
}

export default new BookListDetailState()