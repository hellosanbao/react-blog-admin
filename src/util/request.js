// import axios from 'axios'
// import config from '@src/config'

// axios.defaults.baseURL = config.apiBaseUrl

// export function getJson() {
//     return axios.get(...arguments)
// }
// export function postJson() {
//     return axios.post(...arguments)
// }

// export function fetch() {
//     return axios(...arguments)
// }

import axios from 'axios'
import config from '@src/config'
import { isArray } from 'lodash'

export default (opt,context) => {
    if(context){
        context.requestSourceArr = []
        context.cancelRequest = ()=>{
            context.requestSourceArr.forEach(item=>{
                item('请求中断')
            })
        }
    }
    function getcomData(data) {
        let requestData = {
            baseURL: config.apiBaseUrl,
            method: data.method || 'get',
            url: data.url
        }
        if (requestData.method == 'get') {
            requestData.params = data.data || {}
        } else {
            requestData.data = data.data || {}
        }
        requestData.cancelToken = new axios.CancelToken(function (cancel) {
            context && context.requestSourceArr.push(cancel)
        })
        return requestData
    }

    if (!isArray(opt)) {
        return axios(getcomData(opt))
    } else {
        let fetchArray = opt.map(item => {
            return axios(getcomData(item))
        })
        function getAllData() {
            return new Promise((resolve, reject) => {
                axios.all(fetchArray).then(axios.spread((...arg) => {
                    resolve(arg)
                }))
            })
        }
        return getAllData()
    }

}

