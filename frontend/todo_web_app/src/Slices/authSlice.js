import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo : localStorage.getItem("userInfo") ? 
  JSON.parse(localStorage.getItem("userInfo")) : null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCraditals : (state , action) => {
     state.userInfo= action.payload;  
     localStorage.setItem("userInfo" , JSON.stringify(action.payload))

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