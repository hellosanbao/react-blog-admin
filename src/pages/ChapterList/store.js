import $axios from '@src/util/request'
import {
    action
} from 'mobx'
class ChapterListState {
    @action
    async getChapterListInfo(id,context) {
        let fetchData = await $axios({
            url: '/chapter_list',
            data: { id }
        },context)
        let result = fetchData.data
        return result
    }
}

export default new ChapterListState()