import React, { useEffect, useState } from 'react';
import { Modal, Tabs } from 'antd';
import ScreenDialog from '@/components/ScreenDialog';
import type { BusinessDialogProps } from '@/components/ScreenDialog';
import EquipInfo from '@/components/EquipInfo';
import Detail from '@/components/Detail';
import Empty from '@/components/Empty';
import AlarmTable from '@/components/AlarmTable';
import LogTable from '@/components/LogTable';
import YtChargeImg from '@/assets/image/product/yt-charge.png';
import YtChargeIntroImg from '@/assets/image/product/yt-charge-intro.jpg';
import type { DetailItem } from '@/components/Detail';
import {
  useFormat,
  powerFormat,
  powerHourFormat,
  moneyFormat,
  voltageFormat,
  currentFormat,
  noPowerFormat,
  noPowerHourFormat,
} from '@/utils/format';
import useSubscribe from '@/pages/screen/useSubscribe';

const YtCharge: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;
  const [equipmentData, setEquipmentData] = useState({});

  const Component = model === 'screen' ? ScreenDialog : Modal;

  const statusItems: DetailItem[] = [
    { label: 'A枪状态', field: 'a', format: useFormat },
    { label: 'B枪状态', field: 'b', format: useFormat },
  ];
  const runItems: DetailItem[] = [
    { label: '实时充电功率', field: 'j', format: powerFormat, span: 4 },
    { label: '今日充电量', field: 'k', format: powerHourFormat },
    { label: '累计充电量', field: 'l', format: powerHourFormat },
    { label: '今日充电收益', field: 'm', format: moneyFormat },
    { label: '累计充电收益', field: 'n', format: moneyFormat },
    { label: 'A相电压', field: 'o', format: voltageFormat },
    { label: 'AB线电压', field: 'p', format: voltageFormat },
    { label: 'A相电流', field: 'q', format: currentFormat, span: 2 },
    { label: 'B相电压', field: 'r', format: voltageFormat },
    { label: 'BC线电压', field: 's', format: voltageFormat },
    { label: 'B相电流', field: 't', format: currentFormat, span: 2 },
    { label: 'C相电压', field: 'u', format: voltageFormat },
    { label: 'CA线电压', field: 'v', format: voltageFormat },
    { label: 'C相电流', field: 'w', format: currentFormat, span: 2 },
    { label: '总有功功率', field: 'x', format: powerFormat },
    { label: '总无功功率', field: 'y', format: noPowerFormat },
    { label: '总视在功率', field: 'z', format: powerFormat },
    { label: '总功率因数', field: 'aa' },
    { label: '正向有功电能', field: 'ab', format: powerHourFormat },
    { label: '反向有功电能', field: 'ac', format: powerHourFormat },
    { label: '正向无功电能', field: 'ad', format: noPowerHourFormat },
    { label: '反向无功电能', field: 'ae', format: noPowerHourFormat },
  ];
  const tabItems = [
    {
      label: '运行监测',
      key: 'item-0',
      children: (
        <>
          <Detail data={equipmentData || {}} items={statusItems} column={4} />
          <Detail data={equipmentData || {}} items={runItems} column={4} />
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
      children: <AlarmTable />,
    },
    {
      label: '设备日志',
      key: 'item-3',
      children: <LogTable />,
    },
  ];

  useSubscribe(id, open, (res) => {
    setEquipmentData({ ...equipmentData, ...res });
  });

  return (
    <>
      <Component
        title="设备详情"
        open={open}
        onCancel={onCancel}
        width={model === 'screen' ? '62.5vw' : '1200px'}
        wrapClassName={model === 'screen' ? '' : 'dialog-equipment'}
        footer={null}
        destroyOnClose
      >
        <EquipInfo id={id} model={model} equipmentImg={YtChargeImg} productImg={YtChargeIntroImg} />
        <Tabs items={tabItems} />
      </Component>
    </>
  );
};

export default YtCharge;
