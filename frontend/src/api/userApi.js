import instance from './axios';

const userApi = {
  getUserInfo: async () => {
    const response = await instance.get('/user/info');
    return response.data;
  },
};

export default userApi;
