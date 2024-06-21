import { formatMessage, getLocale } from '@/utils';
import type { ProColumns } from '@ant-design/pro-components';
import { getList } from './service';

export const columns: ProColumns[] = [
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
      getList({ factoryId: 500003 }).then(({ data }) => {
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
    title: formatMessage({ id: 'dataManage.1011', defaultMessage: '同步时间段' }),
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
      format: getLocale().dateTimeFormat,
    },
  },
];
