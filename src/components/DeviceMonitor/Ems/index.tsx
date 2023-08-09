/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:43:38
 * @LastEditTime: 2023-08-04 14:13:01
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\Ems\index.tsx
 */

import React, { useState, useCallback, useMemo } from 'react';
import { Tabs, TabsProps } from 'antd';
import { DeviceDetailType } from '../config';
import DeviceInfo from '@/components/DeviceInfo';
import { DeviceDataType } from '@/services/equipment';
import Overview from '@/components/DeviceInfo/Overview';
import StackImg from '@/assets/image/device/stack.png';
import Run from './Run';
import useSubscribe from '@/pages/screen/useSubscribe';
import Setting from '@/components/ScreenDialog/EnergyDialog/setting';
import Page from '@/layouts/Page';
import Community from '@/components/ScreenDialog/Community';
import { OnlineStatusEnum } from '@/utils/dictionary';

const Ems: React.FC<DeviceDetailType> = (props) => {
  const { id, productId, onChange } = props;

  const [deviceData, setDeviceData] = useState<DeviceDataType>();
  const openSubscribe = useMemo(
    () => !!deviceData && deviceData?.status !== OnlineStatusEnum.Offline,
    [deviceData],
  );
  const realTimeData = useSubscribe(id, openSubscribe);

  const onDataChange = useCallback((value: DeviceDataType) => {
    setDeviceData({ ...(value || {}), productImg: StackImg });
    onChange?.(value);
  }, []);

  const tabItems = useMemo<TabsProps['items']>(() => {
    return [
      {
        key: '1',
        label: '运行数据',
        children: <Run id={id} productId={productId} realTimeData={realTimeData} />,
      },
      {
        key: '2',
        label: '远程控制',
        children: <Setting id={id} settingData={realTimeData} isLineLabel />,
      },
    ];
  }, [realTimeData]);

  return (
    <>
      <Page
        top={<Overview data={deviceData} />}
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
        <Tabs items={tabItems} />
      </Page>
    </>
  );
};

export default Ems;
