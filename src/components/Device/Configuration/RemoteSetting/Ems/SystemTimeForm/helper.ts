/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-12 11:16:06
 * @LastEditTime: 2023-09-12 11:16:10
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Configuration\RemoteSetting\Ems\SystemTimeForm\helper.ts
 */

import { ProFormColumnsType } from '@ant-design/pro-components';

export const columns: ProFormColumnsType[] = [
  {
    title: '系统时间',
    dataIndex: 'sysTem',
    valueType: 'dateTime',
    formItemProps: {
      rules: [{ required: true, message: '请选择系统时间' }],
    },
    fieldProps: {
      className: 'w-full',
    },
  },
];
