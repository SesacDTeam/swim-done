import instance from './axios';

export const markPoolApi = {
  getMyMarkedPools: async (page, size = 10) => {
    const response = await instance.get('/my/marks');

    return response.data;
  },

  createMarkedPools: async (poolId) => {
    const response = await instance.post(`/marks/pools/${poolId}`);

    return response.data;
  },

  deleteMyMarkedPools: async (poolId) => {
    const response = await instance.delete(`/marks/pools/${poolId}`);

    return response.data;
  },
};
