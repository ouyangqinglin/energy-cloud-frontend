/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 21:00:58
 * @LastEditTime: 2023-07-15 10:29:28
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\BatterryStack\index.tsx
 */
import React, { useState, useCallback } from 'react';
import { DeviceDetailType } from '../config';
import { DeviceDataType } from '@/services/equipment';
import Overview from '@/components/DeviceInfo/Overview';
import StackImg from '@/assets/image/device/stack.png';
import Page from '@/layouts/Page';
import RealTime from '@/components/DeviceRealTime/BatterryStack';
import { OnlineStatusEnum } from '@/utils/dictionary';

const BatterryStack: React.FC<DeviceDetailType> = (props) => {
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

export default BatterryStack;
