import { formatMessage } from '@/utils';
import type { ProColumns } from '@ant-design/pro-components';
import { buildStatus } from '@/utils/dict';
import { siteType as siteTypeEnum } from '@/utils/dict';
import moment from 'moment';
import { getLevelByType } from '@/components/Alarm/AlarmTable';

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

export const OrderTypEnum = {
  charge: 1,
  discharge: 2,
  efficiency: 3,
  gain: 4,
};

export const columns: ProColumns<DataType>[] = [
  {
    title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
    dataIndex: 'index',
    valueType: 'index',
    render(_, record, index) {
      if (index == 0) return formatMessage({ id: 'dataManage.1032', defaultMessage: '总数' });
      return index;
    },
    width: 50,
  },
  {
    title: formatMessage({ id: 'siteManage.siteList.siteCode', defaultMessage: '站点编码' }),
    dataIndex: 'siteId',
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'siteManage.siteList.siteName', defaultMessage: '站点名称' }),
    dataIndex: 'siteName',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'alarmManage.1010', defaultMessage: '告警总数' }),
    dataIndex: 'total',
    ellipsis: true,
    sorter: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({
      id: 'siteManage.siteList.constructionStatus',
      defaultMessage: '建设状态',
    }),
    dataIndex: 'constructionStatus',
    valueType: 'select',
    valueEnum: buildStatus,
    width: 150,
    ellipsis: true,
    hideInTable: true,
  },

  {
    title: formatMessage({ id: 'alarmManage.currentAlarm', defaultMessage: '当前告警' }),
    ellipsis: true,
    hideInSearch: true,
    children: [
      {
        title: formatMessage({ id: 'alarmManage.1011', defaultMessage: '总数' }),
        dataIndex: 'currentTotal',
        ellipsis: true,
        sorter: true,
        hideInSearch: true,
      },
      {
        title: getLevelByType('error', '', false),
        dataIndex: 'currentErrorNum',
        sorter: true,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: getLevelByType('alarm', '', false),
        dataIndex: 'currentAlarmNum',
        sorter: true,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: getLevelByType('warn', '', false),
        dataIndex: 'currentWarnNum',
        sorter: true,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: getLevelByType('info', '', false),
        dataIndex: 'currentInfoNum',
        sorter: true,
        ellipsis: true,
        hideInSearch: true,
      },
    ],
  },
  {
    title: formatMessage({ id: 'alarmManage.historicalAlarm', defaultMessage: '历史告警' }),
    ellipsis: true,
    hideInSearch: true,
    children: [
      {
        title: formatMessage({ id: 'alarmManage.1011', defaultMessage: '总数' }),
        dataIndex: 'historyTotal',
        sorter: true,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: getLevelByType('error', '', false),
        dataIndex: 'historyErrorNum',
        sorter: true,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: getLevelByType('alarm', '', false),
        dataIndex: 'historyAlarmNum',
        sorter: true,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: getLevelByType('warn', '', false),
        dataIndex: 'historyWarnNum',
        sorter: true,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: getLevelByType('info', '', false),
        dataIndex: 'historyInfoNum',
        sorter: true,
        ellipsis: true,
        hideInSearch: true,
      },
    ],
  },
  {
    title: formatMessage({ id: 'alarmManage.1004', defaultMessage: '告警时间' }),
    dataIndex: 'time',
    valueType: 'dateRange',
    hideInTable: true,
    width: 200,
    initialValue: [moment().subtract(1, 'week'), moment()],
    search: {
      transform: (value) => {
        return {
          startDate: value[0],
          endDate: value[1],
        };
      },
    },
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
  },
];
