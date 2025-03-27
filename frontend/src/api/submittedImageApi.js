import instance from './axios';

const submittedImageApi = {
  createImage: async (data) => {
    const response = await instance.post(`/images`, data);
    return response.data;
  },
};

export default submittedImageApi;
