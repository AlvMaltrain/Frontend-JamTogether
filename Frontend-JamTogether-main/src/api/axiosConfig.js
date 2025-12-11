import axios from 'axios';

// IP DE EC2 (Cambiar si se reinicia la instancia)
const BASE_URL = 'http://44.211.239.75:8080'; 

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Este interceptor inyecta el token en cada petición automaticamente
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;