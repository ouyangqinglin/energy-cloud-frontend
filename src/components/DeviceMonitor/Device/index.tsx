/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:19:44
 * @LastEditTime: 2023-07-19 14:16:45
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\Device\index.tsx
 */
import React, { useState, useCallback } from 'react';
import { DeviceDetailType } from '../config';
import { Empty } from 'antd';
import Overview from '@/components/DeviceInfo/Overview';
import DeviceInfo from '@/components/DeviceInfo';
import { DeviceDataType } from '@/services/equipment';
import Page from '@/layouts/Page';
import EmptyImg from '@/assets/image/device/empty.png';

const BoxSubstation: React.FC<DeviceDetailType> = (props) => {
  const { id } = props;

  const [deviceData, setDeviceData] = useState<DeviceDataType>();

  const onDataChange = useCallback((value: DeviceDataType) => {
    setDeviceData({ ...(value || {}), productImg: EmptyImg });
  }, []);

  return (
    <>
      <Page
        top={<Overview data={deviceData} />}
        bottom={<DeviceInfo id={id} onChange={onDataChange} />}
      >
        <Empty />
      </Page>
    </>
  );
};

export default BoxSubstation;
