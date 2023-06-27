import type { YTProColumns } from '@/components/YTProTable/typing';

export const columns: YTProColumns<any>[] = [
  {
    title: '站点名称',
    dataIndex: 'name',
    hideInTable: true,
    ellipsis: true,
  },
  {
    title: '产品类型',
    dataIndex: 'productionType',
    hideInTable: true,
    valueEnum: new Map<number, string>([
      [0, '市电'],
      [1, '光伏'],
      [2, '储能'],
      [3, '充电桩'],
      [4, '负载'],
    ]),
    ellipsis: true,
  },
  {
    title: '选择查询时间',
    dataIndex: 'searchTime',
    hideInTable: true,
    ellipsis: true,
    valueType: 'dateRange',
  },
  {
    title: '设备名称',
    dataIndex: 'deviceName',
    hideInTable: true,
    ellipsis: true,
  },
  {
    title: '信号点名称',
    dataIndex: 'signalName',
    valueType: 'select',
    fieldProps: {
      mode: 'multiple',
    },
    valueEnum: new Map<number, string>([
      [0, 'A相电流(A)'],
      [1, 'B相电流(A)'],
      [2, 'C相电流(A)'],
      [3, 'A相电压(F)'],
      [4, 'B相电压(F)'],
      [5, 'C相电压(F)'],
    ]),
    hideInTable: true,
    ellipsis: true,
  },
  {
    title: '日期时间',
    dataIndex: 'date',
    hideInSearch: true,
    ellipsis: true,
    valueType: 'dateTime',
  },

  {
    title: 'A相电流（A）',
    dataIndex: 'aa',
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: 'B相电流（A）',
    dataIndex: 'ba',
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: 'A项电压（V）',
    dataIndex: 'av',
    hideInSearch: true,
    ellipsis: true,
  },
];
