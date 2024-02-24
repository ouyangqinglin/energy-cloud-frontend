/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-02-21 15:48:39
 * @LastEditTime: 2024-02-21 15:48:39
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Energy\MasterSlaveGroup\helper.ts
 */

import { formatMessage } from '@/utils';
import { ProFormColumnsType } from '@ant-design/pro-components';

export const groupColumns: ProFormColumnsType[] = [
  {
    title: formatMessage({ id: 'siteMonitor.gruopName', defaultMessage: '分组名称' }),
    dataIndex: 'groupName',
    formItemProps: {
      rules: [
        {
          required: true,
          message: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
        },
      ],
    },
  },
];
