/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-08 19:08:46
 * @LastEditTime: 2023-05-12 14:08:57
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
import AlarmTable from '@/components/AlarmTable';
import LogTable from '@/components/LogTable';
import HwChargeStackImg from '@/assets/image/product/hw-charge-stack.png';
import HwChargeStackIntroImg from '@/assets/image/product/hw-charge-stack-intro.jpg';
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

const HwCharge: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;
  const equipmentData = useSubscribe(id, open);

  const statusItems: DetailItem[] = [
    { label: 'A枪状态', field: 'a', format: useFormat },
    { label: 'B枪状态', field: 'b', format: useFormat },
    { label: 'C枪状态', field: 'c', format: useFormat },
    { label: 'D枪状态', field: 'd', format: useFormat },
    { label: 'E枪状态', field: 'e', format: useFormat },
    { label: 'F枪状态', field: 'f', format: useFormat },
    { label: 'G枪状态', field: 'g', format: useFormat },
    { label: 'H枪状态', field: 'h', format: useFormat },
    { label: 'I枪状态', field: 'i', format: useFormat },
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
