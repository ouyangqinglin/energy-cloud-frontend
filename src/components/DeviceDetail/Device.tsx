/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-22 10:34:55
 * @LastEditTime: 2024-01-13 09:12:47
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\Device.tsx
 */
import React, { useCallback, useMemo, useContext, memo } from 'react';
import Overview from '../DeviceInfo/Overview';
import { Tabs, TabsProps } from 'antd';
import { formatMessage } from '@/utils';
import DeviceRealTime from '../DeviceRealTime';
import DeviceContext from '../Device/Context/DeviceContext';
import { DeviceProductTypeEnum, OnlineStatusEnum } from '@/utils/dictionary';
import Search from '@/pages/data-manage/search';
import Alarm from '@/components/Alarm';
import Adjust from '../Device/Adjust';
import RunLog from '@/pages/site-monitor/RunLog';
import Configuration from '../Device/Configuration';
import styles from './index.less';
import { ErrorBoundary } from 'react-error-boundary';
import FallBackRender from '../FallBackRender';
import { DeviceDataType } from '@/services/equipment';

type DeviceType = {
  deviceTreeData?: DeviceDataType[];
};

const Device: React.FC<DeviceType> = memo((props) => {
  const { deviceTreeData } = props;

  const { data: deviceData, updateData, loading } = useContext(DeviceContext);
  const onEditSuccess = useCallback(() => {
    updateData?.();
  }, [updateData]);

  const items = useMemo<TabsProps['items']>(() => {
    const debug = [
      {
        label: formatMessage({ id: 'device.debug', defaultMessage: '通信报文' }),
        key: '6',
        children: (
          <ErrorBoundary fallbackRender={FallBackRender}>
            <Adjust deviceId={deviceData?.deviceId || ''} />
          </ErrorBoundary>
        ),
      },
    ];
    const arr = [
      {
        label: formatMessage({ id: 'siteMonitor.deviceDetails', defaultMessage: '设备详情' }),
        key: '1',
        children: (
          <>
            <div
              className={`px24 ${
                deviceData?.networkStatus === OnlineStatusEnum.Offline ? 'device-offline' : ''
              }`}
            >
              <ErrorBoundary fallbackRender={FallBackRender}>
                <DeviceRealTime deviceData={deviceData} />
              </ErrorBoundary>
            </div>
          </>
        ),
      },
      {
        label: formatMessage({ id: 'common.historyData', defaultMessage: '历史数据' }),
        key: '2',
        children: (
          <ErrorBoundary fallbackRender={FallBackRender}>
            <Search isDeviceChild deviceData={deviceData} />
          </ErrorBoundary>
        ),
      },
      {
        label: formatMessage({ id: 'common.warning', defaultMessage: '告警' }),
        key: '3',
        children: (
          <ErrorBoundary fallbackRender={FallBackRender}>
            <Alarm
              isStationChild={true}
              params={{ deviceId: deviceData?.deviceId, deviceName: deviceData?.name }}
            />
          </ErrorBoundary>
        ),
      },
      {
        label: formatMessage({ id: 'common.logs', defaultMessage: '日志' }),
        key: '4',
        children: (
          <ErrorBoundary fallbackRender={FallBackRender}>
            <RunLog deviceId={deviceData?.deviceId || ''} isDeviceChild />
          </ErrorBoundary>
        ),
      },
      {
        label: formatMessage({ id: 'common.configured', defaultMessage: '配置' }),
        key: '5',
        children: (
          <ErrorBoundary fallbackRender={FallBackRender}>
            <Configuration
              productId={deviceData?.productId}
              deviceId={deviceData?.deviceId || ''}
              deviceData={deviceData}
            />
          </ErrorBoundary>
        ),
      },
    ];
    return DeviceProductTypeEnum.Ems == deviceData?.productTypeId ? [...arr, ...debug] : arr;
  }, [deviceData]);

  return (
    <>
      <div className="px24 pt24 mb20">
        <ErrorBoundary fallbackRender={FallBackRender}>
          <Overview
            deviceData={deviceData}
            deviceTreeData={deviceTreeData}
            onChange={onEditSuccess}
            loading={loading}
          />
        </ErrorBoundary>
      </div>
      <Tabs className={styles.tabs} items={items} type="card" />
    </>
  );
});

export default Device;
