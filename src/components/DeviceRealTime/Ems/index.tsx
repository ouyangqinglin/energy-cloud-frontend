/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-11 14:44:27
 * @LastEditTime: 2023-09-12 11:08:09
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\Ems\index.tsx
 */
import React, { useMemo } from 'react';
import { DeviceRealTimeType } from '../config';
import { Tabs, TabsProps } from 'antd';
import Run from './Run';
import Setting from '@/components/ScreenDialog/EnergyDialog/setting';
import { DeviceTypeEnum, OnlineStatusEnum } from '@/utils/dictionary';
import { useSubscribe } from '@/hooks';
import styles from './index.less';
import { isEmpty } from '@/utils';

export type EmsType = DeviceRealTimeType & {
  type?: DeviceTypeEnum;
};

const Ems: React.FC<EmsType> = (props) => {
  const { id, productId, deviceData, type } = props;

  const openSubscribe = useMemo(
    () => !isEmpty(deviceData?.status) && deviceData?.status !== OnlineStatusEnum.Offline,
    [deviceData],
  );
  const realTimeData = useSubscribe(id, openSubscribe);

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
        children: (
          <Setting id={id} settingData={realTimeData} type={type} isLineLabel isDeviceChild />
        ),
      },
    ];
  }, [realTimeData]);

  return (
    <>
      <Tabs className={styles.tabs} items={tabItems} />
    </>
  );
};

export default Ems;
