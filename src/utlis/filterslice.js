import { createSlice } from "@reduxjs/toolkit";




const FilterSlice = createSlice({
    name:"FilterSlice",
    initialState:{
        Filtervalue:null,

    },
    reducers:{
          Setfilter:(state,action)=>{
            state.Filtervalue = action.payload;


          }
    }
})
export const {Setfilter} = FilterSlice.actions;
export default FilterSlice.reducer;