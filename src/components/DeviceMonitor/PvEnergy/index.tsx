/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-11-16 11:22:11
 * @LastEditTime: 2023-11-16 11:22:11
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\PvEnergy\index.tsx
 */

import React, { useState, useCallback } from 'react';
import { DeviceDetailType } from '../config';
import Overview from '@/components/DeviceInfo/Overview';
import { DeviceDataType } from '@/services/equipment';
import Page from '@/layouts/Page';
import RealTime from '@/components/DeviceRealTime/PvEnergy';
import { OnlineStatusEnum } from '@/utils/dictionary';

const PvEnergy: React.FC<DeviceDetailType> = (props) => {
  const { id, onChange } = props;

  const [deviceData, setDeviceData] = useState<DeviceDataType>();

  const onDataChange = useCallback((value: DeviceDataType) => {
    setDeviceData({ ...(value || {}) });
    onChange?.(value);
  }, []);

  return (
    <>
      <Page
        className={deviceData?.status === OnlineStatusEnum.Offline ? 'device-offline' : ''}
        top={<Overview deviceId={id} onChange={onDataChange} />}
      >
        <RealTime deviceData={deviceData} />
      </Page>
    </>
  );
};

export default PvEnergy;
