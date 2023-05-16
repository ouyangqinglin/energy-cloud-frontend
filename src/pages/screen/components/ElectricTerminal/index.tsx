/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-08 19:31:31
 * @LastEditTime: 2023-05-08 19:31:31
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\ElectricTerminal\index.tsx
 */

import React from 'react';
import { Tabs } from 'antd';
import Label from '@/components/Detail/label';
import Dialog from '@/components/Dialog';
import type { BusinessDialogProps } from '@/components/Dialog';
import EquipInfo from '@/components/EquipInfo';
import Detail from '@/components/Detail';
import type { fieldType } from '@/utils/dictionary';
import { valueFormat } from '@/utils';
import Empty from '@/components/Empty';
import AlarmTable from '@/components/AlarmTable';
import LogTable from '@/components/LogTable';
import { getAlarms, getLogs } from '@/services/equipment';

const ElectricTerminal: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;
  const data: any = {};

  const runItems = (data?.run?.electricTerminal?.field || []).map((item: fieldType) => {
    return { ...item, format: valueFormat };
  });

  const tabItems = [
    {
      label: '运行监测',
      key: 'item-0',
      children: (
        <>
          <Label title="市电负载" />
          <Detail data={data?.run?.electricTerminal?.value || {}} items={runItems} column={5} />
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
        <EquipInfo id={id} model={model} />
        <Tabs items={tabItems} />
      </Dialog>
    </>
  );
};

export default ElectricTerminal;
