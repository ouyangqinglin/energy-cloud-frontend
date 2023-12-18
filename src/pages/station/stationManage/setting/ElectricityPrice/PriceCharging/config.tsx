import type { YTProColumns } from '@/components/YTProTable/typing';
import { Badge } from 'antd';
import type { ReactNode } from 'react';
import type { MarketElectricityPriceListItem } from './type';
import { formatMessage } from '@/utils';

export const columns: YTProColumns<MarketElectricityPriceListItem>[] = [
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
          return `${start[0]}月${start[1]}日-${end[0]}月${end[1]}日`;
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
      format: 'MM-DD',
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
  {
    title: formatMessage({ id: 'common.currentState', defaultMessage: '当前状态' }),
    dataIndex: 'status',
    valueEnum: new Map<number, ReactNode>([
      // eslint-disable-next-line react/jsx-key
      [
        1,
        <Badge
          status="success"
          text={formatMessage({ id: 'common.effect', defaultMessage: '生效' })}
        />,
      ],
      // eslint-disable-next-line react/jsx-key
      [
        0,
        <Badge
          status="error"
          text={formatMessage({ id: 'common.ineffect', defaultMessage: '未生效' })}
        />,
      ],
    ]),
  },
];
