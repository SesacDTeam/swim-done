import { kickPan, mark } from '../../utils/staticImagePath';
import kakaoMapApi from '../../api/kakaoMapApi';
import seoulGu from '../../utils/seoul-gu.json';

console.log(seoulGu);

/** @description
 * - 지도 객체
 * - 초기 위치 원복시 사용 됨
 * */
let map = null;

/**
 * @description 서울 시민청 좌표 (기본 중심점)
 */
const centerLat = 37.5666454;
const centerLng = 126.9781553;

/**
 * @description 지도 기본 중심 좌표 객체 생성
 */
let center = createPoint(centerLat, centerLng);

/**
 * @description 지도 기본 확대 레벨
 */
let level = 9;

/**
 * @description 지도 기본 옵션
 */
const options = {
  center,
  level,
};

/**
 * @description 마커 크기 설정
 */
const markerImageSize = { imageWidth: 20, imageHeight: 30 };

/**
 * @function createMap
 * @description
 * - 지도 생성 함수
 * - strict mode는 지도가 2개 생성되어 확대, 축소 시 잔상남음
 * @param {HTMLElement} mapContainer - 지도 컨테이너 요소
 * @returns {kakao.maps.Map} 생성된 지도 객체
 */
export function createMap(mapContainer, newPoints) {
  if (map) return; // 지도 중복생성 방지
  const newMap = new kakao.maps.Map(mapContainer, options);
  createZoomControl(newMap);
  // clustererHandler(newPoints, newMap);
  map = newMap;
  kakao.maps.event.addListener(newMap, 'click', () => infoWindow.close());
  kakao.maps.event.addListener(map, 'zoom_changed', function () {
    level = map.getLevel();
    if (level <= 8) {
      // polygon 제거
      removePolygon();
    } else {
      // polygon 다시 생성
      if (!polygons[0].getMap()) {
        displayPolygon();
      }
    }
  });
}

/**
 * @function createPoint
 * @description 마커 좌표 객체 생성
 * @param {number} latitude - 위도
 * @param {number} longitude - 경도
 * @returns {kakao.maps.LatLng} LatLng 객체
 */
function createPoint(latitude, longitude) {
  return new kakao.maps.LatLng(latitude, longitude);
}

/**
 * @function createMarker
 * @description 지도 위에 마커를 생성 클러스터 전용, title 추가
 * @param {kakao.maps.LatLng} position - 마커 위치 (LatLng 객체)
 * @param {kakao.maps.MarkerImage} image - 마커 이미지 객체
 * @param {string} title - 마커 타이틀
 * @returns {kakao.maps.Marker} 생성된 마커 객체
 */
function createMarker(position, image, title) {
  return new kakao.maps.Marker({
    position,
    image,
    clickable: true,
    title,
  });
}

/**
 * @function createMarkerImage
 * @description 마커 이미지 생성
 * @param {string} image - 마커 이미지 URL
 * @param {Object} imageSize - 이미지 크기 설정 객체 { imageWidth, imageHeight }
 * @returns {kakao.maps.MarkerImage} 생성된 마커 이미지 객체
 */
function createMarkerImage(image, imageSize) {
  const { imageWidth, imageHeight } = imageSize;
  const markerSize = new kakao.maps.Size(imageWidth, imageHeight);
  return new kakao.maps.MarkerImage(image, markerSize);
}

/**
 * @function createInfoWindow
 * @description 마커의 InfoWindow 업데이트
 * @param {kakao.maps.Marker} marker - 마커 객체
 */
function markerHandler(marker) {
  kakao.maps.event.addListener(marker, 'click', async () => await updateInfoWindow(marker));
}

async function updateInfoWindow(marker) {
  const newContent = await drawInfoWindowContent(marker.getTitle());

  infoWindow.setContent(newContent);
  infoWindow.open(marker.getMap(), marker);
}

async function drawInfoWindowContent(poolName) {
  const response = await kakaoMapApi.getPool(poolName);

  try {
    const pool = response.data;

    const swimmingTimes = pool.swimmingTimes
      .map(({ startTime, endTime }) => `<p>${startTime} ~ ${endTime}</p>`)
      .join(',');
    const content = swimmingTimes
      ? `
        <p class="mb-2">${pool.dayOfWeek} 자유 수영 시간</p>
        ${swimmingTimes}
      `
      : `<p class="mb-2">${pool.dayOfWeek} 자유 수영 시간이 없습니다.</p>`;
    return `
    <div class="bg-white shadow-lg rounded-lg p-4 w-[337px] border border-gray-200">
      <h2 class="text-xl font-bold text-black">${poolName}</h2>
      <p class="text-gray-600 text-sm">${pool.address}</p>
      <div class="mt-2 text-sm text-gray-800">
        ${content}
      </div>
      <p class="mt-2 text-xs text-blue-500 cursor-pointer hover:underline">
        * 다른 요일이 궁금하다면?<br />
      클릭 후 더 자세히 확인할 수 있어요!
      </p>
    </div>
  `;
  } catch (error) {
    console.error(error);
  }
}

