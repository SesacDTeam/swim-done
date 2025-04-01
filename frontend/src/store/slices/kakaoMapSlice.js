import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  map: null,
  options: {
    center: new kakao.maps.LatLng(37.566826, 126.9786567),
    level: 9,
  },
  markers: [],
  pools: [],
  name: null,
  infoWindow: null,
};

const kakaoMapSlice = createSlice({
  name: 'kakaoMap',
  initialState,
  reducers: {
    resetMap: (state, action) => {
      if (state.map){
        state.map.setLevel(state.options.level);
        state.map.panTo(state.options.center);
      }
      if (state.markers) {
        state.markers.forEach((marker) => marker.setMap(null));
      }
      if(state.infoWindow) {
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
      console.log(action.payload);
      
      state.pools = [...action.payload];
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { resetMap, setMap, setInfoWindow, updateMarkers, setPools, setName } =
  kakaoMapSlice.actions;
export default kakaoMapSlice.reducer;
