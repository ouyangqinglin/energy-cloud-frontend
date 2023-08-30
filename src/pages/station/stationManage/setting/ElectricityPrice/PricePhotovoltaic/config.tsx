import type { YTProColumns } from '@/components/YTProTable/typing';
import { Badge } from 'antd';
import type { ReactNode } from 'react';
import type { PhotovoltaicElectricityPriceInfo } from './type';

export const columns: YTProColumns<PhotovoltaicElectricityPriceInfo>[] = [
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
    fieldProps: {
      format: 'MM-DD',
    },
    search: {
      transform: (value) => {
        return {
          effectiveTime: value[0],
          expirationTime: value[1],
        };
      },
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
    title: '当前操作状态',
    dataIndex: 'status',
    valueEnum: new Map<number, ReactNode>([
      [1, <Badge status="success" key="success" text="生效" />],
      [0, <Badge status="error" key="error" text="未生效" />],
    ]),
  },
];
