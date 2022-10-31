import { useGetUrlParams } from '@src/components/myUses';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export const ExamplePageDetails = () => {
  const [searchObj] = useGetUrlParams();
  const navigate: any = useNavigate();
  return (
    <div className="pageBox padd20 fff" style={{ padding: '20px' }}>
      <h2 className="margB10">我是详情页面:id={searchObj.id}</h2>
      <Button
        danger
        onClick={() => {
          navigate('/examplePage');
        }}
      >
        返回
      </Button>
    </div>
  );
};
