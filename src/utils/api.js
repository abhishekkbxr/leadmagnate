import axios from 'axios';

// export const BASE_URL = 'http://103.176.85.119/fxsignal/api/';
export const BASE_URL = 'http://localhost:6001/api';

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
