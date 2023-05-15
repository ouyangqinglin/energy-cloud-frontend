/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-12 14:22:46
 * @LastEditTime: 2023-05-15 17:26:31
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\BoxSubstation\index.tsx
 */

import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import Dialog from '@/components/Dialog';
import type { BusinessDialogProps } from '@/components/Dialog';
import EquipInfo from '@/components/EquipInfo';
import Detail from '@/components/Detail';
import Empty from '@/components/Empty';
import AlarmTable from '@/components/AlarmTable';
import LogTable from '@/components/LogTable';
import BoxSubstationImg from '@/assets/image/product/box-substation.png';
import BoxSubstationIntroImg from '@/assets/image/product/transfer-intro.jpg';
import type { DetailItem } from '@/components/Detail';
import {
  powerFormat,
  powerHourFormat,
  voltageFormat,
  currentFormat,
  noPowerHourFormat,
} from '@/utils/format';
import useSubscribe from '@/pages/screen/useSubscribe';

const BoxSubstation: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;
  const equipmentData = useSubscribe(id, open);

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
    { label: 'A相无功功率', field: 'Qa', format: powerHourFormat },
    { label: 'A相视在功率', field: 'Sa', format: powerHourFormat },
    { label: 'A相功率因数', field: 'COSa' },
    { label: 'B相有功功率', field: 'Pb', format: powerFormat },
    { label: 'B相无功功率', field: 'Qb', format: powerHourFormat },
    { label: 'B相视在功率', field: 'Sb', format: powerHourFormat },
    { label: 'B相功率因数', field: 'COSb' },
    { label: 'C相有功功率', field: 'Pc', format: powerFormat },
    { label: 'C相无功功率', field: 'Qc', format: powerHourFormat },
    { label: 'C相视在功率', field: 'Sc', format: powerHourFormat },
    { label: 'C相功率因数', field: 'COSc' },
    { label: '总有功功率', field: 'P', format: powerFormat },
    { label: '总无功功率', field: 'Q', format: powerHourFormat },
    { label: '总视在功率', field: 'S', format: powerHourFormat },
    { label: '总功率因数', field: 'COS' },

    { label: '正向有功电能', field: 'Pimp', format: powerHourFormat },
    { label: '反向有功电能', field: 'Qimp', format: powerHourFormat },
    { label: '正向无功电能', field: 'Pexp', format: noPowerHourFormat },
    { label: '反向无功电能', field: 'Qexp', format: noPowerHourFormat },
  ];

  const tabItems = [
    {
      label: '运行监测',
      key: 'item-0',
      children: (
        <>
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
          equipmentImg={BoxSubstationImg}
          productImg={BoxSubstationIntroImg}
        />
        <Tabs items={tabItems} />
      </Dialog>
    </>
  );
};

export default BoxSubstation;
