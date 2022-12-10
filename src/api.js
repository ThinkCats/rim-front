import { default as axios } from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 1000,
    headers: {'Authorization': 'Bearer f3ea0ef3-b1b1-453c-8456-8311b6e6413a','X-Custom-Header': 'foobar'}
})

export default instance;