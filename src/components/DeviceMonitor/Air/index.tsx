/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:19:44
 * @LastEditTime: 2023-07-18 15:50:41
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\Air\index.tsx
 */
import React, { useState, useCallback } from 'react';
import { DeviceDetailType } from '../config';
import Overview from '@/components/DeviceInfo/Overview';
import { DeviceDataType } from '@/services/equipment';
import AirImg from '@/assets/image/device/air.png';
import Page from '@/layouts/Page';
import RealTime from '@/components/DeviceRealTime/Air';
import { OnlineStatusEnum } from '@/utils/dictionary';

const Air: React.FC<DeviceDetailType> = (props) => {
  const { id, productId, onChange } = props;

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
        <RealTime id={id} productId={productId} deviceData={deviceData} />
      </Page>
    </>
  );
};

export default Air;
