/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-11 14:44:27
 * @LastEditTime: 2023-10-27 08:19:09
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\YTEnergyEms\index.tsx
 */
import React, { useMemo } from 'react';
import { DeviceRealTimeType } from '../config';
import { Tabs, TabsProps } from 'antd';
import Run from './Run';
import Setting from '@/components/ScreenDialog/EnergyDialog/setting';
import { DeviceTypeEnum, OnlineStatusEnum } from '@/utils/dictionary';
import { useSubscribe } from '@/hooks';
import styles from './index.less';

export type EmsType = DeviceRealTimeType & {
  type?: DeviceTypeEnum;
};

const YTEnergyEms: React.FC<EmsType> = (props) => {
  const { id, productId, deviceData, type } = props;

  const openSubscribe = useMemo(
    () => !!deviceData && deviceData?.status !== OnlineStatusEnum.Offline,
    [deviceData],
  );
  const realTimeData = useSubscribe(id, openSubscribe);

  const tabItems = useMemo<TabsProps['items']>(() => {
    return deviceData?.masterSlaveMode == 1
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
            children: (
              <Setting id={id} settingData={realTimeData} type={type} isLineLabel isDeviceChild />
            ),
          },
        ];
  }, [realTimeData, deviceData]);

  return (
    <>
      {deviceData?.masterSlaveMode == 1 ? (
        <Run id={id} productId={productId} realTimeData={realTimeData} />
      ) : (
        <Tabs className={styles.tabs} items={tabItems} />
      )}
    </>
  );
};

export default YTEnergyEms;
