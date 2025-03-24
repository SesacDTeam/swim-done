import instance from './axios';

const reviewApi = {
  createReview: async (poolId) => {
    const response = await instance.post(`/pools/${poolId}/reviews`)
    return response.data;
  }
};

export default reviewApi;