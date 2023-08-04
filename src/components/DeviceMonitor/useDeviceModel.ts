/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-04 11:12:10
 * @LastEditTime: 2023-08-04 11:12:10
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\useDeviceModel.ts
 */

import { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { getDeviceModel } from '@/services/equipment';
import { DeviceModelType } from '@/types/device';
import { arrayToMap } from '@/utils';

export type useDeviceModelProps = {
  productId: string;
};

const useDeviceModel = (props: useDeviceModelProps) => {
  const { productId } = props;

  const [modelMap, setModelMap] = useState<Record<string, DeviceModelType>>();
  const { loading, run, data } = useRequest(getDeviceModel, {
    manual: true,
  });

  useEffect(() => {
    if (productId) {
      run({ productId }).then((res) => {
        setModelMap(arrayToMap(res.properties || [], 'id', 'dataType'));
      });
    }
  }, [productId]);

  return {
    loading,
    data,
    modelMap,
  };
};

export default useDeviceModel;
