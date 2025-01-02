import { configureStore } from "@reduxjs/toolkit";
import toggleSliceReducer from "./toggleslice";
import CartSlice from './CartSlice'
import Coordinate from "./cordinate";
const store = configureStore({
    reducer: {
        toggle: toggleSliceReducer, // Use clear naming for the reducer
        CartSlice:CartSlice,
        Coordinate,
    },
});

export default store;
