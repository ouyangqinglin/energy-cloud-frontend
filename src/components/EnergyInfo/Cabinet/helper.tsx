/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-01-06 16:45:44
 * @LastEditTime: 2024-03-13 10:08:51
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\Cabinet\helper.tsx
 */

import { DeviceDataType } from '@/services/equipment';
import { DeviceTypeEnum } from '@/utils/dictionary';
import styles from '../index.less';
import { ProductIdMapType } from './type';
import PackImg from '@/assets/image/station/energy/pack.png';

export const getProductTypeIdMap = (data: DeviceDataType[]) => {
  let productTypeIdMap: ProductIdMapType = {};
  data?.forEach?.((item) => {
    if (item.productTypeId) {
      productTypeIdMap[item.productTypeId] = {
        deviceId: item.id,
        productId: item.productId,
      };
      if (item.aliasSn) {
        productTypeIdMap[item.productTypeId + '' + item.aliasSn] = {
          deviceId: item.id,
          productId: item.productId,
        };
      }
    }
    if (item.children && item.children?.length) {
      const result = getProductTypeIdMap(item.children);
      productTypeIdMap = { ...productTypeIdMap, ...result };
    }
  });
  return productTypeIdMap;
};

export const getPackItems = () => {
  return (
    <div className={styles.parckContain}>
      {Array.from({ length: 10 }).map((_, index) => {
        return (
          <>
            <div
              key={index}
              className={styles.parck}
              style={{ order: index < 5 ? 4 - index : index }}
            >
              <div className="flex flex-center">
                <img className="mr4" src={PackImg} />
                PACK-{10 - index}
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export const energyProductIdMap = new Map([
  [DeviceTypeEnum.Energy, 'Rect'],
  [DeviceTypeEnum.BWattEnergy, 'Bwt'],
  [DeviceTypeEnum.YTEnergy, 'Wind'],
  [DeviceTypeEnum.LiquidEnergy, 'Liquid'],
  [DeviceTypeEnum.Liquid2Energy, 'LiquidE'],
  [DeviceTypeEnum.Wind2Energy, 'WindD'],
  [DeviceTypeEnum.SmallEnergy, 'SmallEnergy'],
  [DeviceTypeEnum.PvEnergy, 'PvEnergy'],
  [DeviceTypeEnum.ChargeY602, 'Charge2Gun'],
  [DeviceTypeEnum.ChargeY601, 'Charge1Gun'],
  [DeviceTypeEnum.ChargeMaster, 'ChargeMaster'],
  [DeviceTypeEnum.Charge2501, 'ChargeTerminal1Gun'],
  [DeviceTypeEnum.Charge6001, 'ChargeTerminal1Gun'],
  [DeviceTypeEnum.Charge5001, 'ChargeTerminal1Gun'],
  [DeviceTypeEnum.Charge2502, 'ChargeTerminal2Gun'],
  [DeviceTypeEnum.Charge6002, 'ChargeTerminal2Gun'],
  [DeviceTypeEnum.Charge5002, 'ChargeTerminal2Gun'],
  [DeviceTypeEnum.FGCCEnergy, 'WindPvFirewood'],
  [DeviceTypeEnum.React100XEnergy, 'Bwt'],
  [DeviceTypeEnum.React100WEnergy, 'Bwt'],
]);
