import type { YTProColumns } from '@/components/YTProTable/typing';
import { Badge } from 'antd';
import type { MarketElectricityPriceInfo } from './type';
export const columns: YTProColumns<MarketElectricityPriceInfo>[] = [
  {
    title: '站点名称',
    dataIndex: 'name',
    hideInTable: true,
    ellipsis: true,
  },
  {
    title: '时间维度',
    dataIndex: 'time',
    hideInTable: true,
    valueEnum: new Map<number, string>([
      [1, '市电'],
      [0, '光伏'],
    ]),
    ellipsis: true,
  },
  {
    title: '选择查询时间',
    dataIndex: 'date',
    hideInTable: true,
    ellipsis: true,
    valueType: 'dateTime',
  },
  {
    title: '市电耗电电费（元）',
    hideInSearch: true,
    children: [
      {
        title: '日期',
        dataIndex: 'date',
        valueType: 'dateTime',
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: '尖电',
        dataIndex: 'sharpPrice',
        hideInSearch: true,
        ellipsis: true,
      },
      {
        title: '峰电',
        dataIndex: 'peakPricepeakPrice',
        hideInSearch: true,
        ellipsis: true,
      },
      {
        title: '平电',
        dataIndex: 'flatPrice',
        hideInSearch: true,
        ellipsis: true,
      },
      {
        title: '谷电',
        dataIndex: 'valleyPrice',
        hideInSearch: true,
        ellipsis: true,
      },
      {
        title: '总计',
        dataIndex: 'total',
        hideInSearch: true,
        ellipsis: true,
      },
    ],
  },
];
