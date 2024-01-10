/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-01-06 16:45:44
 * @LastEditTime: 2024-01-06 16:45:44
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\Cabinet\helper.ts
 */

import { DeviceDataType } from '@/services/equipment';
import { DeviceProductTypeEnum } from '@/utils/dictionary';
import { ConfigType } from './config';
import Detail from '@/components/Detail';
import { formatMessage } from '@/utils';
import styles from '../index.less';

export const getDataIds = (data: DeviceDataType[]): Record<string, string[]> => {
  const ids: Record<string, any> = {
    productId: {
      air: '',
      bms: '',
      ems: '',
      pcs: '',
      fire: '',
      dehumidifire: '',
    },
    deviceId: {
      air: [],
      bms: [],
      ems: [],
      pcs: [],
      fire: [],
      dehumidifire: [],
    },
  };
  data?.forEach?.((item) => {
    if (DeviceProductTypeEnum.Air == item.productTypeId) {
      ids.deviceId.air.push(item.id);
      ids.productId.air = item.productId;
    } else if (
      DeviceProductTypeEnum.BatteryStack == item.productTypeId ||
      DeviceProductTypeEnum.BatteryCluster == item.productTypeId
    ) {
      ids.deviceId.bms.push(item.id);
      ids.productId.bms = item.productId;
    } else if (DeviceProductTypeEnum.Ems == item.productTypeId) {
      ids.deviceId.ems.push(item.id);
      ids.productId.ems = item.productId;
    } else if (DeviceProductTypeEnum.Pcs == item.productTypeId) {
      ids.deviceId.pcs.push(item.id);
      ids.productId.pcs = item.productId;
    } else if (DeviceProductTypeEnum.FireFight == item.productTypeId) {
      ids.deviceId.fire.push(item.id);
      ids.productId.fire = item.productId;
    } else if (DeviceProductTypeEnum.Dehumidifier == item.productTypeId) {
      ids.deviceId.dehumidifire.push(item.id);
      ids.productId.dehumidifire = item.productId;
    }
  });
  return ids;
};

export const getUnitByProductId = (
  data: DeviceDataType[],
  productTypeId: DeviceProductTypeEnum,
): DeviceDataType | void => {
  let result: DeviceDataType | void;
  if (data && data.length) {
    for (let i = 0; i < data?.length; i++) {
      if (productTypeId == data[i]?.productTypeId) {
        result = data[i];
        return result;
      }
      if (data[i]?.children && data[i]?.children?.length) {
        result = getUnitByProductId(data[i].children || [], productTypeId);
        if (result) {
          return result;
        }
      }
    }
  }
};

export const getItemsByConfig = (
  configs: ConfigType[],
  data: Record<string, any>,
  onMoreClick: (params: ConfigType) => void,
) => {
  return configs.map((item, index) => {
    return (
      <>
        <div
          key={item.label}
          className={styles.unit}
          style={{
            backgroundImage: `url(${item.icon})`,
            ...item.position,
          }}
        >
          <img className={styles.line} src={item.line} style={item.linePosition} />
          {item.showLabel === false ? (
            <></>
          ) : (
            <label className={styles.unitTitle}>{item.label}</label>
          )}
          <Detail className={styles.detail} items={item.data} data={data} column={1} />
          {item.showLabel === false ? (
            <></>
          ) : (
            <span className={`cl-primary cursor ${styles.field}`} onClick={() => onMoreClick(item)}>
              {formatMessage({ id: 'common.more', defaultMessage: '更多' })}
              {'>'}
            </span>
          )}
        </div>
      </>
    );
  });
};
