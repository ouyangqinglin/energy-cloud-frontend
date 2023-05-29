/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-08 19:40:01
 * @LastEditTime: 2023-05-29 19:49:39
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\ScreenDialog\Device\index.tsx
 */

import React, { useEffect, useState } from 'react';
import { Modal, Tabs } from 'antd';
import Dialog from '@/components/Dialog';
import type { BusinessDialogProps } from '@/components/ScreenDialog';
import EquipInfo from '@/components/EquipInfo';
import ChargeImg from '@/assets/image/product/cabinet.png';
import ChargeIntroImg from '@/assets/image/product/cabinet-intro.jpg';
import Empty from '@/components/Empty';
import AlarmTable from '@/components/AlarmTable';
import LogTable from '@/components/LogTable';
import { getAlarms, getLogs } from '@/services/equipment';

const Device: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;

  const tabItems = [
    {
      label: '运行监测',
      key: 'item-0',
      children: <Empty />,
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
        <EquipInfo id={id} model={model} equipmentImg={ChargeImg} productImg={ChargeIntroImg} />
        <Tabs items={tabItems} />
      </Dialog>
    </>
  );
};

export default Device;
