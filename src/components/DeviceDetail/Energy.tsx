/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-27 14:28:42
 * @LastEditTime: 2023-07-13 17:36:54
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\Energy.tsx
 */

import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Tabs, Empty } from 'antd';
import EmptyPage from '../EmptyPage';
import type { TabsProps } from 'antd';
import Alarm from '@/components/Alarm';
import LogTable from '@/components/LogTable';
import { getLogs } from '@/services/equipment';
import styles from './index.less';
import { DeviceDetailType } from './config';
import HistoryData from './HistoryData';
import { getChildEquipment } from '@/services/equipment';
import EquipInfo from '@/components/EquipInfo';
import type { DeviceType } from '@/components/EquipInfo/type';
import Community from '@/components/ScreenDialog/Community';
import EnergyImg from '@/assets/image/product/energy.png';
import EnergyIntroImg from '@/assets/image/product/energy-intro.jpg';
import RealTime from '@/components/ScreenDialog/EnergyDialog/RealTime';
import Setting from '@/components/ScreenDialog/EnergyDialog/setting';

const Energy: React.FC<DeviceDetailType> = (props) => {
  const { id } = props;

  const [loading, setLoading] = useState(false);
  const [deviceData, setDeviceData] = useState<DeviceType>();
  const [equipmentIds, setEquipmentIds] = useState({});
  const [settingData, setSettingData] = useState<Record<string, any>>();

  const onDataChange = useCallback((data) => {
    setDeviceData(data);
  }, []);

  useEffect(() => {
    getChildEquipment({ parentId: id }).then((res) => {
      const obj = {};
      res?.data?.forEach?.((item: any) => {
        obj[item.productId] = item.deviceId;
      });
      setEquipmentIds(obj);
    });
  }, [id]);

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
              setLoading={setLoading}
              equipmentImg={EnergyImg}
              productImg={EnergyIntroImg}
              buttons={
                <Community
                  id={id}
                  siteId={deviceData?.siteId}
                  type={deviceData?.paramConfigType}
                  userLabel="EMS mqtt用户名"
                  passwordLabel="EMS mqtt密码"
                />
              }
              onChange={onDataChange}
            />
            <RealTime
              id={id}
              loading={loading}
              setSettingData={setSettingData}
              equipmentIds={equipmentIds}
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
        children: <Setting id={id} settingData={settingData} />,
      },
    ];
  }, [id, equipmentIds, settingData, deviceData, loading]);

  return (
    <>
      <Tabs className={styles.tabs} items={items} />
    </>
  );
};

export default Energy;
