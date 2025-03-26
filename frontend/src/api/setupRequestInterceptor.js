
const setupRequestInterceptors = (instance) => {
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
      console.log("request" + "에러")
      return Promise.reject(error);
    },
  );
}

export default setupRequestInterceptors