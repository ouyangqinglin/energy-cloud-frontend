/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 23:36:42
 * @LastEditTime: 2023-07-14 11:37:50
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\components\Stack\index.tsx
 */
import React, { useMemo } from 'react';
import Label from '@/components/DeviceInfo/Label';
import Detail from '@/components/Detail';
import YTProTable from '@/components/YTProTable';
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
  realTimeData?: Record<string, any>;
};

const Stack: React.FC<StackProps> = (props) => {
  const { realTimeData } = props;

  const columns = useMemo(() => {
    return [
      {
        title: '设备名称',
        dataIndex: 'name',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: '运行状态',
        dataIndex: 'name',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: '通信状态',
        dataIndex: 'name',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: '告警状态',
        dataIndex: 'name',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: '设备容量(kWh)',
        dataIndex: 'name',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: '当前SOC',
        dataIndex: 'name',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
    ];
  }, []);

  return (
    <>
      <Label title="控制信息" />
      <Detail items={controlItems} data={realTimeData} />
      <Label title="状态信息" className="mt16" />
      <Detail items={statusItems} data={realTimeData} />
      <Label title="历史信息" className="mt16" />
      <Detail items={historyItems} data={realTimeData} />
      <Label title="温度信息" className="mt16" />
      <Detail items={tempItems} data={realTimeData} />
      <Label title="能力信息" className="mt16" />
      <Detail items={abilityItems} data={realTimeData} />
      <Label title="单体极值信息" className="mt16" />
      <Detail items={maxUnitItems} data={realTimeData} bordered size="small" />
      <Label title="电池簇信息" className="mt16" />
      <YTProTable
        className={styles.table}
        search={false}
        options={false}
        columns={columns}
        toolBarRender={false}
        request={() =>
          Promise.resolve({
            data: [],
            total: 0,
          })
        }
      />
      <Label title="电气一次图" className="mt16" />
      <img className={styles.elctric} src={ElectricLine} />
    </>
  );
};

export default Stack;