/**
 * @function clustererHandler
 * @description 마커들을 클러스터링하는 함수
 * @param {Array} points - 마커를 추가할 좌표 리스트
 * @param {kakao.maps.Map} map - 지도 객체
 */
function clustererHandler(points, map) {
  const filteredPoints = {};

  points.forEach((point) => {
    const { section } = point;
    if (!filteredPoints[section]) {
      filteredPoints[section] = [];
    }
    filteredPoints[section].push(point);
  });

  const clusterer = new kakao.maps.MarkerClusterer({
    map,
    minLevel: 7,
    gridSize: 85,
    minClusterSize: 4,
  });

  const image = createMarkerImage(kickPan, markerImageSize);

  Object.keys(filteredPoints).forEach((key) => {
    const markers = filteredPoints[key].map((p) => {
      const marker = createMarker(createPoint(p.latitude, p.longitude), image, p.name);
      markerHandler(marker);
      return marker;
    });
    clusterer.addMarkers(markers);
  });
}

/**
 * @function initCenterHandler
 * @description 지도 중심을 기본 위치로 초기화
 */
export function initCenterHandler() {
  map.setLevel(level);
  map.panTo(center);
}

/**
 * @function createZoomControl
 * @description 줌 컨트롤 추가
 * @param {Object} map - 지도 객체
 */
function createZoomControl(map) {
  const zoomControl = new kakao.maps.ZoomControl();
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
}

/** @description 인포윈도우
 * - 카카오맵은 오브젝트가 생성된 순서대로 z-index가 결정됨
 * - 인포윈도우가 가장 마지막에 **생성**되어야 **가장 위**에 올라감
 * > - 생성: 코드 실행 순서
 * > - 가장 위: z-index
 */
const infoWindow = new kakao.maps.InfoWindow({
  removable: true,
});
/////////////////////////////
/////////////////////////////
/// Polygons
const polygons = [];
const markers = [];

const customOverlay = new kakao.maps.CustomOverlay({});

function removePolygon() {
  polygons.forEach((polygon) => polygon.setMap(null));
}

function displayPolygon() {
  polygons.forEach((polygon) => polygon.setMap(map));
}

const displayArea = (coordinates, name) => {
  // 폴리곤 좌표 모음
  const path = [];

  coordinates.forEach((coordinate) => {
    path.push(createPoint(coordinate[1], coordinate[0]));
  });

  const polygon = new kakao.maps.Polygon({
    map,
    path,
    strokeWeight: 2,
    strokeColor: '#004c80',
    strokeOpacity: 0.8,
    fillColor: '#ffffff',
    fillOpacity: 0.7,
  });
  polygons.push(polygon);

  // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
  // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
  kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
    polygon.setOptions({ fillColor: '#09f' });

    customOverlay.setContent(`
        <div class="absolute bg-white border border-gray-500 rounded-sm text-xs top-[-5px] left-[15px] p-[2px]">
          ${name}
        </div>
      `);

    customOverlay.setPosition(mouseEvent.latLng);
    customOverlay.setMap(map);
  });

  // 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다
  kakao.maps.event.addListener(polygon, 'mousemove', function (mouseEvent) {
    customOverlay.setPosition(mouseEvent.latLng);
  });

  // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
  // 커스텀 오버레이를 지도에서 제거합니다
  kakao.maps.event.addListener(polygon, 'mouseout', () => {
    polygon.setOptions({ fillColor: '#fff' });
    customOverlay.setMap(null);
  });

  // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 다각형의 이름과 면적을 인포윈도우에 표시합니다
  kakao.maps.event.addListener(polygon, 'click', async (mouseEvent) => {
    polygon.setOptions({ fillColor: '#fff' });
    customOverlay.setMap(null);
    markers.forEach((marker) => marker.setMap(null));
    map.setLevel(7);
    map.panTo(mouseEvent.latLng);
    const response = await kakaoMapApi.getSectionWithPools(name);
    const pools = response.data;
    pools.forEach((pool) => {
      const marker = createMarker(
        createPoint(pool.latitude, pool.longitude),
        createMarkerImage(kickPan, markerImageSize),
        pool.name
      );
      marker.setMap(map);
      markers.push(marker);
      markerHandler(marker);
    });
  });
};

export function drawPolygons(data) {
  data.forEach(({ coordinates, SIG_KOR_NM }) => {
    displayArea(coordinates, SIG_KOR_NM);
  });
}
