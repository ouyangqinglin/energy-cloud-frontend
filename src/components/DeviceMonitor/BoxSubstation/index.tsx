/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:19:44
 * @LastEditTime: 2023-07-18 17:54:58
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\BoxSubstation\index.tsx
 */
import React, { useState, useCallback } from 'react';
import { DeviceDetailType } from '../config';
import Overview from '@/components/DeviceInfo/Overview';
import { DeviceDataType } from '@/services/equipment';
import Page from '@/layouts/Page';
import BoxSubstationImg from '@/assets/image/product/box-substation.png';
import BoxSubstationIntroImg from '@/assets/image/product/transfer-intro.jpg';
import RealTime from '@/components/DeviceRealTime/BoxSubstation';
import { OnlineStatusEnum } from '@/utils/dictionary';

const BoxSubstation: React.FC<DeviceDetailType> = (props) => {
  const { id, productId, onChange } = props;

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
        top={
          <Overview
            deviceId={id}
            onChange={onDataChange}
            setLoading={setLoading}
            introImg={BoxSubstationIntroImg}
          />
        }
      >
        <RealTime id={id} productId={productId} deviceData={deviceData} loading={loading} />
      </Page>
    </>
  );
};

export default BoxSubstation;
