import type { ProColumns } from '@ant-design/pro-table';

export type CustomTableProps<D, V> = {
  toolbar?: {
    buttonText?: string;
    onChange: () => void;
  };
  option?: {
    modalDeleteText?: string;
    onDeleteChange?: ProColumns<D, V>['render'];
    onEditChange?: ProColumns<D, V>['render'];
    onDetailChange?: ProColumns<D, V>['render'];
    onEnterChange?: ProColumns<D, V>['render'];
  };
};

export type BaseDataTypeConfig = {
  createTime?: number;
  updateTime?: number;
};

export type YTProColumns<D, V = any> = ProColumns<D, V> & {
  requestOption?: {
    url: string;
    methods?: 'post' | 'get';
    mapKey?: Record<string, string>;
    path?: string;
  };
};
