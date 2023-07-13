/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 23:36:42
 * @LastEditTime: 2023-07-14 01:32:24
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\components\Stack\index.tsx
 */
import React from 'react';
import Label from '@/components/DeviceInfo/Label';
import Detail from '@/components/Detail';
import {
  controlItems,
  statusItems,
  historyItems,
  tempItems,
  abilityItems,
  maxUnitItems,
} from './config';
import ElectricLine from '@/assets/image/device/electric-line.png';
import styles from './index.less';

export type StackProps = {
  data?: Record<string, any>;
};

const Stack: React.FC<StackProps> = (props) => {
  const { data } = props;

  return (
    <>
      <Label title="控制信息" />
      <Detail items={controlItems} data={data} />
      <Label title="状态信息" className="mt16" />
      <Detail items={statusItems} data={data} />
      <Label title="历史信息" className="mt16" />
      <Detail items={historyItems} data={data} />
      <Label title="温度信息" className="mt16" />
      <Detail items={tempItems} data={data} />
      <Label title="能力信息" className="mt16" />
      <Detail items={abilityItems} data={data} />
      <Label title="单体极值信息" className="mt16" />
      <Detail items={maxUnitItems} data={data} />
      <Label title="电气一次图" className="mt16" />
      <img className={styles.elctric} src={ElectricLine} />
    </>
  );
};

export default Stack;
