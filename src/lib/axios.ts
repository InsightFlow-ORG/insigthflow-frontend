import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

const axiosInstance_1 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_USERS_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});


export default axiosInstance;
export { axiosInstance_1 };