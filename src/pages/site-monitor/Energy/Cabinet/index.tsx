/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-12 13:53:34
 * @LastEditTime: 2023-07-13 09:33:42
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Energy\Cabinet\index.tsx
 */
import React, { useState, useMemo } from 'react';
import { useRequest } from 'umi';
import { Skeleton } from 'antd';
import { getEnergy } from '../service';
import styles from '../index.less';
import EnergyImg from '@/assets/image/station/energy/enery.png';
import AirImg from '@/assets/image/station/energy/air.png';
import DoorImg from '@/assets/image/station/energy/door.png';
import EmsImg from '@/assets/image/station/energy/ems.png';
import StackImg from '@/assets/image/station/energy/stack.png';
import PcsImg from '@/assets/image/station/energy/pcs.png';

const unitItems = [
  {
    label: '空调',
    position: [51, 14],
    icon: AirImg,
    data: [
      { label: '运行状态：', field: 0 },
      { label: '回风温度：', field: 0 },
      { label: '回风湿度：', field: 0 },
    ],
  },
  {
    label: '储能仓门',
    position: [203, 14],
    icon: DoorImg,
    data: [{ label: '状态', field: 0 }],
  },
  {
    label: 'EMS',
    position: [271, 14],
    icon: EmsImg,
    data: [
      { label: '运行状态：', field: 0 },
      { label: '系统模式：', field: 0 },
    ],
  },
  {
    label: '电池堆',
    position: [450, 14],
    icon: StackImg,
    data: [
      { label: 'SoC：', field: 0 },
      { label: '单体最高温度：', field: 0 },
      { label: '单体最低温度：', field: 0 },
    ],
  },
  {
    label: 'PCS',
    position: [478, 802],
    icon: PcsImg,
    data: [
      { label: '工作状态：', field: 0 },
      { label: '工作模式：', field: '' },
      { label: '储能功率：', field: 0 },
    ],
  },
];

const Cabinet: React.FC = () => {
  const {
    loading,
    data: energyData,
    run,
  } = useRequest(getEnergy, {
    manual: true,
  });

  const items = useMemo(() => {
    return unitItems.map((item, index) => {
      return (
        <>
          <div
            key={item.label}
            className={styles.unit}
            style={{
              backgroundImage: `url(${item.icon})`,
              top: item.position[0],
              left: item.position[1],
            }}
          >
            {index !== 1 && <label className={styles.unitTitle}>{item.label}</label>}
            {item.data.map((field, fieldIndex) => {
              return (
                <>
                  <div key={fieldIndex} className={index !== 1 ? styles.field : styles.unitTitle}>
                    {field.label}
                    <span className={styles.unitNum}>{energyData?.[field.field] || 0}</span>
                  </div>
                </>
              );
            })}
            <span className={`cursor ${styles.field}`}>了解更多{'>'}</span>
          </div>
        </>
      );
    });
  }, [energyData]);

  const packItems = useMemo(() => {
    return Array.from({ length: 10 }).map((_, index) => {
      return (
        <>
          <div key={index} className={styles.parck}>
            <div className={styles.parckTitle}>PACK-{index + 1}</div>
            <span className="mr8">{energyData?.['packUp' + index] || 0}</span>
            <span>{energyData?.['packDown' + index] || 0}</span>
          </div>
        </>
      );
    });
  }, [energyData]);

  return (
    <>
      {loading ? (
        <>
          <Skeleton.Button size="small" active />
          <Skeleton.Image className="w-full" active />
        </>
      ) : (
        <>
          <label className={styles.label}>1#Ener Hexon Smart215</label>
          <div className={styles.energy} style={{ backgroundImage: `url(${EnergyImg})` }}>
            {items}
            <div className={styles.parckContain}>{packItems}</div>
          </div>
        </>
      )}
    </>
  );
};

export default Cabinet;
