import { message } from 'antd';
import qs from 'qs';
import { useEffect, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

export const ranges: any = {
  今天: [dayjs(), dayjs()],
  近三天: [dayjs().subtract(2, 'day'), dayjs()],
  近一周: [dayjs().subtract(6, 'day'), dayjs()],
  近三十天: [dayjs().subtract(29, 'day'), dayjs()],
  本月: [dayjs().startOf('month'), dayjs()],
};
export const debounce = (fn: any, delay = 500) => {
  //默认500毫秒
  let timer: any = null;
  let me: any = this;
  return function () {
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(me, args);
    }, delay);
  };
};
export const throttle = (fn: any, interval: number = 300, firstTimes: boolean = true) => {
  let timer: any = null,
    firstTime: boolean = firstTimes,
    _me: any = this,
    intervalCopy: number = interval;

  return function () {
    var args: any = arguments;
    if (firstTime) {
      timer = 1;
      setTimeout(() => {
        timer = null;
      }, interval);
      intervalCopy = 0;
      fn.apply(_me, args);
      firstTime = false;
      return;
    } else {
      if (timer) {
        return;
      }
      timer = setTimeout(function () {
        intervalCopy = interval;
        clearTimeout(timer);
        timer = null;
        fn.apply(_me, args);
      }, intervalCopy);
    }
  };
};
export function getLengthArray(number = 0) {
  let linshi = [];
  for (var i = 1; i <= number; i++) {
    linshi.push(i);
  }
  return linshi;
}
export function deepClone(obj: any, hash: any = new WeakMap(), copyContructor = false) {
  hash = hash || new WeakMap();
  if (obj === null) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (typeof obj !== 'object') return obj;
  if (hash.has(obj)) return hash.get(obj);
  let cloneObj: any = {};
  if (Array.isArray(obj)) {
    cloneObj = [];
  }
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (copyContructor) {
      cloneObj[key] = deepClone(obj[key], hash, copyContructor);
    } else {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        cloneObj[key] = deepClone(obj[key], hash);
      }
    }
  }
  return cloneObj;
}
export function chinaDate(times?: any, fengefu = '-') {
  if (times === null || times === undefined) {
    times = new Date();
  }
  if (typeof times === 'string') {
    times = times.replace(/-/g, '/');
  }
  fengefu = fengefu || '/';
  const time = new Date(times);
  const nian = time.getFullYear();
  const yue = ('00' + (time.getMonth() + 1)).slice(-2);
  const ri = ('00' + time.getDate()).slice(-2);
  const shi = ('00' + time.getHours()).slice(-2);
  const fen = ('00' + time.getMinutes()).slice(-2);
  const miao = ('00' + time.getSeconds()).slice(-2);
  const nyr = nian + fengefu + yue + fengefu + ri;
  const get0 = new Date(nian + '/' + yue + '/' + ri + ' 00:00:00').getTime();
  const get59 = new Date(nian + '/' + yue + '/' + ri + ' 23:59:59').getTime();
  return {
    fengefu,
    newDate: time,
    nian,
    yue,
    ri,
    shi,
    fen,
    miao,
    date: nyr + ' ' + shi + ':' + fen + ':' + miao,
    date0: nyr + ' ' + '00:00:00',
    date59: nyr + ' ' + '23:59:59',
    nyr: nyr,
    ny: nian + fengefu + yue,
    sfm: shi + ':' + fen + ':' + miao,
    sf: shi + ':' + fen,
    number: time.getTime(),
    get0,
    get59,
  };
}
export function getUrlParams(urlSearch: string): any {
  console.log('getUrlParams函数执行了');
  if (urlSearch.length === 0) {
    return {};
  } else {
    if (urlSearch.startsWith('?')) {
      return qs.parse(urlSearch.slice(1));
    } else {
      return qs.parse(urlSearch);
    }
  }
}
export function hasValue(value: string, stringNull: boolean = false): any {
  let nnArray: any = [undefined, null, ''];
  if (stringNull) {
    nnArray = nnArray.concat('null', 'undefined');
  }
  return !nnArray.includes(value);
}
export const anResize = () => {
  const ev: any = new Event('resize', { bubbles: true, cancelable: false });
  document.dispatchEvent(ev);
};
export function addChildren(passData: any[] = []) {
  if (passData?.length > 0) {
    passData.forEach((item: any) => {
      if (!item.children) {
        item.children = item.childList;
      }
      if (item?.childList?.length) {
        addChildren(item.childList);
      }
    });
    return passData;
  } else {
    return [];
  }
}
export const isLocal = () => {
  return ['127.0.0.1', 'localhost'].includes(window.location.hostname);
};
// 单纯a连接下载
export function aDownLoad(href: string, fileName = '') {
  console.log(fileName);
  const aDownload = window.document.createElement('a');
  aDownload.style.display = 'none';
  aDownload.setAttribute('downLoad', fileName);
  aDownload.setAttribute('href', href);
  document.body.appendChild(aDownload);
  aDownload.click();
  document.body.removeChild(aDownload);
}
//简单数组去重
export const setArrayOnly: any = (arrays: any[]) => {
  // eslint-disable-next-line no-undef
  return Array.from(new Set(arrays));
};
export const getParentKey = (path: any, allList: any, pathName = 'path', children = 'children') => {
  let finallyData: any = null;
  const fn = (passPath: any, passAllList: any) => {
    //console.log(passPath, passAllList);
    passAllList.forEach((item: any) => {
      if (item[pathName] === passPath) {
        finallyData = item;
      } else {
        if (item[children] && item[children].length) {
          fn(path, item[children]);
        }
      }
    });
  };
  fn(path, allList);
  return finallyData;
};
export const getCookie = (cookieName: any) => {
  const strCookie = document.cookie;
  const cookieList = strCookie.split('; ');
  let text = '';

  for (let i = 0; i < cookieList.length; i++) {
    const arr = cookieList[i].split('=');
    if (cookieName === arr[0]) {
      text = arr[1];
    } else {
      continue;
    }
  }

  return text;
};
/* 
  计算两个月份相差及几个月 
  如：2022-09与2022-10 相差1个月
  如：2022-09与2022-09 相差0个月
  如需 计算 2022-09与2022-10共计2个月 
  需要自己调用函数后加一：reduMonths('2022-09','2022-10')+1 =》 2
*/
export const reduMonths = (startMonth: string, endMonth: string) => {
  let startY: any = startMonth.split('-')[0],
    startM: any = startMonth.split('-')[1],
    endY: any = endMonth.split('-')[0],
    endM: any = endMonth.split('-')[1];
  startMonth = startY + startM;
  endMonth = endY + endM;
  if (startMonth > endMonth) {
    let reduY = startY - endY,
      reduM = startM - endM;
    return reduY * 12 + reduM;
  } else if (startMonth < endMonth) {
    let reduY = endY - startY,
      reduM = endM - startM;

    return reduY * 12 + reduM;
  } else {
    return 0;
  }
};
export const createParentKey = (
  passData = [],
  parentKey = '',
  id = 'id',
  children = 'children'
) => {
  passData.forEach((item: any) => {
    item.parentKey = parentKey + '' + item[id];
    if (item[children] && item[children].length > 0) {
      createParentKey(item[children], item.parentKey + ',', id, children);
    }
  });
};
//对象中的某几个key 其中一个有值 或者全部有值
export const objKeysHasValue = (obj: any = {}, keys: any = [], type: string = 'some') => {
  if (type === 'some') {
    /*keys中的某一个是有值的*/
    return keys.some((item: any, index: number) => {
      return ![null, '', undefined].includes(obj[item]);
    });
  } else {
    /*keys中的全部是有值的*/
    return keys.every((item: any, index: number) => {
      return ![null, '', undefined].includes(obj[item]);
    });
  }
};
export const checkIdcard = (idcard: any) => {
  if (!idcard) {
    return;
  }
  idcard = idcard.toString();
  let ereg: any;
  let Errors: any = [
    true,
    '身份证号码位数不对!',
    '身份证号码出生日期超出范围或含有非法字符!',
    '身份证号码校验错误!',
    '身份证地区非法!',
    '出生日期大于当前时间',
  ];
  var area: any = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外',
  };
  //地区检验
  if (area[parseInt(idcard.substr(0, 2))] === null) return Errors[4];
  //身份号码位数及格式检验
  switch (idcard.length) {
    case 15:
      if (
        (parseInt(idcard.substr(6, 2)) + 1900) % 400 === 0 ||
        ((parseInt(idcard.substr(6, 2)) + 1900) % 100 !== 0 &&
          (parseInt(idcard.substr(6, 2)) + 1900) % 4 === 0)
      ) {
        ereg =
          /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性
      } else {
        ereg =
          /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性
      }
      if (ereg.test(idcard)) return Errors[0];
      else return Errors[2];
    case 18:
      //18位身份号码检测
      //出生日期的合法性检查
      //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
      //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
      if (
        parseInt(idcard.substr(6, 4)) % 400 === 0 ||
        (parseInt(idcard.substr(6, 4)) % 100 !== 0 && parseInt(idcard.substr(6, 4)) % 4 === 0)
      ) {
        ereg =
          /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式
      } else {
        ereg =
          /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式
      }
      if (ereg.test(idcard)) {
        //测试出生日期的合法性
        var birthday = new Date(
          parseInt(idcard.substr(6, 4)),
          parseInt(idcard.substr(10, 2)) - 1,
          parseInt(idcard.substr(12, 2))
        );
        if (birthday >= new Date()) {
          return Errors[5];
        }
        idcard = idcard.split('');
        //∑(ai×Wi)(mod 11)
        //加权因子
        var factor: any = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        var parity: any = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        var sum: any = 0;
        var ai: any = 0;
        var wi: any = 0;
        for (var i = 0; i < 17; i++) {
          ai = idcard[i];
          wi = factor[i];
          sum += ai * wi;
        }

        if (
          parity[sum % 11] === idcard[17] ||
          (sum % 11 === 2 && parity[sum % 11].toLowerCase() === idcard[17])
        )
          return Errors[0];
        //检测ID的校验位
        else return Errors[3];
      } else return Errors[2];
    default:
      return Errors[1];
  }
};

