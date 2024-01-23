import React from 'react';
import type { MenuDataItem } from '@umijs/route-utils';
import { formatMessage as umiFormatMessage } from 'umi';
import { createIcon } from './IconUtil';
import FileSaver from 'file-saver';
import { DeviceModelType, DevicePropsType } from '@/types/device';
import routers, { getPathLocaleMap } from '../../config/routes';
import moment from 'moment';

export enum DeviceModelShowTypeEnum {
  // 1-平铺 2-服务名称隐藏 3-宫格 4-展示为radioButton 5-展示为select 6-展示为switch 7-展示为button 8-线
  Tile = 1,
  HideName,
  Grid,
  RadioButton,
  Select,
  Switch,
  Button,
  Line,
}

export enum DeviceModelDescribeTypeEnum {
  Page = 'page',
  Group = 'group',
  Tab = 'tab',
  TabItem = 'tabItem',
  Service = 'service',
  Component = 'component',
  Property = 'property',
  PropertyGroup = 'propertyGroup',
}

export enum DeviceModelTypeEnum {
  Int = 'int',
  Long = 'long',
  Double = 'double',
  String = 'string',
  Boolean = 'boolean',
  Enum = 'enum',
  Struct = 'struct',
  Array = 'array',
  TimeRange = 'timeRange',
  TimeStamp = 'timestamp',
  Button = 'button',
}

export type AntMenuProps = {
  label: string;
  key: string;
  icon?: React.ReactNode;
  children?: AntMenuProps[];
};

export type ValueUnitType = {
  value: string | number;
  unit: string;
};
const formatMessage = umiFormatMessage;
export { formatMessage };

const routePathLocaleMap = getPathLocaleMap(routers);

export const getLocaleMenus = (data: MenuDataItem[], parentPath = ''): MenuDataItem[] => {
  data?.forEach((item) => {
    const path = item?.path?.startsWith?.('/') ? item?.path : parentPath + '/' + item?.path;
    const locale = routePathLocaleMap[path || ''];
    item.name = locale ? formatMessage({ id: locale, defaultMessage: item?.name }) : item?.name;
    if (item?.children && item?.children?.length) {
      getLocaleMenus(item.children, path);
    }
  });
  return data;
};

export const getMenus = (data: MenuDataItem[], prePath = ''): AntMenuProps[] => {
  const arr: AntMenuProps[] = [];
  data.forEach((item) => {
    const path = item?.path?.split('')[0] === '/' ? item.path : `${prePath}/${item.path}`;
    if (!item.hideInMenu) {
      arr.push({
        label: item?.name || '',
        key: path,
        icon: createIcon(item?.meta?.icon, { style: { fontSize: '20px' } }),
        ...(item.children ? { children: getMenus(item.children, path) } : {}),
      });
    }
  });
  return arr;
};

export const getPathTitleMap = (data?: AntMenuProps[]): Map<string, string> => {
  const map = new Map<string, string>();
  data?.forEach?.((item) => {
    map.set(item?.key || '', item.label);
    if (item.children && item.children.length) {
      const result = getPathTitleMap(item.children);
      result.forEach((value, key) => {
        map.set(key, value);
      });
    }
  });
  return map;
};

export const arrayToMap = (array: any[], key = 'value', value = 'label') => {
  const map: Record<string, any> = {};
  array?.forEach?.((item) => {
    map['' + item[key]] = item[value];
  });
  return map;
};

export const isEmpty = (value: any) => {
  return value === null || value === undefined || value === '';
};

export const getValue = (value: any, unit = '') => {
  return isEmpty(value) ? '' : value + unit;
};

export type valueType = {
  value?: string;
  type?: string;
};

export const colorMap = {
  success: 'cl-success',
  error: 'cl-error',
};

export const valueFormat = (value: valueType) => {
  const dom = React.createElement(
    'span',
    {
      className: colorMap[value?.type || ''] || '',
    },
    value?.value,
  );
  return dom;
};

export const getAreaCodeByAdCode = (code: string): string[] => {
  const result = code + '';
  if (result == '900000') {
    return ['900000', '', ''];
  } else if (result) {
    const province = result.substring(0, 2).padEnd(6, '0');
    const city = result.substring(0, 4).padEnd(6, '0');
    return ['100000', province, city];
  } else {
    return ['', '', ''];
  }
};

export const getPlaceholder = (value: any, placeholder = '--') => {
  return value ?? placeholder;
};

/**
 * @param path string;
 * @returns path[];
 * @example '/a/b/c'=>['/a','/a/b','/a/b/c']
 */
export const getPathArrary = (path: string): string[] => {
  const result: string[] = [];
  if (path) {
    (path + '').split('/').forEach((item, index) => {
      if (index) {
        result.push([result[result.length - 1], item].join('/'));
      } else {
        result.push(item);
      }
    });
  }
  result.shift();
  return result;
};

export const saveFile = (data: Blob, name = '导出文件') => {
  // let blob = new Blob([data], { type: fileType.Xlxs })
  FileSaver.saveAs(data, name + '.xlsx');
};

export const strToArray = (value: number | string): number[] => {
  let result: number[] = [];
  try {
    result = JSON.parse(value + '');
    if (!Array.isArray(result)) {
      result = [result];
    }
  } catch (e) {
    result = [value];
  }
  return result;
};

export const parseToArray = (value: string) => {
  if (Array.isArray(value)) {
    return value;
  }
  let result = [];
  try {
    result = JSON.parse(value + '');
    if (!Array.isArray(result)) {
      result = [];
    }
  } catch (e) {
    result = [];
  }
  return result;
};

