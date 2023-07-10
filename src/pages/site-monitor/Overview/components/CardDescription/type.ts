import { ReactNode } from 'react';

export interface DescriptionCardConfig {
  icon: ReactNode;
  title: string;
  statistics: Statistic[];
}

export interface Statistic {
  label: string;
  labelUnit: string;
  field?: string;
  value?: string | ((entity: any) => string);
  valueUnit?: string;
}
