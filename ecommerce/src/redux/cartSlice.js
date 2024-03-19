import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice=createSlice({
    name:"cart",
    initialState:{cartItems:[],total:0,url:''},
    reducers:{
        ADD_TO_CART(state,action){
            const itemIndex=state.cartItems.findIndex((item)=>item.id==action.payload.id)
            if(itemIndex==-1){ //add 
                state.cartItems=[...state.cartItems,{...action.payload,cartQuantity:1}]
                toast.success(`${action.payload.name} added to cart`) }
           else { //increase 
                if(state.cartItems[itemIndex].cartQuantity < action.payload.stock){
                    state.cartItems[itemIndex].cartQuantity++ }   }   },
        DECREASE(state,action){
            const itemIndex=state.cartItems.findIndex((item)=>item.id==action.payload.id)
            if(state.cartItems[itemIndex].cartQuantity > 1){
                state.cartItems[itemIndex].cartQuantity-- } },
        REMOVE_FROM_CART(state,action){
            const filterdata=state.cartItems.filter((item)=>item.id!=action.payload.id)
            state.cartItems=filterdata  },
        EMPTy_CART(state,action){ state.cartItems=[];state.total=0  },
        CALCULATE_TOTAL(state,action){
            let t= state.cartItems.reduce((prev,cur)=>{return prev+(cur.price*cur.cartQuantity)},0)
            state.total=t   },
        SAVE_URL(state,action){ state.url=action.payload}  }})
export const {ADD_TO_CART,DECREASE,REMOVE_FROM_CART,EMPTy_CART,CALCULATE_TOTAL,SAVE_URL}=cartSlice.actions
export default cartSlice.reducer
export const selectcartItems=state=>state.cart.cartItems
export const selectTotalAmount=state=>state.cart.total
export const selectURL=state=>state.cart.url