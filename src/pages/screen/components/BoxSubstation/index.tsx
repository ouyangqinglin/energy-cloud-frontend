/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-12 14:22:46
 * @LastEditTime: 2023-05-12 14:46:05
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\BoxSubstation\index.tsx
 */

import React, { useEffect, useState } from 'react';
import { Modal, Tabs } from 'antd';
import ScreenDialog from '@/components/ScreenDialog';
import type { BusinessDialogProps } from '@/components/ScreenDialog';
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

const BoxSubstation: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;
  const [data, setData] = useState({});

  const Component = model === 'screen' ? ScreenDialog : Modal;

  const runItems: DetailItem[] = [
    { label: 'A相电压', field: 'o', format: voltageFormat },
    { label: 'AB线电压', field: 'p', format: voltageFormat },
    { label: 'A相电流', field: 'q', format: currentFormat, span: 2 },
    { label: 'B相电压', field: 'r', format: voltageFormat },
    { label: 'BC线电压', field: 's', format: voltageFormat },
    { label: 'B相电流', field: 't', format: currentFormat, span: 2 },
    { label: 'C相电压', field: 'u', format: voltageFormat },
    { label: 'CA线电压', field: 'v', format: voltageFormat },
    { label: 'C相电流', field: 'w', format: currentFormat, span: 2 },

    { label: 'A相有功功率', field: 'a', format: powerFormat },
    { label: 'A相无功功率', field: 'b', format: powerHourFormat },
    { label: 'A相视在功率', field: 'c', format: powerHourFormat },
    { label: 'A相功率因数', field: 'd' },
    { label: 'B相有功功率', field: 'e', format: powerFormat },
    { label: 'B相无功功率', field: 'f', format: powerHourFormat },
    { label: 'B相视在功率', field: 'g', format: powerHourFormat },
    { label: 'B相功率因数', field: 'h' },
    { label: 'C相有功功率', field: 'i', format: powerFormat },
    { label: 'C相无功功率', field: 'j', format: powerHourFormat },
    { label: 'C相视在功率', field: 'k', format: powerHourFormat },
    { label: 'C相功率因数', field: 'l' },
    { label: '总有功功率', field: 'm', format: powerFormat },
    { label: '总无功功率', field: 'n', format: powerHourFormat },
    { label: '总视在功率', field: 'aa', format: powerHourFormat },
    { label: '总功率因数', field: 'ab' },

    { label: '正向有功电能', field: 'ac', format: powerHourFormat },
    { label: '反向有功电能', field: 'ad', format: powerHourFormat },
    { label: '正向无功电能', field: 'ae', format: noPowerHourFormat },
    { label: '反向无功电能', field: 'af', format: noPowerHourFormat },
  ];

  const tabItems = [
    {
      label: '运行监测',
      key: 'item-0',
      children: (
        <>
          <Detail data={data || {}} items={runItems} column={4} />
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
      <Component
        title="设备详情"
        open={open}
        onCancel={onCancel}
        width={model === 'screen' ? '62.5vw' : '1200px'}
        wrapClassName={model === 'screen' ? '' : 'dialog-equipment'}
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
      </Component>
    </>
  );
};

export default BoxSubstation;
