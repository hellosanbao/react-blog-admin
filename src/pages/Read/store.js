import $axios from '@src/util/request'
import {
    action
} from 'mobx'
class ReadState {
    @action
    async getReadInfo(id,context) {
        let fetchData = await $axios({
            url: '/chapter',
            data: { id }
        },context)
        let result = fetchData.data
        return result
    }
}

export default new ReadState()