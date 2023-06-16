import * as AntdIcons from '@ant-design/icons';
import * as YTIcons from '@/components/YTIcons';
import React from 'react';

const allIcons: Record<string, any> = { ...AntdIcons, ...YTIcons };

export function getIcon(name: string): React.ReactNode | string {
  const icon = allIcons[name];
  return icon || '';
}

export function createIcon(icon: string | any): React.ReactNode | string {
  if (typeof icon === 'object') {
    return icon;
  }
  const ele = allIcons[icon];
  if (ele) {
    return React.createElement(allIcons[icon]);
  }
  return '';
}
