/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-29 10:07:04
 * @LastEditTime: 2023-07-11 16:19:34
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\data-manage\report\config.ts
 */

import type { ProColumns } from '@ant-design/pro-table';
import {
  reportType,
  reportTypeEnum,
  OptionType,
  timeDimension,
  timeDimensionEnum,
  reportTypeSystemIdMap,
} from '@/utils/dictionary';
import { getDevicePage } from '@/services/equipment';
import moment from 'moment';

const pickerMap = new Map([
  [timeDimensionEnum.Day, { picker: 'date', format: 'YYYY-MM-DD' }],
  [timeDimensionEnum.Month, { picker: 'month', format: 'YYYY-MM' }],
  [timeDimensionEnum.Year, { picker: 'year', format: 'YYYY' }],
  [timeDimensionEnum.Cycle, { picker: 'year', format: 'YYYY' }],
]);

export const searchColumns: ProColumns[] = [
  {
    title: '报表类型',
    dataIndex: 'reportType',
    valueType: 'select',
    valueEnum: reportType,
    hideInTable: true,
    formItemProps: {
      rules: [{ required: true }],
    },
    fieldProps: (form) => {
      return {
        onChange: () => {
          form?.setFieldValue?.('deviceId', '');
        },
      };
    },
  },
  {
    title: '选中设备',
    dataIndex: 'deviceId',
    valueType: 'select',
    dependencies: ['reportType', 'siteId'],
    request: (params) => {
      const options: OptionType[] = [{ label: '全部', value: '' }];
      if (
        ![reportTypeEnum.Site, reportTypeEnum.Electric, reportTypeEnum.Else].includes(
          params.reportType,
        )
      ) {
        const subSystemId = reportTypeSystemIdMap.get(params.reportType);
        if (subSystemId && params.siteId) {
          return getDevicePage({
            ...params,
            subSystemId,
            current: 1,
            pageSize: 10000,
          }).then(({ data }) => {
            data?.list?.forEach((item) => {
              options.push({
                label: item.name,
                value: item.deviceId,
              });
            });
            return options;
          });
        }
      }
      return Promise.resolve(options);
    },
    hideInTable: true,
  },
  {
    title: '时间维度',
    dataIndex: 'timeDimension',
    valueType: 'select',
    valueEnum: timeDimension,
    hideInTable: true,
    formItemProps: {
      rules: [{ required: true }],
    },
    fieldProps: (form) => {
      return {
        onChange: () => {
          if (form?.getFieldValue?.('timeDimension') == timeDimensionEnum.Cycle) {
            form?.setFieldValue?.('dimensionTime', '');
          }
        },
      };
    },
    initialValue: timeDimensionEnum.Day,
  },
  {
    title: '统计时间',
    dataIndex: 'dimensionTime',
    valueType: 'date',
    dependencies: ['timeDimension'],
    fieldProps: (form) => {
      const config = pickerMap.get(form?.getFieldValue?.('timeDimension'));
      return {
        picker: config?.picker,
        format: config?.format,
      };
    },
    formItemProps: (form) => {
      const time = form?.getFieldValue?.('timeDimension');
      return {
        hidden: time === timeDimensionEnum.Cycle,
        rules: [{ required: time !== timeDimensionEnum.Cycle }],
      };
    },
    initialValue: moment(),
    hideInTable: true,
  },
];

