import type { ReactNode } from 'react';

export interface DescriptionCardConfig {
  icon: ReactNode;
  title: string;
  field: string;
  show?: boolean;
  span?: number;
  statistics: Statistic[];
}

export interface Statistic {
  label: string;
  labelUnit: string;
  field?: string;
  value?: string | ((entity: any) => string);
  valueUnit?: string;
  show?: boolean;
}
