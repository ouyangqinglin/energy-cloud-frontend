import { formatMessage } from '@/utils';
import type { ProColumns } from '@ant-design/pro-components';
import type { OrderDataType } from './data';
export const columns: ProColumns<OrderDataType>[] = [
  {
    title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
    dataIndex: 'index',
    valueType: 'index',
    width: 50,
  },
  {
    title: formatMessage({ id: 'device.orderNumber', defaultMessage: '订单流水号' }),
    dataIndex: 'orderNumber',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'device.chargeMode', defaultMessage: '充电方式' }),
    dataIndex: 'chargeMode',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'device.chargeStrategy', defaultMessage: '充电策略' }),
    dataIndex: 'chargeStrategy',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({
      id: 'pages.searchTable.updateForm.schedulingPeriod.timeLabel',
      defaultMessage: '开始时间',
    }),
    dataIndex: 'startTime',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'dataManage.endTime', defaultMessage: '结束时间' }),
    dataIndex: 'endTime',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'device.carVIN', defaultMessage: '车辆VIN' }),
    dataIndex: 'carVIN',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title:
      formatMessage({ id: 'device.totalElectricityQuantity', defaultMessage: '总电量' }) + '(kWh)',
    dataIndex: 'totalElectricityQuantity',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title:
      formatMessage({ id: 'device.totalCost', defaultMessage: '总费用' }) +
      formatMessage({ id: 'common.rmb', defaultMessage: '元' }),
    dataIndex: 'totalCost',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
];
