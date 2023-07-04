/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-27 13:46:04
 * @LastEditTime: 2023-07-04 10:50:26
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\Cabinet.tsx
 */

import React, { useMemo, useState, useCallback } from 'react';
import { Tabs, Empty } from 'antd';
import type { TabsProps } from 'antd';
import Alarm from '@/components/Alarm';
import LogTable from '@/components/LogTable';
import { getLogs } from '@/services/equipment';
import styles from './index.less';
import { DeviceDetailType } from './config';
import EquipInfo from '@/components/EquipInfo';
import type { DeviceType } from '@/components/EquipInfo/type';
import Community from '@/components/ScreenDialog/Community';
import CabinetImg from '@/assets/image/product/cabinet.png';
import CabinetIntroImg from '@/assets/image/product/cabinet-intro.jpg';
import HistoryData from './HistoryData';

const Cabinet: React.FC<DeviceDetailType> = (props) => {
  const { id } = props;

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
              equipmentImg={CabinetImg}
              productImg={CabinetIntroImg}
              buttons={
                <Community id={id} siteId={deviceData?.siteId} type={deviceData?.paramConfigType} />
              }
              onChange={onDataChange}
            />
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
        children: (
          <Alarm isStationChild={true} params={{ siteId: deviceData?.siteId, deviceId: id }} />
        ),
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
  }, [id, deviceData]);

  return (
    <>
      <Tabs className={styles.tabs} items={items} />
    </>
  );
};

export default Cabinet;
