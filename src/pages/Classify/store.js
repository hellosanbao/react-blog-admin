import $axios from '@src/util/request'
import { observable, action } from 'mobx'

class ClassifyState {

    //分类数据源
    @observable classData 

    //获取分类数据
    @action.bound
    async getClassData(context){
        let fetachData = await $axios({
            url:'classify'
        },context)
        this.classData = fetachData.data
    }

}



export default new ClassifyState()