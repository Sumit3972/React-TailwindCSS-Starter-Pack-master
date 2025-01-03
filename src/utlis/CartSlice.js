import { createSlice } from "@reduxjs/toolkit";

const initialCartItems = JSON.parse(localStorage.getItem("cartdata")) || [];
const initialResInfo = JSON.parse(localStorage.getItem("resinfo")) || null;

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    CartItems: initialCartItems, // Load cart items from localStorage
    resInfo: initialResInfo,     // Load restaurant info from localStorage
  },
  reducers: {
    addtocart: (state, action) => {
      const { info, resInfo } = action.payload;

      // Check if cart is empty or resInfo matches the current restaurant
      if (state.resInfo === null || state.resInfo.name === resInfo.name) {
        state.CartItems = [...state.CartItems, info];
        state.resInfo = resInfo;

        // Update localStorage
        localStorage.setItem("cartdata", JSON.stringify(state.CartItems));
        localStorage.setItem("resinfo", JSON.stringify(state.resInfo));
      } else {
        // Handle case for different restaurant menu items
        alert("You can only add items from the same restaurant.");
      }
    },
    deleteItem: (state, action) => {
      state.CartItems = action.payload;
      localStorage.setItem("cartdata", JSON.stringify(action.payload));
    },
    clearcart: (state) => {
      state.CartItems = [];
      state.resInfo = null;
      localStorage.removeItem("cartdata");
      localStorage.removeItem("resinfo");
    },
  },
});

export const { addtocart, deleteItem, clearcart } = CartSlice.actions;
export default CartSlice.reducer;
