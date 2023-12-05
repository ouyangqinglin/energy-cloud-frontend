/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-11 14:44:27
 * @LastEditTime: 2023-12-05 20:17:22
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\YTEnergyEms\index.tsx
 */
import React, { useMemo } from 'react';
import { DeviceRealTimeType } from '../config';
import { Tabs, TabsProps } from 'antd';
import Run from './Run';
// import Setting from '@/components/ScreenDialog/EnergyDialog/setting';
import { DeviceTypeEnum, OnlineStatusEnum } from '@/utils/dictionary';
import { useAuthority, useSubscribe } from '@/hooks';
import styles from './index.less';
import Setting from './Control';
import { isEmpty } from '@/utils';

export type EmsType = DeviceRealTimeType & {
  type?: DeviceTypeEnum;
};

const YTEnergyEms: React.FC<EmsType> = (props) => {
  const { id, productId, deviceData, type } = props;

  const { authorityMap } = useAuthority([
    'iot:device:remoteControl',
    'iot:device:remoteControl:systemStatusControl',
  ]);

  const openSubscribe = useMemo(
    () => !isEmpty(deviceData?.status) && deviceData?.status !== OnlineStatusEnum.Offline,
    [deviceData],
  );
  const realTimeData = useSubscribe(id, true);

  const tabItems = useMemo<TabsProps['items']>(() => {
    return deviceData?.masterSlaveMode == 1 || !authorityMap.get('iot:device:remoteControl')
      ? []
      : [
          {
            key: '1',
            label: '运行数据',
            children: <Run id={id} productId={productId} realTimeData={realTimeData} />,
          },
          {
            key: '2',
            label: '远程控制',
            children: authorityMap.get('iot:device:remoteControl:systemStatusControl') ? (
              <Setting
                id={id}
                deviceData={deviceData}
                settingData={realTimeData}
                type={type}
                isLineLabel
                isDeviceChild
              />
            ) : (
              <></>
            ),
          },
        ];
  }, [realTimeData, deviceData, authorityMap]);

  return (
    <>
      {deviceData?.masterSlaveMode == 1 || !authorityMap.get('iot:device:remoteControl') ? (
        <Run id={id} productId={productId} realTimeData={realTimeData} />
      ) : (
        <Tabs className={styles.tabs} items={tabItems} />
      )}
    </>
  );
};

export default YTEnergyEms;
