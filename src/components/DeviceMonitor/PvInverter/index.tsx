/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:19:44
 * @LastEditTime: 2023-07-20 11:30:21
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\HwChargeYt\index.tsx
 */
import React, { useState, useCallback } from 'react';
import { DeviceDetailType } from '../config';
import Overview from '@/components/DeviceInfo/Overview';
import { DeviceDataType } from '@/services/equipment';
import Page from '@/layouts/Page';
import PvInverterImg from '@/assets/image/product/pvInverter.png';
import PvInverterIntroImg from '@/assets/image/product/pv-inverter-intro.jpg';
import RealTime from '@/components/DeviceRealTime/PvInverter';

export type PvInverterProps = DeviceDetailType & {
  loopNum: number;
};

const BoxSubstation: React.FC<PvInverterProps> = (props) => {
  const { id, onChange, loopNum } = props;

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
            introImg={PvInverterIntroImg}
          />
        }
      >
        <RealTime id={id} deviceData={deviceData} loading={loading} loopNum={loopNum} />
      </Page>
    </>
  );
};

export default BoxSubstation;
