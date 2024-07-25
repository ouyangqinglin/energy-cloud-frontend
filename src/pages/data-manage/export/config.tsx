import { formatMessage } from '@/utils';
import type { ProColumns } from '@ant-design/pro-components';
import { taskStatusEnum } from '@/utils/dict';
import moment from 'moment';

export interface DataType {
  key: React.Key;
  siteId: string;
  siteName: string;
  energyOptions: string;
  platform: number;
  deliveryTime: string;
  deviceCount: number;
  charge: number;
  discharge: number;
  efficiency: number;
  gain: number;
}

export const columns: ProColumns<DataType>[] = [
  {
    title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
    dataIndex: 'index',
    valueType: 'index',
    width: 50,
    align: 'center',
  },
  {
    title: formatMessage({ id: 'monitor.Job.job_name', defaultMessage: '任务名称' }),
    dataIndex: 'siteId',
    hideInSearch: false,
    ellipsis: true,
    align: 'center',
  },
  {
    title: formatMessage({
      id: 'dataManage.1083',
      defaultMessage: '查询开始时间',
    }),
    dataIndex: 'startTime',
    ellipsis: true,
    valueType: 'dateTime',
    hideInSearch: true,
    align: 'center',
  },
  {
    title: formatMessage({ id: 'dataManage.1084', defaultMessage: '查询结束时间' }),
    dataIndex: 'endTime',
    ellipsis: true,
    valueType: 'dateTime',
    hideInSearch: true,
    align: 'center',
  },
  {
    title: formatMessage({ id: 'dataManage.1085', defaultMessage: '任务执行时间' }),
    dataIndex: 'time',
    valueType: 'dateRange',
    hideInTable: true,
    hideInSearch: false,
    width: 200,
    initialValue: [moment().subtract(1, 'week'), moment()],
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: formatMessage({ id: 'dataManage.1080', defaultMessage: '查询参数' }),
    dataIndex: 'siteName',
    ellipsis: true,
    hideInSearch: true,
    align: 'center',
  },
  {
    title: formatMessage({ id: 'dataManage.1081', defaultMessage: '任务状态' }),
    dataIndex: 'energyOptions',
    valueEnum: taskStatusEnum,
    ellipsis: true,
    hideInSearch: false,
    align: 'center',
  },
  {
    title: formatMessage({ id: 'dataManage.1082', defaultMessage: '进度' }),
    dataIndex: 'siteId',
    hideInSearch: true,
    hideInTable: false,
    ellipsis: true,
    align: 'center',
  },
  {
    title: formatMessage({ id: 'dataManage.1085', defaultMessage: '任务执行时间' }),
    dataIndex: 'endTime',
    ellipsis: true,
    valueType: 'dateTime',
    hideInSearch: true,
    align: 'center',
  },
];
