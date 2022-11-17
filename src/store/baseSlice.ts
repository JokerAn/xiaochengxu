import { createSlice } from '@reduxjs/toolkit';
interface sliceInitialStatePros {
  historyPaths: any[];
  zhezhaoceng0Show: boolean;
  userInfo: {
    userName?: string;
    mobile?: string;
    erpName?: string;
    menuList: any[];
    flatRouter: any[];
    [others: string]: any;
  };
  leftCollapsed: boolean;
  [others: string]: any;
}
let initialStateData: sliceInitialStatePros = {
  historyPaths: [window.location.pathname],
  userInfo: { userName: '-', mobile: '', erpName: '', menuList: [], flatRouter: [] },
  zhezhaoceng0Show: false,
  testObj: { value: 1, menuList: [{ path: '默认' }] },
  // 左侧导航是否折叠
  leftCollapsed: (window.innerWidth || document.documentElement.clientWidth) < 992,
};
export const slice = createSlice({
  name: 'base',
  initialState: initialStateData,
  reducers: {
    userInfoF: (state, { payload }) => {
      console.log(payload);
      state.userInfo = {
        ...state.userInfo,
        ...payload,
      };
    },
    historyPathsF: (state, { payload }) => {
      state.historyPaths = [payload, ...state.historyPaths].slice(0, 5) as any;
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

export const { userInfoF, changeLeftCollapsed, zhezhaoceng0ShowF, historyPathsF } = slice.actions;
export const userInfoR = (state: any) => state.baseReducer.userInfo;
export const leftCollapsedR = (state: any) => {
  return state.baseReducer.leftCollapsed;
};
export const historyPathsR = (state: any) => state.baseReducer.historyPaths;
export const zhezhaoceng0ShowR = (state: any) => state.baseReducer.zhezhaoceng0Show;
export default slice.reducer;
