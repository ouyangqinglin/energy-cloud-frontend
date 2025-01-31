/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-09 15:23:35
 * @LastEditTime: 2023-08-03 11:25:16
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\Scene\EnergyData\index.tsx
 */
import React, { useEffect, useMemo } from 'react';
import { Image, Space } from 'antd';
import { useRequest } from 'umi';
import type { TimeType } from '../../components/TimeButtonGroup';
import { getData } from './service';
import { getSiteId } from '../helper';
import { formatMessage, getPlaceholder } from '@/utils';
import type { UnitType } from '@/models/siteType';
import pvInvinter from '@/assets/image/screen/energy-data/pvInvinter.gif';
import transmission from '@/assets/image/screen/energy-data/transmission.gif';
import energyDischarge from '@/assets/image/screen/energy-data/energy-discharge.gif';
import charge from '@/assets/image/screen/energy-data/charge.gif';
import energyCharge from '@/assets/image/screen/energy-data/energy-charge.gif';
import load from '@/assets/image/screen/energy-data/load.gif';
import arrowRight from '@/assets/image/screen/energy-data/arrow-right.gif';
import floor from '@/assets/image/screen/energy-data/floor.gif';
import diesel from '@/assets/image/screen/energy-data/diesel-charge.gif';
import fan from '@/assets/image/screen/energy-data/fan-charge.gif';

import styles from './index.less';

type EnergyDataProps = {
  timeType: TimeType;
  siteTypeConfig: UnitType;
};

const EnergyData: React.FC<EnergyDataProps> = (props) => {
  const { timeType, siteTypeConfig } = props;
  const siteId = getSiteId();

  const { data: energyData, run } = useRequest(getData, {
    manual: true,
    pollingInterval: 5 * 60 * 1000,
  });

  useEffect(() => {
    run({ siteId, type: timeType });
  }, [timeType, siteId]);

  const items = useMemo(
    () => ({
      left: [
        {
          label: formatMessage({ id: 'device.electricSupply', defaultMessage: '市电' }) + '(kWh)',
          icon: transmission,
          field: 'electricSupply',
        },
        ...(siteTypeConfig.hasFan
          ? [
              {
                label: formatMessage({ id: 'screen.1007', defaultMessage: '风机发电' }) + '(kWh)',
                icon: fan,
                field: '',
              },
            ]
          : []),
        ...(siteTypeConfig.hasEnergy
          ? [
              {
                label:
                  formatMessage({ id: 'dataManage.storageCharging', defaultMessage: '储能充电' }) +
                  '(kWh)',
                icon: energyCharge,
                field: 'essCharge',
              },
            ]
          : []),
        ...(siteTypeConfig.hasCharge
          ? [
              {
                label:
                  formatMessage({ id: 'device.chargingPile', defaultMessage: '充电桩' }) + '(kWh)',
                icon: charge,
                field: 'chargingPile',
              },
            ]
          : []),
      ],
      right: [
        ...(siteTypeConfig.hasPv
          ? [
              {
                label:
                  formatMessage({ id: 'screen.pvPowerGeneration', defaultMessage: '光伏发电' }) +
                  '(kWh)',
                icon: pvInvinter,
                field: 'photovoltaic',
              },
            ]
          : []),
        ...(siteTypeConfig.hasDiesel
          ? [
              {
                label: formatMessage({ id: 'screen.1008', defaultMessage: '柴发发电' }) + '(kWh)',
                icon: diesel,
                field: '',
              },
            ]
          : []),
        ...(siteTypeConfig.hasEnergy
          ? [
              {
                label:
                  formatMessage({ id: 'dataManage.storageDischarge', defaultMessage: '储能放电' }) +
                  '(kWh)',
                icon: energyDischarge,
                field: 'essDischarge',
              },
            ]
          : []),
        {
          label: formatMessage({ id: 'device.otherLoad', defaultMessage: '其他负载' }) + '(kWh)',
          icon: load,
          field: 'load',
        },
      ],
    }),
    [siteTypeConfig],
  );

  const leftItems = items.left.map((item) => {
    return (
      <div className="flex" key={item.field}>
        <Image className={styles.icon} src={item.icon} preview={false} />
        <div className={styles.label}>
          <span title={item.label}>{item.label}</span>
          <div>
            <span className={styles.field}>
              {getPlaceholder(Number(energyData?.[item.field] || 0).toFixed(2))}
            </span>
          </div>
        </div>
      </div>
    );
  });

  const rightItems = items.right.map((item) => {
    return (
      <div className="flex" key={item.field}>
        <Image className={styles.icon} src={item.icon} preview={false} />
        <div className={styles.label}>
          <span title={item.label}>{item.label}</span>
          <div>
            <span className={styles.field}>
              {getPlaceholder(Number(energyData?.[item.field] || 0).toFixed(2))}
            </span>
          </div>
        </div>
      </div>
    );
  });

  const arrows = (
    <>
      <Space className={styles.arrowContain} direction="vertical" size={46}>
        {items.left.map((item) => {
          return (
            <Image
              className={`${styles.arrow}`}
              src={arrowRight}
              preview={false}
              key={item.field}
            />
          );
        })}
      </Space>
    </>
  );

  return (
    <div
      className={`flex ${styles.energyContain}`}
      style={{ height: items.left.length > 3 ? '254px' : '184px' }}
    >
      <Space direction="vertical" size={26}>
        {leftItems}
      </Space>
      {arrows}
      <Image className={`${styles.floor} mx8`} src={floor} preview={false} />
      {arrows}
      <Space direction="vertical" size={26}>
        {rightItems}
      </Space>
    </div>
  );
};

export default EnergyData;
