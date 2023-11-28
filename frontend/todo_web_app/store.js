import { configureStore } from '@reduxjs/toolkit'
import authReducer from './src/Slices/authSlice'

export const store = configureStore({
  reducer: {
    auth :authReducer
  },
})