/**
 * 通过身份证号获取性别
 * 返回1：男，2：女
 * @param value
 * @returns
 */
function getSexByIdcardNo(value: any) {
  if (!value) {
    return '未知';
  } else if (value.length === 15) {
    return parseInt(value.substr(14, 1)) % 2 ? '1' : '2';
  } else if (value.length === 18) {
    return parseInt(value.substr(16, 1)) % 2 ? '1' : '2';
  } else {
    return '未知';
  }
}

/**
 * 通过身份证号获取年龄
 */
function getBirthByIdcardNo(value: any) {
  if (!value) {
    return '未知';
  } else if (value.length === 15 || value.length === 18) {
    var mainNo = value.substr(6);
    if (value.length === 15) {
      mainNo = '19' + mainNo;
    }
    return mainNo.substr(0, 4) + '-' + mainNo.substr(4, 2) + '-' + mainNo.substr(6, 2);
  } else {
    return '未知';
  }
}

//统一社会信用代码校验规则
function checkSocialCreditNo(idcard: any) {
  if (!idcard) {
    return;
  }
  idcard = idcard.toString();
  var Errors: any[] = [true, '证件号码位数不正确!', '证件号码地区不正确!', '证件号码格式不正确!'];
  if (idcard.length !== 17 && idcard.length !== 18) return Errors[1];
  var area: any = {
    10: '10',
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
  };
  //地区检验
  if (area[parseInt(idcard.substr(2, 2))] === null) return Errors[2];
  var number: any[] = [
    '10',
    '11',
    '12',
    '13',
    '19',
    '21',
    '29',
    '31',
    '32',
    '33',
    '34',
    '35',
    '37',
    '39',
    '41',
    '49',
    '51',
    '52',
    '53',
    '54',
    '55',
    '59',
    '61',
    '62',
    '69',
    '71',
    '72',
    '79',
    '81',
    '89',
    '91',
    '92',
    '93',
    'A1',
    'A9',
    'G1',
    'N1',
    'N2',
    'N3',
    'N9',
    'Y1',
  ];
  var firstNumber = idcard.substr(0, 2);
  var index = number.indexOf(firstNumber);
  if (index < 0) return Errors[3];
  return Errors[0];
}

