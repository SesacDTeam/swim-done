// 요청 인터셉터 (api 요청할 때 가로채는 것임)
instance.interceptors.request.use(
  (config) => {
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

