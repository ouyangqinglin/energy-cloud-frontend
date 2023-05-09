import React from 'react';
import { Tabs } from 'antd';
import AlarmTable from '@/components/AlarmTable';
import { getAlarms } from '@/components/ScreenDialog/service';

export type AlarmProps = {
  id: string | number;
};

const Alarm: React.FC<AlarmProps> = (props) => {
  const { id } = props;

  const items = [
    {
      label: 'EMS',
      key: 'item-0',
      children: <AlarmTable params={{ id }} request={getAlarms} />,
    },
    {
      label: 'PCS',
      key: 'item-1',
      children: <AlarmTable params={{ id }} request={getAlarms} />,
    },
    {
      label: 'BMS',
      key: 'item-2',
      children: <AlarmTable params={{ id }} request={getAlarms} />,
    },
    {
      label: '空调',
      key: 'item-3',
      children: <AlarmTable params={{ id }} request={getAlarms} />,
    },
    {
      label: '电表',
      key: 'item-4',
      children: <AlarmTable params={{ id }} request={getAlarms} />,
    },
  ];

  return (
    <>
      <Tabs className="child-tabs" items={items} tabPosition="left" />
    </>
  );
};

export default Alarm;
