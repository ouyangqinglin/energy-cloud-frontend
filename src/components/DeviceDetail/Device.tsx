/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-22 10:34:55
 * @LastEditTime: 2023-12-22 10:34:55
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\DeviceDetail.tsx
 */
import React, { useCallback, useMemo, useContext } from 'react';
import Overview from '../DeviceInfo/Overview';
import { Tabs, TabsProps } from 'antd';
import { formatMessage } from '@/utils';
import DeviceRealTime from '../DeviceRealTime';
import DeviceContext from '../Device/DeviceContext';
import { OnlineStatusEnum } from '@/utils/dictionary';
import Search from '@/pages/data-manage/search';
import Alarm from '@/components/Alarm';
import RunLog from '@/pages/site-monitor/RunLog';
import Configuration from '../Device/Configuration';
import styles from './index.less';

const Device: React.FC = () => {
  const { data: deviceData, updateData, loading } = useContext(DeviceContext);

  const onEditSuccess = useCallback(() => {
    updateData?.();
  }, [updateData]);

  const items = useMemo<TabsProps['items']>(() => {
    return [
      {
        label: formatMessage({ id: 'siteMonitor.deviceDetails', defaultMessage: '设备详情' }),
        key: '1',
        children: (
          <>
            <div
              className={`px24 ${
                deviceData?.status === OnlineStatusEnum.Offline ? 'device-offline' : ''
              }`}
            >
              <DeviceRealTime deviceData={deviceData} />
            </div>
          </>
        ),
      },
      {
        label: formatMessage({ id: 'common.historyData', defaultMessage: '历史数据' }),
        key: '2',
        children: <Search isDeviceChild deviceData={deviceData} />,
      },
      {
        label: formatMessage({ id: 'common.warning', defaultMessage: '告警' }),
        key: '3',
        children: (
          <Alarm
            isStationChild={true}
            params={{ deviceId: deviceData?.deviceId, deviceName: deviceData?.name }}
          />
        ),
      },
      {
        label: formatMessage({ id: 'common.logs', defaultMessage: '日志' }),
        key: '4',
        children: <RunLog deviceId={deviceData?.deviceId || ''} isDeviceChild />,
      },
      {
        label: formatMessage({ id: 'common.configured', defaultMessage: '配置' }),
        key: '5',
        children: (
          <Configuration
            productId={deviceData?.productId}
            deviceId={deviceData?.deviceId || ''}
            deviceData={deviceData}
          />
        ),
      },
    ];
  }, [deviceData]);

  return (
    <>
      <div className="px24 pt24">
        <Overview deviceData={deviceData} onChange={onEditSuccess} loading={loading} />
      </div>
      <Tabs className={styles.tabs} items={items} />
    </>
  );
};

export default Device;
