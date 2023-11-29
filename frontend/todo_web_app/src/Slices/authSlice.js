import { createSlice } from '@reduxjs/toolkit'

const storedUserInfo = localStorage?.getItem('userInfo');
const initialState = {
  userInfo: storedUserInfo ? JSON.parse(storedUserInfo) : null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCraditals : (state , action) => {
     state.userInfo= action?.payload;  
     localStorage.setItem("userInfo" , JSON.stringify(action?.payload))

    }
,
    logout : (state)=> {
        state.userInfo =null;
        localStorage.removeItem("userInfo")
    }
  },
})

// Action creators are generated for each case reducer function
export const {setCraditals , logout} = authSlice.actions

export default authSlice.reducer