import axios from 'axios'

const baseURL = axios.create({
    baseURL:'https://workplacecodedone.online/api'
    // baseURL:"http://localhost:3000/api"
})

baseURL.interceptors.request.use(
    config=>{
        const token = localStorage.getItem('token')
        if(token){
            config.headers["Authorization"] = `Bearer ${token}`
        }else{
            delete config.headers["Authorization"]
        }
        return config
    },
    error=>{
        console.log('Request Interceptor encounted an error')
        return Promise.reject(error)
    }
)

export default baseURL