/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-11-27 14:53:12
 * @LastEditTime: 2023-12-25 11:51:17
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\hooks\useDeviceModel.ts
 */

import { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { getDeviceModel, getDeviceGroupModel } from '@/services/equipment';
import { DeviceModelDescribeType, DeviceModelType, DeviceServiceGroupType } from '@/types/device';
import { getModelByProps } from '@/utils';
import { isEmpty } from 'lodash';
import { DeviceServicePageEnum, DeviceTypeEnum } from '@/utils/dictionary';

export type useDeviceModelProps = {
  productId?: DeviceTypeEnum;
  isGroup?: boolean;
  page?: DeviceServicePageEnum;
};

const useDeviceModel = (props: useDeviceModelProps) => {
  const { productId, isGroup, page } = props;

  const [modelMap, setModelMap] = useState<Record<string, DeviceModelType>>({});
  const [serviceGruop, setServiceGruop] = useState<DeviceModelDescribeType[]>([]);
  const { loading, run, data } = useRequest(isGroup ? getDeviceGroupModel : getDeviceModel, {
    manual: true,
  });

  useEffect(() => {
    if (productId) {
      run({ productId }).then((res) => {
        let result = {};
        if (isGroup) {
          res?.properties?.forEach?.((item) => {
            result = { ...result, ...getModelByProps(item?.properties || []) };
          });
          const serviceGroupData = res?.data?.find?.((item) => item?.id == page);
          setServiceGruop(serviceGroupData?.children || []);
        } else {
          result = getModelByProps(res?.properties || []);
        }
        if (!isEmpty(result)) {
          setModelMap(result);
        }
      });
    }
  }, [productId, isGroup]);

  return {
    loading,
    data,
    modelMap,
    serviceGruop,
  };
};

export default useDeviceModel;
