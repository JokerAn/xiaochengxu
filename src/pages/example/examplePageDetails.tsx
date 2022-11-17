import { useGetUrlParams, useKeepAliveEffect } from '@src/components/myUses';
import { Button, Input } from 'antd';
import { useAliveController } from 'react-activation';
import { useLocation, useNavigate } from 'react-router-dom';
import { historyPathsF, historyPathsR, userInfoF } from '@src/store/baseSlice';
import { useDispatch, useSelector } from 'react-redux';

export const ExamplePageDetails = () => {
  let navigate: any = useNavigate();
  let location: any = useLocation();
  const [searchObj] = useGetUrlParams();
  const { dropScope, getCachingNodes, clear } = useAliveController();
  let historyPaths: any = useSelector(historyPathsR);
  const dispath = useDispatch();
  useKeepAliveEffect(
    () => {},
    () => {
      console.log('即将离开', historyPaths, location.pathname);
      if (historyPaths[0] !== '/examplePage') {
        dropScope(location.pathname).then(() => {
          console.log('示例页面的详情页清除缓存完毕');
        });
      }
    }
  );
  return (
    <div className="pageBox padd20 fff" style={{ padding: '20px' }}>
      <h2 className="margB10" style={{ padding: '40px' }}>
        我是详情页面:id={searchObj.id}
      </h2>
      <Button
        danger
        onClick={() => {
          navigate('/examplePage');
        }}
      >
        普通返回-列表页应当还是缓存之前的信息
      </Button>
      <Button
        danger
        onClick={() => {
          dropScope('/examplePage').then(() => {
            navigate('/examplePage');
          });
        }}
      >
        某些ajax操作后的返回-列表页应当刷新最新数据
      </Button>
      <Button
        danger
        onClick={() => {
          dispath(historyPathsF(Math.random()));
        }}
      >
        dispath
      </Button>
      <Input></Input>
    </div>
  );
};
