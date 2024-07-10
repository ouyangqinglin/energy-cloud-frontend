/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-07-10 11:14:21
 * @LastEditTime: 2024-07-10 18:16:13
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\module\BmuTabs\Table\helper.ts
 */

import { DetailItem } from '@/components/Detail';
import { formatMessage } from '@/utils';

export const items: DetailItem[] = [
  {
    dataIndex: 'maxCell',
    title: formatMessage({ id: 'device.1014', defaultMessage: '最高电压' }),
    format: (value, data) => `${value}(${data.cell.max.bmu}#-${data.cell.max.index})`,
  },
  {
    dataIndex: 'minCell',
    title: formatMessage({ id: 'device.1015', defaultMessage: '最低电压' }),
    format: (value, data) => `${value}(${data.cell.min.bmu}#-${data.cell.min.index})`,
  },
  {
    dataIndex: 'maxTemp',
    title: formatMessage({ id: 'device.1016', defaultMessage: '最高温度' }),
    format: (value, data) => `${value}(${data.temp.max.bmu}#-${data.temp.max.index})`,
  },
  {
    dataIndex: 'minTemp',
    title: formatMessage({ id: 'device.1017', defaultMessage: '最低温度' }),
    format: (value, data) => `${value}(${data.temp.min.bmu}#-${data.temp.min.index})`,
  },
];
