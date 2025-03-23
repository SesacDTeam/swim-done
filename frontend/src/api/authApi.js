import api from './axios';

const ENDPOINT = '/auth'
const authApi = {
  // 로그아웃 api
  // logout: async (provider) => {
  //   const response = await api.post(`/auth/${provider}/logout`);
  //   return response;
  // },

  // 리프레시 토큰 검증 및 액세스 토큰 재발급 api
  // reissue: async () => {
  //   const response = await api.post(`${ENDPOINT}/reissue`, {}, {withCredentials: true});
  //   return response;
  // },
  reissue: async () => {
    const response = await api.post("http://localhost:8080/api/auth/reissue", {}, {withCredentials: true});
    return response;
  },

  // 재발급 테스트 api
  test: async () => {
    const response = await api.get(`/test`);
    return response;
  }
};

export default authApi;
