/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-25 11:00:00
 * @LastEditTime: 2023-09-25 11:01:53
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Configuration\RemoteSetting\Air\helper.ts
 */
import { ProFormColumnsType } from '@ant-design/pro-components';

export const columns: ProFormColumnsType[] = [
  {
    title: '制冷点',
    dataIndex: 'RefrigerationPoint',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入制冷点' }],
    },
    fieldProps: {
      addonAfter: '℃',
      className: 'w-full',
    },
  },
  {
    title: '制冷回差',
    dataIndex: 'CoolingReturnDifference',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入制冷回差' }],
    },
    fieldProps: {
      addonAfter: '℃',
      className: 'w-full',
    },
  },
  {
    title: '加热点',
    dataIndex: 'HeatingPoint',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入加热点' }],
    },
    fieldProps: {
      addonAfter: '℃',
      className: 'w-full',
    },
  },
  {
    title: '加热回差',
    dataIndex: 'HeatingReturnDifference',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入加热回差' }],
    },
    fieldProps: {
      addonAfter: '℃',
      className: 'w-full',
    },
  },
  {
    title: '除湿点',
    dataIndex: 'DehumidificationPoint',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入除湿点' }],
    },
    fieldProps: {
      addonAfter: '%',
      className: 'w-full',
    },
  },
  {
    title: '除湿回差',
    dataIndex: 'DehumidificationReturnDifference',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入除湿回差' }],
    },
    fieldProps: {
      addonAfter: '%',
      className: 'w-full',
    },
  },
  {
    title: '高温点',
    dataIndex: 'HighTemperaturePoint',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入低温点' }],
    },
    fieldProps: {
      addonAfter: '℃',
      className: 'w-full',
    },
  },
  {
    title: '低温点',
    dataIndex: 'LowTemperaturePoint',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入低温点' }],
    },
    fieldProps: {
      addonAfter: '℃',
      className: 'w-full',
    },
  },
  {
    title: '高湿点',
    dataIndex: 'HighHumidityPoint',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入高湿点' }],
    },
    fieldProps: {
      addonAfter: '℃',
      className: 'w-full',
    },
  },
  {
    title: '内风机停止点',
    dataIndex: 'InternalFanStopPoint',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入内风机停止点' }],
    },
    fieldProps: {
      addonAfter: '℃',
      className: 'w-full',
    },
  },
  {
    title: '高温开启值',
    dataIndex: 'HighTemperatureOpeningValue',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入高温开启值' }],
    },
    fieldProps: {
      addonAfter: '℃',
      className: 'w-full',
    },
  },
  {
    title: '高温关闭值',
    dataIndex: 'HighTemperatureShutdownValue',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入高温关闭值' }],
    },
    fieldProps: {
      addonAfter: '℃',
      className: 'w-full',
    },
  },
  {
    title: '低温开启值',
    dataIndex: 'LowTemperatureOpeningValue',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入低温开启值' }],
    },
    fieldProps: {
      addonAfter: '℃',
      className: 'w-full',
    },
  },
  {
    title: '低温关闭值',
    dataIndex: 'LowTemperatureShutdownValue',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入低温关闭值' }],
    },
    fieldProps: {
      addonAfter: '℃',
      className: 'w-full',
    },
  },
];
