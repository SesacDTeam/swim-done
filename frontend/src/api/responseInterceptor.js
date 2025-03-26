import authApi from './authApi'

// 응답 인터셉터 (401 에러 발생 시 리프레시 토큰으로 액세스 토큰 재발급)
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    console.log(error)

    if (error.response?.status === 401) {
      try {
        // const refreshToken = getCookie // 이거 아님
        const response = await authApi.reissue();

        const data = response.headers.authorization;
        // 여기서 Bearer 떼고 저장해야 됨
        const newAccessToken = data.replace('Bearer ', '');

        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // 실패한 요청 재시도
        return instance(originalRequest);
      } catch (error) {
        await authApi.logout();
        store.dispatch(logout());

        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);