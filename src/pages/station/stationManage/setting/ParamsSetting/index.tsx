/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-27 16:41:01
 * @LastEditTime: 2024-06-11 09:30:47
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\setting\ParamsSetting\index.tsx
 */
import React from 'react';
import EmptyPage from '@/components/EmptyPage';
import { formatMessage } from '@/utils';

const ParamsSetting: React.FC = () => {
  return (
    <>
      <div className="px24">
        <EmptyPage description={formatMessage({ id: 'common.noneYet', defaultMessage: '暂无' })} />
      </div>
    </>
  );
};

export default ParamsSetting;
