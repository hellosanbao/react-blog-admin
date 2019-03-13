
import $axios from '@src/util/request'
import {
	action
} from 'mobx'

class BlockDetailState {
	//获取首页初始数据
	@action 
	async getBlockDetailList(data,context) {
		let result = {}
		const fetchData = await $axios({
			url: '/recommend_books',
			data: data
		},context)
		result = fetchData.data.book
		return result
	}
}

export default new BlockDetailState()