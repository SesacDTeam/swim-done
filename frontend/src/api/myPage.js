import instance from './axios';

export const myPage = {
  getMyReview: async (token, page, size = 5) => {
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
};
