import { configureStore } from '@reduxjs/toolkit';
import baseReducer from './baseSlice';

export default configureStore({
  reducer: {
    baseReducer,
  },
  devTools: true,
});
