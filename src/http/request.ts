import axios, {AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig} from 'axios';

const service:AxiosInstance = axios.create({
    baseURL: process.env.VITE_APP_BASE_URL,
    timeout: 6000 * 10
});

service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        config.headers = {
            'Content-Type':'application/json;charset=UTF-8',
            'token':'80c483d59ca86ad0393cf8a98416e2a1'
        }
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            return response;
        } else {
            Promise.reject();
        }
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;

// export default {
//     get (url: string, params:any = {}) {
//         return new Promise((resolve, reject) => {
//           axios({
//             url,
//             params,
//             method: 'get'
//           }).then(res => {
//             resolve(res.data)
//             return res
//           }).catch(error => {
//             reject(error)
//           })
//         })
//       },
//       post (url = '', params = {}) {
//         return new Promise((resolve, reject) => {
//           axios({
//             url,
//             data: params,
//             method: 'post'
//           }).then(res => {
//             resolve(res.data)
//             return res
//           }).catch(error => {
//             reject(error)
//           })
//         })
//       }
// }
