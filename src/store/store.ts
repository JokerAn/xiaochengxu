import { configureStore } from '@reduxjs/toolkit';
import baseReducer from './baseSlice';
const store = configureStore({
  reducer: {
    baseReducer,
  },
  devTools: true,
});
// const a: any = (res: any) => {
//   console.log(res);
// };
// store.subscribe(a);
export default store;
