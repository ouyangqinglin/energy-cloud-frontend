/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 00:28:59
 * @LastEditTime: 2023-10-17 14:31:51
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\Ems\Run\config.ts
 */

import type { DetailItem } from '@/components/Detail';
import { enableFormat } from '@/utils/format';
import type { ProFormColumnsType } from '@ant-design/pro-components';

const options = [
  {
    value: 1,
    label: '禁用',
  },
  {
    value: 0,
    label: '使能',
  },
];

export const emsSystemEnabletems: DetailItem[] = [
  { label: '自启动功能使能', field: 'SysEnableSelfStartFunction', format: enableFormat },
  { label: '市电充电功能使能', field: 'MunicipalChargingFunctionEnabled', format: enableFormat },
  { label: '离网工作功能使能', field: 'EnableOffGridOperationFunction', format: enableFormat },
  { label: '并网工作功能使能', field: 'EnableGridConnectionFunction', format: enableFormat },
];
export const systemColumns: ProFormColumnsType[] = [
  {
    title: '自启动功能使能',
    dataIndex: 'SysEnableSelfStartFunction',
    valueType: 'select',
    formItemProps: {
      rules: [{ required: true, message: '请选择自启动功能使能' }],
    },
    fieldProps: {
      options,
    },
  },
  {
    title: '市电充电功能使能',
    dataIndex: 'MunicipalChargingFunctionEnabled',
    valueType: 'select',
    formItemProps: {
      rules: [{ required: true, message: '请选择市电充电功能使能' }],
    },
    fieldProps: {
      options,
    },
  },
  {
    title: '离网工作功能使能',
    dataIndex: 'EnableOffGridOperationFunction',
    valueType: 'select',
    formItemProps: {
      rules: [{ required: true, message: '请选择离网工作功能使能' }],
    },
    fieldProps: {
      options,
    },
  },
  {
    title: '并网工作功能使能',
    dataIndex: 'EnableGridConnectionFunction',
    valueType: 'select',
    formItemProps: {
      rules: [{ required: true, message: '请选择并网工作功能使能' }],
    },
    fieldProps: {
      options,
    },
  },
];

export const reportItems: DetailItem[] = [
  { label: 'EMS设备SN', field: 'emsSn', format: (state) => state },
];
export const reportColumns: ProFormColumnsType[] = [
  {
    title: 'EMS设备SN',
    dataIndex: 'emsSn',
    valueType: 'text',
    formItemProps: {
      rules: [{ required: true, message: '请输入EMS设备SN' }],
    },
  },
];
