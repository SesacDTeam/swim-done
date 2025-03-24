import axios from 'axios';
import authApi from './authApi';

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: baseURL, //api
  timeout: 5000,
  withCredentials: true, // 쿠키를 요청에 포함시키도록 설정함
});

let flag = false;

// 요청 인터셉터 (api 요청할 때 가로채는 것임)
api.interceptors.request.use(
  (config) => {
    // const accessToken = store.getState().auth.token;
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // 액세스 토큰이 있으면 Authorization 헤더에 포함시킴
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 (401 에러 발생 시 리프레시 토큰으로 액세스 토큰 재발급)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {

    const originalRequest = error.config;


    if (error.response?.status === 401 && !flag) {
      flag = true;
      console.log("401 에러 감지, 토큰 재발급 시도");

      try {
        console.log("재발급 API 호출 시작");
        // const refreshToken = getCookie // 이거 아님
        const response = await authApi.reissue();
        console.log("재발급 API 응답:", response); // 응답 전체 확인

        const data = response.headers.authorization
        // 여기서 Bearer 떼고 저장해야 됨
        const newAccessToken = data.replace("Bearer ", "");

        console.log("새로운 액세스 토큰:", newAccessToken);


        localStorage.setItem('accessToken', newAccessToken)
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        // 실패한 요청 재시도
        return api(originalRequest);

      } catch (error) {
        console.error("재발급 요청 실패:", error);
        console.error("에러 메시지:", error.message);
        console.error("에러 응답:", error.response?.data); // 서버 응답 본문
        console.error("에러 상태 코드:", error.response?.status);
        // await authApi.logout();
        // store.dispatch(logout());
        
        return Promise.reject(error);
      } 
    }

    return Promise.reject(error);
  },
);

export default api;
