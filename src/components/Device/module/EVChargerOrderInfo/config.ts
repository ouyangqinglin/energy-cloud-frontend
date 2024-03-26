import { formatMessage } from '@/utils';
import type { ProColumns } from '@ant-design/pro-components';
import type { OrderDataType } from './data';
import { ChargingType, ChargingStrategy, GunType, SourceType, ServerType } from '@/utils/dict';

export const columns = (isHistory: boolean): ProColumns<OrderDataType>[] => [
  {
    title: formatMessage({ id: 'device.gunId', defaultMessage: '枪号' }),
    hideInSearch: true,
    dataIndex: 'connectorId',
    hideInTable: true,
  },
  {
    title: formatMessage({ id: 'device.keyId', defaultMessage: '键值ID' }),
    hideInSearch: true,
    dataIndex: 'kid',
    hideInTable: true,
  },
  {
    title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
    dataIndex: 'index',
    valueType: 'index',
    width: 50,
  },
  {
    title: formatMessage({ id: 'device.orderNumber', defaultMessage: '订单流水号' }),
    dataIndex: 'startChargeSeq',
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'device.userId', defaultMessage: '用户ID' }),
    hideInSearch: true,
    dataIndex: 'userId',
    hideInTable: true,
  },
  {
    title: formatMessage({ id: 'device.deviceId', defaultMessage: '设备编码' }),
    hideInSearch: true,
    dataIndex: 'connectorId',
    hideInTable: true,
  },
  {
    title: formatMessage({ id: 'device.gunType', defaultMessage: '枪类型' }),
    hideInSearch: true,
    dataIndex: 'gumType',
    hideInTable: true,
    valueEnum: GunType,
  },

  {
    title: formatMessage({ id: 'device.chargeMode', defaultMessage: '充电方式' }),
    dataIndex: 'chargingType',
    ellipsis: true,
    hideInSearch: true,
    valueEnum: ChargingType,
  },
  {
    title: formatMessage({ id: 'device.auxiliarySourceType', defaultMessage: '辅源类型' }),
    hideInSearch: true,
    dataIndex: 'sourceType',
    hideInTable: true,
    valueEnum: SourceType,
  },
  {
    title: formatMessage({ id: 'device.chargeStrategy', defaultMessage: '充电策略' }),
    dataIndex: 'chargingStrategy',
    ellipsis: true,
    hideInSearch: true,
    valueEnum: ChargingStrategy,
  },
  {
    title:
      formatMessage({ id: 'device.chargeStrategyParame', defaultMessage: '充电策略参数' }) + '(s)',
    hideInSearch: true,
    dataIndex: 'chargingStrategyParam',
    hideInTable: true,
  },
  {
    title: formatMessage({
      id: 'pages.searchTable.updateForm.schedulingPeriod.timeLabel',
      defaultMessage: '开始时间',
    }),
    dataIndex: 'startTime',
    ellipsis: true,
    valueType: 'dateTime',
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'dataManage.endTime', defaultMessage: '结束时间' }),
    dataIndex: 'endTime',
    ellipsis: true,
    valueType: 'dateTime',
    hideInSearch: true,
  },

  {
    title: formatMessage({ id: 'device.startSOC', defaultMessage: '开始SOC(%)' }),
    hideInSearch: true,
    dataIndex: 'startSoc',
    hideInTable: true,
  },
  {
    title: formatMessage({ id: 'device.endSOC', defaultMessage: '结束SOC(%)' }),
    hideInSearch: true,
    dataIndex: 'endSoc',
    hideInTable: true,
  },
  {
    title: formatMessage({ id: 'device.stopReason', defaultMessage: '停止原因' }),
    hideInSearch: true,
    dataIndex: 'stopReason',
    hideInTable: true,
  },
  {
    title: formatMessage({ id: 'device.stopId', defaultMessage: '停止编码' }),
    hideInSearch: true,
    dataIndex: 'stopCode',
    hideInTable: true,
  },
  {
    title: formatMessage({ id: 'device.stopChildId', defaultMessage: '停止子编码' }),
    hideInSearch: true,
    dataIndex: 'stopSecondCode',
    hideInTable: true,
  },
  {
    title: formatMessage({ id: 'device.carVIN', defaultMessage: '车辆VIN' }),
    dataIndex: 'carVin',
    ellipsis: true,
  },
  {
    title: formatMessage({
      id: 'pages.searchTable.updateForm.schedulingPeriod.timeLabel',
      defaultMessage: '开始时间',
    }),
    dataIndex: 'createTime',
    valueType: 'dateRange',
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
    ellipsis: true,
    hideInSearch: !isHistory,
    hideInTable: true,
  },
  {
    title:
      formatMessage({ id: 'device.totalElectricityQuantity', defaultMessage: '总电量' }) + '(kWh)',
    dataIndex: 'totalPower',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: `${formatMessage({ id: 'device.totalCost', defaultMessage: '总费用' })}(${formatMessage({
      id: 'common.rmb',
      defaultMessage: '元',
    })})`,
    dataIndex: 'totalMoney',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'device.chargeDuration', defaultMessage: '充电时长' }) + '(s)',
    hideInSearch: true,
    dataIndex: 'chargeDuration',
    hideInTable: true,
  },
  {
    title: formatMessage({ id: 'device.startmeterRead', defaultMessage: '开始电表读数' }) + '(kWh)',
    hideInSearch: true,
    dataIndex: 'startMeter',
    hideInTable: true,
  },
  {
    title: formatMessage({ id: 'device.endmeterRead', defaultMessage: '结束电表读数' }) + '(kWh)',
    hideInSearch: true,
    dataIndex: 'endMeter',
    hideInTable: true,
  },
  {
    title: `${formatMessage({
      id: 'device.totalElectricityCost',
      defaultMessage: '总电费',
    })}(${formatMessage({
      id: 'common.rmb',
      defaultMessage: '元',
    })})`,
    hideInSearch: true,
    dataIndex: 'totalElecMoney',
    hideInTable: true,
  },
  {
    title: `${formatMessage({
      id: 'device.totalServiceCharge',
      defaultMessage: '总服务费',
    })}(${formatMessage({
      id: 'common.rmb',
      defaultMessage: '元',
    })})`,
    hideInSearch: true,
    dataIndex: 'totalSeviceMoney',
    hideInTable: true,
  },
  {
    title: formatMessage({ id: 'device.serviceType', defaultMessage: '服务器类型' }),
    hideInSearch: true,
    dataIndex: 'serverType',
    hideInTable: true,
    valueEnum: ServerType,
  },
];
export const option = {
  color: ['#3DD598', '#007DFF'],
  yAxis: [
    {
      type: 'value',
      name: formatMessage({ id: 'device.SOC', defaultMessage: 'SOC' }) + '（%）',
      nameLocation: 'end',
      splitLine: {
        lineStyle: {
          type: 'dashed', //虚线
        },
      },
    },
    {
      type: 'value',
      name: formatMessage({ id: 'device.chargeAmount', defaultMessage: '已充电量' }) + '（kwh）',
      nameLocation: 'end',
      splitLine: {
        lineStyle: {
          type: 'dashed', //虚线
        },
      },
    },
  ],
  grid: {
    top: 30,
    bottom: 50,
    right: 30,
    left: 15,
  },
  legend: {
    show: true,
    icon: 'rect',
    itemHeight: 10,
    itemWidth: 10,
  },
  tooltip: {
    trigger: 'axis',
  },
  dataZoom: [
    {
      type: 'inside',
      realtime: false,
    },
    {
      start: 0,
      end: 100,
      height: 15,
      realtime: false,
    },
  ],
  series: [
    {
      name: formatMessage({ id: 'device.SOC', defaultMessage: 'SOC' }),
      color: '#1890FF',
      type: 'line',
      yAxisIndex: 0,
    },
    {
      name: formatMessage({
        id: 'device.chargeAmount',
        defaultMessage: '已充电量',
      }),
      color: '#2FC25B',
      type: 'line',
      yAxisIndex: 1,
    },
  ],
};
