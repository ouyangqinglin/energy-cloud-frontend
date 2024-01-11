/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-11-27 14:53:12
 * @LastEditTime: 2023-12-29 15:32:27
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\hooks\useDeviceModel.ts
 */

import { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { getDeviceModel, getDeviceGroupModel } from '@/services/equipment';
import { DeviceModelDescribeType, DeviceModelType, DeviceServiceGroupType } from '@/types/device';
import { getModelByProps, getPropsFromTree } from '@/utils';
import { isEmpty } from 'lodash';
import { DeviceServicePageEnum, DeviceTypeEnum } from '@/utils/dictionary';

export type useDeviceModelProps = {
  productId?: DeviceTypeEnum;
  deviceId?: string;
  isGroup?: boolean;
  page?: DeviceServicePageEnum;
};

const useDeviceModel = (props: useDeviceModelProps) => {
  const { productId, deviceId, isGroup, page } = props;

  const [modelMap, setModelMap] = useState<Record<string, DeviceModelType>>({});
  const [detailGroup, setDetailGroup] = useState<DeviceModelDescribeType[]>([]);
  const [serviceGruop, setServiceGruop] = useState<DeviceModelDescribeType[]>([]);
  const { loading, run, data } = useRequest(isGroup ? getDeviceGroupModel : getDeviceModel, {
    manual: true,
  });

  useEffect(() => {
    if (productId || deviceId) {
      run(deviceId ? { deviceId } : { productId }).then((res) => {
        let result = {};
        if (isGroup) {
          const serviceGroupData = res?.data?.find?.((item) => item?.id == page);
          setServiceGruop(serviceGroupData?.children || []);
          const detailGroupData = res?.data?.find?.(
            (item) => item?.id == DeviceServicePageEnum.RunningData,
          );
          setDetailGroup(detailGroupData?.children || []);

          if (detailGroupData?.children && detailGroupData?.children?.length) {
            const childrens = getPropsFromTree<DeviceModelDescribeType, DeviceModelDescribeType[]>(
              detailGroupData?.children,
              'children',
            )?.reduce?.((arr, item) => {
              arr.push(...item);
              return arr;
            }, []);
            result = getModelByProps(childrens || []);
          } else {
            res?.properties?.forEach?.((item) => {
              result = { ...result, ...getModelByProps(item?.properties || []) };
            });
          }
        } else {
          result = getModelByProps(res?.properties || []);
        }
        if (!isEmpty(result)) {
          setModelMap(result);
        }
      });
    }
  }, [productId, deviceId, isGroup]);

  return {
    loading,
    data,
    detailGroup,
    modelMap,
    serviceGruop,
  };
};

export default useDeviceModel;
