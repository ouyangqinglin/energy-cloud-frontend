import React from 'react';
import type { MenuDataItem } from '@umijs/route-utils';
import type { MenuProps } from 'antd';
import { createIcon } from './IconUtil';
import FileSaver from 'file-saver';
import { DeviceModelTypeEnum } from './dictionary';
import { DeviceModelType } from '@/types/device';

export type AntMenuProps = {
  label: string;
  key: string;
  icon?: React.ReactNode;
  children?: AntMenuProps[];
};

export const getMenus = (data: MenuDataItem[], prePath = ''): AntMenuProps[] => {
  const arr: AntMenuProps[] = [];
  data.forEach((item) => {
    const path = item?.path?.split('')[0] === '/' ? item.path : `${prePath}/${item.path}`;
    if (!item.hideInMenu) {
      arr.push({
        label: item?.meta?.title,
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

export const parseToObj = (value: string) => {
  if (typeof value === 'object') {
    return value;
  }
  let result = {};
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
      result = value + specs?.unit;
      break;
    case DeviceModelTypeEnum.Boolean:
    case DeviceModelTypeEnum.Enum:
      result = specs[value];
      break;
    case DeviceModelTypeEnum.Array:
      if (specs?.aliseRule) {
        try {
          result =
            parseToArray(value)
              ?.map?.((item: string, index: number) => {
                let itemValue = '--';
                if (item) {
                  itemValue = formatModelValue(item, specs?.item);
                }
                return specs?.aliseRule?.replace('$array.{index+1}', index + 1) + '：' + itemValue;
              })
              .join('，') || '--';
        } catch {
          result = value;
        }
      } else {
        result = value;
      }
      break;
    case DeviceModelTypeEnum.String:
    default:
      result = value;
      break;
  }
  return result;
};

export const formatNum = (num: number, separator = '--', floatLength = 2) => {
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
