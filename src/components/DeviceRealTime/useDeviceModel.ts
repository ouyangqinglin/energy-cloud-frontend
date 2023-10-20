/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-04 11:12:10
 * @LastEditTime: 2023-10-16 09:28:32
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\useDeviceModel.ts
 */

import { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { getDeviceModel, getDeviceGroupModel } from '@/services/equipment';
import { DeviceModelType } from '@/types/device';
import { getModelByProps } from '@/utils';
import { isEmpty } from 'lodash';

export type useDeviceModelProps = {
  productId: string;
  isGroup?: boolean;
};

const useDeviceModel = (props: useDeviceModelProps) => {
  const { productId, isGroup } = props;

  const [modelMap, setModelMap] = useState<Record<string, DeviceModelType>>({});
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
  };
};

export default useDeviceModel;
