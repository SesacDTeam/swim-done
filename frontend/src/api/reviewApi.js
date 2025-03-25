import instance from './axios';

const reviewApi = {
  createReview: async (poolId, reviewContent) => {
    const response = await instance.post(`/pools/${poolId}/reviews`, { content: reviewContent });
    return response.data;
  },
};

export default reviewApi;
