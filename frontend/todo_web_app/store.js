import { configureStore } from '@reduxjs/toolkit'
import authReducer from './src/Slices/authSlice'
import taskReducer from './src/Slices/taskSlice'

export const store = configureStore({
  reducer: {
    auth :authReducer,
    task : taskReducer
  },
})