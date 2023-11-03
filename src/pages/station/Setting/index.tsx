/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-04 15:34:00
 * @LastEditTime: 2023-07-04 15:34:01
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\Setting\index.tsx
 */
import React, { useMemo, useEffect } from 'react';
import { useLocation, useModel } from 'umi';
import Setting from '../stationManage/setting';
import type { LocationType } from '@/utils/dictionary';

const Index: React.FC = () => {
  const { dispatch } = useModel('station');
  const location = useLocation<LocationType>();
  const id = useMemo(
    () => (location as LocationType).query?.id,
    [(location as LocationType).query?.id],
  );

  useEffect(() => {
    if (id) {
      return dispatch({ type: 'get', payload: { id } });
    }
    return () => {
      dispatch({ type: 'get', payload: { id: '' } });
    };
  }, [id]);

  return (
    <>
      <Setting />
    </>
  );
};

export default Index;
