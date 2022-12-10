import { default as axios } from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 1000,
    headers: {'Authorization': 'Bearer d5219358-f96b-4bfc-8672-d01ba95d16fa','X-Custom-Header': 'foobar'}
})

export default instance;