import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice=createSlice({
    name:"checkout",
    initialState:{shippingAddress:{}},
    reducers:{
        store_shippingAddress(state,action){
            console.log(action.payload)
            state.shippingAddress=action.payload
        }
    }
})

export const {store_shippingAddress}=checkoutSlice.actions
export default checkoutSlice.reducer
export const selectShippingAddress=state=>state.checkout.shippingAddress