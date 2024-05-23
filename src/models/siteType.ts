/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-05-23 09:18:31
 * @LastEditTime: 2024-05-23 11:24:45
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\models\siteType.ts
 */

import React, { useReducer } from 'react';
import { getSiteType } from '@/services/station';
import { useRequest } from 'umi';

export type SiteTypeType = {
  label?: string;
  value: string;
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

const useSiteTypeModel = () => {
  const [state, dispatch] = useReducer(reducer, undefined);

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
      dispatch({ payload: result });
    },
  });

  return {
    siteTypes: state,
    refresh: run,
  };
};

export default useSiteTypeModel;
