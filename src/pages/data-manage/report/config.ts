/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-29 10:07:04
 * @LastEditTime: 2023-06-29 16:13:56
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
} from '@/utils/dictionary';
import { getDevice } from './service';

const pickerMap = new Map([
  [timeDimensionEnum.Day, { picker: 'date', format: 'YYYY-MM-DD' }],
  [timeDimensionEnum.Month, { picker: 'month', format: 'YYYY-MM' }],
  [timeDimensionEnum.Year, { picker: 'year', format: 'YYYY' }],
  [timeDimensionEnum.Cycle, { picker: 'year', format: 'YYYY' }],
]);

export const searchColumns: ProColumns[] = [
  {
    title: '报表类型',
    dataIndex: 'type',
    valueType: 'select',
    valueEnum: reportType,
    hideInTable: true,
  },
  {
    title: '选中设备',
    dataIndex: 'device',
    valueType: 'select',
    dependencies: ['type'],
    request: (params) => {
      const options: OptionType[] = [{ label: '全部', value: '' }];
      if (
        ![reportTypeEnum.Site, reportTypeEnum.Electric, reportTypeEnum.Else].includes(params.type)
      ) {
        return getDevice(params).then(({ data }) => {
          options.push();
          return options;
        });
      } else {
        return Promise.resolve(options);
      }
    },
    hideInTable: true,
  },
  {
    title: '时间维度',
    dataIndex: 'time',
    valueType: 'select',
    valueEnum: timeDimension,
    hideInTable: true,
  },
  {
    title: '统计时间',
    dataIndex: 'date',
    valueType: 'date',
    dependencies: ['time'],
    fieldProps: (form) => {
      const config = pickerMap.get(form.getFieldValue('time'));
      return {
        picker: config?.picker,
        format: config?.format,
      };
    },
  },
];

export const siteColumns: ProColumns[] = [
  {
    title: '统计时间',
    dataIndex: 'a',
    hideInSearch: true,
    width: 150,
  },
  {
    title: '市电',
    hideInSearch: true,
    children: [
      {
        title: '市电电量(kWh)',
        dataIndex: 'b',
        width: 120,
        ellipsis: true,
      },
      {
        title: '市电电费(元)',
        dataIndex: 'c',
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
        width: 150,
        ellipsis: true,
      },
      {
        title: '充电桩充电量(kWh)',
        width: 150,
        ellipsis: true,
      },
      {
        title: '用电成本(元)',
        width: 120,
        ellipsis: true,
      },
      {
        title: '充电收入(元)',
        width: 120,
        ellipsis: true,
      },
      {
        title: '充电桩收益(元)',
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
        width: 150,
        ellipsis: true,
      },
      {
        title: '光伏收益(元)',
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
        width: 150,
        ellipsis: true,
      },
      {
        title: '储能放电量(kWh)',
        width: 150,
        ellipsis: true,
      },
      {
        title: '充电成本(元)',
        width: 120,
        ellipsis: true,
      },
      {
        title: '放电收入(元)',
        width: 120,
        ellipsis: true,
      },
      {
        title: '储能收益(元)',
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
        width: 170,
        ellipsis: true,
      },
      {
        title: '其他负载电费(元)',
        width: 140,
        ellipsis: true,
      },
    ],
  },
];

export const electricColumns: ProColumns[] = [
  {
    title: '统计时间',
    dataIndex: 'a',
    hideInSearch: true,
    width: 150,
  },
  {
    title: '尖',
    hideInSearch: true,
    children: [
      {
        title: '电量(kWh)',
        dataIndex: 'b',
        width: 120,
        ellipsis: true,
      },
      {
        title: '电费(元)',
        dataIndex: 'c',
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
        dataIndex: 'b1',
        width: 120,
        ellipsis: true,
      },
      {
        title: '电费(元)',
        dataIndex: 'c1',
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
        dataIndex: 'b1',
        width: 120,
        ellipsis: true,
      },
      {
        title: '电费(元)',
        dataIndex: 'c1',
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
        dataIndex: 'b1',
        width: 120,
        ellipsis: true,
      },
      {
        title: '电费(元)',
        dataIndex: 'c1',
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
        dataIndex: 'b1',
        width: 120,
        ellipsis: true,
      },
      {
        title: '电费(元)',
        dataIndex: 'c1',
        width: 120,
        ellipsis: true,
      },
    ],
  },
];

