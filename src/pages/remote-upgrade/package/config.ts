import { YTProColumns } from '@/components/YTProTable/typing';
import type { RemoteUpgradeDataRes } from './type';

export const columns: YTProColumns<RemoteUpgradeDataRes>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
    width: 48,
  },
  {
    title: '软件包名称',
    dataIndex: 'softwarePackage',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
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
    title: '产品类型',
    dataIndex: 'deviceModel',
    width: 120,
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
];
