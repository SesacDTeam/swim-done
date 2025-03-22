import instance from './axios';

export const poolApi = {
  getPoolDetail: async (poolId) => {
    const response = await instance.get(`pools/${poolId}`);
    return response.data;
  },
};
