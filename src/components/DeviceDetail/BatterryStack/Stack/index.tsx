/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 23:36:42
 * @LastEditTime: 2023-07-14 20:45:26
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\BatterryStack\Stack\index.tsx
 */
import React, { useCallback, useMemo } from 'react';
import { useRequest } from 'umi';
import Label from '@/components/DeviceInfo/Label';
import Detail from '@/components/Detail';
import YTProTable from '@/components/YTProTable';
import {
  controlItems,
  statusItems,
  historyItems,
  tempItems,
  abilityItems,
  maxUnitColumns,
} from './config';
import ElectricLine from '@/assets/image/device/electric-line.png';
import styles from './index.less';
import { MaxUnitType } from './type';
import { getPlaceholder, isEmpty } from '@/utils';
import { getClusterByStack } from '@/services/equipment';

export type StackProps = {
  realTimeData?: Record<string, any>;
};

const voltageNumFormat = (value: number): string => {
  if (isEmpty(value)) {
    return '--';
  } else {
    const index = Math.floor(value / 24 + 1);
    return `#${index}-#${value % 24}`;
  }
};

const tempNumFormat = (value: number): string => {
  if (isEmpty(value)) {
    return '--';
  } else {
    const index = Math.floor(value / 13 + 1);
    return `#${index}-#${value % 13}`;
  }
};

const Stack: React.FC<StackProps> = (props) => {
  const { realTimeData } = props;

  const requestPage = useCallback((params) => {
    return getClusterByStack(params);
  }, []);

  const maxUnitData = useMemo<MaxUnitType[]>(() => {
    const result: MaxUnitType[] = [
      {
        maxVoltage: `电芯编号：${voltageNumFormat(realTimeData?.MaxNOIV)}`,
        minVoltage: `电芯编号：${voltageNumFormat(realTimeData?.MNOIV)}`,
        maxTemp: `温度点：${tempNumFormat(realTimeData?.MITN)}`,
        minTemp: `温度点：${tempNumFormat(realTimeData?.MNOIT)}`,
      },
      {
        maxVoltage: `电压：${getPlaceholder(realTimeData?.MVVOASU)}`,
        minVoltage: `电压：${getPlaceholder(realTimeData?.MVVOSU)}`,
        maxTemp: `温度：${getPlaceholder(realTimeData?.MaximumIndividualTemperature)}`,
        minTemp: `温度：${getPlaceholder(realTimeData?.LVOMT)}`,
      },
    ];
    return result;
  }, [realTimeData]);

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
      <YTProTable
        search={false}
        options={false}
        columns={maxUnitColumns}
        toolBarRender={false}
        dataSource={maxUnitData}
        scroll={{ y: 200 }}
      />
      <Label title="电池簇信息" className="mt16" />
      <YTProTable
        search={false}
        options={false}
        columns={columns}
        toolBarRender={false}
        request={requestPage}
        scroll={{ y: 200 }}
      />
      <Label title="电气一次图" className="mt16" />
      <img className={styles.elctric} src={ElectricLine} />
    </>
  );
};

export default Stack;
