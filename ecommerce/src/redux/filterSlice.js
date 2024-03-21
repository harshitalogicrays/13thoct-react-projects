import { createSlice } from "@reduxjs/toolkit";

const filterSlice=createSlice({
    name:"filter",
    initialState:{filterProducts:[],searchvalue:'',categoryname:''},
    reducers:{
        FILTER_BY_SEARCH(state,action){
            let {products,search}=action.payload
            if(search !=''){
                let filters=products.filter(item=>item.name.includes(search) || item.category==search)
                state.filterProducts=filters
            }
            state.searchvalue=search
        },
        FILTER_BY_CATEGORY(state,action){},
        FILTER_BY_PRICE(state,action){}
    }
})
export const {FILTER_BY_CATEGORY,FILTER_BY_PRICE,FILTER_BY_SEARCH}=filterSlice.actions

export default filterSlice.reducer

export const selectFilters=state=>state.filter.filterProducts
export const selectsearch=state=>state.filter.searchvalue