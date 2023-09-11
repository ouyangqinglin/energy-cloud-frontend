/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:19:44
 * @LastEditTime: 2023-08-14 10:27:08
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\Device\index.tsx
 */
import React, { useState, useCallback } from 'react';
import { DeviceDetailType } from '../config';
import Overview from '@/components/DeviceInfo/Overview';
import { DeviceDataType } from '@/services/equipment';
import Page from '@/layouts/Page';
import { deviceProductDataMap } from './config';
import styles from './index.less';
import RealTime from '@/components/DeviceRealTime/Device';

const Device: React.FC<DeviceDetailType> = (props) => {
  const { id, productId, onChange } = props;

  const [deviceData, setDeviceData] = useState<DeviceDataType>();

  const onDataChange = useCallback(
    (value: DeviceDataType) => {
      setDeviceData({ ...(value || {}) });
      onChange?.(value);
    },
    [productId],
  );

  return (
    <>
      <Page
        className={styles.page}
        top={
          <Overview
            deviceId={id}
            onChange={onDataChange}
            introImg={deviceProductDataMap[productId]?.introImg}
          />
        }
      >
        <RealTime id={id} productId={productId} deviceData={deviceData} />
      </Page>
    </>
  );
};

export default Device;
