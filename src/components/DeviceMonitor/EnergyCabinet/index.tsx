/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:19:44
 * @LastEditTime: 2023-07-20 09:35:21
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\ElectricMeter\index.tsx
 */
import React, { useState, useCallback } from 'react';
import { DeviceDetailType } from '../config';
import Overview from '@/components/DeviceInfo/Overview';
import { DeviceDataType } from '@/services/equipment';
import Page from '@/layouts/Page';
import EnergyCabinetImg from '@/assets/image/product/energy-cabinet.png';
import RealTime from '@/components/DeviceRealTime/EnergyCabinet';
import { OnlineStatusEnum } from '@/utils/dictionary';

const EnergyCabinet: React.FC<DeviceDetailType> = (props) => {
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
        className={deviceData?.status === OnlineStatusEnum.Offline ? 'device-offline' : ''}
        top={<Overview deviceId={id} onChange={onDataChange} setLoading={setLoading} />}
      >
        <RealTime id={id} deviceData={deviceData} loading={loading} />
      </Page>
    </>
  );
};

export default EnergyCabinet;
