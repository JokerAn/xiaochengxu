import { changeLeftCollapsed, zhezhaoceng0ShowF } from '@src/store/baseSlice';
import { getUrlParams, throttle } from '@src/utils';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

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
