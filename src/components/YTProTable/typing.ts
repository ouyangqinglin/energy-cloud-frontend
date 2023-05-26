import type { ProColumns, ProTableProps } from '@ant-design/pro-table';

export type YTProTableProps<D, P, V = 'text'> = YTProTableCustomProps<D, V> &
  Omit<ProTableProps<D, P, V>, 'columns'>;

export type YTProTableCustomProps<D, V = 'text'> = {
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
};

export type YTProColumns<D, V = 'text'> = ProColumns<D, V> & {
  requestOption?: {
    url: string;
    methods?: 'post' | 'get';
    mapKey?: Record<string, string>;
    dataIndex?: string;
  };
};
