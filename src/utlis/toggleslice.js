import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState: {
    searchbartoggle: false, // Default state is false, meaning the sidebar is closed
  },
  reducers: {
    // Toggle the search bar's open/close state
    TogglSearch: (state, action) => {
      // If an action payload is passed, use it to set the state directly
      if (typeof action.payload === 'boolean') {
        state.searchbartoggle = action.payload;
      } else {
        // Otherwise, toggle the state (if no payload is provided)
        state.searchbartoggle = !state.searchbartoggle;
      }
    },
  },
});

export const { TogglSearch } = toggleSlice.actions;
export default toggleSlice.reducer;
