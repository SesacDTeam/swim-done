import instance from './axios';

export const myPageApi = {
  getMyReview: async (page) => {
    const response = await instance.get(`/my/reviews?page=${page}`);

    return response.data;
  },
};
