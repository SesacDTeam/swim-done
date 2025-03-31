import instance from './axios';


const ENDPOINT = '/auth';
const authApi = {
  reissue: async () => {
    const response = await instance.post(`${ENDPOINT}/reissue`, {}, { withCredentials: true });
    return response;
  },
};

export default authApi;