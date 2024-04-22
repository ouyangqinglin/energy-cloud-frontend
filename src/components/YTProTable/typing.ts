import type { MutableRefObject } from 'react';
import type { ProFormInstance } from '@ant-design/pro-components';
import type { ProColumns, ProTableProps } from '@ant-design/pro-components';
import type { SortOrder } from 'antd/lib/table/interface';
import type { ResponsePromise, ResponsePageData } from '@/utils/request';
import type React from 'react';
import type { ButtonProps } from 'antd';

export type YTProTableProps<D, P, V = 'text'> = YTProTableCustomProps<D, P, V> &
  Omit<ProTableProps<D, P, V>, 'columns' | 'request'>;

export type toolBarRenderOptionType<Params> = {
  show?: boolean;
  text?: string;
  onClick?: (formRef?: MutableRefObject<ProFormInstance<Params> | undefined>) => void;
  icon?: React.ReactNode;
  buttonProps?: ButtonProps;
  requestExport?: (params: Params) => Promise<Blob>;
  getExportName?: (params: Params) => string;
};

export type toolBarRenderOptionsType<Params> = {
  add?: toolBarRenderOptionType<Params>;
  export?: toolBarRenderOptionType<Params>;
};

export type YTProTableCustomProps<D, P, V = 'text'> = {
  tableRef?: React.MutableRefObject<HTMLDivElement | undefined>;
  toolBarRenderOptions?: toolBarRenderOptionsType<P>;
  option?: {
    columnsProp?: Omit<ProColumns<D, V>, 'render'>;
    modalDeleteText?: string;
    // 渲染拦截器，决定是否继续渲染，主要用于对于每一行决定是否需要显示操作
    renderInterceptor?: (entity: D) => boolean;
    btnInterceptor?: (entity: D, buttonKey: string) => boolean | void;
    onDeleteChange?: ProColumns<D, V>['render'];
    onEditChange?: ProColumns<D, V>['render'];
    onDetailChange?: ProColumns<D, V>['render'];
    onEnterChange?: ProColumns<D, V>['render'];
    render?: ProColumns<D, V>['render'];
  };
  columns?: YTProColumns<D, V>[];
  request?: (
    params: P & {
      pageSize?: number;
      current?: number;
      keyword?: string;
    },
    sort: Record<string, SortOrder>,
    filter: Record<string, React.ReactText[] | null>,
  ) => ResponsePromise<ResponsePageData<D>, D>;
  resizable?: boolean;
  resizableOptions?: {
    minWidth?: number;
    maxWidth?: number;
  };
  onEvent?: (eventName?: string, params?: any) => void;
  extraHeight?: number;
};

export type EmitType = {
  emit?: (eventName?: string, params?: any) => void;
};

export type YTProColumns<D, V = 'text'> = ProColumns<D, V> & {
  requestOption?: {
    url: string;
    methods?: 'post' | 'get';
    mapKey?: Record<string, string>;
    dataIndex?: string;
  };
  renderWithEmit?: ProColumns<D, V>['render'];
};
