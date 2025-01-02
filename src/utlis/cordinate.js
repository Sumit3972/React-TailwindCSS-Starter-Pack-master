import { createSlice } from "@reduxjs/toolkit";

// Default coordinates (could be set to a default location)
const Coordinate = createSlice({
  name: "Coordinate",
  initialState: {
    lat: 26.95250,  // Default latitude
    lng: 75.71050,  // Default longitude
  },
  reducers: {
    setCoordinates: (state, action) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
});

export default Coordinate.reducer;
export const { setCoordinates } = Coordinate.actions;
