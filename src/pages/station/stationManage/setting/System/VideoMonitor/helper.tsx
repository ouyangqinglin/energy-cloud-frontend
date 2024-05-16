/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-05-14 11:09:02
 * @LastEditTime: 2024-05-14 16:26:01
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\setting\System\VideoMonitor\helper.tsx
 */

import Detail from '@/components/Detail';
import { formatMessage } from '@/utils';
import { enableStatus, jumpMethodEnum } from '@/utils/dict';
import { ProFormColumnsType } from '@ant-design/pro-components';
import { getAppList, getFactoryList } from './service';
import { OptionType } from '@/types';
import { System } from './type';
import styles from './index.less';
import { VideoFactoryEnum } from '@/utils/dictionary';

const factoryColumnsMap: Record<string, ProFormColumnsType[]> = {
  [VideoFactoryEnum.HKYF]: [
    {
      title: formatMessage({ id: 'siteManage.1011', defaultMessage: '用户ID' }),
      dataIndex: ['config', 'userId'],
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: 'App Key',
      dataIndex: ['config', 'appKey'],
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: 'Secret Key',
      dataIndex: ['config', 'secretKey'],
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: 'URL',
      dataIndex: ['config', 'SSOUrl'],
      formItemProps: {
        rules: [
          {
            required: true,
            type: 'url',
          },
        ],
      },
    },
    {
      title: formatMessage({ id: 'siteManage.1013', defaultMessage: '项目编码' }),
      dataIndex: ['config', 'productCode'],
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: formatMessage({ id: 'siteManage.1014', defaultMessage: '路由' }),
      dataIndex: ['config', 'path'],
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
  ],
};

export const columns: ProFormColumnsType[] = [
  {
    title: formatMessage({ id: 'siteManage.1002', defaultMessage: '监控状态' }),
    dataIndex: 'monitorStatus',
    valueType: 'radio',
    valueEnum: enableStatus,
    colProps: {
      span: 24,
    },
    formItemProps: {
      rules: [
        {
          required: true,
        },
      ],
    },
    initialValue: '0',
  },
  {
    renderFormItem: () => {
      return (
        <Detail.DotLabel
          title={formatMessage({
            id: 'siteManage.1003',
            defaultMessage: 'Web配置',
          })}
          className={`mb0 ${styles.label}`}
        />
      );
    },
    colProps: {
      span: 24,
    },
  },
  {
    title: formatMessage({ id: 'siteManage.1004', defaultMessage: '跳转方式' }),
    dataIndex: 'jumpMethod',
    valueType: 'radio',
    valueEnum: jumpMethodEnum,
    colProps: {
      span: 24,
    },
    formItemProps: {
      rules: [
        {
          required: true,
        },
      ],
    },
    initialValue: '0',
  },
  {
    valueType: 'dependency',
    name: ['jumpMethod'],
    columns: ({ jumpMethod }) => {
      return jumpMethod == 1
        ? [
            {
              title: formatMessage({ id: 'siteManage.1010', defaultMessage: '厂家' }),
              dataIndex: 'factoryId',
              valueType: 'select',
              request: () =>
                getFactoryList().then(({ data }) => {
                  return data?.map?.((item) => {
                    return {
                      ...item,
                      label: item.name,
                      value: item.id + '',
                    };
                  });
                }),
              fieldProps: (form) => {
                return {
                  onChange: (_: any, option: OptionType<{ code: string }>) => {
                    form?.setFieldValue?.('code', option.code);
                  },
                };
              },
              formItemProps: {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
                  },
                ],
              },
            },
            {
              dataIndex: 'code',
              formItemProps: {
                hidden: true,
              },
              colProps: {
                span: 12,
              },
            },
            {
              valueType: 'dependency',
              name: ['code'],
              columns: ({ code }) => {
                return factoryColumnsMap[code] || [];
              },
            },
          ]
        : [
            {
              title: 'URL',
              dataIndex: 'url',
              formItemProps: {
                rules: [
                  {
                    required: true,
                    type: 'url',
                  },
                ],
              },
            },
          ];
    },
  },
  {
    renderFormItem: () => {
      return (
        <Detail.DotLabel
          title={formatMessage({
            id: 'siteManage.1007',
            defaultMessage: 'App配置',
          })}
          className={`mb0 ${styles.label}`}
        />
      );
    },
    colProps: {
      span: 24,
    },
  },
  {
    title: formatMessage({ id: 'siteManage.1008', defaultMessage: '安卓应用' }),
    dataIndex: 'androidAppId',
    request: () =>
      getAppList().then(({ data }) => {
        return (
          data
            ?.filter?.((item) => item.sysFlag == System.Android)
            ?.map?.((item) => {
              return {
                label: item.name,
                value: item.id + '',
              };
            }) || []
        );
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
  {
    title: formatMessage({ id: 'siteManage.1009', defaultMessage: 'IOS应用' }),
    dataIndex: 'iosAppId',
    request: () =>
      getAppList().then(({ data }) => {
        return (
          data
            ?.filter?.((item) => item.sysFlag == System.Ios)
            ?.map?.((item) => {
              return {
                label: item.name,
                value: item.id + '',
              };
            }) || []
        );
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
