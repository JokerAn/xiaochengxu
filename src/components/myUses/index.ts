import {
  changeLeftCollapsed,
  historyPathsR,
  userInfoR,
  zhezhaoceng0ShowF,
} from '@src/store/baseSlice';
import { getTreeItemByPath, getUrlParams, throttle } from '@src/utils';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useActivate, useAliveController, useUnactivate } from 'react-activation';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';

//左侧导航逻辑
export const useLeftAsideSizeByResize = (res?: string) => {
  const dispatch = useDispatch();
  let automationLeft: any = useRef({
    min: false,
    max: false,
  });
  const [size, setSize] = useState({
    width: window.innerWidth || document.documentElement.clientWidth,
    hieght: window.innerHeight || document.documentElement.clientHeight,
  });
  const windowResize = throttle(() => {
    let clientWidth: any = window.innerWidth || document.documentElement.clientWidth;
    let clientHeight: any = window.innerHeight || document.documentElement.clientHeight;
    setSize({
      width: clientWidth,
      hieght: clientHeight,
    });
    if (sessionStorage.LockLeftCollapsed !== 'lock') {
      if (clientWidth < 992) {
        if (automationLeft.current.min === false) {
          dispatch(changeLeftCollapsed(true));
          automationLeft.current.min = true;
          automationLeft.current.max = false;
        }
      } else {
        if (automationLeft.current.max === false) {
          dispatch(changeLeftCollapsed(false));
          automationLeft.current.max = true;
          automationLeft.current.min = false;
        }
      }
    }
  }, 30);
  useEffect(() => {
    // let clientWidth: any = window.innerWidth; // || document.documentElement.clientWidth;
    // console.log(clientWidth);
    // if (clientWidth < 992) {
    //   // dispatch(changeLeftCollapsed(true));
    //   // console.log()
    // }
    window.addEventListener('resize', windowResize);
    return () => {
      window.removeEventListener('resize', windowResize);
    };
  }, []);
  return [size, setSize];
};
//获取url参数 #xxx?a=1&b=2

export const useGetUrlParams = (res = () => {}) => {
  let [searchParams, setSearchParams] = useSearchParams();

  let currentPageSearchObj: any = useMemo(() => {
    return getUrlParams(searchParams.toString());
  }, [searchParams.toString()]);
  return [currentPageSearchObj, setSearchParams];
};
export const useZhezhaoceng0Toggle = (res = () => {}) => {
  const dispatch = useDispatch();
  const zhezhaocengShowF = (time: number = 150) => {
    dispatch(zhezhaoceng0ShowF(true));
    setTimeout(() => {
      dispatch(zhezhaoceng0ShowF(false));
    }, time);
  };
  return [zhezhaocengShowF];
};

//keep-alive封装
export const useKeepAliveActive = (activateF = () => {}, unactivate = () => {}) => {
  let historyPaths: any = useSelector(historyPathsR);
  let userInfo: any = useSelector(userInfoR);
  let location: any = useLocation();
  const { dropScope, getCachingNodes, clear } = useAliveController();

  const { pathname } = location;
  useActivate(() => {
    console.log(pathname, getCachingNodes());
    // 做一下公共的事情
    function addStyle(styleStr = ';', className = '') {
      var style = document.createElement('style');
      style.className = className;
      style.appendChild(document.createTextNode(styleStr));
      var head = document.getElementsByTagName('head')[0];
      head.appendChild(style);
    }
    addStyle(`.ant-btn-loading-icon>span{display:none!important}`, 'anRemoveBtnLoading');
    requestAnimationFrame(() => {
      let anRemoveBtnLoading: any = document.querySelector('.anRemoveBtnLoading');
      anRemoveBtnLoading?.parentNode.removeChild(anRemoveBtnLoading);
    });
    console.log('useActivate');
    activateF();
  });

  useUnactivate(() => {
    // 公共的事情
    console.log(historyPaths);
    let currentPathInfo: any = getTreeItemByPath(userInfo.menuList, pathname);
    let cachePaths: any[] = currentPathInfo.cachePath ? JSON.parse(currentPathInfo.cachePath) : [];
    console.log(cachePaths, historyPaths[0]);
    if (cachePaths.includes(historyPaths[0])) {
      console.log('无需清除缓存，跳转到此页面我得缓存自己');
    } else {
      console.log('需要清除缓存了，即将跳转的页面跟我没得关系，我才不会为他缓存自己的');
      setTimeout(() => {
        dropScope(pathname);
      }, 100);
    }
    console.log('useUnactivate');
    unactivate();
  });
};