export const siteColumns: ProColumns[] = [
  {
    title: '统计时间',
    dataIndex: 'statisticalTime',
    hideInSearch: true,
    width: 150,
  },
  {
    title: '市电',
    hideInSearch: true,
    children: [
      {
        title: '市电电量(kWh)',
        dataIndex: 'meq',
        width: 120,
        ellipsis: true,
      },
      {
        title: '市电电费(元)',
        dataIndex: 'meb',
        width: 120,
        ellipsis: true,
      },
    ],
  },
  {
    title: '充电桩',
    hideInSearch: true,
    children: [
      {
        title: '充电桩用电量(kWh)',
        dataIndex: 'cspc',
        width: 150,
        ellipsis: true,
      },
      {
        title: '充电桩充电量(kWh)',
        dataIndex: 'cscc',
        width: 150,
        ellipsis: true,
      },
      {
        title: '用电成本(元)',
        dataIndex: 'ec',
        width: 120,
        ellipsis: true,
      },
      {
        title: '充电收入(元)',
        dataIndex: 'ci',
        width: 120,
        ellipsis: true,
      },
      {
        title: '充电桩收益(元)',
        dataIndex: 'ics',
        width: 120,
        ellipsis: true,
      },
    ],
  },
  {
    title: '光伏',
    hideInSearch: true,
    children: [
      {
        title: '光伏发电量(kWh)',
        dataIndex: 'pvpg',
        width: 150,
        ellipsis: true,
      },
      {
        title: '光伏收益(元)',
        dataIndex: 'pvr',
        width: 120,
        ellipsis: true,
      },
    ],
  },
  {
    title: '储能',
    hideInSearch: true,
    children: [
      {
        title: '储能充电量(kWh)',
        dataIndex: 'escc',
        width: 150,
        ellipsis: true,
      },
      {
        title: '储能放电量(kWh)',
        dataIndex: 'esdc',
        width: 150,
        ellipsis: true,
      },
      {
        title: '充电成本(元)',
        dataIndex: 'cc',
        width: 120,
        ellipsis: true,
      },
      {
        title: '放电收入(元)',
        dataIndex: 'di',
        width: 120,
        ellipsis: true,
      },
      {
        title: '储能收益(元)',
        dataIndex: 'esi',
        width: 120,
        ellipsis: true,
      },
    ],
  },
  {
    title: '其他负载',
    hideInSearch: true,
    children: [
      {
        title: '其他负载用电量(kWh)',
        dataIndex: 'loadec',
        width: 170,
        ellipsis: true,
      },
      {
        title: '其他负载电费(元)',
        dataIndex: 'loadef',
        width: 140,
        ellipsis: true,
      },
    ],
  },
];

export const electricColumns: ProColumns[] = [
  {
    title: '统计时间',
    dataIndex: 'statisticalDimension',
    hideInSearch: true,
    width: 150,
  },
  {
    title: '尖',
    hideInSearch: true,
    children: [
      {
        title: '电量(kWh)',
        dataIndex: 'sharpElectricityLevel',
        width: 120,
        ellipsis: true,
      },
      {
        title: '电费(元)',
        dataIndex: 'sharpElectricityBill',
        width: 120,
        ellipsis: true,
      },
    ],
  },
  {
    title: '峰',
    hideInSearch: true,
    children: [
      {
        title: '电量(kWh)',
        dataIndex: 'peakElectricityLevel',
        width: 120,
        ellipsis: true,
      },
      {
        title: '电费(元)',
        dataIndex: 'peakElectricityBill',
        width: 120,
        ellipsis: true,
      },
    ],
  },
  {
    title: '平',
    hideInSearch: true,
    children: [
      {
        title: '电量(kWh)',
        dataIndex: 'flatElectricityLevel',
        width: 120,
        ellipsis: true,
      },
      {
        title: '电费(元)',
        dataIndex: 'flatElectricityBill',
        width: 120,
        ellipsis: true,
      },
    ],
  },
  {
    title: '谷',
    hideInSearch: true,
    children: [
      {
        title: '电量(kWh)',
        dataIndex: 'valleyElectricityLevel',
        width: 120,
        ellipsis: true,
      },
      {
        title: '电费(元)',
        dataIndex: 'valleyElectricityBill',
        width: 120,
        ellipsis: true,
      },
    ],
  },
  {
    title: '总',
    hideInSearch: true,
    children: [
      {
        title: '电量(kWh)',
        dataIndex: 'electricityLevel',
        width: 120,
        ellipsis: true,
      },
      {
        title: '电费(元)',
        dataIndex: 'electricityBill',
        width: 120,
        ellipsis: true,
      },
    ],
  },
];

