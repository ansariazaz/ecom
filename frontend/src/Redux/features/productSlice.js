import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const getProducts = createAsyncThunk(
  "product/getData",
  async(arg) => {
      const {currentPage,keyword="",price=[0,10000],category,ratings=0} = arg;
     
     let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
     if(category){
      link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
    }
     const { data } = await axios.get(link);
     return data;
   }
   
)

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    data:[],
    loading:false,
    message:"",
    error:false,
    resultPerPage:null,
  },
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.loading = true
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
      state.isSuccess = true;
      state.resultPerPage=payload.resultPerPage
    },
    [getProducts.rejected]: (state, { error }) => {
      state.message = error.message
      state.loading = false
      state.isSuccess = false;
      state.error=true;
    }
  }
})



export default productSlice.reducer