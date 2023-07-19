import { YTProColumns } from '@/components/YTProTable/typing';
import { orderStatus } from '../config';
import { InstallOrderUpdateInfo } from '../type';
// import styles from './index.less';
export const columnsRead: YTProColumns<InstallOrderUpdateInfo>[] = [
  {
    title: '故障标题',
    dataIndex: ['title'],
  },
  {
    title: '故障代码',
    dataIndex: ['errorCode'],
  },
  {
    title: '故障描述',
    dataIndex: ['description'],
  },
  {
    title: '所属站点',
    dataIndex: ['siteName'],
  },
  {
    title: '代理商',
    dataIndex: ['service'],
  },
  {
    title: '客户',
    dataIndex: ['customer'],
  },
  {
    title: '电话',
    dataIndex: ['phone'],
  },
  {
    title: '地址',
    dataIndex: ['address'],
  },
  {
    title: '状态',
    dataIndex: ['status'],
    valueEnum: orderStatus,
  },
  {
    title: '创建时间',
    dataIndex: ['createTime'],
  },
];
