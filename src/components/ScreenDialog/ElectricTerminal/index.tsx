/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-08 19:31:31
 * @LastEditTime: 2023-06-01 10:24:24
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\ScreenDialog\ElectricTerminal\index.tsx
 */

import React, { useState, useCallback } from 'react';
import { Tabs, Skeleton } from 'antd';
import Label from '@/components/Detail/label';
import Dialog from '@/components/Dialog';
import type { BusinessDialogProps } from '@/components/ScreenDialog';
import EquipInfo from '@/components/EquipInfo';
import type { DeviceType } from '@/components/EquipInfo/type';
import Meter, { MeterSkeleton } from '@/components/Meter';
import Empty from '@/components/Empty';
import AlarmTable from '@/components/AlarmTable';
import LogTable from '@/components/LogTable';
import { getAlarms, getLogs } from '@/services/equipment';
import useSubscribe from '@/pages/screen/useSubscribe';
import Community from '../Community';

const ElectricTerminal: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;
  const equipmentData = useSubscribe(id, open);
  const [loading, setLoading] = useState(false);
  const [deviceData, setDeviceData] = useState<DeviceType>();

  const onDataChange = useCallback((data) => {
    setDeviceData(data);
  }, []);

  const tabItems = [
    {
      label: '运行监测',
      key: 'item-0',
      children: loading ? (
        <>
          <Skeleton.Button className="mb12" size="small" active />
          <MeterSkeleton />
        </>
      ) : (
        <>
          <Label title="运行信息" />
          <Meter data={equipmentData || {}} />
        </>
      ),
    },
    {
      label: '远程设置',
      key: 'item-1',
      children: <Empty />,
    },
    {
      label: '告警/故障',
      key: 'item-2',
      children: <AlarmTable params={{ id }} request={getAlarms} />,
    },
    {
      label: '日志',
      key: 'item-3',
      children: <LogTable params={{ id }} request={getLogs} />,
    },
  ];

  return (
    <>
      <Dialog
        model={model}
        title="设备详情"
        open={open}
        onCancel={onCancel}
        footer={null}
        destroyOnClose
      >
        <EquipInfo
          id={id}
          model={model}
          setLoading={setLoading}
          buttons={
            <Community
              id={id}
              model={model}
              siteId={deviceData?.siteId}
              type={deviceData?.paramConfigType}
            />
          }
          onChange={onDataChange}
        />
        <Tabs items={tabItems} />
      </Dialog>
    </>
  );
};

export default ElectricTerminal;
