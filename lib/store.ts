import navReducer from "@/slices/navSlice"
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    nav: navReducer
  },
})