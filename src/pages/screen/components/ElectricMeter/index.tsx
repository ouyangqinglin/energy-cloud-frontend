/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-08 19:31:31
 * @LastEditTime: 2023-05-11 19:31:44
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\ElectricMeter\index.tsx
 */

import React, { useEffect, useState } from 'react';
import { Modal, Tabs, Button } from 'antd';
import { useRequest } from 'umi';
import Label from '@/components/Detail/label';
import Dialog from '@/components/Dialog';
import { getDeviceInfo } from '@/components/Dialog/service';
import type { BusinessDialogProps } from '@/components/Dialog';
import EquipInfo from '@/components/EquipInfo';
import ImgCharge from '@/assets/image/screen/dialog/charge.png';
import Detail from '@/components/Detail';
import Community from './community';
import type { DetailItem } from '@/components/Detail';
import { voltageFormat, currentFormat, powerFormat, powerHourFormat } from '@/utils/format';
import Empty from '@/components/Empty';

const ElectricMeter: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;
  const [openSettingModal, setOpenSettingModal] = useState(false);
  const data: any = {};

  const onSettingClick = () => {
    setOpenSettingModal(!openSettingModal);
  };

  const runItems: DetailItem[] = [
    { label: 'A相电压', field: 'Ua', format: voltageFormat },
    { label: 'AB线电压', field: 'Uab', format: voltageFormat },
    { label: 'A相电流', field: 'Ia', format: currentFormat, span: 2 },
    { label: 'B相电压', field: 'Ub', format: voltageFormat },
    { label: 'BC线电压', field: 'Ubc', format: voltageFormat },
    { label: 'B相电流', field: 'Ib', format: currentFormat, span: 2 },
    { label: 'C相电压', field: 'Uc', format: voltageFormat },
    { label: 'CA线电压', field: 'Uca', format: voltageFormat },
    { label: 'C相电流', field: 'Ic', format: currentFormat, span: 2 },
    { label: 'A相有功功率', field: 'Pa', format: powerFormat },
    { label: 'A相无功功率', field: 'Qa', format: powerFormat },
    { label: 'A相视在功率', field: 'Sa', format: powerFormat },
    { label: 'A相功率因数', field: 'COSa' },
    { label: 'B相有功功率', field: 'Pb', format: powerFormat },
    { label: 'B相无功功率', field: 'Qb', format: powerFormat },
    { label: 'B相视在功率', field: 'Sb', format: powerFormat },
    { label: 'B相功率因数', field: 'COSb' },
    { label: 'C相有功功率', field: 'Pc', format: powerFormat },
    { label: 'C相无功功率', field: 'Qc', format: powerFormat },
    { label: 'C相视在功率', field: 'Sc', format: powerFormat },
    { label: 'C相功率因数', field: 'COSc' },
    { label: '正向有功电能', field: 'Pimp', format: powerHourFormat },
    { label: '反向有功电能', field: 'Qimp', format: powerHourFormat },
    { label: '正向无功电能', field: 'Pexp', format: powerHourFormat },
    { label: '反向无功电能', field: 'Qexp', format: powerHourFormat },
  ];

  const tabItems = [
    {
      label: '运行监测',
      key: 'item-0',
      children: (
        <>
          <Label title="市电负载" />
          <Detail data={data?.run?.electricMeter?.value || {}} items={runItems} column={4} />
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
      children: <Empty />,
    },
    {
      label: '设备日志',
      key: 'item-3',
      children: <Empty />,
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

export default ElectricMeter;
