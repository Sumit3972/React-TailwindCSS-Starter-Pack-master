import { createSlice } from "@reduxjs/toolkit";



const CartSlice = createSlice({
    name:"CartSlice",
    initialState: {
        CartItems: JSON.parse(localStorage.getItem("cartData")) || [],
        resInfo: JSON.parse(localStorage.getItem("resInfo")) || null,
    },
    
    
    reducers:{
        addtocart:(state,action)=>{
        
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
        deleteItem:(state,action)=>{
               state.CartItems = action.payload;
               localStorage.setItem("cartdata",JSON.stringify(action.payload));
        },
        clearcart:(state)=>{
            state.CartItems = [];
            localStorage.removeItem("cartdata");
            localStorage.removeItem("resinfo");
        }
    }
});

export const {addtocart,deleteItem,clearcart} = CartSlice.actions;
export default CartSlice.reducer;