/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-04 16:32:44
 * @LastEditTime: 2023-07-04 16:32:44
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\DeviceMonitor\index.tsx
 */
import React from 'react';
import DeviceList from '@/pages/equipment/equipment-list';

const Index: React.FC = () => {
  return (
    <>
      <DeviceList isStationChild={true} />
    </>
  );
};

export default Index;
