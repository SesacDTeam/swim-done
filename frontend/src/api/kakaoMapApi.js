import axios from './axios';

const KAKAOMAP_API = '/sections'

/**
 * 서울 지역의 모든 수영장 정보를 가져오는 API
 * TODO : 클러스터링으로 지역구 별로 수영장 개수가져오는 것으로 변경
 * @returns {Promise<Array>}
 */
export const kakaoMapApi = {
  getSections: async () => {
    const response = await axios.get(KAKAOMAP_API);
    return response.data;
  },
  /**
   * 특정 지역구의 각 수영장 요약정보
   */
  getSectionWithPools: async (sectionId) => {
    const response = await axios.get(`${KAKAOMAP_API}/${sectionId}/pools`);
    return response.data;
  },
}