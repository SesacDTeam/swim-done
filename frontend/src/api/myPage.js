import instance from './axios';

export const myPage = {
  getMyReview: async (token, page, size = 4) => {
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

  createReview: async (token, poolId) => {
    const response = await instance.post(
      `/pools/${poolId}/reviews`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );

    return response.data;
  },
};
