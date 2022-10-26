import { isLocal } from '@src/utils';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userInfoR } from '../../store/baseSlice';

export const AboutComponent: any = () => {
  const userInfo: any = useSelector(userInfoR);
  if (isLocal()) {
    console.log(1);
  }

  useEffect(() => {
    console.log('about');
  }, []);
  return (
    <>
      <div>我是about页面2{JSON.stringify(userInfo)}</div>
    </>
  );
};
