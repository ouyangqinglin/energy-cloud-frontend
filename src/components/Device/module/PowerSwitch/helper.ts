/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-23 14:52:00
 * @LastEditTime: 2024-03-25 11:18:20
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\module\PowerSwitch\helper.ts
 */

import { ProColumns } from '@ant-design/pro-components';
import { formatMessage } from '@/utils';

export const columns: ProColumns[] = [
  {
    title: formatMessage({ id: 'charge.serialNumber', defaultMessage: '序号' }),
    dataIndex: 'order1',
    width: 50,
  },
  {
    title: formatMessage({ id: 'charge.positiveFeedback', defaultMessage: '正极反馈' }),
    dataIndex: 'mposfeed1',
    width: 120,
  },
  {
    title: formatMessage({ id: 'charge.negativeFeedback', defaultMessage: '负极反馈' }),
    dataIndex: 'mnegfeed1',
    width: 120,
  },
  {
    title: formatMessage({ id: 'charge.serialNumber', defaultMessage: '序号' }),
    dataIndex: 'order2',
    width: 50,
  },
  {
    title: formatMessage({ id: 'charge.positiveFeedback', defaultMessage: '正极反馈' }),
    dataIndex: 'mposfeed2',
    width: 120,
  },
  {
    title: formatMessage({ id: 'charge.negativeFeedback', defaultMessage: '负极反馈' }),
    dataIndex: 'mnegfeed2',
    width: 120,
  },
  {
    title: formatMessage({ id: 'charge.serialNumber', defaultMessage: '序号' }),
    dataIndex: 'order3',
    width: 50,
  },
  {
    title: formatMessage({ id: 'charge.positiveFeedback', defaultMessage: '正极反馈' }),
    dataIndex: 'mposfeed3',
    width: 120,
  },
  {
    title: formatMessage({ id: 'charge.negativeFeedback', defaultMessage: '负极反馈' }),
    dataIndex: 'mnegfeed3',
    width: 120,
  },
];
