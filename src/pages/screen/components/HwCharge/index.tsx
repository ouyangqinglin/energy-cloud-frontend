/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-08 19:08:46
 * @LastEditTime: 2023-05-16 19:15:13
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\HwCharge\index.tsx
 */
import React, { useEffect, useState } from 'react';
import { Modal, Tabs } from 'antd';
import Dialog from '@/components/Dialog';
import type { BusinessDialogProps } from '@/components/Dialog';
import EquipInfo from '@/components/EquipInfo';
import Detail from '@/components/Detail';
import Empty from '@/components/Empty';
import Label from '@/components/Detail/label';
import AlarmTable from '@/components/AlarmTable';
import LogTable from '@/components/LogTable';
import { getAlarms, getLogs } from '@/services/equipment';
import HwChargeStackImg from '@/assets/image/product/hw-charge-stack.png';
import HwChargeStackIntroImg from '@/assets/image/product/hw-charge-stack-intro.jpg';
import type { DetailItem } from '@/components/Detail';
import { powerHourFormat } from '@/utils/format';
import useSubscribe from '@/pages/screen/useSubscribe';
import { getRelatedDevice } from '@/services/equipment';

const HwCharge: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;
  const [relatedIds, setRelatedIds] = useState([]);
  const equipmentData = useSubscribe(relatedIds, open);

  useEffect(() => {
    if (open && id) {
      getRelatedDevice(id).then((res) => {
        if (res?.data?.associatedIds) {
          setRelatedIds(res.data.associatedIds);
        }
      });
    }
  }, [id, open]);

  const runItems: DetailItem[] = [
    { label: '今日充电量', field: 'todaycharge', format: powerHourFormat },
    { label: '累计充电量', field: 'cumulativeCharge', format: powerHourFormat },
  ];

  const tabItems = [
    {
      label: '运行监测',
      key: 'item-0',
      children: (
        <>
          <Label title="运行信息" />
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
          equipmentImg={HwChargeStackImg}
          productImg={HwChargeStackIntroImg}
        />
        <Tabs items={tabItems} />
      </Dialog>
    </>
  );
};

export default HwCharge;
