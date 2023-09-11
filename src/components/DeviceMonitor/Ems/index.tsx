/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:43:38
 * @LastEditTime: 2023-08-04 14:13:01
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\Ems\index.tsx
 */

import React, { useState, useCallback } from 'react';
import { DeviceDetailType } from '../config';
import { DeviceDataType } from '@/services/equipment';
import Overview from '@/components/DeviceInfo/Overview';
import StackImg from '@/assets/image/device/stack.png';
import Page from '@/layouts/Page';
import RealTime from '@/components/DeviceRealTime/Ems';

const Ems: React.FC<DeviceDetailType> = (props) => {
  const { id, productId, onChange } = props;

  const [deviceData, setDeviceData] = useState<DeviceDataType>();

  const onDataChange = useCallback((value: DeviceDataType) => {
    setDeviceData({ ...(value || {}) });
    onChange?.(value);
  }, []);

  return (
    <>
      <Page top={<Overview deviceId={id} onChange={onDataChange} />}>
        <RealTime id={id} productId={productId} deviceData={deviceData} />
      </Page>
    </>
  );
};

export default Ems;
