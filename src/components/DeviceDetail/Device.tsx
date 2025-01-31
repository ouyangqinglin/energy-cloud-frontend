/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-22 10:34:55
 * @LastEditTime: 2024-08-19 17:58:23
 * @LastEditors: YangJianFei
 * @FilePath: /energy-cloud-frontend/src/components/DeviceDetail/Device.tsx
 */
import React, { useCallback, useMemo, useContext, memo } from 'react';
import Overview from '../DeviceInfo/Overview';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { formatMessage } from '@/utils';
import DeviceRealTime from '../DeviceRealTime';
import DeviceContext from '../Device/Context/DeviceContext';
import { DeviceProductTypeEnum, DeviceTypeEnum, OnlineStatusEnum } from '@/utils/dictionary';
import Search from '@/pages/data-manage/search/Tabs';
import Alarm from '@/components/Alarm';
import RunLog from '@/pages/site-monitor/RunLog';
import Configuration from '../Device/Configuration';
import styles from './index.less';
import { ErrorBoundary } from 'react-error-boundary';
import FallBackRender from '../FallBackRender';
import type { DeviceDataType } from '@/services/equipment';
import { useAuthority } from '@/hooks';
import Debug from '../Device/components/Debug';

type DeviceType = {
  deviceTreeData?: DeviceDataType[];
};

const Device: React.FC<DeviceType> = memo((props) => {
  const { deviceTreeData } = props;

  const { data: deviceData, updateData, loading } = useContext(DeviceContext);
  const onEditSuccess = useCallback(() => {
    updateData?.();
  }, [updateData]);

  const { authorityMap } = useAuthority([
    'device:detail:communicationMessage',
    'deviceManage:detail:debug',
    'device:detail:alarm',
  ]);

  const items = useMemo<TabsProps['items']>(() => {
    const result: TabsProps['items'] = [
      {
        label: formatMessage({ id: 'siteMonitor.deviceDetails', defaultMessage: '设备详情' }),
        key: '1',
        children: (
          <>
            <div
              className={`px24 ${styles.detail} ${
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
            <div style={{ height: '800px' }}>
              <Search
                isDeviceChild
                deviceData={{ deviceId: deviceData?.deviceId, deviceName: deviceData?.name }}
              />
            </div>
          </ErrorBoundary>
        ),
      },
    ];
    if (authorityMap.get('device:detail:alarm')) {
      result.push({
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
      });
    }
    result.push(
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
    );
    if (
      deviceData?.productTypeId &&
      deviceData?.productId &&
      [
        DeviceProductTypeEnum.Ems,
        DeviceProductTypeEnum.ChargeMaster,
        DeviceProductTypeEnum.ChargeTerminal,
        DeviceProductTypeEnum.LocalEms,
      ].includes(deviceData?.productTypeId) &&
      ![DeviceTypeEnum.ChargeMaster].includes(deviceData?.productId) &&
      authorityMap.get('deviceManage:detail:debug')
    ) {
      result.push({
        label: formatMessage({ id: 'device.debug', defaultMessage: '调试' }),
        key: '7',
        children: (
          <ErrorBoundary fallbackRender={FallBackRender}>
            <Debug deviceData={deviceData} />
          </ErrorBoundary>
        ),
      });
    }
    return result;
  }, [deviceData, authorityMap]);

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
