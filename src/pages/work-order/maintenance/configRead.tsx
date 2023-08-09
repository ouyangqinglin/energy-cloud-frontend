import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { isCreate } from '@/components/YTModalForm/helper';
import { FormOperations } from '@/components/YTModalForm/typing';
import { YTProColumns } from '@/components/YTProTable/typing';
import { effectStatus } from '@/utils/dictionary';
import { orderStatus } from './config';
import { ObstacleReportInfo } from './type';
import styles from './index.less';
export const columnsRead: YTProColumns<ObstacleReportInfo>[] = [
  {
    title: <div className={styles.title}>基础信息</div>,
    valueType: 'group',
    colProps: {
      span: 24,
    },
    columns: [
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
    ],
  },
];