export const parseToObj = (value: any): Record<string, any> => {
  let result = {};
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return {};
    }
    return value;
  }
  try {
    result = JSON.parse(value + '');
    if (typeof result !== 'object' || Array.isArray(result)) {
      result = {};
    }
  } catch (e) {
    result = {};
  }
  return result;
};

export const formatModelValue = (value: string, model: DeviceModelType): string => {
  let specs: Record<string, any> = {};
  if (typeof model?.specs !== 'object') {
    try {
      specs = JSON.parse(model?.specs);
      if (typeof specs !== 'object') {
        specs = {};
      }
    } catch {
      specs = {};
    }
  } else {
    specs = model?.specs;
  }
  let result = '';
  switch (model?.type) {
    case DeviceModelTypeEnum.Int:
    case DeviceModelTypeEnum.Long:
    case DeviceModelTypeEnum.Double:
      result = value + (specs?.unit ?? '');
      break;
    case DeviceModelTypeEnum.TimeStamp:
      result = moment(value)?.format('YYYY-MM-DD HH:mm:ss');
      break;
    case DeviceModelTypeEnum.Boolean:
    case DeviceModelTypeEnum.Enum:
      result = specs[value];
      break;
    case DeviceModelTypeEnum.Array:
      try {
        result =
          parseToArray(value)
            ?.map?.((item: string, index: number) => {
              let itemValue = '--';
              if (!isEmpty(item)) {
                itemValue = formatModelValue(item, specs?.item);
              }
              if (specs?.aliseRule) {
                return specs?.aliseRule?.replace('$array.{index+1}', index + 1) + '：' + itemValue;
              } else {
                return itemValue;
              }
            })
            .join('，') || '--';
      } catch {
        result = value;
      }
      break;
    case DeviceModelTypeEnum.Struct:
      try {
        const map = arrayToMap(specs, 'id', 'name');
        map[0] = '正常';
        result = map[value] ?? value;
      } catch {
        result = value;
      }
      break;
    case DeviceModelTypeEnum.TimeStamp:
      try {
        result = moment(value)?.format?.('YYYY-MM-DD HH:mm:ss');
        result = result ?? value;
      } catch {
        result = value;
      }
      break;
    case DeviceModelTypeEnum.String:
    default:
      result = value;
      break;
  }
  return result ?? value;
};

export const formatNum = (num: number, separator = '--', floatLength = 2): ValueUnitType => {
  if (isEmpty(num)) {
    return { value: separator, unit: '' };
  } else {
    let unit = '',
      value = num;
    if (-100000000 > num || num > 100000000) {
      unit = '千万';
      value = num / 100000000;
    } else if (-10000 > num || num > 10000) {
      unit = '万';
      value = num / 10000;
    }
    return {
      value: value?.toFixed?.(floatLength) || value,
      unit,
    };
  }
};

export const formatWattNum = (num: number, separator = '--', floatLength = 2): ValueUnitType => {
  if (isEmpty(num)) {
    return { value: separator, unit: '' };
  } else {
    let unit = '',
      value = num;
    if (-1000000000 > num || num > 1000000000) {
      unit = 'T';
      value = num / 1000000000;
    } else if (-1000000 > num || num > 1000000) {
      unit = 'G';
      value = num / 1000000;
    } else if (-1000 > num || num > 1000) {
      unit = 'M';
      value = num / 1000;
    } else {
      unit = 'k';
    }
    return {
      value: value?.toFixed?.(floatLength) || value,
      unit,
    };
  }
};

export const getBrowserLang = () => {
  const language = (navigator.language || navigator.browserLanguage).toLowerCase();
  if (language.indexOf('zh') != -1) {
    return 'zh-CN';
  } else if (language.indexOf('en') != -1) {
    return 'en-US';
  } else {
    return 'zh-CN';
  }
};

export const getModelByProps = (items: DevicePropsType[], parentField = '') => {
  let result: any = {};
  items?.forEach?.((item) => {
    const field = parentField ? parentField + '.' + item?.id : item?.id;
    if (item?.dataType?.type == DeviceModelTypeEnum.Struct) {
      result = { ...result, ...getModelByProps(parseToArray(item?.dataType?.specs), field) };
    } else {
      result[field || ''] = item?.dataType;
    }
  });
  return result;
};

export const startExchangeTime = () => {
  if (!window.exchangeData) {
    window.exchangeData = {
      exchangeCount: 3599,
    };
    setInterval(() => {
      window.exchangeData = {
        exchangeCount: (window.exchangeData?.exchangeCount ?? 3599) + 1,
      };
    }, 1000 * 60 * 5);
  }
};

export const flatObj = (data: Record<string, any>, parentField = '') => {
  let result: Record<string, any> = {};
  if (typeof data !== 'object' || Array.isArray(data)) {
    result = {};
  } else {
    for (const key in data) {
      const field = parentField ? parentField + '.' + key : key;
      if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
        result = { ...result, ...flatObj(data[key], field) };
      } else {
        result[field] = data[key];
      }
    }
  }
  return result;
};

export const getPropsFromTree = <T extends Record<string, any>, U = string>(
  data?: T[],
  key = 'id',
  children = 'children',
  interceptor = (params: T) => true,
): U[] => {
  const result: U[] = [];
  data?.forEach?.((item) => {
    if (!isEmpty(item?.[key]) && (!interceptor || interceptor(item))) {
      result.push(item?.[key]);
    }
    if (item?.[children] && item?.[children]?.length) {
      const childrenResult: U[] = getPropsFromTree(item?.[children], key, children, interceptor);
      result.push(...childrenResult);
    }
  });
  return result;
};
