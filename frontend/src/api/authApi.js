import axios from 'axios';

const authApi = axios.create({
  baseURL: 'http://localhost:5173/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 403) {
      console.log('AccessToken이 만료되었습니다. RefreshToken으로 재발급을 시도합니다.');

      const refreshToken = localStorage.getItem('refreshToken'); // refreshToken 가져오기
      if (!refreshToken) {
        alert('로그인이 필요합니다.');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const { data } = await authApi.post('/auth/reissue', { refreshToken });
        localStorage.setItem('accessToken', data.accessToken);
        error.config.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return authApi.request(error.config); // 요청 재시도
      } catch (refreshError) {
        alert('세션이 만료되었습니다. 다시 로그인해주세요.');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default authApi;
