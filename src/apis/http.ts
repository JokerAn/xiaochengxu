import axios from 'axios';
import { message } from 'antd';
import { isLocal } from '@src/utils';

let axiosInstance: any = axios.create({
  baseURL: '/',
  // baseURL: 'http://api-cmdb-test.jdazcn.com',
  responseType: 'json',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    // "X-Requested-With": "XMLHttpRequest",
  },
  validateStatus() {
    return true;
  },
});
const isExampleApi = (apiStr: string) => {
  const exampleApiLists: string[] = [
    'https://mock.mengxuegu.com/mock/635f896affa946598c7424a0/example/getTableList1',
  ];
  // console.log(apiStr, exampleApiLists.includes(apiStr));
  return exampleApiLists.includes(apiStr);
};
const notNeedMessage = (res: any) => {
  if (res?.config?.url?.startsWith('/apis/vendor/existUnitySocialCode/')) {
    return true;
  }
  return false;
};
axiosInstance.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (err: any) => {
    return Promise.reject(err);
  }
);
axiosInstance.interceptors.response.use(
  (response: any) => {
    let data: any = response.data;
    if (isExampleApi(response.config.url)) {
      return Promise.resolve(data);
    }
    if (data.code === 200) {
      return Promise.resolve(data);
    } else if (response.status === 404) {
      message.error('服务器异常，请稍后');
      return Promise.reject(response);
    } else if (data.code === 403) {
      message.error(data.message || '暂无权限');
      return Promise.reject('无访问权限');
    } else if (data.code === 401 || response.status === 401) {
      if (isLocal()) {
        message.error('本地cookie过期需要更换新的！');
      } else {
        window.location.href = '/base/logout';
      }

      return Promise.reject('无访问权限');
    } else {
      if (/*特殊判断某些接口出错也不弹出message*/ notNeedMessage(response)) {
        console.log('错误但是无需message');
        return Promise.reject(response);
      } else {
        message.error(data.message || '服务器异常，请稍后', 3);
        return Promise.reject(response);
      }
    }
  },
  (err: any) => {
    return Promise.reject(err);
  }
);
export const myAxios = axiosInstance;
