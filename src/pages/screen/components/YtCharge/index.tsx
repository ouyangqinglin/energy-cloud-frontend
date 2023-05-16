import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import Dialog from '@/components/Dialog';
import type { BusinessDialogProps } from '@/components/Dialog';
import EquipInfo from '@/components/EquipInfo';
import Detail from '@/components/Detail';
import Meter from '@/components/Meter';
import Label from '@/components/Detail/label';
import Empty from '@/components/Empty';
import AlarmTable from '@/components/AlarmTable';
import LogTable from '@/components/LogTable';
import { getAlarms, getLogs } from '@/services/equipment';
import YtChargeImg from '@/assets/image/product/yt-charge.png';
import YtChargeIntroImg from '@/assets/image/product/yt-charge-intro.jpg';
import type { DetailItem } from '@/components/Detail';
import { useFormat, powerHourFormat } from '@/utils/format';
import useSubscribe from '@/pages/screen/useSubscribe';
import { getRelatedDevice } from '@/services/equipment';

const YtCharge: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;
  const [relatedId, setRelatedId] = useState('');
  const equipmentData = useSubscribe(id, open);
  const meterData = useSubscribe(relatedId, open);

  useEffect(() => {
    if (open && id) {
      getRelatedDevice(id).then((res) => {
        if (res?.data?.associatedId) {
          setRelatedId(res.data.associatedId);
        }
      });
    }
  }, [id, open]);

  const statusItems: DetailItem[] = [
    { label: 'A枪状态', field: 'a', format: useFormat },
    { label: 'B枪状态', field: 'b', format: useFormat },
  ];

  const runItems: DetailItem[] = [
    { label: '今日充电量', field: 'k', format: powerHourFormat },
    { label: '累计充电量', field: 'Pimp', format: powerHourFormat },
  ];

  const tabItems = [
    {
      label: '运行监测',
      key: 'item-0',
      children: (
        <>
          <Label title="状态信息" />
          <Detail data={equipmentData} items={statusItems} column={4} />
          <Label title="运行信息" />
          <Detail data={{ ...meterData }} items={runItems} column={4} />
          <Meter data={meterData} />
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
        <EquipInfo id={id} model={model} equipmentImg={YtChargeImg} productImg={YtChargeIntroImg} />
        <Tabs items={tabItems} />
      </Dialog>
    </>
  );
};

export default YtCharge;
