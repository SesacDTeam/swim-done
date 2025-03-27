import instance from './axios';

const reviewApi = {
  createReview: async (poolId, reviewContent) => {
    const response = await instance.post(`/pools/${poolId}/reviews`, { content: reviewContent });
    return response.data;
  },

  getReviewBeforeDate: async (reviewId) => {
    const response = await instance.get(`/my/reviews/${reviewId}`);

    return response;
  },

  deleteReview: async (reviewId) => {
    const response = await instance.delete(`/my/reviews/${reviewId}`);

    return response;
  },

  updateReview: async (reviewId, reviewContent) => {
    const response = await instance.put(`/my/reviews/${reviewId}`, { content: reviewContent });

    return response;
  },
};

export default reviewApi;
