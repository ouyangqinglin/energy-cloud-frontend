import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { isCreate } from '@/components/YTModalForm/helper';
import { FormOperations } from '@/components/YTModalForm/typing';
import { YTProColumns } from '@/components/YTProTable/typing';
import { effectStatus } from '@/utils/dict';
import { orderStatus } from './config';
import { ObstacleReportInfo } from './type';
import styles from './index.less';
import { formatMessage } from '@/utils';
export const columnsRead: YTProColumns<ObstacleReportInfo>[] = [
  {
    title: <div className={styles.title}>{formatMessage({ id: 'taskManage.basicInformation', defaultMessage: '基础信息' })}</div>,
    valueType: 'group',
    colProps: {
      span: 24,
    },
    columns: [
      {
        title: formatMessage({ id: 'taskManage.faultHeading', defaultMessage: '故障标题' }),
        dataIndex: ['title'],
      },
      {
        title: formatMessage({ id: 'taskManage.faultCode', defaultMessage: '故障代码' }),
        dataIndex: ['errorCode'],
      },
      {
        title: formatMessage({ id: 'taskManage.faultDescription', defaultMessage: '故障描述' }),
        dataIndex: ['description'],
      },
      {
        title: formatMessage({ id: 'taskManage.owningSite', defaultMessage: '所属站点' }),
        dataIndex: ['siteName'],
      },
      {
        title: formatMessage({ id: 'taskManage.agent', defaultMessage: '代理商' }),
        dataIndex: ['service'],
      },
      {
        title: formatMessage({ id: 'taskManage.custom', defaultMessage: '客户' }),
        dataIndex: ['customer'],
      },
      {
        title: formatMessage({ id: 'taskManage.phone', defaultMessage: '电话' }),
        dataIndex: ['phone'],
      },
      {
        title: formatMessage({ id: 'taskManage.address', defaultMessage: '地址' }),
        dataIndex: ['address'],
      },
      {
        title: formatMessage({ id: 'taskManage.state', defaultMessage: '状态' }),
        dataIndex: ['status'],
        valueEnum: orderStatus,
      },
      {
        title: formatMessage({ id: 'taskManage.creationTime', defaultMessage: '创建时间' }),
        dataIndex: ['createTime'],
      },
    ],
  },
];
