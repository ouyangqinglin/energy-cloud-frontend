/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-12 09:52:26
 * @LastEditTime: 2023-12-12 09:52:27
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\MasterSlaveGroup\groupItem\helper.ts
 */
import { formatMessage } from '@/utils';

export const statConfig = [
  {
    title: formatMessage({ id: 'device.totalVoltage', defaultMessage: '总电压' }) + '(V)',
    field: 'TotalBatteryVoltage',
  },
  {
    title: formatMessage({ id: 'device.totalCurrent', defaultMessage: '总电流' }) + '(A)',
    field: 'TotalBatteryCurrent',
  },
  {
    title: formatMessage({ id: 'device.totalPower', defaultMessage: '总功率' }) + '(kW)',
    field: 'P',
  },
  {
    title:
      formatMessage({ id: 'siteMonitor.rechargeableCapacity', defaultMessage: '可充电量' }) +
      '(kWh)',
    field: 'RechargeableCapacity',
  },
  {
    title:
      formatMessage({ id: 'siteMonitor.dischargeCapacity', defaultMessage: '可放电量' }) + '(kWh)',
    field: 'DischargeableCapacity',
  },
];
