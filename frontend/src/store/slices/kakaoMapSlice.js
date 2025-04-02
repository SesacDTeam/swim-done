import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  map: null,
  options: {
    center: new kakao.maps.LatLng(37.566826, 126.9786567),
    level: 9,
  },
  markers: [],
  pools: [],
  section: null,
  infoWindow: null,
};

const kakaoMapSlice = createSlice({
  name: 'kakaoMap',
  initialState,
  reducers: {
    resetMap: (state, action) => {
      if (state.map) {
        state.map.setLevel(state.options.level);
        state.map.panTo(state.options.center);
      }
      if (state.markers) {
        state.markers.forEach((marker) => marker.setMap(null));
      }
      if (state.infoWindow) {
        state.infoWindow.close();
      }
    },
    setMap: (state, action) => {
      state.map = action.payload;
    },
    setInfoWindow: (state, action) => {
      state.infoWindow = action.payload;
    },
    updateMarkers: (state, action) => {
      state.markers = [...state.markers, ...action.payload];
    },
    setPools: (state, action) => {
      state.pools = [...action.payload];
      console.log(state.pools);
      
    },
    updatePools: (state, action) => {
      const { poolId, pools } = action.payload;
      const updatePools = [...pools];
      const isMarked = updatePools[poolId].mark;

      updatePools[poolId] = {
        ...updatePools[poolId],
        mark: !isMarked,
      };
      state.pools = [...updatePools];
    },
    setSection: (state, action) => {
      state.section = action.payload;
    },
  },
});

export const { resetMap, setMap, setInfoWindow, updateMarkers, setPools, updatePools, setSection } =
  kakaoMapSlice.actions;
export default kakaoMapSlice.reducer;
