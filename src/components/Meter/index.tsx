/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-16 14:03:18
 * @LastEditTime: 2023-06-25 17:00:14
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Meter\index.tsx
 */
import React from 'react';
import { Card, Space, Skeleton } from 'antd';
import Detail from '../Detail';
import type { AnyMapType } from '@/utils/dictionary';
import IconCurrent from '@/assets/image/meter/current.png';
import IconVoltage from '@/assets/image/meter/voltage.png';
import IconLineVoltage from '@/assets/image/meter/line-voltage.png';
import IconActivePower from '@/assets/image/meter/active-power.png';
import IconReactivePower from '@/assets/image/meter/reactive-power.png';
import IconApparentPower from '@/assets/image/meter/apparent-power.png';
import IconTodayElectric from '@/assets/image/meter/today-electric.png';
import IconFrequency from '@/assets/image/meter/frequency.png';
import IconPowerFactor from '@/assets/image/meter/power-factor.png';

type MeterProps = {
  data: AnyMapType;
};

const Meter: React.FC<MeterProps> = ({ data = {} }) => {
  const grid = [
    {
      title: '电流(A）',
      icon: IconCurrent,
      item: [
        { label: 'A相', field: 'Ia' },
        { label: 'B相', field: 'Ib' },
        { label: 'C相', field: 'Ic' },
      ],
    },
    {
      title: '电压(V）',
      icon: IconVoltage,
      item: [
        { label: 'A相', field: 'Ua' },
        { label: 'B相', field: 'Ub' },
        { label: 'C相', field: 'Uc' },
      ],
    },
    {
      title: '线电压(V）',
      icon: IconLineVoltage,
      item: [
        { label: 'AB相', field: 'Uab' },
        { label: 'BC相', field: 'Ubc' },
        { label: 'CA相', field: 'Uca' },
      ],
    },
    {
      title: '有功功率(kW）',
      icon: IconActivePower,
      item: [
        { label: 'A相', field: 'Pa' },
        { label: 'B相', field: 'Pb' },
        { label: 'C相', field: 'Pc' },
        { label: '总', field: 'P' },
      ],
    },
    {
      title: '无功功率(kW）',
      icon: IconReactivePower,
      item: [
        { label: 'A相', field: 'Qa' },
        { label: 'B相', field: 'Qb' },
        { label: 'C相', field: 'Qc' },
        { label: '总', field: 'Q' },
      ],
    },
    {
      title: '视在功率(kW）',
      icon: IconApparentPower,
      item: [
        { label: 'A相', field: 'Sa' },
        { label: 'B相', field: 'Sb' },
        { label: 'C相', field: 'Sc' },
        { label: '总', field: 'S' },
      ],
    },
    {
      title: '累计电量(kW·h）',
      icon: IconTodayElectric,
      item: [
        { label: '正向有功电量', field: 'Pimp' },
        { label: '反向有功电量', field: 'Pexp' },
        { label: '正向无功电量', field: 'Qimp' },
        { label: '反向无功电量', field: 'Qexp' },
      ],
    },
    {
      title: '频率(HZ)',
      icon: IconFrequency,
      item: [{ label: '频率', field: 'Freq' }],
    },
    {
      title: '功率因数',
      icon: IconPowerFactor,
      item: [
        { label: 'A相', field: 'COSa' },
        { label: 'B相', field: 'COSb' },
        { label: 'C相', field: 'COSc' },
        { label: '总', field: 'COS' },
      ],
    },
  ];

  const gridItem = grid.map((item) => {
    return (
      <Card.Grid hoverable={false} key={item.title} style={{ width: '20%' }}>
        <div className="flex card-grid-title mb12">
          {item.icon ? <img src={item.icon} className="mr12" /> : ''}
          {item.title}
        </div>
        <Detail
          data={data || {}}
          items={item.item}
          column={1}
          contentStyle={{ flex: 1, display: 'inline-block', textAlign: 'right' }}
        />
      </Card.Grid>
    );
  });

  return (
    <>
      <Card>{gridItem}</Card>
    </>
  );
};

const MeterSkeleton: React.FC = () => {
  const grid = Array.from({ length: 9 }).map((_, index) => (
    <Card.Grid hoverable={false} style={{ width: '20%' }} key={index}>
      <Skeleton.Button className="mb8" size="small" active />
      <div>
        <Space direction="vertical">
          <Skeleton.Input size="small" active />
          <Skeleton.Input size="small" active />
          <Skeleton.Input size="small" active />
        </Space>
      </div>
    </Card.Grid>
  ));

  return (
    <>
      <Card>{grid}</Card>
    </>
  );
};

export { MeterSkeleton };

export default Meter;
