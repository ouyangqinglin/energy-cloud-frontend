import { formatMessage, getLocale } from '@/utils';
import type { ProColumns } from '@ant-design/pro-components';
import moment from 'moment';
import { getList } from './service';

export const columns: ProColumns[] = [
  {
    title: formatMessage({ id: 'dataManage.1008', defaultMessage: '站点' }),
    dataIndex: 'siteId',
    valueType: 'select',
    formItemProps: {
      rules: [
        {
          message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
        },
      ],
    },
    fieldProps: {
      mode: 'multiple',
    },
    request: () =>
      getList().then(({ data }) => {
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
    title: formatMessage({ id: 'dataManage.1012', defaultMessage: '刷新时间' }),
    dataIndex: 'time',
    valueType: 'dateTimeRange',
    width: '100%',
    initialValue: [moment().startOf('day'), moment().endOf('day')],
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
  {
    title: formatMessage({ id: 'dataManage.1013', defaultMessage: '刷新项' }),
    dataIndex: 'refresh',
    valueType: 'checkbox',
    formItemProps: {
      rules: [
        {
          message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
        },
      ],
    },
    fieldProps: {
      options: [
        {
          label: formatMessage({
            id: 'dataManage.1014',
            defaultMessage: '电量（市电、光伏、风机、柴发、储能、充电桩、其他负载）',
          }),
          value: 1,
        },
        {
          label: formatMessage({ id: 'dataManage.1015', defaultMessage: '收益' }),
          value: 2,
        },
      ],
    },
  },
];
