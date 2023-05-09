/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-08 17:09:25
 * @LastEditTime: 2023-05-08 17:16:33
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\EnergyDialog\log.tsx
 */
import React from 'react';
import { Tabs } from 'antd';
import LogTable from '@/components/LogTable';
import { getLogs } from '@/components/ScreenDialog/service';

export type LogProps = {
  id: string | number;
};

const Log: React.FC<LogProps> = (props) => {
  const { id } = props;

  const items = [
    {
      label: 'EMS',
      key: 'item-0',
      children: <LogTable params={{ id }} request={getLogs} />,
    },
    {
      label: 'PCS',
      key: 'item-1',
      children: <LogTable params={{ id }} request={getLogs} />,
    },
    {
      label: 'BMS',
      key: 'item-2',
      children: <LogTable params={{ id }} request={getLogs} />,
    },
    {
      label: '空调',
      key: 'item-3',
      children: <LogTable params={{ id }} request={getLogs} />,
    },
    {
      label: '电表',
      key: 'item-4',
      children: <LogTable params={{ id }} request={getLogs} />,
    },
  ];

  return (
    <>
      <Tabs className="child-tabs" items={items} tabPosition="left" />
    </>
  );
};

export default Log;
