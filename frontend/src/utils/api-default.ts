import axios from 'axios';
import Cookies from "js-cookie";


const baseUrl = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

baseUrl.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    config.headers.Authorization = `Bearer ${token}`
    return config
});

baseUrl.interceptors.response.use((response) => {
    return response
}, (error) => {
    try {
        const { response } = error
        if (response.status === 401) {
            Cookies.remove("token")
        }
    } catch (e) {
        console.error(e)
    }

    throw error
});

export default baseUrl;

