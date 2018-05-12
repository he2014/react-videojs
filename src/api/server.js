import axios from "axios";
import config from "./config";
import Qs from "qs";

export default class Server {
    interceptors() {
        // http 请求 拦截器
        axios.interceptors.request.use(
            config => {
                //     if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
                //         config.headers['X-Token'] = token['token'];
                //         config.headers['userName'] = token['backUserId'];
                //  }
                return config;
            },
            err => {
                return Promise.reject(err);
            });
        // http 响应 拦截器
        axios.interceptors.response.use(
            response => {
                // if (response.status === 401) {
                //     sessionStorage.removeItem('user');
                //     routes.replace({
                //         path: '/login'
                //     })
                // }
                return response;
            },
            error => {
                return Promise.reject(error)
            });
    }
    axiosGet(method, url, params = {}, isForm = false) {
        return new Promise((resolve, reject) => {
            this.interceptors();
            let _options = {
                method,
                url,
                baseURL: config.baseUrl,
                timeout: 10000,
                params: params,
                withCredentials: false, //携带cookie
                validateStatus: (status) => {
                    return status >= 200 && status < 500;
                },
            }
            axios.request(_options).then(res => {
                resolve(typeof res.data === 'object' ? res.data : JSON.parse(res.data));
            }, error => {
                if (error.response) {
                    reject(error.response);
                } else {
                    reject(error);
                }
            })

        })
    }
    axiosPost(method, url, params = {}, isForm = false) {
        return new Promise((resolve, reject) => {
            this.interceptors();
            let _options = {
                method,
                url,
                baseURL: config.baseUrl,
                timeout: 10000,
                data: isForm ? Qs.stringify(params, { arrayFormat: 'brackets' }) : params,
                withCredentials: false, //携带cookie
                validateStatus: (status) => {
                    return status >= 200 && status < 500;
                },
            }
            axios.request(_options).then(res => {
                resolve(typeof res.data === 'object' ? res.data : JSON.parse(res.data));
            }, error => {
                if (error.response) {
                    reject(error.response);
                } else {
                    reject(error);
                }
            })

        })
    }
}
