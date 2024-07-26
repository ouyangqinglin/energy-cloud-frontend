import { formatMessage, getLocale } from '@/utils';
import type { ProColumns } from '@ant-design/pro-components';
import { getStations } from '@/services/station';

export const columns: ProColumns[] = [
  {
    title: formatMessage({ id: 'dataManage.1059', defaultMessage: '导出类型' }),
    dataIndex: 'type',
    valueType: 'select',
    formItemProps: {
      rules: [
        {
          required: false,
          message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
        },
      ],
    },
    request: () =>
      getStations().then(({ data }) => {
        return data?.list?.map?.((item) => {
          return {
            ...item,
            label: item.name,
            value: item.id + '',
          };
        });
      }),
  },
  {
    title: formatMessage({ id: 'dataManage.1008', defaultMessage: '站点' }),
    dataIndex: 'siteIds',
    valueType: 'select',
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
      getStations().then(({ data }) => {
        return data?.list?.map?.((item) => {
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
      format: getLocale().dateTimeNoSecondFormat,
    },
  },
];
