import type { ProColumns, ProTableProps } from '@ant-design/pro-table';

export type YTProColumns<D, V> = ProColumns<D, V> & {
  requestOption?: {
    url: string;
    methods?: 'post' | 'get';
    mapKey?: Record<string, string>;
    dataIndex?: string;
  };
};

export type YTProTableProps<D, P, V> = {
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
  columns?: YTProColumns<D, V>[];
} & Omit<ProTableProps<D, P, V>, 'columns'>;
