import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
//login
export const Login = createAsyncThunk(
    "user/Login",
    async(arg) => {
       const {email,password} = arg
       const config = {headers:{"Content-Type":"application/json"}}
       const {data} = await axios.post(`/api/v1/login`,{email,password},config)
       return data;
     }
     
  )
  // register
  export const register = createAsyncThunk(
    "user/register",
    async(userData) => {
       const config = {headers:{"Content-Type":"multipart/form-data"}}
       const {data} = await axios.post(`/api/v1/register`,userData,config)
       return data;
     }
     
  )
  //load User
  export const loadUser = createAsyncThunk(
    "user/loadUser",
    async(arg) => {
       const {data} = await axios.get(`/api/v1/me`)
       return data;
     }
     
  )
  //logout user
  export const logout = createAsyncThunk(
    "user/logout",
    async() => {
        await axios.get(`/api/v1/logout`)
     }
     
  )
export const userSlice = createSlice({
    name: 'login',
    initialState: {
      user:{},
      loading:false,
      isAuthenticated:false,
    },
    reducers: {},
    extraReducers: {
      [Login.pending]: (state) => {
        state.loading = true;
        state.isAuthenticated= false;
      },
      [Login.fulfilled]: (state, { payload }) => {
        state.user = payload;
        state.loading = false;
        state.isSuccess = true;
        state.isAuthenticated=true;
      },
      [Login.rejected]: (state, { error }) => {
        state.message = error.message
        state.loading = false
        state.isAuthenticated = false;
        state.user=null;
      },
      [register.pending]: (state) => {
        state.loading = true;
        state.isAuthenticated= false;
      },
      [register.fulfilled]: (state, { payload }) => {
        state.user = payload;
        state.loading = false;
        state.isSuccess = true;
        state.isAuthenticated=true;
      },
      [register.rejected]: (state, { error }) => {
        state.message = error.message
        state.loading = false
        state.isAuthenticated = false;
        state.user=null;
      },
      [loadUser.pending]: (state) => {
        state.loading = true;
        state.isAuthenticated= false;
      },
      [loadUser.fulfilled]: (state, { payload }) => {
        state.user = payload;
        state.loading = false;
        state.isSuccess = true;
        state.isAuthenticated=true;
      },
      [loadUser.rejected]: (state, { error }) => {
        state.message = error.message
        state.loading = false
        state.isAuthenticated = false;
        state.user=null;
      },
      [logout.fulfilled]: (state, { payload }) => {
        state.user = null;
        state.loading = false;
        state.isSuccess = true;
        state.isAuthenticated=false;
      },
      [logout.rejected]: (state, { error }) => {
        state.message = error.message
        state.loading = false
      }
    }
  })
  
  
  
  export default userSlice.reducer