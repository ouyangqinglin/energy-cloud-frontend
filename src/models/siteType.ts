/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-05-23 09:18:31
 * @LastEditTime: 2024-05-23 09:29:50
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\models\siteType.ts
 */
import React, { useReducer } from 'react';

export type SiteTypeType = {
  label?: string;
  value: string;
};

const useSiteTypeModel = () => {
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

  const [state, dispatch] = useReducer(reducer, undefined);

  return {
    siteTypes: state,
    dispatch,
  };
};

export default useSiteTypeModel;
