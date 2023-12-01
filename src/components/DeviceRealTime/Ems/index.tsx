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
import { DeviceTypeEnum } from '@/utils/dictionary';
import { OnlineStatusEnum } from '@/utils/dict';
import { useSubscribe } from '@/hooks';
import styles from './index.less';
import { formatMessage } from '@/utils';

export type EmsType = DeviceRealTimeType & {
  type?: DeviceTypeEnum;
};

const Ems: React.FC<EmsType> = (props) => {
  const { id, productId, deviceData, type } = props;

  const openSubscribe = useMemo(
    () => !!deviceData && deviceData?.status !== OnlineStatusEnum.Offline,
    [deviceData],
  );
  const realTimeData = useSubscribe(id, openSubscribe);

  const tabItems = useMemo<TabsProps['items']>(() => {
    return [
      {
        key: '1',
        label: formatMessage({ id: 'siteMonitor.operatingData', defaultMessage: '运行数据' }),
        children: <Run id={id} productId={productId} realTimeData={realTimeData} />,
      },
      {
        key: '2',
        label: formatMessage({ id: 'siteMonitor.remoteControl', defaultMessage: '远程控制' }),
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
