import { YTProColumns } from '@/components/YTProTable/typing';
import type { RemoteUpgradeDataRes } from './type';


export const upgradeStatus = {
  0: {
    text: '升级中',
    status: 'warning',
    icon: 'grey',
  },
  1: {
    text: '升级成功',
    status: 'Success',
    icon: 'green',
  },
  2: {
    text: '升级失败',
    status: 'error',
    icon: 'red',
  },
};
export const columns: YTProColumns<RemoteUpgradeDataRes>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
    width: 48,
  },
  {
    title: '设备名称',
    dataIndex: 'deviceName',
    width: 120,
    ellipsis: true,
  },
  {
    title: '设备序列号',
    dataIndex: 'deviceSn',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '产品型号',
    dataIndex: 'productModel',
    width: 150,
    ellipsis: true,
  },
  {
    title: '模块',
    dataIndex: 'productModel',
    width: 150,
    ellipsis: true,
  },
  {
    title: '产品类型',
    dataIndex: 'typeName',
    width: 150,
    ellipsis: true,
  },
  {
    title: '站点',
    dataIndex: 'siteName',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '软件包名',
    dataIndex: 'packageName',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '原始版本',
    dataIndex: 'oldVersion',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '升级版本',
    dataIndex: 'newVersion',
    width: 150,
    ellipsis: true,
  },
  {
    title: '当前版本',
    dataIndex: 'nowVersion',
    width: 150,
    ellipsis: true,
  },
  {
    title: '升级时间',
    dataIndex: 'upgradeTime',
    valueType: 'dateTime',
    hideInSearch: true,
    width: 150,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '升级人',
    dataIndex: 'upgrader',
    hideInSearch: true,
    width: 100,
    ellipsis: true,
  },
];   



//下拉框
// export const searchColumns: ProColumns[] = [
//   {
//     title: '报表类型',
//     dataIndex: 'reportType',
//     valueType: 'select',
//     valueEnum: reportType,
//     hideInTable: true,
//     formItemProps: {
//       rules: [{ required: true }],
//     },
//     fieldProps: (form) => {
//       return {
//         onChange: () => {
//           form?.setFieldValue?.('deviceId', '');
//         },
//       };
//     },
//   },]