export const pvInverterColumns: ProColumns[] = [
  {
    title: '统计时间',
    dataIndex: 'a',
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
            dataIndex: 'b',
            width: 120,
            ellipsis: true,
          },
          {
            title: '收益(元)',
            dataIndex: 'c',
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
            dataIndex: 'b1',
            width: 120,
            ellipsis: true,
          },
          {
            title: '收益(元)',
            dataIndex: 'c1',
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
            dataIndex: 'b1',
            width: 120,
            ellipsis: true,
          },
          {
            title: '收益(元)',
            dataIndex: 'c1',
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
            dataIndex: 'b1',
            width: 120,
            ellipsis: true,
          },
          {
            title: '收益(元)',
            dataIndex: 'c1',
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
            dataIndex: 'b1',
            width: 120,
            ellipsis: true,
          },
          {
            title: '收益(元)',
            dataIndex: 'c1',
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
            dataIndex: 'b12',
            width: 110,
            ellipsis: true,
          },
          {
            title: '收益(元)',
            dataIndex: 'c12',
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
        dataIndex: 'b13',
        width: 120,
        ellipsis: true,
      },
      {
        title: '收益(元)',
        dataIndex: 'c13',
        width: 120,
        ellipsis: true,
      },
    ],
  },
];

export const energyColumns: ProColumns[] = [
  {
    title: '统计时间',
    dataIndex: 'a',
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
            dataIndex: 'b',
            width: 120,
            ellipsis: true,
          },
          {
            title: '成本(元)',
            dataIndex: 'c',
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
            dataIndex: 'b1',
            width: 120,
            ellipsis: true,
          },
          {
            title: '成本(元)',
            dataIndex: 'c1',
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
            dataIndex: 'b1',
            width: 120,
            ellipsis: true,
          },
          {
            title: '成本(元)',
            dataIndex: 'c1',
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
            dataIndex: 'b1',
            width: 120,
            ellipsis: true,
          },
          {
            title: '成本(元)',
            dataIndex: 'c1',
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
            dataIndex: 'b1',
            width: 120,
            ellipsis: true,
          },
          {
            title: '成本(元)',
            dataIndex: 'c1',
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
            dataIndex: 'b2',
            width: 120,
            ellipsis: true,
          },
          {
            title: '收入(元)',
            dataIndex: 'c2',
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
            dataIndex: 'b12',
            width: 120,
            ellipsis: true,
          },
          {
            title: '收入(元)',
            dataIndex: 'c12',
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
            dataIndex: 'b12',
            width: 120,
            ellipsis: true,
          },
          {
            title: '收入(元)',
            dataIndex: 'c12',
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
            dataIndex: 'b12',
            width: 120,
            ellipsis: true,
          },
          {
            title: '收入(元)',
            dataIndex: 'c12',
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
            dataIndex: 'b12',
            width: 120,
            ellipsis: true,
          },
          {
            title: '收入(元)',
            dataIndex: 'c12',
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
        dataIndex: 'c13',
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
    dataIndex: 'a',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: '设备名称',
    dataIndex: 'a',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: '充电枪id',
    dataIndex: 'a',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: '充电订单号',
    dataIndex: 'a',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: '订单状态',
    dataIndex: 'a',
    hideInSearch: true,
    width: 120,
    ellipsis: true,
  },
  {
    title: '开始充电时间',
    dataIndex: 'a',
    hideInSearch: true,
    width: 150,
  },
  {
    title: '结束时间',
    dataIndex: 'a',
    hideInSearch: true,
    width: 150,
  },
  {
    title: '充电电量(kWh)',
    dataIndex: 'a',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: '电费金额(元)',
    dataIndex: 'a',
    hideInSearch: true,
    width: 120,
    ellipsis: true,
  },
  {
    title: '平台服务费金额(元)',
    dataIndex: 'a',
    hideInSearch: true,
    width: 170,
    ellipsis: true,
  },
  {
    title: '订单总金额(元)',
    dataIndex: 'a',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: '充电结束原因',
    dataIndex: 'a',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
];

export const chargeBaseColumns: ProColumns[] = [
  {
    title: '统计时间',
    dataIndex: 'a',
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
            dataIndex: 'b',
            width: 120,
            ellipsis: true,
          },
          {
            title: '成本(元)',
            dataIndex: 'c',
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
            dataIndex: 'b1',
            width: 120,
            ellipsis: true,
          },
          {
            title: '成本(元)',
            dataIndex: 'c1',
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
            dataIndex: 'b1',
            width: 120,
            ellipsis: true,
          },
          {
            title: '成本(元)',
            dataIndex: 'c1',
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
            dataIndex: 'b1',
            width: 120,
            ellipsis: true,
          },
          {
            title: '成本(元)',
            dataIndex: 'c1',
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
            dataIndex: 'b1',
            width: 120,
            ellipsis: true,
          },
          {
            title: '成本(元)',
            dataIndex: 'c1',
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
            dataIndex: 'b12',
            width: 110,
            ellipsis: true,
          },
          {
            title: '收入(元)',
            dataIndex: 'c12',
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
        dataIndex: 'c13',
        width: 120,
        ellipsis: true,
      },
    ],
  },
];
