import axios from './axios';

const KAKAOMAP_API = '/sections';

/**
 * 서울 지역의 모든 수영장 정보를 가져오는 API
 * TODO : 클러스터링으로 지역구 별로 수영장 개수가져오는 것으로 변경
 * @returns {Promise<Array>}
 */
const kakaoMapApi = {
  getSections: async () => {
    try {
      const response = await axios.get(KAKAOMAP_API);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  /**
   * 특정 지역구의 각 수영장 요약정보
   */
  getSectionWithPools: async (sectionId) => {
    try {
      if (!sectionId) {
        throw new Error('sectionId is required');
      }
      const response = await axios.get(`${KAKAOMAP_API}/${sectionId}/pools`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  /**
   * 특정 수영장의 요약정보
   */
  getPool: async (poolName) => {
    try {
      if (!poolName) {
        throw new Error('\'PoolName\' is required');
      }
      const response = await axios.get(`${KAKAOMAP_API}/pools/${poolName}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default kakaoMapApi;
