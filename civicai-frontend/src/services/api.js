import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (config) => {
    const adminKey = localStorage.getItem("ADMIN KEY");
    if(adminKey){
      config.headers["x-admin-key"] = adminKey;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;