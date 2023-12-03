/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-02 15:46:40
 * @LastEditTime: 2023-12-02 17:57:42
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\home-page\ExchangeSite\SiteMap\helper.tsx
 */

import { DetailItem } from '@/components/Detail';
import SiteIcon from '@/assets/image/exchange-site/site.png';
import DrivingIcon from '@/assets/image/exchange-site/driving.png';
import StaticIcon from '@/assets/image/exchange-site/static.png';
import OfflineIcon from '@/assets/image/exchange-site/offline.png';
import SleepIcon from '@/assets/image/exchange-site/sleep.png';

export const statisticsItems: DetailItem[] = [
  {
    label: (
      <>
        <img src={SiteIcon} />
        换电站
      </>
    ),
    field: 'site',
  },
  {
    label: (
      <>
        <img src={DrivingIcon} />
        行驶中
      </>
    ),
    field: 'driving',
  },
  {
    label: (
      <>
        <img src={StaticIcon} />
        静止中
      </>
    ),
    field: 'static',
  },
  {
    label: (
      <>
        <img src={OfflineIcon} />
        离线中
      </>
    ),
    field: 'offline',
  },
  {
    label: (
      <>
        <img src={SleepIcon} />
        休眠中
      </>
    ),
    field: 'sleep',
  },
];
