import authApi from './authApi';

const setupResponseInterceptor = (instance) => {
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      console.log(error.config)

      if (error.response?.data.code === '3001') {
        // const refreshToken = getCookie // 이거 아님
        const response = await authApi.reissue();

        const data = response.headers.authorization;
        // 여기서 Bearer 떼고 저장해야 됨
        const newAccessToken = data.replace('Bearer ', '');

        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // 실패한 요청 재시도
        return instance(originalRequest);
      }
      return Promise.reject(error);
    },
  );
};

export default setupResponseInterceptor