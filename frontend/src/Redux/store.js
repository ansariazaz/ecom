import { configureStore } from '@reduxjs/toolkit' 
import productDetailSlice from './features/productDetailSlice';
import productSlice from './features/productSlice';
import userSlice from './features/userSlice';


const store = configureStore({
    reducer: {
       products:productSlice,
       productDetails:productDetailSlice,
       user:userSlice,
    }, 
})


export default store;