import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { isCreate } from '@/components/YTModalForm/helper';
import { FormOperations } from '@/components/YTModalForm/typing';
import { YTProColumns } from '@/components/YTProTable/typing';
import { effectStatus } from '@/utils/dict';
import { orderStatus } from './config';
import { ObstacleReportInfo } from './type';
import styles from './index.less';
import Detail from '@/components/Detail';
import { formatMessage } from '@/utils';
export const columnsRead: YTProColumns<ObstacleReportInfo>[] = [
  {
    title: <Detail.DotLabel title={formatMessage({ id: 'taskManage.workOrderDetails', defaultMessage: '工单详情' })} />,
    valueType: 'group',
    colProps: {
      span: 24,
    },
    columns: [
      {
        title: formatMessage({ id: 'taskManage.faultHeading', defaultMessage: '故障标题' }),
        dataIndex: ['name'],
      },
      {
        title: formatMessage({ id: 'taskManage.faultCode', defaultMessage: '故障代码' }),
        dataIndex: ['id'],
      },
      {
        title: formatMessage({ id: 'taskManage.faultDescription', defaultMessage: '故障描述' }),
        dataIndex: ['content'],
        colProps: {
          span: 24,
        },
      },
      {
        title: formatMessage({ id: 'taskManage.owningSite', defaultMessage: '所属站点' }),
        dataIndex: ['siteName'],
      },
      {
        title: formatMessage({ id: 'taskManage.installioner', defaultMessage: '安装商' }),
        dataIndex: ['orgName'],
      },
      {
        title: formatMessage({ id: 'taskManage.custom', defaultMessage: '客户' }),
        dataIndex: ['userName'],
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
