import { formatMessage, getLocale } from '@/utils';
import type { ProColumns } from '@ant-design/pro-components';
import { platform } from '@/utils/dict';
import { siteType as siteTypeEnum } from '@/utils/dict';
import moment from 'moment';

export interface DataType {
  key: React.Key;
  siteId: string;
  siteName: string;
  energyOptions: string;
  platform: number;
  deliveryTime: string;
  deviceCount: number;
  charge: number;
  discharge: number;
  efficiency: number;
  gain: number;
}

export const OrderTypEnum = {
  charge: 1,
  discharge: 2,
  efficiency: 3,
  gain: 4,
};

export const columns: ProColumns<DataType>[] = [
  {
    title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
    dataIndex: 'index',
    valueType: 'index',
    width: 50,
  },
  {
    title: formatMessage({ id: 'siteManage.siteList.siteCode', defaultMessage: '站点编码' }),
    dataIndex: 'siteId',
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'siteManage.siteList.siteName', defaultMessage: '站点名称' }),
    dataIndex: 'siteName',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'siteManage.siteList.siteType', defaultMessage: '站点类型' }),
    dataIndex: 'energyOptions',
    valueEnum: siteTypeEnum,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'system.Version.platform', defaultMessage: '平台' }),
    dataIndex: 'platform',
    valueEnum: platform,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'screen.steCommissioningTime', defaultMessage: '站点投运时间' }),
    dataIndex: 'deliveryTime',
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'dataManage.1040', defaultMessage: '工商储设备数量' }),
    dataIndex: 'deviceCount',
    hideInSearch: true,
  },
  {
    title:
      formatMessage({ id: 'siteManage.set.energyStorageCharge', defaultMessage: '储能充电量' }) +
      '(KWh)',
    dataIndex: 'charge',
    sorter: true,
    hideInSearch: true,
  },
  {
    title:
      formatMessage({ id: 'siteManage.set.energyStorageDischarge', defaultMessage: '储能放电量' }) +
      '(KWh)',
    dataIndex: 'discharge',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'dataManage.1039', defaultMessage: '储能效率' }) + '(KWh)',
    dataIndex: 'efficiency',
    sorter: true,
    hideInSearch: true,
  },
  {
    title:
      formatMessage({ id: 'dataManage.1015', defaultMessage: '收益' }) +
      `(${formatMessage({ id: 'common.rmb', defaultMessage: '元' })})`,
    dataIndex: 'gain',
    hideInSearch: true,
    sorter: true,
  },
  {
    title: formatMessage({ id: 'common.time', defaultMessage: '时间' }),
    dataIndex: 'time',
    valueType: 'dateRange',
    hideInTable: true,
    width: 200,
    initialValue: [moment(), moment().subtract(1, 'week')],
    fieldProps: {
      format: getLocale().dateFormat,
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message:
            formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }) +
            formatMessage({ id: 'common.time', defaultMessage: '时间' }),
        },
      ],
    },
  },
];
