import { myAxios } from './http';

//redis-Table接口
export const getCloudQueryAPI = (data = {}) => {
  return myAxios({
    method: 'post',
    url: '/base/cloud/query',
    data,
  });
};
//获取系统列表接口
export const getSysListAPI = (params = {}) => {
  return myAxios({
    method: 'get',
    url: '/base/app-system/query',
    params,
  });
};
//域名-Table接口
export const getDomainQueryAPI = (data = {}) => {
  return myAxios({
    method: 'post',
    url: '/base/domain/query',
    data,
  });
};
//域名-详情接口
export const getDomainResolvDetailAPI = (data = {}) => {
  return myAxios({
    method: 'post',
    url: '/base/domain/resolv-detail',
    data,
  });
};
//更新所属系统-Table接口
export const cloudUpdateAPI = (data = {}) => {
  return myAxios({
    method: 'post',
    url: '/base/cloud/update',
    data,
  });
};
//更新所属系统-Table接口
export const appSystemUpdateAPI = (data = {}) => {
  return myAxios({
    method: 'post',
    url: '/base/app-system/update',
    data,
  });
};
//redis-Table接口
export const getBaremetalQueryAPI = (data = {}) => {
  return myAxios({
    method: 'post',
    url: '/base/bare-metal/query',
    data,
  });
};
//根据 环境名/应用系统名/工程名称 查询工程详情：
export const getQqueryProgramTableAPI = (params = {}) => {
  return myAxios({
    method: 'get',
    url: '/base/k8s/query-program',
    params,
  });
};
//固定资产-Table接口
export const getFixedMoneyTableAPI = (params = {}) => {
  return myAxios({
    method: 'get',
    url: '/apis/fixed-asset/query',
    params,
  });
};
//公告接口
export const noticeOncallAPI = (params = {}) => {
  return myAxios({
    method: 'get',
    url: '/base/notice/oncall',
    params,
  });
};
//获取部门列表
export const getDeptListAPI = (params = {}) => {
  return myAxios({
    method: 'get',
    url: '/base/dept/query',
    params,
  });
};
//裸金属table
export const getBareMetalQueryAPI = (data = {}) => {
  return myAxios({
    method: 'post',
    url: '/base/bare-metal/query',
    data,
  });
};
//子网table
export const getVPCQueryAPI = (data = {}) => {
  return myAxios({
    method: 'post',
    url: '/base/vpc/query',
    data,
  });
};
//云主机详情
export const getVmDetailAPI = (data = {}) => {
  return myAxios({
    method: 'post',
    url: '/base/vm/get-disk-detail',
    data,
  });
};
//部门占用资源table
export const getCostByDepartmentAPI = (params = {}) => {
  return myAxios({
    method: 'get',
    url: '/base/cost/by-department',
    params,
  });
};
//部门占用资源详情（系统维度）
export const getCostByAppSystemAPI = (params = {}) => {
  return myAxios({
    method: 'get',
    url: '/base/cost/by-app-system',
    params,
  });
};
//部门占用资源详情（应用维度）
export const getCostByProgramAPI = (params = {}) => {
  return myAxios({
    method: 'get',
    url: '/base/cost/by-program',
    params,
  });
};
//部门占用-占用趋势
export const getCostByAppSystemDetailAPI = (params = {}) => {
  return myAxios({
    method: 'get',
    url: '/base/cost/by-app-system-detail',
    params,
  });
};
//应用列表
export const getK8SQueryProgramAPI = (params = {}) => {
  return myAxios({
    method: 'get',
    url: '/base/k8s/query-program',
    params,
  });
};
//应用列表-端口
export const getK8SQueryProgramPortPI = (params = {}) => {
  return myAxios({
    method: 'get',
    url: '/base/k8s/query-program-port',
    params,
  });
};
//新增应用
export const appSystemCreateAPI = (data = {}) => {
  return myAxios({
    method: 'post',
    url: '/base/app-system/create',
    data,
  });
};
//获取erp
export const getErpUserListAPI = (params = {}) => {
  return myAxios({
    method: 'get',
    // url: '/report/user/list',
    url: '/base/user/query',
    params,
  });
};
//域名调用量table
export const getDomainListAPI = (params = {}) => {
  return myAxios({
    method: 'get',
    url: '/report/domain/list',
    params,
  });
};
//域名调用量
export const getDomainTsAPI = (params = {}) => {
  return myAxios({
    method: 'get',
    url: '/report/domain/ts',
    params,
  });
};
//云资源、固资数量
export const dashboardQueryAPI = (params = {}) => {
  return myAxios({
    method: 'get',
    url: '/base/dashboard/query',
    params,
  });
};
//云资源筛选
export const dashboardResourceQueryAPI = (params = {}) => {
  return myAxios({
    method: 'get',
    url: '/base/dashboard/resource-query',
    params,
  });
};
//驾驶舱月度费用
export const dashboardAllCostAPI = (params = {}) => {
  return myAxios({
    method: 'get',
    url: '/base/dashboard/allCost',
    params,
  });
};
//驾驶舱部门使用资源排名
export const dashboardDeptAllCostAPI = (params = {}) => {
  return myAxios({
    method: 'get',
    url: '/base/dashboard/deptAllCost',
    params,
  });
};
//驾驶舱2/4
export const dashboardDeptCostTrendAPI = (params = {}) => {
  return myAxios({
    method: 'get',
    url: '/base/dashboard/deptCostTrend',
    params,
  });
};
//驾驶舱 top5
export const dashboardTop5API = (params = {}) => {
  return myAxios({
    method: 'get',
    url: '/base/dashboard/top5',
    params,
  });
};
//固定资产
export const fixedAssetQueryAPI = (data = {}) => {
  return myAxios({
    method: 'post',
    url: '/base/fixed-asset/query',
    data,
  });
};
//获取用户信息
export const baseUserInfoAPI = (params = {}) => {
  return myAxios({
    method: 'get',
    url: '/base/userinfo',
    params,
  });
};
