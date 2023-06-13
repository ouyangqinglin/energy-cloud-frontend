import type { YTProColumns } from '@/components/YTProTable/typing';
import { Badge } from 'antd';
import { ReactNode } from 'react';
import type { MarketElectricityPriceInfo } from './type';

export const columns: YTProColumns<MarketElectricityPriceInfo>[] = [
  {
    title: '序号',
    valueType: 'index',
    width: 50,
  },
  {
    title: '规则名称',
    dataIndex: 'name',
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: '生效日期',
    dataIndex: 'effectiveTime',
    valueType: 'dateTime',
    hideInSearch: true,
  },
  {
    title: '最后更新时间',
    dataIndex: 'lastOperationTime',
    valueType: 'dateTime',
    hideInSearch: true,
  },
  {
    title: '最后更新时间',
    dataIndex: 'updateTime.edit',
    valueType: 'dateRange',
    hideInTable: true,
  },
  {
    title: '规则',
    dataIndex: 'rules',
    hideInTable: true,
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
