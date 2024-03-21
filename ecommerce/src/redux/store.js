import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import sliderSlice from "./sliderSlice";
import productSlice from "./productSlice";
import categorySlice from "./categorySlice";
import cartSlice from "./cartSlice";
import filterSlice from "./filterSlice";
import checkoutSlice from "./checkoutSlice";

const store=configureStore({
    reducer:{auth:authSlice,
        category:categorySlice,
        slider:sliderSlice,
        product:productSlice,
        cart:cartSlice,
        filter:filterSlice,
        checkout:checkoutSlice,
    }
})

export default store