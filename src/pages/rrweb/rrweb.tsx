import { rrwebEventsF } from '@src/store/baseSlice';
import { Button, message } from 'antd';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as rrweb from 'rrweb';
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
export const Rrweb = () => {
  const dispatch = useDispatch();
  let pageThat = useRef<any>({
    rrweb: null,
    events: [],
  });
  const save = () => {
    // fetch('http://YOUR_BACKEND_API', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body,
    // });
  };
  const startRecord = () => {
    //record() 方法启动录制
    //stopFn为暂停录制的方法
    let events: any = [];
    pageThat.current.rrweb = rrweb.record({
      //12秒后停止页面的录制，如果想一直录得话可以去掉。
      emit(event) {
        pageThat.current.events.push(event);
      },
      packFn: rrweb.pack,
    });
    message.info('开启视频录制');
  };
  const endRecord = () => {
    pageThat.current.rrweb();
    message.info('屏幕停止录制');
    // 用任意方式存  储 event
    dispatch(rrwebEventsF(JSON.stringify(pageThat.current.events)));
    pageThat.current.events = [];
  };
  useEffect(() => {}, []);
  return (
    <div>
      <Button onClick={startRecord}>开始录制</Button>
      <Button onClick={endRecord}>暂停录制</Button>
    </div>
  );
};
