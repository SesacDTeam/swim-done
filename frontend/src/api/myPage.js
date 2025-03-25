import instance from './axios';

export const myPage = {
  getMyReview: async (token, page, size = 10) => {
    const response = await instance.get('/my/reviews', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      params: {
        page: page,
        size: size,
      },
    });

    return response.data;
  },

  createMarkedPools: async (token, poolId) => {
    const response = await instance.post(
      `/marks/pools/${poolId}`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );

    return response.data;
  },

  deleteMyMarkedPools: async (token, poolId) => {
    const response = await instance.delete(`/marks/pools/${poolId}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return response.data;
  },
};
