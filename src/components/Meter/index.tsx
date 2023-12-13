/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-16 14:03:18
 * @LastEditTime: 2023-08-03 11:14:02
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Meter\index.tsx
 */
import React, { useMemo } from 'react';
import { Card, Space, Skeleton } from 'antd';
import Detail, { DetailProps } from '../Detail';
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
import styles from './index.less';
import { formatMessage } from '@/utils';

type MeterProps = {
  data: AnyMapType;
  detailProps?: Omit<DetailProps, 'items' | 'data'>;
};

const Meter: React.FC<MeterProps> = (props) => {
  const { data, detailProps } = props;

  const grid = useMemo(() => {
    return [
    {
      title: formatMessage({ id: 'siteMonitor.current', defaultMessage: '电流'}) + '(A）',
      icon: IconCurrent,
      item: [
        { label: 'A' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'}), field: 'Ia' },
        { label: 'B' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'}), field: 'Ib' },
        { label: 'C' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'}), field: 'Ic' },
      ],
    },
    {
      title: formatMessage({ id: 'siteMonitor.voltage', defaultMessage: '电压'}) +'(V）',
      icon: IconVoltage,
      item: [
        { label: 'A' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'}), field: 'Ua' },
        { label: 'B' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'}), field: 'Ub' },
        { label: 'C' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'}), field: 'Uc' },
      ],
    },
    {
      title: formatMessage({ id: 'siteMonitor.lineVoltage', defaultMessage: '线电压'}) + '(V）',
      icon: IconLineVoltage,
      item: [
        { label: 'AB' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'}), field: 'Uab' },
        { label: 'BC' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'}), field: 'Ubc' },
        { label: 'CA' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'}), field: 'Uca' },
      ],
    },
    {
      title: formatMessage({ id: 'siteMonitor.activePower', defaultMessage: '有功功率'}) + '(kW）',
      icon: IconActivePower,
      item: [
        { label: 'A' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'}), field: 'Pa' },
        { label: 'B' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'}), field: 'Pb' },
        { label: 'C' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'}), field: 'Pc' },
        { label: formatMessage({ id: 'siteMonitor.total', defaultMessage: '总'}), field: 'P' },
      ],
    },
    {
      title: formatMessage({ id: 'siteMonitor.reactivePower', defaultMessage: '无功功率'}) + '(kW）',
      icon: IconReactivePower,
      item: [
        { label: 'A' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'}), field: 'Qa' },
        { label: 'B' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'}), field: 'Qb' },
        { label: 'C' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'}), field: 'Qc' },
        { label: formatMessage({ id: 'siteMonitor.total', defaultMessage: '总'}), field: 'Q' },
      ],
    },
    {
      title: formatMessage({ id: 'siteMonitor.apparentPower', defaultMessage: '视在功率'}) + '(kW）',
      icon: IconApparentPower,
      item: [
        { label: 'A' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'}), field: 'Sa' },
        { label: 'B' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'}), field: 'Sb' },
        { label: 'C' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'}), field: 'Sc' },
        { label: formatMessage({ id: 'siteMonitor.total', defaultMessage: '总'}), field: 'S' },
      ],
    },
    {
      title: formatMessage({ id: 'siteMonitor.accumulatedElectricity', defaultMessage: '累计电量'}) + '(kW·h）',
      icon: IconTodayElectric,
      item: [
        { label: formatMessage({ id: 'siteMonitor.positiveActivePower', defaultMessage: '正向有功电量'}), field: 'Pimp' },
        { label: formatMessage({ id: 'siteMonitor.reverseActivePower', defaultMessage: '反向有功电量'}), field: 'Pexp' },
        { label: formatMessage({ id: 'siteMonitor.positiveReactivePower', defaultMessage: '正向无功电量'}), field: 'Qimp' },
        { label: formatMessage({ id: 'siteMonitor.reverseReactivePower', defaultMessage: '反向无功电量'}), field: 'Qexp' },
      ],
    },
    {
      title: formatMessage({ id: 'siteMonitor.frequency', defaultMessage: '频率'}) + '(HZ)',
      icon: IconFrequency,
      item: [{ label: formatMessage({ id: 'siteMonitor.frequency', defaultMessage: '频率'}), field: 'Freq' }],
    },
    {
      title: formatMessage({ id: 'siteMonitor.powerFactor', defaultMessage: '功率因数'}),
      icon: IconPowerFactor,
      item: [
        { label: 'A' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'}), field: 'COSa' },
        { label: 'B' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'}), field: 'COSb' },
        { label: 'C' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'}), field: 'COSc' },
        { label: formatMessage({ id: 'siteMonitor.total', defaultMessage: '总'}), field: 'COS' },
      ],
    },
  ]
  }, []);

  const gridItem = useMemo(() => {
    return grid.map((item) => {
      return (
        <Card.Grid hoverable={false} key={item.title} style={{ width: '20%' }}>
          <div className="flex card-grid-title mb12">
            {item.icon ? <img src={item.icon} className={`mr12 ${styles.img}`} /> : ''}
            {item.title}
          </div>
          <Detail
            data={data || {}}
            items={item.item}
            column={1}
            contentStyle={{ flex: 1, display: 'inline-block', textAlign: 'right' }}
            {...(detailProps || {})}
          />
        </Card.Grid>
      );
    });
  }, [grid, data, detailProps]);

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
