import type { YTProColumns } from '@/components/YTProTable/typing';
import { Badge } from 'antd';
import type { ReactNode } from 'react';
import type { MarketElectricityPriceListItem } from './type';

export const columns: YTProColumns<MarketElectricityPriceListItem>[] = [
  {
    title: '序号',
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
    render: (_, record) => {
      return record?.effectiveTimeList
        ?.map?.((item) => {
          const start = item?.effectiveTime?.split('-');
          const end = item?.expirationTime?.split('-');
          return `${start[0]}月${start[1]}日-${end[0]}月${end[1]}日`;
        })
        .join('，');
    },
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '最后更新时间',
    dataIndex: 'lastOperationTime',
    valueType: 'dateRange',
    render: (_, record) => <span>{record.lastOperationTime}</span>,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '操作人',
    dataIndex: 'operator',
    hideInSearch: true,
  },
  {
    title: '当前操作状态',
    dataIndex: 'status',
    valueEnum: new Map<number, ReactNode>([
      // eslint-disable-next-line react/jsx-key
      [1, <Badge status="success" text="生效" />],
      // eslint-disable-next-line react/jsx-key
      [0, <Badge status="error" text="未生效" />],
    ]),
  },
];
