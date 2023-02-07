import { rrwebEventsR } from '@src/store/baseSlice';
import { Button, Input, Select } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
export const RrwebPlayer = () => {
  const rrwebEvents = useSelector(rrwebEventsR);
  const pageThat = useRef<any>({
    replayer: null,
  });
  const [events, eventsSet] = useState<any>([]);
  useEffect(() => {
    eventsSet(rrwebEvents);
  }, [rrwebEvents]);
  const payerVideoBoxRef = useRef<any>(null);

  const payerVideo = () => {
    console.log(events);
    pageThat.current.replayer = new rrwebPlayer({
      target: payerVideoBoxRef.current, // 可以自定义 DOM 元素
      // 配置项
      props: {
        events: JSON.parse(events),
      },
    });
    pageThat.current.replayer.play();
  };
  const payerVideoEnd = () => {
    console.log(pageThat.current.replayer);
    // 暂停
    pageThat.current.replayer.pause();
  };
  return (
    <div>
      <Input
        onChange={(e: any) => {
          eventsSet(e.target.value || events);
        }}
      />
      <Select style={{ width: '100%' }}>
        <Select.Option value={1}>111</Select.Option>
        <Select.Option value={2}>222</Select.Option>
      </Select>
      <Button onClick={payerVideo}>点击开始回放</Button>
      <Button onClick={payerVideoEnd}>点击暂停回放</Button>
      <div ref={payerVideoBoxRef}></div>
    </div>
  );
};
