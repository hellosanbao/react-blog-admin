
import $axios from '@src/util/request'
import {
	observable,
	action,
} from 'mobx'

class HomeState {
	@observable count = 2

	//获取首页初始数据
	@action 
	async getHomeInitData(context) {
		const result = {}
		const fetchData = await $axios({
			url: '/jingxuan',
			data: {
				type: 'jx'
			}
		},context)
		result.banner = fetchData.data.spread[0].advs
		result.blocks = fetchData.data.nodes
		result.nav = fetchData.data.spread[1].advs.map((item,index)=>{
			switch (index) {
				case 0 :
					item.route = '/Classify'
				break;
				case 1:
					item.route = '/Rank'
				break;
				case 2: 
					item.route = '/ThemeBookList'
				break;
				case 4:
					item.route = '/ShuHuang'
				break;
				default:
				break;
			}
			return item
		})
		result.bookList = fetchData.data.bookList[0]
		return result
	}
	//获取搜索推荐字
	@action 
	async getRecomendKey(context){
		let result = {}
		const fetchDate = $axios({
			url:'/search_recommend'
		},context)
		result = fetchDate
		return result
	}

}

export default new HomeState()