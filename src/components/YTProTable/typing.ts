import type { ProColumns, ProTableProps } from '@ant-design/pro-table';
import type { SortOrder } from 'antd/lib/table/interface';
import type { ResponsePromise, ResponsePageData } from '@/utils/request';

export type YTProTableProps<D, P, V = 'text'> = YTProTableCustomProps<D, P, V> &
  Omit<ProTableProps<D, P, V>, 'columns' | 'request'>;

export type YTProTableCustomProps<D, P, V = 'text'> = {
  toolBarRenderOptions?: {
    buttonText?: string;
    onChange: () => void;
  };
  option?: {
    columnsProp?: Omit<ProColumns<D, V>, 'render'>;
    modalDeleteText?: string;
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
};

export type YTProColumns<D, V = 'text'> = ProColumns<D, V> & {
  requestOption?: {
    url: string;
    methods?: 'post' | 'get';
    mapKey?: Record<string, string>;
    dataIndex?: string;
  };
};
