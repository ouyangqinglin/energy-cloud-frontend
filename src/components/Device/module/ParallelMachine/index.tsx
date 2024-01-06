/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-01-06 11:15:56
 * @LastEditTime: 2024-01-06 11:44:00
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\module\ParallelMachine\index.tsx
 */

import YTProTable from '@/components/YTProTable';
import { useSubscribe } from '@/hooks';
import Label from '@/components/Detail/LineLabel';
import { DeviceDataType, getEmsAssociationDevice } from '@/services/equipment';
import { formatMessage } from '@/utils';
import { MessageEventType } from '@/utils/connection';
import { onlineStatus, masterSlaveEnum } from '@/utils/dict';
import { ProColumns, ProField } from '@ant-design/pro-components';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useHistory, useRequest } from 'umi';

export type AccessDeviceListType = {
  deviceId?: string;
};

const AccessDeviceList: React.FC<AccessDeviceListType> = (props) => {
  const { deviceId } = props;

  const history = useHistory();

  const {
    data: associationData,
    run,
    loading,
  } = useRequest(getEmsAssociationDevice, {
    manual: true,
  });

  const associationDeviceIds = useMemo(() => {
    return associationData?.map?.((item) => item?.deviceId || '');
  }, [associationData]);

  const associationRealtimeData = useSubscribe(
    associationDeviceIds,
    true,
    MessageEventType.NETWORKSTSTUS,
  );

  const onDeviceClick = useCallback((record) => {
    history.push({
      pathname: '/site-monitor/device-detail',
      search: `?id=${record.deviceId}`,
    });
  }, []);

  useEffect(() => {
    if (deviceId) {
      run({ deviceId });
    }
  }, [deviceId]);

  const columns = useMemo<ProColumns<DeviceDataType>[]>(() => {
    return [
      {
        title: formatMessage({ id: 'device.parallelMachineNum', defaultMessage: '并机编号' }),
        valueType: 'index',
        width: 100,
        ellipsis: true,
      },
      {
        title: formatMessage({ id: 'common.deviceName', defaultMessage: '设备名称' }),
        dataIndex: 'name',
        width: 150,
        ellipsis: true,
        render: (_, record) => {
          return record?.isSelf ? (
            `${record.name}(${formatMessage({ id: 'device.self', defaultMessage: '本机' })})`
          ) : (
            <a onClick={() => onDeviceClick(record)}>{record.name}</a>
          );
        },
      },
      {
        title: formatMessage({
          id: 'device.masterSlaveIdentification',
          defaultMessage: '主从标识',
        }),
        dataIndex: 'b',
        width: 100,
        ellipsis: true,
        valueEnum: masterSlaveEnum,
      },
      {
        title: formatMessage({
          id: 'siteMonitor.deviceCommunicationStatus',
          defaultMessage: '通信状态',
        }),
        dataIndex: 'connectStatus',
        width: 150,
        ellipsis: true,
        render: (_, { deviceId: rowDeviceId, connectStatus }) => {
          return (
            <ProField
              text={associationRealtimeData?.[rowDeviceId ?? '']?.status ?? connectStatus}
              mode="read"
              valueEnum={onlineStatus}
            />
          );
        },
      },
      {
        title: formatMessage({ id: 'common.ipAddress', defaultMessage: 'IP地址' }),
        dataIndex: 'ip',
        width: 150,
        ellipsis: true,
      },
      {
        title: formatMessage({ id: 'common.systemWorkMode', defaultMessage: '系统工作模式' }),
        dataIndex: 'workMode',
        width: 150,
        ellipsis: true,
      },
      {
        title: formatMessage({ id: 'common.systemWorkStatus', defaultMessage: '系统工作状态' }),
        dataIndex: 'workStatus',
        width: 150,
        ellipsis: true,
      },
      {
        title: 'SOC(%)',
        dataIndex: 'soc',
        width: 100,
        ellipsis: true,
      },
    ];
  }, [associationRealtimeData]);

  return (
    <>
      <Label
        title={formatMessage({
          id: 'device.parallelMachineInfomation',
          defaultMessage: '并机信息',
        })}
        className="mt16"
      />
      <YTProTable<DeviceDataType>
        loading={loading}
        search={false}
        options={false}
        columns={columns}
        toolBarRender={false}
        dataSource={associationData}
        scroll={{ y: 'auto' }}
      />
    </>
  );
};

export default AccessDeviceList;
