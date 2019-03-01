import axios from 'axios'
import config from '@src/config'

axios.defaults.baseURL = config.apiBaseUrl

export function getJson() {
    return axios.get(...arguments)
}
export function postJson() {
    return axios.post(...arguments)
}

export function fetch() {
    return axios(...arguments)
}
