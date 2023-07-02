import axios from "axios";

const api = axios.create({
    baseURL: 'https://localhost:44383'
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