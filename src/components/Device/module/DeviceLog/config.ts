import { formatMessage } from '@/utils';
import type { ProColumns } from '@ant-design/pro-components';
import type { ConfigDataType } from './data';
import { YTDATERANGE } from '@/components/YTDateRange';
import type { YTDATERANGEVALUETYPE } from '@/components/YTDateRange';
import { getLocale } from '@/utils';

export enum OnlineStatusEnum {
  None,
  Online,
}
export const onlineStatus = {
  [OnlineStatusEnum.None]: {
    text: '离线',
    icon: 'red',
    status: 'Default',
  },
  [OnlineStatusEnum.Online]: {
    text: '在线',
    icon: 'green',
    status: 'Processing',
  },
};
export const columns: ProColumns<ConfigDataType, YTDATERANGEVALUETYPE>[] = [
  {
    title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
    dataIndex: 'index',
    valueType: 'index',
    width: 50,
  },
  {
    title: formatMessage({ id: 'device.logName', defaultMessage: '日志名称' }),
    dataIndex: 'logName',
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'device.createTime', defaultMessage: '生成时间' }),
    hideInSearch: true,
    dataIndex: 'createTime',
  },
  {
    title: formatMessage({ id: 'common.createTime', defaultMessage: '生成时间' }),
    dataIndex: 'time',
    valueType: YTDATERANGE,
    fieldProps: {
      dateFormat: getLocale().dateFormat,
      format: 'YYYY-MM-DD',
    },
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
    hideInTable: true,
    width: 150,
    ellipsis: true,
  },
];
