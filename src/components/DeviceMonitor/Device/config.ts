/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-05 09:41:10
 * @LastEditTime: 2023-09-11 15:41:52
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\Device\config.ts
 */

import { DeviceTypeEnum } from '@/utils/dictionary';
import CabinetImg from '@/assets/image/product/cabinet.png';
import CabinetIntroImg from '@/assets/image/product/cabinet-intro.jpg';

export const deviceProductDataMap = {
  [DeviceTypeEnum.Cabinet]: {
    img: CabinetImg,
    introImg: CabinetIntroImg,
  },
};
