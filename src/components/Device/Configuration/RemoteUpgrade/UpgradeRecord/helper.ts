/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-25 15:23:18
 * @LastEditTime: 2023-09-25 16:26:35
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Configuration\RemoteUpgrade\UpgradeRecord\helper.ts
 */

import { upgradeStatus } from '@/utils/dictionary';
import { ProColumns } from '@ant-design/pro-components';

export const columns: ProColumns[] = [
  {
    title: '序号',
    valueType: 'index',
    width: 50,
  },
  {
    title: '原始版本',
    dataIndex: 'oldVersion',
    width: 150,
    ellipsis: true,
  },
  {
    title: '当前版本',
    dataIndex: 'nowVersion',
    width: 150,
    ellipsis: true,
  },
  {
    title: '升级时间',
    dataIndex: 'upgradeTime',
    width: 150,
    ellipsis: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueEnum: upgradeStatus,
    width: 120,
    ellipsis: true,
  },
];
