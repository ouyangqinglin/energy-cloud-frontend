import type { ProFormColumnsType } from '@ant-design/pro-form';
import { Col, Row } from 'antd';
import dayjs from 'dayjs';
import { isEmpty, isNil, uniqueId } from 'lodash';
import React from 'react';
import type { EffectiveTimeList, HoursPriceList } from '../../type';
import styles from '../index.less';
import { PriceType } from '../../type';
import { electricMoneyMap } from '@/utils/dict';
import { formatMessage, getPlaceholder } from '@/utils';
export const columns: ProFormColumnsType[] = [
  {
    title: (
      <div className={styles.title}>
        {formatMessage({ id: 'common.baseInfo', defaultMessage: '基础信息' })}
      </div>
    ),
    valueType: 'group',
    colProps: {
      span: 24,
    },
    columns: [
      {
        title: formatMessage({
          id: 'pages.searchTable.updateForm.ruleName.nameLabel',
          defaultMessage: '规则名称',
        }),
        formItemProps: {
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
            },
          ],
          wrapperCol: {
            span: 18,
          },
        },
        colProps: {
          span: 8,
        },
        dataIndex: 'name',
      },
    ],
  },
  {
    title: (
      <div className={styles.title}>
        {formatMessage({
          id: 'siteManage.set.PeakAndValleyElectricityPrices',
          defaultMessage: '尖峰平谷电价',
        })}
      </div>
    ),
    valueType: 'group',
    colProps: {
      span: 24,
    },
    columns: [
      {
        title: formatMessage({
          id: 'siteManage.set.SharpElectricityPrice',
          defaultMessage: '尖电价',
        }),
        dataIndex: 'sharpPrice',
        formItemProps: {
          labelCol: {
            flex: '0 1 auto',
          },
        },
        render: (_, { value }) =>
          getPlaceholder(value) +
          formatMessage({ id: 'siteManage.set.rmb/kWh', defaultMessage: '元/kWh' }),
        colProps: {
          span: 6,
        },
      },
      {
        title: formatMessage({
          id: 'siteManage.set.PeakElectricityPrice',
          defaultMessage: '峰电价',
        }),
        dataIndex: 'peakPrice',
        formItemProps: {
          labelCol: {
            flex: '0 1 auto',
          },
        },
        render: (_, { value }) =>
          getPlaceholder(value) +
          formatMessage({ id: 'siteManage.set.rmb/kWh', defaultMessage: '元/kWh' }),
        colProps: {
          span: 6,
        },
      },
      {
        title: formatMessage({
          id: 'siteManage.set.AverageElectricityPrice',
          defaultMessage: '平电价',
        }),
        dataIndex: 'flatPrice',
        formItemProps: {
          labelCol: {
            flex: '0 1 auto',
          },
        },
        render: (_, { value }) =>
          getPlaceholder(value) +
          formatMessage({ id: 'siteManage.set.rmb/kWh', defaultMessage: '元/kWh' }),
        colProps: {
          span: 6,
        },
      },
      {
        title: formatMessage({
          id: 'siteManage.set.ValleyElectricityPrice',
          defaultMessage: '谷电价',
        }),
        dataIndex: 'valleyPrice',
        formItemProps: {
          labelCol: {
            flex: '0 1 auto',
          },
        },
        render: (_, { value }) =>
          getPlaceholder(value) +
          formatMessage({ id: 'siteManage.set.rmb/kWh', defaultMessage: '元/kWh' }),
        colProps: {
          span: 6,
        },
      },
      {
        dataIndex: 'hoursPriceList',
        render: (_, { value: hoursPrices = [] }: { value: HoursPriceList[] }) => {
          const priceTypeMap = new Map<PriceType, [string, string][]>([
            [PriceType.SHARP, []],
            [PriceType.PEAK, []],
            [PriceType.SHOULDER, []],
            [PriceType.OFF_PEAK, []],
          ]);
          hoursPrices.forEach((priceItem) => {
            if (isEmpty(priceItem)) {
              return;
            }
            if (!isNil(priceItem?.type)) {
              const priceList = priceTypeMap.get(priceItem.type);
              priceList?.push?.([priceItem.intervalStartTime, priceItem.intervalEndTime]);
            }
          });

          const labelMap = {
            [PriceType.SHARP]: formatMessage({
              id: 'siteManage.set.SharpTime',
              defaultMessage: '尖时段',
            }),
            [PriceType.PEAK]: formatMessage({
              id: 'siteManage.set.PeakTime',
              defaultMessage: '峰时段',
            }),
            [PriceType.SHOULDER]: formatMessage({
              id: 'siteManage.set.AverageTime',
              defaultMessage: '平时段',
            }),
            [PriceType.OFF_PEAK]: formatMessage({
              id: 'siteManage.set.ValleyTime',
              defaultMessage: '谷时段',
            }),
          };

          const Cols = [];
          let index = 0;
          for (const [key, values] of priceTypeMap.entries()) {
            const TimeIntervalTextChild = values.length ? (
              values?.map(([startTime, endTime]) => {
                return (
                  <Col key={startTime} span={4}>
                    {startTime} - {endTime}
                  </Col>
                );
              })
            ) : (
              <Col key={uniqueId('price')} span={4}>
                --
              </Col>
            );

            const isLastOneChild = index++ === 3;
            Cols.push(
              <React.Fragment key={key}>
                <Col className={!isLastOneChild ? styles.timeIntervalCol : ''} span={3}>
                  {labelMap[Number(key)]}:
                </Col>
                <Col span={21}>
                  <Row>{TimeIntervalTextChild}</Row>
                </Col>
              </React.Fragment>,
            );
          }
          return <Row gutter={16}>{Cols}</Row>;
        },
      },
      {
        title: formatMessage({ id: 'common.operator', defaultMessage: '操作人：' }),
        dataIndex: 'operator',
        formItemProps: {
          labelCol: {
            span: 3,
          },
        },
        colProps: {
          span: 24,
        },
        render: (_, { value }) => {
          return <span>{getPlaceholder(value)}</span>;
        },
      },
      {
        title: formatMessage({ id: 'common.lastTime', defaultMessage: '最后更新时间：' }),
        dataIndex: 'lastOperationTime',
        formItemProps: {
          labelCol: {
            span: 3,
          },
        },
        colProps: {
          span: 24,
        },
        render: (_, { value }) => {
          if (value) {
            return <span>{dayjs(value).format('YYYY-MM-DD HH:mm')}</span>;
          }
          return <span>--</span>;
        },
      },
    ],
  },
];
