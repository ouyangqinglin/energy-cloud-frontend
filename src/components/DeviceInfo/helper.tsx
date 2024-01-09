/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-01-08 10:51:07
 * @LastEditTime: 2024-01-08 16:22:00
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceInfo\helper.tsx
 */

import { formatMessage } from '@/utils';
import { deviceAlarmStatusFormat, onlineStatusFormat } from '@/utils/format';
import { DetailItem } from '../Detail';
import { OnlineStatusEnum } from '@/utils/dictionary';

export const topItems: DetailItem[] = [
  {
    label: formatMessage({ id: 'siteMonitor.communication', defaultMessage: '通信' }),
    field: 'networkStatus',
    format: onlineStatusFormat,
  },
  {
    label: formatMessage({ id: 'common.warning', defaultMessage: '告警' }),
    field: 'alarmStatus',
    format: (value, data) => {
      return (
        <>
          <span className="flex">
            {deviceAlarmStatusFormat(value)}
            <span className="ml8">{data?.alarmCount}</span>
          </span>
        </>
      );
    },
  },
  {
    label: formatMessage({
      id: 'siteMonitor.recentOfflineTime',
      defaultMessage: '最近离线时间',
    }),
    field: 'offlineTime',
    show: (_, data) => data?.networkStatus === OnlineStatusEnum.Offline,
  },
  {
    label: formatMessage({
      id: 'siteMonitor.recentOnlineTime',
      defaultMessage: '最近在线时间',
    }),
    field: 'sessionStartTime',
    show: (_, data) => data?.networkStatus !== OnlineStatusEnum.Offline,
  },
  {
    label: formatMessage({ id: 'siteMonitor.activationTime', defaultMessage: '激活时间' }),
    field: 'activeTime',
  },
  {
    label: formatMessage({ id: 'common.equipmentSerial', defaultMessage: '设备序列号' }),
    field: 'sn',
  },
  {
    label: formatMessage({ id: 'device.equipmentManufacturer', defaultMessage: '设备厂商' }),
    field: 'a',
  },
  { label: formatMessage({ id: 'common.model', defaultMessage: '产品型号' }), field: 'model' },
  {
    label: formatMessage({ id: 'common.productType', defaultMessage: '产品类型' }),
    field: 'productTypeName',
  },
];

export const bottomItems: DetailItem[] = [
  {
    label: formatMessage({ id: 'siteMonitor.entryTime', defaultMessage: '录入时间' }),
    field: 'createTime',
  },
  {
    label: formatMessage({ id: 'siteMonitor.enteredBy', defaultMessage: '录入人' }),
    field: 'updateUserName',
  },
  {
    label: formatMessage({ id: 'siteMonitor.owningSite', defaultMessage: '所属站点' }),
    field: 'siteName',
  },
];

export const allItems: Record<string, DetailItem> = {
  ipAddress: {
    label: formatMessage({ id: 'common.ipAddress', defaultMessage: 'IP地址' }),
    field: 'ipAddress',
  },
};
