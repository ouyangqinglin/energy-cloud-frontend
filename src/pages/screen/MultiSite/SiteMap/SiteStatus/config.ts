/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-01 15:20:36
 * @LastEditTime: 2023-09-01 15:20:36
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SiteMap\SiteStatus\config.ts
 */

import IconRight from '@/assets/image/multi-site/map/right.png';
import IconError from '@/assets/image/multi-site/map/error.png';
import { formatMessage } from '@/utils';

export const statusItems = [
  {
    icon: IconRight,
    label: formatMessage({ id: 'common.normal', defaultMessage: '正常' }),
    field: 'normalSiteNum',
  },
  {
    icon: IconError,
    label: formatMessage({ id: 'common.warning', defaultMessage: '告警' }),
    field: 'alarmSiteNum',
  },
];
