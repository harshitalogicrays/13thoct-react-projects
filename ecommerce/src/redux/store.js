import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import sliderSlice from "./sliderSlice";
import productSlice from "./productSlice";
import categorySlice from "./categorySlice";

const store=configureStore({
    reducer:{auth:authSlice,
        category:categorySlice,
        slider:sliderSlice,
        product:productSlice,
    }
})

export default store