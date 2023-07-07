import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost'
});

api.interceptors.request.use(async config => {
    const token = getToken();

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
});

function getToken() {
    return sessionStorage["jwt"] ?? null
}
export default api;