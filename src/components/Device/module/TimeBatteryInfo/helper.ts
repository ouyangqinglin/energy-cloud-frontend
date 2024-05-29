/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-05-29 16:12:26
 * @LastEditTime: 2024-05-29 16:12:27
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\module\TimeBatteryInfo\helper.ts
 */

import { ProColumns } from '@ant-design/pro-components';
import { formatMessage } from '@/utils';

export const columns: ProColumns[] = [
  {
    title: formatMessage({ id: 'common.periodTime', defaultMessage: '时段' }),
    dataIndex: 'time0',
    width: 120,
  },
  {
    title: formatMessage({ id: 'device.1004', defaultMessage: '电量' }) + '(kWh)',
    dataIndex: 'capacity0',
    width: 120,
  },
  {
    title: formatMessage({ id: 'common.periodTime', defaultMessage: '时段' }),
    dataIndex: 'time1',
    width: 120,
  },
  {
    title: formatMessage({ id: 'device.1004', defaultMessage: '电量' }) + '(kWh)',
    dataIndex: 'capacity1',
    width: 120,
  },
  {
    title: formatMessage({ id: 'common.periodTime', defaultMessage: '时段' }),
    dataIndex: 'time2',
    width: 120,
  },
  {
    title: formatMessage({ id: 'device.1004', defaultMessage: '电量' }) + '(kWh)',
    dataIndex: 'capacity2',
    width: 120,
  },
  {
    title: formatMessage({ id: 'common.periodTime', defaultMessage: '时段' }),
    dataIndex: 'time3',
    width: 120,
  },
  {
    title: formatMessage({ id: 'device.1004', defaultMessage: '电量' }) + '(kWh)',
    dataIndex: 'capacity3',
    width: 120,
  },
];
