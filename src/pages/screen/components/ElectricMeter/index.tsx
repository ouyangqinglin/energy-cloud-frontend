/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-08 19:31:31
 * @LastEditTime: 2023-05-11 19:31:44
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\ElectricMeter\index.tsx
 */

import React, { useState } from 'react';
import { Tabs, Button, Skeleton } from 'antd';
import Label from '@/components/Detail/label';
import Dialog from '@/components/Dialog';
import type { BusinessDialogProps } from '@/components/ScreenDialog';
import Meter, { MeterSkeleton } from '@/components/Meter';
import EquipInfo from '@/components/EquipInfo';
import Community from './community';
import Empty from '@/components/Empty';
import AlarmTable from '@/components/AlarmTable';
import LogTable from '@/components/LogTable';
import { getAlarms, getLogs } from '@/services/equipment';
import useSubscribe from '@/pages/screen/useSubscribe';

const ElectricMeter: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;
  const [openSettingModal, setOpenSettingModal] = useState(false);
  const equipmentData = useSubscribe(id, open);
  const [loading, setLoading] = useState(false);

  const onSettingClick = () => {
    setOpenSettingModal(!openSettingModal);
  };

  const tabItems = [
    {
      label: '运行监测',
      key: 'item-0',
      children: loading ? (
        <>
          <Skeleton.Button className="mb12" size="small" />
          <MeterSkeleton />
        </>
      ) : (
        <>
          <Label title="市电负载" />
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
          buttons={
            <Button type="link" onClick={onSettingClick}>
              设置通信参数
            </Button>
          }
          setLoading={setLoading}
        />
        <Tabs items={tabItems} />
      </Dialog>
      <Community id={id} open={openSettingModal} onCancel={onSettingClick} model={model} />
    </>
  );
};

export default ElectricMeter;
