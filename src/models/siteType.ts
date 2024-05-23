/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-05-23 09:18:31
 * @LastEditTime: 2024-05-23 15:30:43
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\models\siteType.ts
 */

import React, { useReducer, useState } from 'react';
import { getSiteType } from '@/services/station';
import { useRequest } from 'umi';
import { mergeWith } from 'lodash';
import { SiteTypeStrEnum } from '@/utils/enum';

export type SiteTypeType = {
  label?: string;
  value: string;
};

export type UnitType = {
  hasPv?: boolean;
  hasEnergy?: boolean;
  hasCharge?: boolean;
};

const reducer = (
  state: SiteTypeType[] | undefined,
  action: { payload: SiteTypeType[]; type?: string },
) => {
  if (action.payload) {
    return action.payload;
  } else {
    return state;
  }
};

export const getUnitBySiteType = (siteType: SiteTypeStrEnum | string): UnitType => {
  const type = (siteType ?? '') + '';
  const result: UnitType = {
    hasPv: type?.indexOf?.(SiteTypeStrEnum.PV) > -1 || false,
    hasEnergy: type?.indexOf?.(SiteTypeStrEnum.ES) > -1 || false,
    hasCharge: type?.indexOf?.(SiteTypeStrEnum.CS) > -1 || false,
  };
  return result;
};

const useSiteTypeModel = () => {
  const [state, dispatch] = useReducer(reducer, undefined);
  const [unit, setUnit] = useState<UnitType>({});

  const { run } = useRequest(getSiteType, {
    manual: true,
    formatResult: (res) => {
      const result =
        res?.data?.map?.((item) => {
          return {
            value: item.value || '',
            label: item.name,
          };
        }) || [];

      const unitResult: UnitType = {};
      result.forEach((item) => {
        const itemUnit = getUnitBySiteType(item.value);
        mergeWith(unitResult, itemUnit, (newValue: boolean, oldValue: boolean) => {
          if (!oldValue) {
            return newValue;
          }
          return oldValue;
        });
      });
      setUnit(unitResult);
      dispatch({ payload: result });
    },
  });

  return {
    siteTypes: state,
    refresh: run,
    unit,
  };
};

export default useSiteTypeModel;
