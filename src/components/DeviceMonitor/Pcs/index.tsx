/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:19:44
 * @LastEditTime: 2023-07-27 09:17:11
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\Pcs\index.tsx
 */
import React, { useState, useCallback } from 'react';
import { DeviceDetailType } from '../config';
import Overview from '@/components/DeviceInfo/Overview';
import { DeviceDataType } from '@/services/equipment';
import ConverterImg from '@/assets/image/device/converter.png';
import Page from '@/layouts/Page';
import RealTime from '@/components/DeviceRealTime/Pcs';

const Pcs: React.FC<DeviceDetailType> = (props) => {
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

export default Pcs;
