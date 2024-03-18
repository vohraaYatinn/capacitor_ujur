/* eslint-disable */
import { configureStore } from '@reduxjs/toolkit'
import functionalitiesReducer from "./reducers/functionalities.reducer"

export default configureStore({
  reducer: {
    loader: functionalitiesReducer,
  },
  devTools: true,
})