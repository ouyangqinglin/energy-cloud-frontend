import { formatMessage, getUniqueNumber } from '@/utils';
import { enableStatus } from '@/utils/dict';
import type { ProFormColumnsType } from '@ant-design/pro-components';
import ChartTable from './ChartTable';
import type { ProColumns } from '@ant-design/pro-components';

export type CollectionDataType = {
  key: string;
  keyName: string;
};

export type DeviceDataType = {
  deviceId: string;
  deviceName: string;
};

export type TableDataType = {
  name: string;
  aggregationMethod: string;
  color: string;
  unit: string;
  unitDisable: boolean;
  device: DeviceDataType[];
  collection: CollectionDataType[];
  config?: any;
  uuid: number | string;
  [key: string]: any;
};

export interface DataType {
  uuid: number | string;
  name: string;
  aggregationPeriod: string;
  curves: TableDataType[];
}

export interface CustomDataType {
  labelManage: {
    id: number | string;
    name: string;
    status: string;
    siteId?: string;
  };
  charts: DataType[];
}

export const getCycleOptions = (length: number = 15) => {
  return Array.from({ length }, (_, i) => ({
    label: `${i + 1}${formatMessage({ id: 'common.minute', defaultMessage: '分钟' })}`,
    value: `${i + 1}`,
  }));
};

export const defaultDeviceData = (): DeviceDataType[] => [
  {
    deviceId: `noData`,
    deviceName: formatMessage({
      id: 'common.selectDevice',
      defaultMessage: '选择设备',
    }),
  },
];

export const defaultCollectionData = (): CollectionDataType[] => [
  {
    key: `noData`,
    keyName: '--',
  },
];

export const defaultCurveData = (length: number): TableDataType => ({
  uuid: getUniqueNumber(3),
  name: `${length + 1}#${formatMessage({
    id: 'siteManage.1060',
    defaultMessage: '曲线',
  })}`,
  aggregationMethod: '1',
  color: '#3DD598',
  unit: 'KW',
  unitDisable: false,
  device: defaultDeviceData(),
  collection: defaultCollectionData(),
});

export const defaultData = (length: number): DataType => ({
  uuid: getUniqueNumber(3),
  name: `${length + 1}#${formatMessage({
    id: 'siteManage.1058',
    defaultMessage: '图表',
  })}`,
  aggregationPeriod: '1',
  curves: [defaultCurveData(0)],
});

export const wayOptions = [
  {
    label: formatMessage({ id: 'siteManage.1063', defaultMessage: '最大值' }),
    value: '0',
  },
  {
    label: formatMessage({ id: 'siteManage.1064', defaultMessage: '最小值' }),
    value: '1',
  },
  {
    label: formatMessage({ id: 'siteManage.1065', defaultMessage: '平均值' }),
    value: '2',
  },
  {
    label: formatMessage({ id: 'siteManage.1066', defaultMessage: '第一个值' }),
    value: '3',
  },
  {
    label: formatMessage({ id: 'siteManage.1067', defaultMessage: '最后一个值' }),
    value: '4',
  },
];

export const tableSelectColumns: ProColumns[] = [
  {
    title: formatMessage({
      id: 'siteManage.set.dataCollectionPoints',
      defaultMessage: '数据采集点',
    }),
    dataIndex: 'paramName',
    width: 200,
    ellipsis: true,
  },
  {
    title: formatMessage({
      id: 'siteManage.set.dataCollectionPointIdIdentify',
      defaultMessage: '数据采集点标识',
    }),
    dataIndex: 'paramCode',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
];

export const columns: ProFormColumnsType[] = [
  {
    title: formatMessage({ id: 'siteManage.1047', defaultMessage: '标签状态' }),
    dataIndex: ['labelManage', 'status'],
    valueType: 'radio',
    valueEnum: enableStatus,
    colProps: {
      span: 24,
    },
    formItemProps: {
      rules: [
        {
          required: true,
        },
      ],
    },
  },
  {
    title: formatMessage({ id: 'siteManage.1048', defaultMessage: '标签名称' }),
    dataIndex: ['labelManage', 'name'],
    formItemProps: {
      rules: [
        {
          required: true,
        },
      ],
    },
    fieldProps: {
      placeholder: formatMessage({
        id: 'siteManage.1069',
        defaultMessage: '请输入仪表盘名称，最多四个字符',
      }),
      maxLength: 4,
    },
  },
  {
    title: formatMessage({ id: 'siteManage.1049', defaultMessage: '图表管理' }),
    dataIndex: 'charts',
    colProps: {
      span: 24,
    },
    formItemProps: {
      rules: [
        {
          required: false,
        },
      ],
    },
    renderFormItem: () => <ChartTable />,
  },
];
