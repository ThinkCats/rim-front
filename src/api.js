import { default as axios } from "axios";
import { loginStore } from "./store";
import cookie from "react-cookies"

const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 1000,
    headers: { 'Authorization': 'Bearer f3ea0ef3-b1b1-453c-8456-8311b6e6413a' }
})

instance.interceptors.request.use(
    config => {
        console.log('axios request config:', config);
        let is_login = config.url === '/user/login';
        if (is_login) {
            return config;
        }
        let cookie_token = cookie.load('token');
        console.log('cookie token:',cookie_token);
        if (cookie_token === undefined || cookie_token.length === 0) {
            loginStore.updateLoginOk(false);
            return config;
        }
        loginStore.updateLoginOk(true);
        config.headers.Authorization = 'Bearer ' + cookie.load('token');
        return config;
    },
    error => { 
        console.log(error) // 调试用
        return Promise.reject(error)
    }
);


export default instance;