import { createSlice } from "@reduxjs/toolkit";

const categorySlice=createSlice({
    name:"category",
    initialState:{categorys:[]},
    reducers:{
        store_categorys(state,action){
            state.categorys=action.payload
        }
    }
})

export const {store_categorys}=categorySlice.actions
export default categorySlice.reducer
export const selectcategorys=state=>state.category.categorys