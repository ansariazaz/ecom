import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const getProductDetails = createAsyncThunk(
  "productDetails",
  async(id) => {
    const  res = await axios.get(`/api/v1/product/${id}`);
    const data = res.data
    return data
  }
)

export const productDetailSlice = createSlice({
  name: 'productDetails',
  initialState: {
    data:[],
    loading:false,
    message:"",
    error:false
  },
  reducers: {},
  extraReducers: {
    [getProductDetails.pending]: (state) => {
      state.loading = true
    },
    [getProductDetails.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
      state.isSuccess = true;
    },
    [getProductDetails.rejected]: (state, { error }) => {
      state.message = error.message
      state.loading = false
      state.isSuccess = false;
      state.error=true;
    }
  }
})



export default productDetailSlice.reducer