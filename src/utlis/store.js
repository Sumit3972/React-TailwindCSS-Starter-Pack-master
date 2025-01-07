import { configureStore } from "@reduxjs/toolkit";
import toggleSliceReducer from "./toggleslice";
import CartSlice from './CartSlice'
import Coordinate from "./cordinate";
import FilterSlice from './filterslice'
const store = configureStore({
    reducer: {
        toggle: toggleSliceReducer, // Use clear naming for the reducer
        CartSlice: CartSlice,
        Coordinate,
        FilterSlice,
    },
});

export default store;
