import type { YTProColumns } from '@/components/YTProTable/typing';
import { Badge } from 'antd';
import type { ReactNode } from 'react';
import type { MarketElectricityPriceInfo } from './type';
import moment from 'moment';

export const columns: YTProColumns<MarketElectricityPriceInfo>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
    width: 50,
  },
  {
    title: '规则名称',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: '生效日期',
    dataIndex: 'effectiveTimeList',
    valueType: 'dateRange',
    ellipsis: true,
    render: (_, record) => {
      return record?.effectiveTimeList
        ?.map?.((item) => {
          const start = item?.effectiveTime?.split('-');
          const end = item?.expirationTime?.split('-');
          return `${start[0]}月${start[1]}日-${end[0]}月${end[1]}日`;
        })
        .join('，');
    },
    search: {
      transform: (value) => {
        return {
          effectiveTime: value[0],
          expirationTime: value[1],
        };
      },
    },
    fieldProps: {
      format: 'MM-DD',
    },
  },
  {
    title: '最后更新时间',
    dataIndex: 'lastOperationTime',
    hideInSearch: true,
  },
  {
    title: '操作人',
    dataIndex: 'operator',
    hideInSearch: true,
  },
  {
    title: '当前状态',
    dataIndex: 'status',
    valueEnum: new Map<number, ReactNode>([
      // eslint-disable-next-line react/jsx-key
      [1, <Badge status="success" text="生效" />],
      // eslint-disable-next-line react/jsx-key
      [0, <Badge status="error" text="未生效" />],
    ]),
  },
];
