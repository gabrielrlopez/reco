import axios from 'axios'
// import store from '..store/store'

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api