interface flatArrayBecomeTreeArrayConfigProps {
  idName?: string;
  pidName?: string;
  pidValue?: string | number;
}
export const flatArrayBecomeTreeArray = (
  passArray: any[] = [],
  config: flatArrayBecomeTreeArrayConfigProps = {}
) => {
  if (passArray.length < 2) {
    return passArray;
  }
  const idName = config.idName || 'id';
  const pidName = config.pidName || 'pid';
  const pidValue = config.pidValue || '0';
  passArray = passArray.map((item: any) => {
    return {
      ...item,
      children: item.children || [],
    };
  });
  let finallyArray: any = passArray.filter(
    (item: any) => String(item[pidName]) === String(pidValue)
  );
  // console.log(JSON.parse(JSON.stringify(finallyArray)));
  const dg = (parray: any[], allArray: any[]) => {
    parray.forEach((item: any) => {
      let childrens = allArray.filter((item2: any) => {
        // console.log(
        //   String(item[idName]),
        //   String(item2[pidName]),
        //   String(item[idName]) === String(item2[pidName])
        // );
        return String(item[idName]) === String(item2[pidName]);
      });
      // console.log(JSON.parse(JSON.stringify(childrens)));

      item.children = item.children.concat(childrens);
      // console.log(JSON.parse(JSON.stringify(item)));
      let surplusAllArray = allArray.filter(
        (item2: any) => String(item[idName]) !== String(item2[pidName])
      );
      // console.log(JSON.parse(JSON.stringify(surplusAllArray)));
      if (childrens.length && surplusAllArray.length) {
        dg(childrens, surplusAllArray);
      }
    });
  };
  dg(
    finallyArray,
    passArray.filter((item: any) => item[pidName] !== pidValue)
  );
  return finallyArray;
};
