import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000,
    headers: { 
        'Content-Type':'application/json',
    }
});

console.log('API Base URL:', import.meta.env.VITE_BASE_URL);

export interface RestResponse<T>{
    message: string,
    status: string,
    results: T

}


export default apiClient;