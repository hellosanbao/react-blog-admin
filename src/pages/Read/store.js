import $axios from '@src/util/request'
import {
    action,
    observable,
    computed
} from 'mobx'
class ReadState {
    //主题索引
    @observable theme = 0   

    //黑夜模式
    @observable dark = false   

    //显示底阅读器操作栏
    // @observable showTool = false

    //主题列表
    @observable themeList = [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552988710207&di=0dc29ed96695128f872872117bcf7b87&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201809%2F29%2F20180929204148_csdsp.thumb.700_0.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552989313851&di=f4b59d959d5e31901757f434b0499c26&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201810%2F07%2F20181007233436_jnrcf.thumb.700_0.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552988989031&di=bcd89d90c0df5ab0bf431de0bf2d1282&imgtype=0&src=http%3A%2F%2Fs8.sinaimg.cn%2Fmw690%2F001IQLHyzy73n0WVdZB37%26690',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553584206&di=0d8b253cf8c7b01ec0e8e1e551431738&imgtype=jpg&er=1&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201809%2F29%2F20180929203840_lesni.thumb.700_0.jpg',
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=411705060,1505070479&fm=26&gp=0.jpg'
    ]

    @computed
    get themeStyle(){
        let themeUrl = this.themeList[this.theme]
        let themeStyle = {}
        if(this.dark) {
            themeStyle = {
                backgroundColor:'#000',
                boxShadow: '0 5px 10px 4px rgba(255, 255, 255, .5)'
            }
        }else{
            themeStyle = {
                backgroundImage:`url(${themeUrl})`,
            }
        }

        return themeStyle
    }
    
    //黑夜模式
    @action.bound
    setDark(dark){
        this.dark = dark
    }

    //设置主题
    @action.bound
    setTheme(theme){
        this.theme = theme
        this.dark = false
    }
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