export const findEnumName = (enumList: any[], value: any, dev?: any) => {
  if (dev) {
    console.log(
      dev,
      enumList,
      value,
      enumList.find((item: any) => item.value + '' === value + '')?.name ?? ''
    );
  }
  return enumList.find((item: any) => item.value + '' === value + '')?.name ?? '';
};
export const publicFilterKV: any[] = [
  {
    value: 'appSystemNameCN',
    name: '系统中文名称',
  },
  {
    value: 'id',
    name: '系统编号',
  },
  {
    value: 'appSystemNameEN',
    name: '系统英文名称',
  },
  {
    value: 'erp',
    name: '系统负责人erp',
  },
];
export const publicFilterList: any[] = [
  {
    value: 'instanceName',
    name: '实例名称',
  },
  {
    value: 'instanceUrl',
    name: '实例URL',
  },
  {
    value: 'subSystemNameCN',
    name: '所属业务系统',
  },
  {
    value: 'azId',
    name: '所在可用区',
  },
  {
    value: 'subnetId',
    name: '私有子网ID',
  },
];
export const IDCEnum: any[] = [
  {
    value: null,
    name: '全部',
  },
  {
    value: 'jd-ins',
    name: '商城',
  },
  {
    value: 'ins-zyx',
    name: '中云信',
  },
  {
    value: 'ins-yf',
    name: '有孚',
  },
  {
    value: 'ins-yt',
    name: '云泰',
  },
  {
    value: 'ins-yat',
    name: '亚太',
  },
  {
    value: 'ins-sq',
    name: '宿迁',
  },
];
export const kongAndNotKongEnum: any[] = [
  { name: '全部', value: null },
  { name: '<空>', value: 'null' },
  // { name: '<非空>', value: 1 },
];
export const zhucongEnum: any[] = [
  { name: '全部', value: null },
  { name: '主', value: 1 },
  { name: '从', value: 0 },
];
export const billingTypeEnum: any[] = [
  { name: '全部', value: null },
  { name: '包月', value: 0 },
  { name: '按量', value: 1 },
];
export const trueFalseEnum: any[] = [
  { name: '全部', value: null },
  { name: '是', value: 1 },
  { name: '否', value: 0 },
];
export const envEnum: any[] = [
  { name: '全部', value: null },
  { name: 'prod', value: 'prod' },
  { name: 's-prod', value: 's-prod' },
  { name: 's-test', value: 's-test' },
  { name: 's-dev', value: 's-dev' },
];
export const envEnumAll: any[] = [
  { name: '全部', value: null },

  {
    name: 's-prod',
    value: 's-prod',
  },
  {
    name: 's-stage',
    value: 's-stage',
  },
  {
    name: 's-test',
    value: 's-test',
  },
  {
    name: 's-dev',
    value: 's-dev',
  },
  {
    name: 'prod',
    value: 'prod',
  },
  {
    name: 'stage',
    value: 'stage',
  },
  {
    name: 'test',
    value: 'test',
  },
  {
    name: 'new-dev',
    value: 'new-dev',
  },
  {
    name: 'prod-az',
    value: 'prod-az',
  },
  {
    name: 'stage-az',
    value: 'stage-az',
  },
  {
    name: 'test-az',
    value: 'test-az',
  },
  {
    name: 'ops',
    value: 'ops',
  },
];
export const TimeSortEnum: any[] = [
  { name: '默认', value: null, type: 'dateOrder' },
  { name: '正序', value: 'asc', type: 'dateOrder' },
  { name: '倒序', value: 'desc', type: 'dateOrder' },
];
export const enDisableEnum: any[] = [
  { name: '全部', value: null },
  { name: '启用', value: 1 },
  { name: '停用', value: 0 },
];
export const storageTypeEnum: any[] = [
  { name: '全部', value: null },
  { name: '容量HDD云盘', value: 0 },
  { name: '通用SSD云盘', value: 1 },
  { name: '性能SSD云盘', value: 2 },
  { name: 'SSD本地盘', value: 3 },
  { name: 'NVMe本地盘', value: 4 },
];
interface resourceTypeEnumPops {
  vm: number;
  disk: number;
  rds: number;
  redis: number;
  es: number;
  mongo: number;
  eip: number;
  'bar metal': number;
  [key: string]: any;
}
export const resourceTypeEnum: resourceTypeEnumPops = {
  vm: 0,
  disk: 1,
  rds: 2,
  redis: 3,
  es: 4,
  mongo: 5,
  eip: 6,
  'bar metal': 7,
  k8s: 8,
};
export const gongGaoEnum: any = {
  0: '运维',
  1: 'dba',
  2: '网络',
  3: '安全',
};
