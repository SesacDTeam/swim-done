import axios from 'axios';
import setupRequestInterceptors from './setupRequestInterceptor';
import setupResponseInterceptor from './setupResponseInterceptor';

const baseURL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: baseURL, //api
  timeout: 5000,
  withCredentials: true, // 쿠키를 요청에 포함시키도록 설정함
});

setupRequestInterceptors(instance)
setupResponseInterceptor(instance)

export default instance;