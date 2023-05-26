import type { YTProColumns } from '@/components/YTProTable/typing';
import type { MarketElectricityPriceListItem } from './data';

export const columns: YTProColumns<MarketElectricityPriceListItem>[] = [
  {
    title: '序号',
    valueType: 'index',
    width: 50,
  },
  {
    title: '规则名称',
    dataIndex: 'ruleName',
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
    dataIndex: 'updateTime',
    valueType: 'dateTime',
    hideInSearch: true,
  },
  {
    title: '最后更新时间',
    dataIndex: 'updateTime',
    valueType: 'dateRange',
    hideInTable: true,
  },
  {
    title: '规则',
    dataIndex: 'rules',
    valueType: 'select',
    hideInTable: true,
    requestOption: {
      url: '/electricityPrice/rules',
      mapKey: {
        label: 'name',
        value: 'id',
      },
      dataIndex: 'rules',
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
    valueEnum: new Map([
      [1, '生效'],
      [0, '未生效'],
    ]),
  },
];
