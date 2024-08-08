import { formatMessage, getLocale } from '@/utils';
import type { ProColumns } from '@ant-design/pro-components';
import { taskStatusEnum } from '@/utils/dict';
import { getSitesList } from '@/services/station';

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
    dataIndex: 'name',
    hideInSearch: false,
    ellipsis: true,
    align: 'center',
  },
  {
    title: formatMessage({ id: 'monitor.Job.job_name', defaultMessage: '站点' }),
    dataIndex: 'siteIds',
    hideInSearch: false,
    ellipsis: true,
    align: 'center',
  },
  {
    title: formatMessage({
      id: 'dataManage.1088',
      defaultMessage: '诊断日期',
    }),
    dataIndex: 'startTime',
    ellipsis: true,
    valueType: 'dateTime',
    hideInSearch: false,
    align: 'center',
  },
  {
    title: formatMessage({ id: 'dataManage.1081', defaultMessage: '任务状态' }),
    dataIndex: 'status',
    valueEnum: taskStatusEnum,
    ellipsis: true,
    hideInSearch: false,
    align: 'center',
  },
  {
    title: formatMessage({ id: 'dataManage.1089', defaultMessage: '任务开始时间' }),
    dataIndex: 'taskStartTime',
    ellipsis: true,
    valueType: 'dateTime',
    hideInSearch: true,
    align: 'center',
  },
  {
    title: formatMessage({ id: 'dataManage.1090', defaultMessage: '任务结束时间' }),
    dataIndex: 'taskEndTime',
    ellipsis: true,
    valueType: 'dateTime',
    hideInSearch: true,
    align: 'center',
  },
];

export const formColumns: (
  serviceProviderOptions: any[],
) => ProColumns[] = () => {
  return [
    {
      title: formatMessage({ id: 'monitor.Job.job_name', defaultMessage: '任务名称' }),
      dataIndex: 'name',
      formItemProps: { rules: [{ required: true, message: '请输入任务名称' }] },
      colProps: { span: 12 },
    },
    {
      title: formatMessage({ id: 'dataManage.1008', defaultMessage: '站点' }),
      dataIndex: 'siteIds',
      valueType: 'select',
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: false,
            message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
          },
        ],
      },
      fieldProps: {
        mode: 'multiple',
      },
      request: () =>
        getSitesList({ factoryId: 500003 }).then(({ data }) => {
          return data?.map?.((item) => {
            return {
              ...item,
              label: item.name,
              value: item.id + '',
            };
          });
        }),
    },
    {
      title: formatMessage({ id: 'dataManage.1088', defaultMessage: '请选择诊断日期' }),
      dataIndex: 'deliveryTime',
      valueType: 'date',
      width: '100%',
      formItemProps: {
        rules: [
          {
            required: true,
            message:
              formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }) +
              formatMessage({ id: 'common.time', defaultMessage: '时间' }),
          },
        ],
      },
      fieldProps: {
        format: getLocale().dateFormat,
      },
    },
  ];
};