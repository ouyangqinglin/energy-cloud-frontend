import React, { useState, useCallback } from 'react';
import { Tabs, Button, Skeleton } from 'antd';
import Dialog from '@/components/Dialog';
import type { BusinessDialogProps } from '@/components/ScreenDialog';
import EquipInfo from '@/components/EquipInfo';
import Meter, { MeterSkeleton } from '@/components/Meter';
import Label from '@/components/Detail/label';
import AlarmTable from '@/components/AlarmTable';
import LogTable from '@/components/LogTable';
import { getAlarms, getLogs } from '@/services/equipment';
import Empty from '@/components/Empty';
import useSubscribe from '@/pages/screen/useSubscribe';
import AccountCommunity from '@/components/ScreenDialog/Community/AccountCommunity';

const Gateway: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;
  const equipmentData = useSubscribe(id, open);
  const [loading, setLoading] = useState(false);
  const [openCommunity, setOpenCommunity] = useState(false);

  const switchOpenCommunity = useCallback(() => {
    setOpenCommunity((openData) => !openData);
  }, []);

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
          buttons={
            <Button type="link" onClick={switchOpenCommunity}>
              设置通信参数
            </Button>
          }
          setLoading={setLoading}
        />
        <Tabs items={tabItems} />
      </Dialog>
      <AccountCommunity
        model={model}
        open={openCommunity}
        onOpenChange={setOpenCommunity}
        id={id}
        userLabel="EMS  mqtt用户名"
        passwordLabel="EMS mqtt密码"
      />
    </>
  );
};

export default Gateway;
