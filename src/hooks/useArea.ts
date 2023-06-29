/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-29 09:44:36
 * @LastEditTime: 2023-05-29 10:42:03
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\hooks\area.ts
 */
import { useState, useEffect } from 'react';
import { useModel } from 'umi';
import { api } from '@/services';

const useArea = () => {
  const { state, dispatch } = useModel('area');

  useEffect(() => {
    if (!state || !state.length) {
      api.getAreaData().then(({ data }) => {
        dispatch({ payload: data });
      });
    }
  }, []);

  return {
    state,
  };
};

export default useArea;
