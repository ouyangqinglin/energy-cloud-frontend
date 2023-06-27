import type { ProColumns } from '@ant-design/pro-components';
import type { RemoteUpgradeDataRes } from './type';

export const columns: ProColumns<RemoteUpgradeDataRes>[] = [
  {
    title: '序号',
    valueType: 'index',
    width: 48,
  },
  {
    title: '版本号',
    dataIndex: 'version',
    width: 120,
    ellipsis: true,
  },
  {
    title: '产品型号',
    dataIndex: 'deviceType',
    width: 120,
    ellipsis: true,
  },
  {
    title: '软件包',
    dataIndex: 'softwarePackage',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '上传时间',
    dataIndex: 'uploadTime',
    valueType: 'dateTime',
    hideInSearch: true,
    width: 150,
  },
  {
    title: '上传人',
    dataIndex: 'uploader',
    hideInSearch: true,
    width: 100,
    ellipsis: true,
  },
];
