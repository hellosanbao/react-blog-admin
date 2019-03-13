import $axios from "@src/util/request";
import { action } from "mobx";

class ClassListDetailState {
    //获取分类详情数据
    @action.bound
    async getClassListData(data,context){
        let fetchDate = await $axios({
            url:'/category_books',
            data
        },context)
        return fetchDate.data
    }
}


export default new ClassListDetailState()