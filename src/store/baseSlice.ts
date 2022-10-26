import { createSlice } from '@reduxjs/toolkit';
export const slice = createSlice({
  name: 'base',
  initialState: {
    userInfo: { userName: '-', mobile: '', erpName: '', menuList: [] },
    zhezhaoceng0Show: false,
    testObj: { value: 1, menuList: [{ path: '默认' }] },
    // 左侧导航是否折叠
    leftCollapsed: (window.innerWidth || document.documentElement.clientWidth) < 992,
  },
  reducers: {
    userInfoF: (state, { payload }) => {
      console.log(payload);
      state.userInfo = {
        ...payload,
      };
    },
    changeLeftCollapsed: (state, { payload }) => {
      state.leftCollapsed = payload;
    },
    zhezhaoceng0ShowF: (state, { payload }) => {
      state.zhezhaoceng0Show = payload;
    },
  },
});
// export const getCurUserDetailAPIF = (amount?: any) => (dispatch: any) => {
//   getCurUserDetailAPI({}).then((result: any) => {
//     dispatch(changeRoleObj(result.data));
//     dispatch(changeRouteArray(result.data.resourcesListTreeList));
//   });
// };

export const { userInfoF, changeLeftCollapsed, zhezhaoceng0ShowF } = slice.actions;
export const userInfoR = (state: any) => {
  // console.log(state);
  return state.baseReducer.userInfo;
};
export const leftCollapsedR = (state: any) => {
  return state.baseReducer.leftCollapsed;
};
export const zhezhaoceng0ShowR = (state: any) => state.baseReducer.zhezhaoceng0Show;
export default slice.reducer;
