import type { MenuDataItem } from '@umijs/route-utils';
import type { MenuProps } from 'antd';
import { createIcon } from './IconUtil';
import React from 'react';

export const getMenus = (data: MenuDataItem[], prePath = ''): MenuProps['items'] => {
  const arr: MenuProps['items'] = [];
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

export function arrayToMap(array: any[], key = 'value', value = 'label') {
  const map = {};
  array.forEach((item) => {
    map['' + item[key]] = item[value];
  });
  return map;
}

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
