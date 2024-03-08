/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-07 11:10:44
 * @LastEditTime: 2024-03-07 11:10:55
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\DataCenter\index.ts
 */

import { DeviceDataType, getDeviceGroupModel } from '@/services/equipment';
import { DeviceModelDescribeType, DeviceModelType } from '@/types/device';
import { getModelByProps, getPropsFromTree } from '@/utils';
import { DeviceServicePageEnum } from '@/utils/dictionary';
import { merge } from 'lodash';

type DeviceData = {
  [key in string]: {
    id?: string;
    baseData?: DeviceDataType;
    modelData?: Record<string, DeviceModelType>;
    detailGroup?: DeviceModelDescribeType;
    remoteControlGroup?: DeviceModelDescribeType;
    configGroup?: DeviceModelDescribeType;
    realTimeData?: Record<string, any>;
  };
};

type ModelDataCallBack = {
  (data: Record<string, Record<string, DeviceModelType>>): void;
};

export class DataCenter {
  static instance: DataCenter;

  deviceIds: string[] = [];
  deviceData: DeviceData = {};
  modelDataCallbacks: (() => void)[] = [];

  constructor() {
    if (!DataCenter.instance) {
      DataCenter.instance = this;
    }
    return DataCenter.instance;
  }

  init(params: string[]) {
    const resetDeviceIds = (params || []).filter((item) => item && !this.deviceIds.includes(item));
    this.deviceIds = this.deviceIds.concat(resetDeviceIds);
    const allRequest: Promise<any>[] = [];

    resetDeviceIds.forEach((deviceId) => {
      this.deviceData[deviceId] = {};
      allRequest.push(
        getDeviceGroupModel({ deviceId }).then(({ data }) => {
          const detailGroupData = data.data?.find?.(
            (item) => item?.id == DeviceServicePageEnum.RunningData,
          );
          this.deviceData[deviceId].detailGroup = detailGroupData;
          if (detailGroupData?.children && detailGroupData?.children?.length) {
            const childrens = getPropsFromTree<DeviceModelDescribeType, DeviceModelDescribeType[]>(
              detailGroupData?.children,
              'children',
            )?.reduce?.((arr, item) => {
              arr.push(...item);
              return arr;
            }, []);
            this.deviceData[deviceId].modelData = getModelByProps(childrens || []);
          }
        }),
      );
    });

    Promise.allSettled(allRequest).then(() => {
      this.modelDataCallbacks.forEach((cb) => {
        cb?.();
      });
    });
  }

  getModelData(ids: string[], cb: ModelDataCallBack) {
    const getData = () => {
      let hasEmpty = false;
      const result: Record<string, Record<string, DeviceModelType>> = {};
      ids?.forEach?.((id) => {
        if (this.deviceData[id].modelData) {
          result[id] = merge({}, this.deviceData[id].modelData);
        } else {
          hasEmpty = true;
        }
      });
      if (!hasEmpty) {
        cb(result);
      }
      return hasEmpty;
    };

    if (getData()) {
      this.modelDataCallbacks.push(getData);
    }
  }
}
