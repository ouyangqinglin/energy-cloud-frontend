import type { YTProColumns } from '@/components/YTProTable/typing';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { FunctionComponent, ReactNode } from 'react';
import type { FormReadBaseProps } from '../FormRead/type';
import type { ProRequestData } from '@ant-design/pro-components';
import { get } from '@/utils/request';

export type FormTableListBaseProps<DataType> = {
  onChangeStatus?: any;
  actionRef?: React.Ref<ActionType>;
  priceType: string;
  onDeleteChange?: ProColumns<DataType, any>['render'];
  columns?: YTProColumns<DataType, any>[];
  formReadChild?: (props: FormReadBaseProps) => JSX.Element;
  formUpdateChild?: (props: FormReadBaseProps) => JSX.Element;
  requestDefaultPrice: typeof get;
  setType: '0' | '1';
  inDevice?: boolean;
  siteId?: string;
};
