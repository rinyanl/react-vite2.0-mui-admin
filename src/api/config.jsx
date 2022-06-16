import axios from 'axios'
import cookie from 'react-cookies'
import NProgress from 'nprogress' // 顶部进度条

import eventBus from '@/utils/eventBus'
import Toast from '@/components/Toast';

const config = {
    timeout: 10000,
    baseURL: import.meta.env.VITE_APP_BASE_API,
}

// 请求封装
export const $http = (request) => {
    NProgress.start()

    const { url, method, data } = request
    let params = {}

    if (method === "get") {
        params = {
            params: {
                ...data
            },
        }
    }
    if (method !== "get") {
        params = {
            data: {
                ...data
            },
        }
    }

    return new Promise((resolve, reject) => {
        axios({
            url,
            method: method || 'get',
            headers: {
                UserId: cookie.load('userId') || '',
                UserToken: cookie.load('userToken') || ''
            },
            ...config,
            ...params,
        })
            .then(function (response) {
                NProgress.done()
                resolve(response)
            })
            .catch(function (error) {
                NProgress.done()
                reject(error)
            });
    })
}

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    switch (response.data.status) {
        case 401:
            Toast.error(response.data.msg)
            eventBus.emit("setLoginStatus", false)
            return;
        default:
            return response;
    }
}, function (error) {
    return Promise.reject(error);
});