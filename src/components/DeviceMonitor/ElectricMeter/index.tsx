/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:19:44
 * @LastEditTime: 2023-11-13 15:42:48
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\ElectricMeter\index.tsx
 */
import React, { useState, useCallback } from 'react';
import { DeviceDetailType } from '../config';
import Overview from '@/components/DeviceInfo/Overview';
import { DeviceDataType } from '@/services/equipment';
import Page from '@/layouts/Page';
import EmptyImg from '@/assets/image/device/empty.png';
import RealTime from '@/components/DeviceRealTime/ElectricMeter';
import { formatMessage } from '@/utils';

export type ElectricMeterType = DeviceDetailType & {
  label?: string;
  hideLineVoltage?: boolean;
};

const ElectricMeter: React.FC<ElectricMeterType> = (props) => {
  const {
    id,
    productId,
    onChange,
    label = formatMessage({ id: 'device.mainsLoad', defaultMessage: '市电负载' }),
    hideLineVoltage,
  } = props;

  const [loading, setLoading] = useState(false);
  const [deviceData, setDeviceData] = useState<DeviceDataType>();

  const onDataChange = useCallback((value: DeviceDataType) => {
    setDeviceData({ ...(value || {}) });
    onChange?.(value);
  }, []);

  return (
    <>
      <Page top={<Overview deviceId={id} onChange={onDataChange} setLoading={setLoading} />}>
        <RealTime
          id={id}
          productId={productId}
          deviceData={deviceData}
          loading={loading}
          label={label}
          hideLineVoltage={hideLineVoltage}
        />
      </Page>
    </>
  );
};

export default ElectricMeter;
