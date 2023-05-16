import React, { useState } from 'react';
import { Tabs, Button } from 'antd';
import Dialog from '@/components/Dialog';
import type { BusinessDialogProps } from '@/components/Dialog';
import EquipInfo from '@/components/EquipInfo';
import Detail from '@/components/Detail';
import type { fieldType } from '@/utils/dictionary';
import { valueFormat } from '@/utils';
import Community from './community';
import AlarmTable from '@/components/AlarmTable';
import LogTable from '@/components/LogTable';
import { getAlarms, getLogs } from '@/services/equipment';
import Empty from '@/components/Empty';

const Gateway: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;
  const [openSettingModal, setOpenSettingModal] = useState(false);
  const data: any = {};

  const onSettingClick = () => {
    setOpenSettingModal(!openSettingModal);
  };

  const runItems = (data?.run?.gateway?.field || []).map((item: fieldType) => {
    return { ...item, format: valueFormat };
  });

  const tabItems = [
    {
      label: '运行监测',
      key: 'item-0',
      children: (
        <>
          <Detail data={data?.run?.gateway?.value || {}} items={runItems} column={5} />
        </>
      ),
    },
    {
      label: '远程设置',
      key: 'item-1',
      children: <Empty />,
    },
    {
      label: '报警/故障',
      key: 'item-2',
      children: <AlarmTable params={{ id }} request={getAlarms} />,
    },
    {
      label: '设备日志',
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
              设置通信信息
            </Button>
          }
        />
        <Tabs items={tabItems} />
      </Dialog>
      <Community id={id} open={openSettingModal} onCancel={onSettingClick} model={model} />
    </>
  );
};

export default Gateway;
