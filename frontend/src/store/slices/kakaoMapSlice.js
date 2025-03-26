import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  map: null,
  options: {
    center: new kakao.maps.LatLng(37.566826, 126.9786567),
    level: 9,
  },
  markers: null,
  infoWindow: null,
  pools: null,
  name: null,
};

const kakaoMapSlice = createSlice({
  name: 'kakaoMap',
  initialState,
  reducers: {
    resetMap: (state, action) => {
      state.map.setLevel(state.options.level);
      state.map.panTo(state.options.center);
      state.markers.forEach((marker) => marker.setMap(null));
      state.infoWindow.close();
    },
    setMap: (state, action) => {
      state.map = action.payload.map;
    },
    setInfoWindow: (state, action) => {
      state.infoWindow = action.payload.infoWindow;
    },
    updateMarkers: (state, action) => {
      state.markers = action.payload.markers;
    },
    setPools: (state, action) => {
      state.pools = action.payload.pools;
    },
    setName: (state, action) => {
      state.name = action.payload.name;
    },
  },
});

export const { resetMap, setMap, setInfoWindow, updateMarkers, setPools, setName } =
  kakaoMapSlice.actions;
export default kakaoMapSlice.reducer;
