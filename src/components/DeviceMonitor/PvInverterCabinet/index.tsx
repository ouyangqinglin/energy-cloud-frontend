/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:19:44
 * @LastEditTime: 2023-07-20 13:58:58
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\PvInverterCabinet\index.tsx
 */
import React, { useState, useCallback } from 'react';
import { DeviceDetailType } from '../config';
import Overview from '@/components/DeviceInfo/Overview';
import { DeviceDataType } from '@/services/equipment';
import Page from '@/layouts/Page';
import PvInverterCabinetImg from '@/assets/image/product/pvInverter-cabinet.png';
import PvInverterCabinetIntroImg from '@/assets/image/product/pvInverter-intro.jpg';
import RealTime from '@/components/DeviceRealTime/PvInverterCabinet';

const BoxSubstation: React.FC<DeviceDetailType> = (props) => {
  const { id, onChange } = props;

  const [loading, setLoading] = useState(false);
  const [deviceData, setDeviceData] = useState<DeviceDataType>();

  const onDataChange = useCallback((value: DeviceDataType) => {
    setDeviceData({ ...(value || {}) });
    onChange?.(value);
  }, []);

  return (
    <>
      <Page
        top={
          <Overview
            deviceId={id}
            onChange={onDataChange}
            setLoading={setLoading}
            introImg={PvInverterCabinetIntroImg}
          />
        }
      >
        <RealTime id={id} deviceData={deviceData} loading={loading} />
      </Page>
    </>
  );
};

export default BoxSubstation;
