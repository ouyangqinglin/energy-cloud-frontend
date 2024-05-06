import type { YTProColumns } from '@/components/YTProTable/typing';
import type { MarketElectricityPriceInfo } from './type';
import { formatMessage, getLocale } from '@/utils';
const isUS = getLocale().isEnUS;

export const columns: YTProColumns<MarketElectricityPriceInfo>[] = [
  {
    title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
    dataIndex: 'index',
    valueType: 'index',
    width: 50,
  },
  {
    title: formatMessage({ id: 'siteManage.siteList.ruleName', defaultMessage: '规则名称' }),
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'siteManage.siteList.effectiveDate', defaultMessage: '生效日期' }),
    dataIndex: 'effectiveTimeList',
    valueType: 'dateRange',
    ellipsis: true,
    render: (_, record) => {
      return record?.effectiveTimeList
        ?.map?.((item) => {
          const start = item?.effectiveTime?.split('-');
          const end = item?.expirationTime?.split('-');
          return `${start[0]}${isUS ? '/' : '月'}${start[1]}${isUS ? '' : '日'}-${end[0]}${
            isUS ? '/' : '月'
          }${end[1]}${isUS ? '' : '日'}`;
        })
        .join('，');
    },
    search: {
      transform: (value) => {
        return {
          effectiveTime: value[0],
          expirationTime: value[1],
        };
      },
    },
    fieldProps: {
      format: isUS ? 'MM/DD' : 'MM-DD',
    },
  },
  {
    title: formatMessage({ id: 'common.lastTime', defaultMessage: '最后更新时间' }),
    dataIndex: 'lastOperationTime',
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'common.operator', defaultMessage: '操作人' }),
    dataIndex: 'operator',
    hideInSearch: true,
  },
];
