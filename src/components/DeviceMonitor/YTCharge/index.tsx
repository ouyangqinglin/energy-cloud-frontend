/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:19:44
 * @LastEditTime: 2023-09-11 15:28:42
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\YTCharge\index.tsx
 */
import React, { useState, useCallback } from 'react';
import { DeviceDetailType } from '../config';
import Overview from '@/components/DeviceInfo/Overview';
import { DeviceDataType } from '@/services/equipment';
import Page from '@/layouts/Page';
import YtChargeImg from '@/assets/image/product/yt-charge.png';
import YtChargeIntroImg from '@/assets/image/product/yt-charge-intro.jpg';
import RealTime from '@/components/DeviceRealTime/YTCharge';

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
            introImg={YtChargeIntroImg}
          />
        }
      >
        <RealTime id={id} deviceData={deviceData} loading={loading} />
      </Page>
    </>
  );
};

export default BoxSubstation;
