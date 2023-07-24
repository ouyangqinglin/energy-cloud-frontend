/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-24 11:50:08
 * @LastEditTime: 2023-07-24 11:50:28
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\setting\Device\index.tsx
 */
import React from 'react';
import DeviceList from '@/pages/equipment/equipment-list';

const Device: React.FC = () => {
  return (
    <>
      <DeviceList isStationChild />
    </>
  );
};

export default Device;
