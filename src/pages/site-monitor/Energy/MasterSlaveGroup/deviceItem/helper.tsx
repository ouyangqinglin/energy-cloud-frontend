/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-12 10:36:31
 * @LastEditTime: 2024-03-11 16:13:50
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Energy\MasterSlaveGroup\deviceItem\helper.tsx
 */

import { DetailItem } from '@/components/Detail';
import { formatMessage } from '@/utils';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

export const maxConfig: DetailItem[] = [
  {
    label: formatMessage({ id: 'siteMonitor.voltage', defaultMessage: '电压' }) + ' ',
    field: 'TotalBatteryVoltage',
    unit: '(V)',
  },
  {
    label: formatMessage({ id: 'siteMonitor.current', defaultMessage: '电流' }) + ' ',
    field: 'TotalBatteryCurrent',
    unit: '(A)',
  },
  {
    label: formatMessage({ id: 'siteMonitor.power', defaultMessage: '功率' }) + ' ',
    field: 'P',
    unit: '(kW)',
  },
];

export const peakItems: DetailItem[] = [
  {
    label: formatMessage({ id: 'siteMonitor.maximumVoltage', defaultMessage: '最高单体电压' }),
    field: 'MVVOASU',
    unit: <ArrowUpOutlined className="cl-error" />,
    valueStyle: { flex: 1 },
  },
  {
    label: formatMessage({ id: 'siteMonitor.minimumVoltage', defaultMessage: '最低单体电压' }),
    field: 'MVVOSU',
    unit: <ArrowDownOutlined className="cl-green" />,
    valueStyle: { flex: 1 },
  },
  {
    label: formatMessage({ id: 'siteMonitor.maximumTemperature', defaultMessage: '最高单体温度' }),
    field: 'MaximumIndividualTemperature',
    unit: <ArrowUpOutlined className="cl-error" />,
    valueStyle: { flex: 1 },
  },
  {
    label: formatMessage({ id: 'siteMonitor.minimumTemperature', defaultMessage: '最低单体温度' }),
    field: 'LVOMT',
    unit: <ArrowDownOutlined className="cl-green" />,
    valueStyle: { flex: 1 },
  },
];
