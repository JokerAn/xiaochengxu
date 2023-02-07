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
    windowStop: false,
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
    pageThat.current.windowStop = false;
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
    setTimeout(() => {
      endRecord();
    }, 8 * 1000);
  };
  const endRecord = (stop: any = false) => {
    if (pageThat.current.windowStop === true) {
      return;
    }
    pageThat.current.rrweb?.();
    message.info('屏幕停止录制');
    console.log(pageThat.current.events);
    // 用任意方式存  储 event
    dispatch(rrwebEventsF(pageThat.current.events));
    pageThat.current.events = [];
    if (!stop && !pageThat.current.windowStop) {
      setTimeout(() => {
        startRecord();
      }, 1 * 1000);
    } else {
      pageThat.current.windowStop = true;
    }
  };
  useEffect(() => {
    let time: number = 0;
    window.addEventListener(
      'error',
      (e) => {
        if (new Date().getTime() - time > 200) {
          time = new Date().getTime();
          console.log(e);
          endRecord(true);
        }
      },
      true
    );
  }, []);
  return (
    <div>
      <Button onClick={startRecord}>开始录制</Button>
      <Button
        onClick={() => {
          endRecord(true);
        }}
      >
        暂停录制
      </Button>
    </div>
  );
};
