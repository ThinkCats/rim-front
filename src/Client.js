import { default as axios } from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 1000,
    headers: {'Authorization': 'Bearer d5219358-f96b-4bfc-8672-d01ba95d16fa'}
})

export default instance;