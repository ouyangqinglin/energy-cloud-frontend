import { formatMessage } from '@/utils';
import type { ProColumns } from '@ant-design/pro-components';
import { monetaryUnit } from './service';
export const columns: ProColumns[] = [
  {
    title: formatMessage({
      id: 'siteManage.1042',
      defaultMessage: '告警推送开关',
    }),
    dataIndex: 'alarmPush',
    valueType: 'radio',
    tooltip: formatMessage({
      id: 'siteManage.1043',
      defaultMessage:
        '开启时，会对有站点管理权限的所有用户进行告警推送，关闭时当前站点的所有告警都不会推送',
    }),
    width: '100%',
    formItemProps: {
      rules: [
        {
          required: true,
          message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
        },
      ],
    },
    fieldProps: {
      options: [
        { label: formatMessage({ id: 'system.open', defaultMessage: '开启' }), value: 1 },
        { label: formatMessage({ id: 'system.close', defaultMessage: '关闭' }), value: 0 },
      ],
    },
  },
];

export const currencyUnitColumns: ProColumns[] = [
  {
    title: formatMessage({
      id: 'siteManage.1045',
      defaultMessage: '货币单位',
    }),
    dataIndex: 'monetaryUnit',
    valueType: 'select',
    width: '100%',
    request: () =>
      monetaryUnit().then(({ data }) => {
        return data?.map?.((item: any) => {
          return {
            label: item.unit,
            value: item.code,
          };
        });
      }),
    formItemProps: {
      rules: [
        {
          required: true,
          message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
        },
      ],
    },
  },
];