export const pvInverterColumns: ProColumns[] = [
  {
    title: '统计时间',
    dataIndex: 'statisticalDimension',
    hideInSearch: true,
    width: 150,
  },
  {
    title: '自发自用',
    hideInSearch: true,
    children: [
      {
        title: '尖',
        hideInSearch: true,
        children: [
          {
            title: '电量(kWh)',
            dataIndex: 'sharpElectricityLevel',
            width: 120,
            ellipsis: true,
          },
          {
            title: '收益(元)',
            dataIndex: 'sharpIncome',
            width: 120,
            ellipsis: true,
          },
        ],
      },
      {
        title: '峰',
        hideInSearch: true,
        children: [
          {
            title: '电量(kWh)',
            dataIndex: 'peakElectricityLevel',
            width: 120,
            ellipsis: true,
          },
          {
            title: '收益(元)',
            dataIndex: 'peakIncome',
            width: 120,
            ellipsis: true,
          },
        ],
      },
      {
        title: '平',
        hideInSearch: true,
        children: [
          {
            title: '电量(kWh)',
            dataIndex: 'flatElectricityLevel',
            width: 120,
            ellipsis: true,
          },
          {
            title: '收益(元)',
            dataIndex: 'flatIncome',
            width: 120,
            ellipsis: true,
          },
        ],
      },
      {
        title: '谷',
        hideInSearch: true,
        children: [
          {
            title: '电量(kWh)',
            dataIndex: 'valleyElectricityLevel',
            width: 120,
            ellipsis: true,
          },
          {
            title: '收益(元)',
            dataIndex: 'valleyIncome',
            width: 120,
            ellipsis: true,
          },
        ],
      },
      {
        title: '总',
        hideInSearch: true,
        children: [
          {
            title: '电量(kWh)',
            dataIndex: 'selfElectricityLevel',
            width: 120,
            ellipsis: true,
          },
          {
            title: '收益(元)',
            dataIndex: 'selfIncome',
            width: 120,
            ellipsis: true,
          },
        ],
      },
    ],
  },
  {
    title: '光伏上网',
    hideInSearch: true,
    children: [
      {
        title: '总',
        children: [
          {
            title: '电量(kWh)',
            dataIndex: 'pvgElectricityLevel',
            width: 110,
            ellipsis: true,
          },
          {
            title: '收益(元)',
            dataIndex: 'pvgIncome',
            width: 110,
            ellipsis: true,
          },
        ],
      },
    ],
  },
  {
    title: '总计',
    hideInSearch: true,
    children: [
      {
        title: '电量(kWh)',
        dataIndex: 'electricityLevel',
        width: 120,
        ellipsis: true,
      },
      {
        title: '收益(元)',
        dataIndex: 'income',
        width: 120,
        ellipsis: true,
      },
    ],
  },
];

