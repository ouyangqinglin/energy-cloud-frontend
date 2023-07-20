/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 23:36:42
 * @LastEditTime: 2023-07-18 15:40:15
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\BatterryStack\Stack\index.tsx
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRequest } from 'umi';
import Detail, { DetailItem, GroupItem } from '@/components/Detail';
import YTProTable from '@/components/YTProTable';
import { ProField } from '@ant-design/pro-components';
import { ProColumns } from '@ant-design/pro-table';
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
import { getClusterByStack, DeviceDataType, ClusterType } from '@/services/equipment';
import { deviceAlarmStatus, onlineStatus } from '@/utils/dictionary';
import { clusterFormat } from '@/utils/format';
import Button from '@/components/CollectionModal/Button';

export type StackProps = {
  id: string;
  data?: DeviceDataType;
  realTimeData?: Record<string, any>;
};

const Stack: React.FC<StackProps> = (props) => {
  const { data: deviceData, realTimeData, id } = props;

  const [collectionInfo, setCollectionInfo] = useState({
    title: '',
    collection: '',
  });
  const {
    data: clusterData,
    loading,
    run,
  } = useRequest(getClusterByStack, {
    manual: true,
  });

  const onClick = useCallback((item: DetailItem) => {
    setCollectionInfo({
      title: item.label as any,
      collection: item.field,
    });
  }, []);

  useEffect(() => {
    if (deviceData?.deviceId) {
      run({ deviceId: deviceData?.deviceId });
    }
  }, [deviceData]);

  const maxUnitData = useMemo<MaxUnitType[]>(() => {
    const result: MaxUnitType[] = [
      {
        maxVoltage: `电芯编号：${getPlaceholder(realTimeData?.MaxNOIV)}`,
        minVoltage: `电芯编号：${getPlaceholder(realTimeData?.MNOIV)}`,
        maxTemp: `温度点：${getPlaceholder(realTimeData?.MITN)}`,
        minTemp: `温度点：${getPlaceholder(realTimeData?.MNOIT)}`,
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

  const columns = useMemo<ProColumns<ClusterType>[]>(() => {
    return [
      {
        title: '设备名称',
        dataIndex: 'deviceName',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: '运行状态',
        dataIndex: 'runState',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
        render: (_, { ratedCapacity }) => {
          return clusterFormat(ratedCapacity);
        },
      },
      {
        title: '通信状态',
        dataIndex: 'connectStatus',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
        render: (_, { connectStatus }) => {
          return <ProField text={connectStatus} mode="read" valueEnum={onlineStatus} />;
        },
      },
      {
        title: '告警状态',
        dataIndex: 'alarmStatus',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
        render: (_, { alarmStatus }) => {
          return <ProField text={alarmStatus} mode="read" valueEnum={deviceAlarmStatus} />;
        },
      },
      {
        title: '设备容量(kWh)',
        dataIndex: 'ratedCapacity',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: '当前SOC',
        dataIndex: 'soc',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
    ];
  }, []);

  const extral = (
    <Button
      title={collectionInfo.title}
      deviceId={id}
      collection={collectionInfo.collection}
      onClick={onClick}
    />
  );

  const detailGroup = useMemo<GroupItem[]>(() => {
    return [
      {
        label: <Detail.Label title="控制信息" />,
        items: controlItems,
      },
      {
        label: <Detail.Label title="状态信息" />,
        items: statusItems,
      },
      {
        label: <Detail.Label title="历史信息" />,
        items: historyItems,
      },
      {
        label: <Detail.Label title="温度信息" />,
        items: tempItems,
      },
      {
        label: <Detail.Label title="能力信息" />,
        items: abilityItems,
      },
    ];
  }, []);

  return (
    <>
      <Detail.Group
        data={realTimeData}
        items={detailGroup}
        detailProps={{
          extral,
          colon: false,
          labelStyle: { width: 140 },
          valueStyle: { width: '40%' },
        }}
      />
      <Detail.Label title="单体极值信息" className="mt16" />
      <YTProTable
        search={false}
        options={false}
        columns={maxUnitColumns}
        toolBarRender={false}
        dataSource={maxUnitData}
        scroll={{ y: 200 }}
        pagination={false}
      />
      <Detail.Label title="电池簇信息" className="mt32" />
      <YTProTable
        loading={loading}
        search={false}
        options={false}
        columns={columns}
        toolBarRender={false}
        dataSource={clusterData}
        scroll={{ y: 200 }}
        pagination={false}
      />
      <Detail.Label title="电气一次图" className="mt32" />
      <div className={styles.elctric}>
        <img src={ElectricLine} />
      </div>
    </>
  );
};

export default Stack;
