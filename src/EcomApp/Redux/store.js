import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlice";
import adminReducer from "./Slices/AdminSlice";
import cartReducer from "./Slices/CartSlice";
const store = configureStore({
    reducer:{
        user:userReducer,
        admin:adminReducer,
        cart:cartReducer
    }
})
export default store;