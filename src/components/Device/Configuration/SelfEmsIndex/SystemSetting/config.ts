/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 00:28:59
 * @LastEditTime: 2023-10-17 14:31:51
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\Ems\Run\config.ts
 */

import type { DetailItem } from '@/components/Detail';
import { formatMessage } from '@/utils';
import { enableFormat } from '@/utils/format';
import type { ProFormColumnsType } from '@ant-design/pro-components';

const options = [
  {
    value: 1,
    label: formatMessage({ id: 'common.disable', defaultMessage: '禁用' }),
  },
  {
    value: 0,
    label: formatMessage({ id: 'common.enable', defaultMessage: '使能' }),
  },
];

export const emsSystemEnabletems: DetailItem[] = [
  {
    label: formatMessage({
      id: 'device.selfStartFunctionEnabled',
      defaultMessage: '自启动功能使能',
    }),
    field: 'SysEnableSelfStartFunction',
    format: enableFormat,
  },
  {
    label: formatMessage({
      id: 'device.mainsChargeFunctionEnables',
      defaultMessage: '市电充电功能使能',
    }),
    field: 'MunicipalChargingFunctionEnabled',
    format: enableFormat,
  },
  {
    label: formatMessage({
      id: 'device.enablingFffGridWorkFunction',
      defaultMessage: '离网工作功能使能',
    }),
    field: 'EnableOffGridOperationFunction',
    format: enableFormat,
  },
  {
    label: formatMessage({
      id: 'device.enablingGridConnectionFunction',
      defaultMessage: '并网工作功能使能',
    }),
    field: 'EnableGridConnectionFunction',
    format: enableFormat,
  },
];
export const systemColumns: ProFormColumnsType[] = [
  {
    title: formatMessage({
      id: 'device.selfStartFunctionEnabled',
      defaultMessage: '自启动功能使能',
    }),
    dataIndex: 'SysEnableSelfStartFunction',
    valueType: 'select',
    formItemProps: {
      rules: [
        {
          required: true,
          message:
            formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }) +
            formatMessage({
              id: 'device.selfStartFunctionEnabled',
              defaultMessage: '自启动功能使能',
            }),
        },
      ],
    },
    fieldProps: {
      options,
    },
  },
  {
    title: formatMessage({
      id: 'device.mainsChargeFunctionEnables',
      defaultMessage: '市电充电功能使能',
    }),
    dataIndex: 'MunicipalChargingFunctionEnabled',
    valueType: 'select',
    formItemProps: {
      rules: [
        {
          required: true,
          message:
            formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }) +
            formatMessage({
              id: 'device.mainsChargeFunctionEnables',
              defaultMessage: '市电充电功能使能',
            }),
        },
      ],
    },
    fieldProps: {
      options,
    },
  },
  {
    title: formatMessage({
      id: 'device.enablingFffGridWorkFunction',
      defaultMessage: '离网工作功能使能',
    }),
    dataIndex: 'EnableOffGridOperationFunction',
    valueType: 'select',
    formItemProps: {
      rules: [
        {
          required: true,
          message:
            formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }) +
            formatMessage({
              id: 'device.enablingFffGridWorkFunction',
              defaultMessage: '离网工作功能使能',
            }),
        },
      ],
    },
    fieldProps: {
      options,
    },
  },
  {
    title: formatMessage({
      id: 'device.enablingGridConnectionFunction',
      defaultMessage: '并网工作功能使能',
    }),
    dataIndex: 'EnableGridConnectionFunction',
    valueType: 'select',
    formItemProps: {
      rules: [
        {
          required: true,
          message:
            formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }) +
            formatMessage({
              id: 'device.enablingGridConnectionFunction',
              defaultMessage: '并网工作功能使能',
            }),
        },
      ],
    },
    fieldProps: {
      options,
    },
  },
];

export const reportItems: DetailItem[] = [
  {
    label: 'EMS' + formatMessage({ id: 'common.deviceSn', defaultMessage: '设备SN' }),
    field: 'emsSn',
    format: (state) => state,
  },
];
export const reportColumns: ProFormColumnsType[] = [
  {
    title: 'EMS' + formatMessage({ id: 'common.deviceSn', defaultMessage: '设备SN' }),
    dataIndex: 'emsSn',
    valueType: 'text',
    formItemProps: {
      rules: [
        {
          required: true,
          message:
            formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
            formatMessage({ id: 'common.deviceSn', defaultMessage: '设备SN' }),
        },
      ],
    },
  },
];
