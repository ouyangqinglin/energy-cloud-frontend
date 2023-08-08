/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-04 11:12:10
 * @LastEditTime: 2023-08-07 15:09:01
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\useDeviceModel.ts
 */

import { useCallback, useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { getDeviceModel, getDeviceGroupModel } from '@/services/equipment';
import { DeviceModelType, DevicePropsType } from '@/types/device';
import { arrayToMap, parseToArray } from '@/utils';
import { isEmpty } from 'lodash';
import { DeviceModelTypeEnum } from '@/utils/dictionary';

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

  const getModelByProps = useCallback((items: DevicePropsType[], parentField = '') => {
    let result = {};
    items?.forEach?.((item) => {
      const field = parentField ? parentField + '.' + item?.id : item?.id;
      if (item?.dataType?.type == DeviceModelTypeEnum.Struct) {
        result = { ...result, ...getModelByProps(parseToArray(item?.dataType?.specs), field) };
      } else {
        result[field || ''] = item?.dataType;
      }
    });
    return result;
  }, []);

  useEffect(() => {
    if (productId) {
      run({ productId }).then((res) => {
        let result = {};
        if (isGroup) {
          res?.properties?.forEach?.((item) => {
            result = { ...result, ...getModelByProps(item?.properties || []) };
          });
        } else {
          result = getModelByProps(res.properties || []);
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
