import ERROR_CODE from '../error/ERROR_CODE';
import authApi from './authApi';

const setupResponseInterceptor = (instance) => {
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.data.code === ERROR_CODE.AUTHENTICATE_FAIL) {
        const response = await authApi.reissue();

        const data = response.headers.authorization;
        const newAccessToken = data.replace('Bearer ', '');

        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return instance(originalRequest);
      }
      return Promise.reject(error);
    },
  );
};

export default setupResponseInterceptor;
