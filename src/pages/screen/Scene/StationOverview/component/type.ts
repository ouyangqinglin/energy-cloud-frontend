import type { ReactNode } from 'react';
import type { SiteInfoRes } from '../type';

export interface DeviceConfigItem {
  icon?: ReactNode;
  field?: string;
  title: string;
  unit: string;
  span?: number;
  child?: DeviceConfigItem[];
  defaultValue?: number;
  render?: (data: SiteInfoRes) => ReactNode;
  gutter?: number;
  dividerSpan?: number;
}
