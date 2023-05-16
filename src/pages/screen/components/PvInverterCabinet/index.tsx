/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-12 14:22:46
 * @LastEditTime: 2023-05-16 15:25:35
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\PvInverterCabinet\index.tsx
 */

import React from 'react';
import { Tabs } from 'antd';
import Dialog from '@/components/Dialog';
import type { BusinessDialogProps } from '@/components/Dialog';
import EquipInfo from '@/components/EquipInfo';
import Meter from '@/components/Meter';
import Empty from '@/components/Empty';
import Label from '@/components/Detail/label';
import AlarmTable from '@/components/AlarmTable';
import LogTable from '@/components/LogTable';
import { getAlarms, getLogs } from '@/services/equipment';
import PvInverterCabinetImg from '@/assets/image/product/pvInverter-cabinet.png';
import PvInverterCabinetIntroImg from '@/assets/image/product/pvInverter-intro.jpg';
import useSubscribe from '@/pages/screen/useSubscribe';

const PvInverterCabinet: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;
  const equipmentData = useSubscribe(id, open);

  const tabItems = [
    {
      label: '运行监测',
      key: 'item-0',
      children: (
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
          equipmentImg={PvInverterCabinetImg}
          productImg={PvInverterCabinetIntroImg}
        />
        <Tabs items={tabItems} />
      </Dialog>
    </>
  );
};

export default PvInverterCabinet;
