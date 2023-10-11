/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-10-10 16:33:30
 * @LastEditTime: 2023-10-10 17:32:16
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\workbench\helper.tsx
 */

import moment from 'moment';
import { SearchType } from './typing';
import { ProFormColumnsType } from '@ant-design/pro-components';

export const column: ProFormColumnsType<SearchType>[] = [
  {
    dataIndex: 'date',
    valueType: 'dateRange',
    formItemProps: {
      rules: [{ required: true, message: '请输入查询日期' }],
    },
    initialValue: [moment(), moment()],
  },
];
