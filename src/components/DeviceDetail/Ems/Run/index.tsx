/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 23:36:42
 * @LastEditTime: 2023-07-14 15:14:48
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\Ems\Run\index.tsx
 */
import React, { useMemo, useState } from 'react';
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
import LineChart from '@/components/Chart/LineChart';
import { chartTypeEnum } from '@/components/Chart';
import moment from 'moment';
import styles from './index.less';

const legendMap = new Map([
  ['energy', '储能'],
  ['soc', 'SOC'],
]);

export type StackProps = {
  realTimeData?: Record<string, any>;
};

const Stack: React.FC<StackProps> = (props) => {
  const { realTimeData } = props;

  const [chartData, setChartData] = useState({
    energy: [],
    soc: [],
  });

  const columns = useMemo(() => {
    return [
      {
        title: '设备状态',
        dataIndex: 'name',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: '产品类型',
        dataIndex: 'name',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: '产品型号',
        dataIndex: 'name',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: '软件版本号',
        dataIndex: 'name',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: 'SN号',
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
      <Label title="运行状态" className="mt16" />
      <LineChart
        type={chartTypeEnum.Day}
        date={moment()}
        valueTitle="电压(V) 温度(℃)"
        legendMap={legendMap}
        labelKey="eventTs"
        valueKey="doubleVal"
        data={chartData}
      />
      <Label title="接入设备列表" className="mt16" />
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
    </>
  );
};

export default Stack;
