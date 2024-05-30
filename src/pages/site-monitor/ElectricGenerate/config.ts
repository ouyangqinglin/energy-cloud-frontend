import type { YTProColumns } from '@/components/YTProTable/typing';
import { connectStatus } from '@/utils/dict';
import type { ElectricGenerateInfo } from './type';
import { formatMessage } from '@/utils';

export const columns: YTProColumns<ElectricGenerateInfo>[] = [
  {
    title: formatMessage({ id: 'common.deviceName', defaultMessage: '设备名称' }),
    dataIndex: 'deviceName',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'common.equipmentSerial', defaultMessage: '设备序列号' }),
    dataIndex: 'sn',
    hideInSearch: true,
    width: 150,
  },
  {
    title: formatMessage({ id: 'common.productType', defaultMessage: '产品类型' }),
    dataIndex: 'productTypeName',
    hideInSearch: true,
    width: 150,
  },
  {
    title: formatMessage({ id: 'siteMonitor.communicationStatus', defaultMessage: '通信状态' }),
    dataIndex: 'connectStatus',
    valueEnum: connectStatus,
    width: 120,
    ellipsis: true,
  },
  {
    title: `${formatMessage({ id: 'common.power', defaultMessage: '功率' })}(kW)`,
    dataIndex: 'p',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: `${formatMessage({
      id: 'siteMonitor.dayPowerGeneration',
      defaultMessage: '今日发电量',
    })}(kWh)`,
    dataIndex: 'generatedElecToday',
    hideInSearch: true,
    width: 150,
  },
  {
    title: `${formatMessage({
      id: 'siteMonitor.cumulativePowerGeneration',
      defaultMessage: '累计发电量',
    })}(kWh)`,
    dataIndex: 'generatedElecTotal',
    hideInSearch: true,
    width: 150,
  },
];
