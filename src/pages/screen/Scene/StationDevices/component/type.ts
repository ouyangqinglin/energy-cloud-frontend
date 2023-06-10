import { ReactNode } from 'react';

export interface DeviceConfigItem {
  icon?: ReactNode;
  title: string;
  value: number;
  unit: string;
  span: number;
  child?: DeviceConfigItem[];

  render?: () => ReactNode | string;
  gutter?: number;
  dividerSpan?: number;
}
