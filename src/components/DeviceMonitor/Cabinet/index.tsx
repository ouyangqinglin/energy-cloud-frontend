/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:19:44
 * @LastEditTime: 2023-07-28 16:10:36
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\Cabinet\index.tsx
 */
import React, { useState, useCallback } from 'react';
import { DeviceDetailType } from '../config';
import { Empty } from 'antd';
import Overview from '@/components/DeviceInfo/Overview';
import DeviceInfo from '@/components/DeviceInfo';
import { DeviceDataType } from '@/services/equipment';
import Page from '@/layouts/Page';
import CabinetImg from '@/assets/image/product/cabinet.png';
import CabinetIntroImg from '@/assets/image/product/cabinet-intro.jpg';
import Community from '@/components/ScreenDialog/Community';

const BoxSubstation: React.FC<DeviceDetailType> = (props) => {
  const { id, onChange } = props;

  const [deviceData, setDeviceData] = useState<DeviceDataType>();

  const onDataChange = useCallback((value: DeviceDataType) => {
    setDeviceData({ ...(value || {}), productImg: CabinetImg });
    onChange?.(value);
  }, []);

  return (
    <>
      <Page
        top={<Overview data={deviceData} introImg={CabinetIntroImg} />}
        bottom={
          <DeviceInfo
            id={id}
            onChange={onDataChange}
            buttons={
              <Community id={id} siteId={deviceData?.siteId} type={deviceData?.paramConfigType} />
            }
          />
        }
      >
        <Empty />
      </Page>
    </>
  );
};

export default BoxSubstation;
