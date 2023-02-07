import { useGetUrlParams, useKeepAliveEffect } from '@src/components/myUses';
import { Button, Input } from 'antd';
import { useAliveController } from 'react-activation';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// path中fill="currentColor" 要把 svg标签中的 fill="xxx"去掉
import { ReactComponent as GoogleLogo } from '@src/static/imgs/menu_icon_3.svg';
import { ReactComponent as GoogleLogo6 } from '@src/static/imgs/menu_icon_6.svg';

export const ExamplePageDetails = () => {
  let navigate: any = useNavigate();
  let location: any = useLocation();
  const [searchObj] = useGetUrlParams();
  const { dropScope, getCachingNodes, clear } = useAliveController();
  const dispath = useDispatch();
  return (
    <div className="pageBox padd20 fff" style={{ padding: '20px' }}>
      <h2 className="margB10" style={{ padding: '40px' }}>
        我是详情页面:id={searchObj.id}
      </h2>
      asf <GoogleLogo style={{ color: 'blue' }} />
      adsf
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
      <Input></Input>
    </div>
  );
};
