import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { isCreate } from '@/components/YTModalForm/helper';
import { FormOperations } from '@/components/YTModalForm/typing';
import { YTProColumns } from '@/components/YTProTable/typing';
import { effectStatus } from '@/utils/dictionary';
import { orderStatus } from './config';
import { ObstacleReportInfo } from './type';
import styles from './index.less';
import Detail from '@/components/Detail';
export const columnsRead: YTProColumns<ObstacleReportInfo>[] = [
  {
    title: <Detail.DotLabel title="工单详情" />,
    valueType: 'group',
    colProps: {
      span: 24,
    },
    columns: [
      {
        title: '故障标题',
        dataIndex: ['name'],
      },
      {
        title: '故障代码',
        dataIndex: ['id'],
      },
      {
        title: '故障描述',
        dataIndex: ['content'],
        colProps: {
          span: 24,
        },
      },
      {
        title: '所属站点',
        dataIndex: ['siteName'],
      },
      {
        title: '安装商',
        dataIndex: ['orgName'],
      },
      {
        title: '客户',
        dataIndex: ['userName'],
      },
      {
        title: '联系电话',
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
