/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-27 10:55:49
 * @LastEditTime: 2023-06-27 19:23:28
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\YTCharge.tsx
 */

import React, { useMemo, useState, useCallback } from 'react';
import { Tabs, Empty } from 'antd';
import type { TabsProps } from 'antd';
import Alarm from '@/components/Alarm';
import LogTable from '@/components/LogTable';
import { getLogs } from '@/services/equipment';
import styles from './index.less';
import RealTime from '@/components/ScreenDialog/YtCharge/RealTime';
import { DeviceDetailType } from './config';
import EquipInfo from '@/components/EquipInfo';
import type { DeviceType } from '@/components/EquipInfo/type';
import Community from '@/components/ScreenDialog/Community';
import YtChargeImg from '@/assets/image/product/yt-charge.png';
import YtChargeIntroImg from '@/assets/image/product/yt-charge-intro.jpg';
import HistoryData from './HistoryData';

const YTCharge: React.FC<DeviceDetailType> = (props) => {
  const { id } = props;

  const [loading, setLoading] = useState(false);
  const [deviceData, setDeviceData] = useState<DeviceType>();

  const onDataChange = useCallback((data) => {
    setDeviceData(data);
  }, []);

  const items = useMemo<TabsProps['items']>(() => {
    return [
      {
        label: '实时数据',
        key: '1',
        children: (
          <>
            <EquipInfo
              id={id}
              className="mb20"
              equipmentImg={YtChargeImg}
              productImg={YtChargeIntroImg}
              setLoading={setLoading}
              buttons={
                <Community id={id} siteId={deviceData?.siteId} type={deviceData?.paramConfigType} />
              }
              onChange={onDataChange}
            />
            <RealTime id={id} loading={loading} />
          </>
        ),
      },
      {
        label: '历史数据',
        key: '2',
        children: <HistoryData />,
      },
      {
        label: '告警',
        key: '3',
        children: <Alarm params={{ id }} />,
      },
      {
        label: '日志',
        key: '4',
        children: <LogTable params={{ id }} request={getLogs} />,
      },
      {
        label: '配置',
        key: '5',
        children: <Empty />,
      },
    ];
  }, [id, deviceData, loading]);

  return (
    <>
      <Tabs className={styles.tabs} items={items} />
    </>
  );
};

export default YTCharge;
