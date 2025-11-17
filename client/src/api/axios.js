import axios from "axios";

const api = axios.create({
  baseURL: "https://smarttask-gnhy.onrender.com",
});

// REQUEST INTERCEPTOR → attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// RESPONSE INTERCEPTOR → auto logout on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login"; // auto redirect
    }

    return Promise.reject(err);
  }
);

export default api;