export const energyColumns: ProColumns[] = [
  {
    title: '统计时间',
    dataIndex: 'statisticalDimension',
    hideInSearch: true,
    width: 150,
  },
  {
    title: '储能充电',
    hideInSearch: true,
    children: [
      {
        title: '尖',
        hideInSearch: true,
        children: [
          {
            title: '电量(kWh)',
            dataIndex: 'escsharpElectricityLevel',
            width: 120,
            ellipsis: true,
          },
          {
            title: '成本(元)',
            dataIndex: 'escsharpIncome',
            width: 120,
            ellipsis: true,
          },
        ],
      },
      {
        title: '峰',
        hideInSearch: true,
        children: [
          {
            title: '电量(kWh)',
            dataIndex: 'escpeakElectricityLevel',
            width: 120,
            ellipsis: true,
          },
          {
            title: '成本(元)',
            dataIndex: 'escpeakIncome',
            width: 120,
            ellipsis: true,
          },
        ],
      },
      {
        title: '平',
        hideInSearch: true,
        children: [
          {
            title: '电量(kWh)',
            dataIndex: 'escflatElectricityLevel',
            width: 120,
            ellipsis: true,
          },
          {
            title: '成本(元)',
            dataIndex: 'escflatIncome',
            width: 120,
            ellipsis: true,
          },
        ],
      },
      {
        title: '谷',
        hideInSearch: true,
        children: [
          {
            title: '电量(kWh)',
            dataIndex: 'escvalleyElectricityLevel',
            width: 120,
            ellipsis: true,
          },
          {
            title: '成本(元)',
            dataIndex: 'escvalleyIncome',
            width: 120,
            ellipsis: true,
          },
        ],
      },
      {
        title: '总',
        hideInSearch: true,
        children: [
          {
            title: '电量(kWh)',
            dataIndex: 'escelectricityLevel',
            width: 120,
            ellipsis: true,
          },
          {
            title: '成本(元)',
            dataIndex: 'escincome',
            width: 120,
            ellipsis: true,
          },
        ],
      },
    ],
  },
  {
    title: '储能放电',
    hideInSearch: true,
    children: [
      {
        title: '尖',
        hideInSearch: true,
        children: [
          {
            title: '电量(kWh)',
            dataIndex: 'esdsharpElectricityLevel',
            width: 120,
            ellipsis: true,
          },
          {
            title: '收入(元)',
            dataIndex: 'esdsharpIncome',
            width: 120,
            ellipsis: true,
          },
        ],
      },
      {
        title: '峰',
        hideInSearch: true,
        children: [
          {
            title: '电量(kWh)',
            dataIndex: 'esdpeakElectricityLevel',
            width: 120,
            ellipsis: true,
          },
          {
            title: '收入(元)',
            dataIndex: 'esdpeakIncome',
            width: 120,
            ellipsis: true,
          },
        ],
      },
      {
        title: '平',
        hideInSearch: true,
        children: [
          {
            title: '电量(kWh)',
            dataIndex: 'esdflatElectricityLevel',
            width: 120,
            ellipsis: true,
          },
          {
            title: '收入(元)',
            dataIndex: 'esdflatIncome',
            width: 120,
            ellipsis: true,
          },
        ],
      },
      {
        title: '谷',
        hideInSearch: true,
        children: [
          {
            title: '电量(kWh)',
            dataIndex: 'esdvalleyElectricityLevel',
            width: 120,
            ellipsis: true,
          },
          {
            title: '收入(元)',
            dataIndex: 'esdvalleyIncome',
            width: 120,
            ellipsis: true,
          },
        ],
      },
      {
        title: '总',
        hideInSearch: true,
        children: [
          {
            title: '电量(kWh)',
            dataIndex: 'esdelectricityLevel',
            width: 120,
            ellipsis: true,
          },
          {
            title: '收入(元)',
            dataIndex: 'esdincome',
            width: 120,
            ellipsis: true,
          },
        ],
      },
    ],
  },
  {
    title: '总计',
    hideInSearch: true,
    children: [
      {
        title: '总收益(元)',
        dataIndex: 'income',
        width: 120,
        ellipsis: true,
      },
    ],
  },
];

