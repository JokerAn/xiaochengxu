import { myAxios } from './http';

// 示例测试接口1
export const getExampleTableList1API = (params = {}) => {
  return myAxios({
    method: 'get',
    url: 'https://mock.mengxuegu.com/mock/635f896affa946598c7424a0/example/getTableList1',
    params,
  });
};
