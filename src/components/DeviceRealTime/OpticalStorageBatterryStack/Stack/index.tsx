import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRequest } from 'umi';
import Detail, { DetailItem, GroupItem } from '@/components/Detail';
import YTProTable from '@/components/YTProTable';
import { ProField } from '@ant-design/pro-components';
import { ProColumns } from '@ant-design/pro-components';
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
import { formatMessage, getPlaceholder, isEmpty } from '@/utils';
import { getClusterByStack, DeviceDataType, ClusterType } from '@/services/equipment';
import { deviceAlarmStatus, onlineStatus } from '@/utils/dict';
import { clusterFormat } from '@/utils/format';
import Button from '@/components/CollectionModal/Button';
import useDeviceModel from '../../useDeviceModel';

export type StackProps = {
  id: string;
  productId: string;
  data?: DeviceDataType;
  realTimeData?: Record<string, any>;
};

const Stack: React.FC<StackProps> = (props) => {
  const { data: deviceData, realTimeData, id, productId } = props;

  const { modelMap } = useDeviceModel({ productId });
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
        maxVoltage: `${formatMessage({ id: 'siteMonitor.cellNumber', defaultMessage: '电芯编号' })}：${getPlaceholder(realTimeData?.MaxNOIV)}`,
        minVoltage: `${formatMessage({ id: 'siteMonitor.cellNumber', defaultMessage: '电芯编号' })}：${getPlaceholder(realTimeData?.MNOIV)}`,
        maxTemp: `${formatMessage({ id: 'siteMonitor.temperaturePoint', defaultMessage: '温度点' })}：${getPlaceholder(realTimeData?.MITN)}`,
        minTemp: `${formatMessage({ id: 'siteMonitor.temperaturePoint', defaultMessage: '温度点' })}：${getPlaceholder(realTimeData?.MNOIT)}`,
      },
      {
        maxVoltage: `${formatMessage({ id: 'siteMonitor.voltage', defaultMessage: '电压' })}：${getPlaceholder(realTimeData?.MVVOASU)}`,
        minVoltage: `${formatMessage({ id: 'siteMonitor.voltage', defaultMessage: '电压' })}：${getPlaceholder(realTimeData?.MVVOSU)}`,
        maxTemp: `${formatMessage({ id: 'siteMonitor.temperature', defaultMessage: '温度' })}：${getPlaceholder(realTimeData?.MaximumIndividualTemperature)}`,
        minTemp: `${formatMessage({ id: 'siteMonitor.temperature', defaultMessage: '温度' })}：${getPlaceholder(realTimeData?.LVOMT)}`,
      },
    ];
    return result;
  }, [realTimeData]);

  const columns = useMemo<ProColumns<ClusterType>[]>(() => {
    return [
      {
        title: formatMessage({ id: 'common.deviceName', defaultMessage: '设备名称' }),
        dataIndex: 'deviceName',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'siteMonitor.runningState', defaultMessage: '运行状态' }),
        dataIndex: 'runState',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
        render: (_, { ratedCapacity }) => {
          return clusterFormat(ratedCapacity);
        },
      },
      {
        title: formatMessage({ id: 'siteMonitor.communicationStatus', defaultMessage: '通信状态' }),
        dataIndex: 'connectStatus',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
        render: (_, { connectStatus }) => {
          return <ProField text={connectStatus} mode="read" valueEnum={onlineStatus} />;
        },
      },
      {
        title: formatMessage({ id: 'siteMonitor.alarmStatus', defaultMessage: '告警状态' }),
        dataIndex: 'alarmStatus',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
        render: (_, { alarmStatus }) => {
          return <ProField text={alarmStatus} mode="read" valueEnum={deviceAlarmStatus} />;
        },
      },
      {
        title: formatMessage({ id: 'siteMonitor.equipmentCapacity', defaultMessage: '设备容量' })+'(kWh)',
        dataIndex: 'ratedCapacity',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'siteMonitor.current', defaultMessage: '当前' })+'SOC',
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
      model={modelMap?.[collectionInfo.collection]}
      onClick={onClick}
    />
  );

  const detailGroup = useMemo<GroupItem[]>(() => {
    return [
      {
        label: <Detail.Label title={formatMessage({ id: 'siteMonitor.statusInformation', defaultMessage: '状态信息'})} />,
        items: statusItems,
      },
      {
        label: <Detail.Label title={formatMessage({ id: 'siteMonitor.operationalInformation', defaultMessage: '运行信息'})} />,
        items: statusItems,
      },
      {
        label: <Detail.Label title={formatMessage({ id: 'siteMonitor.historicalInformation', defaultMessage: '历史信息'})} />,
        items: historyItems,
      },
      {
        label: <Detail.Label title={formatMessage({ id: 'siteMonitor.temperatureInformation', defaultMessage: '温度信息'})} />,
        items: tempItems,
      },
      {
        label: <Detail.Label title={formatMessage({ id: 'siteMonitor.capabilityInformation', defaultMessage: '能力信息'})} />,
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
      <Detail.Label title={formatMessage({ id: 'siteMonitor.monomerInformation', defaultMessage: '单体极值信息'})} className="mt16" />
      <YTProTable
        search={false}
        options={false}
        columns={maxUnitColumns}
        toolBarRender={false}
        dataSource={maxUnitData}
        scroll={{ y: 'auto' }}
        pagination={false}
      />
      <Detail.Label title={formatMessage({ id: 'siteMonitor.batteryClusterInformation', defaultMessage: '电池簇信息'})} className="mt32" />
      <YTProTable
        loading={loading}
        search={false}
        options={false}
        columns={columns}
        toolBarRender={false}
        dataSource={clusterData}
        scroll={{ y: 'auto' }}
        pagination={false}
      />
    </>
  );
};

export default Stack;