export const chargeOrderColumns: ProColumns[] = [
  {
    title: '序号',
    valueType: 'index',
  },
  {
    title: '站点名称',
    dataIndex: 'siteName',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: '设备名称',
    dataIndex: 'deviceName',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: '充电枪id',
    dataIndex: 'connectorId',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: '充电订单号',
    dataIndex: 'startChargeSeq',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: '订单状态',
    dataIndex: 'sorderStatus',
    hideInSearch: true,
    width: 120,
    ellipsis: true,
  },
  {
    title: '开始充电时间',
    dataIndex: 'startTime',
    hideInSearch: true,
    width: 150,
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    hideInSearch: true,
    width: 150,
  },
  {
    title: '充电电量(kWh)',
    dataIndex: 'DetailPower',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: '电费金额(元)',
    dataIndex: 'DetailElecMoney',
    hideInSearch: true,
    width: 120,
    ellipsis: true,
  },
  {
    title: '平台服务费金额(元)',
    dataIndex: 'SevicePrice',
    hideInSearch: true,
    width: 170,
    ellipsis: true,
  },
  {
    title: '订单总金额(元)',
    dataIndex: 'totalElecMoney',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: '充电结束原因',
    dataIndex: 'reason',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
];

export const chargeOrderStatColumns: ProColumns[] = [
  {
    title: '统计时间',
    dataIndex: 'date',
    hideInSearch: true,
    width: 150,
  },
  {
    title: '订单数量',
    dataIndex: 'orderCount',
    hideInSearch: true,
    width: 120,
    ellipsis: true,
  },
  {
    title: '累计充电电量（kWh）',
    dataIndex: 'chargingCapacity',
    hideInSearch: true,
    width: 180,
    ellipsis: true,
  },
  {
    title: '累计电费金额（元）',
    dataIndex: 'electricityBillAmount',
    hideInSearch: true,
    width: 180,
    ellipsis: true,
  },
  {
    title: '累计平台服务费金额（元）',
    dataIndex: 'serviceFeeAmount',
    hideInSearch: true,
    width: 200,
    ellipsis: true,
  },
  {
    title: '累计订单总金额（元）',
    dataIndex: 'totalOrderAmount',
    hideInSearch: true,
    width: 180,
    ellipsis: true,
  },
];

export const chargeBaseColumns: ProColumns[] = [
  {
    title: '统计时间',
    dataIndex: 'statisticalDimension',
    hideInSearch: true,
    width: 150,
  },
  {
    title: '充电桩用电',
    hideInSearch: true,
    children: [
      {
        title: '尖',
        hideInSearch: true,
        children: [
          {
            title: '电量(kWh)',
            dataIndex: 'pccssharpElectricityLevel',
            width: 120,
            ellipsis: true,
          },
          {
            title: '成本(元)',
            dataIndex: 'pccssharpIncome',
            width: 120,
            ellipsis: true,
          },
        ],
      },
      {
        title: '峰',
        hideInSearch: true,
        children: [
          {
            title: '电量(kWh)',
            dataIndex: 'pccspeakElectricityLevel',
            width: 120,
            ellipsis: true,
          },
          {
            title: '成本(元)',
            dataIndex: 'pccspeakIncome',
            width: 120,
            ellipsis: true,
          },
        ],
      },
      {
        title: '平',
        hideInSearch: true,
        children: [
          {
            title: '电量(kWh)',
            dataIndex: 'pccsflatElectricityLevel',
            width: 120,
            ellipsis: true,
          },
          {
            title: '成本(元)',
            dataIndex: 'pccsflatIncome',
            width: 120,
            ellipsis: true,
          },
        ],
      },
      {
        title: '谷',
        hideInSearch: true,
        children: [
          {
            title: '电量(kWh)',
            dataIndex: 'pccsvalleyElectricityLevel',
            width: 120,
            ellipsis: true,
          },
          {
            title: '成本(元)',
            dataIndex: 'pccsvalleyIncome',
            width: 120,
            ellipsis: true,
          },
        ],
      },
      {
        title: '总',
        hideInSearch: true,
        children: [
          {
            title: '电量(kWh)',
            dataIndex: 'pccselectricityLevel',
            width: 120,
            ellipsis: true,
          },
          {
            title: '成本(元)',
            dataIndex: 'pccsincome',
            width: 120,
            ellipsis: true,
          },
        ],
      },
    ],
  },
  {
    title: '充电桩充电',
    hideInSearch: true,
    children: [
      {
        title: '总',
        children: [
          {
            title: '电量(kWh)',
            dataIndex: 'cscelectricityLevel	',
            width: 110,
            ellipsis: true,
          },
          {
            title: '收入(元)',
            dataIndex: 'cscincome',
            width: 110,
            ellipsis: true,
          },
        ],
      },
    ],
  },
  {
    title: '总计',
    hideInSearch: true,
    children: [
      {
        title: '总收益(元)',
        dataIndex: 'totalRevenue',
        width: 120,
        ellipsis: true,
      },
    ],
  },
];
