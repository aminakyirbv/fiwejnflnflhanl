
import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});


instance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("UserInfo"))?.token;

  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
})