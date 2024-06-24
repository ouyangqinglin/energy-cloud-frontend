import type { ProFormColumnsType } from '@ant-design/pro-form';
import { Col, Row } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import type { EffectiveTimeList, HoursPriceList } from '../../type';
import styles from '../index.less';
import { PriceType } from '../../type';
import { formatMessage, getPlaceholder } from '@/utils';
export const PriceTypeEnum = {
  [PriceType.SHARP]: {
    text: formatMessage({ id: 'dataManage.theTip', defaultMessage: '尖' }),
  },
  [PriceType.PEAK]: {
    text: formatMessage({ id: 'dataManage.peak', defaultMessage: '峰' }),
  },
  [PriceType.SHOULDER]: {
    text: formatMessage({ id: 'dataManage.flat', defaultMessage: '平' }),
  },
  [PriceType.OFF_PEAK]: {
    text: formatMessage({ id: 'dataManage.valley', defaultMessage: '谷' }),
  },
};
export const columns = (setType: 0 | 1): ProFormColumnsType[] => [
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
          span: 12,
        },
        dataIndex: 'name',
      },
      {
        title: formatMessage({ id: 'siteManage.set.EffectiveStatus', defaultMessage: '生效状态' }),
        colProps: {
          span: 12,
        },
        render: (_, { value: status }) => {
          return status ? (
            <div className={styles.statusSuccess}>
              {formatMessage({ id: 'siteManage.set.Effective', defaultMessage: '已生效' })}
            </div>
          ) : (
            <div className={styles.statusFail}>
              {formatMessage({ id: 'siteManage.set.noEffective', defaultMessage: '未生效' })}
            </div>
          );
        },
        dataIndex: 'status',
      },
      {
        title: formatMessage({
          id: 'siteManage.siteList.effectiveDate',
          defaultMessage: '生效日期',
        }),
        dataIndex: 'effectiveTimeList',
        colProps: {
          span: 24,
        },
        render: (_, { value = [] }: { value: EffectiveTimeList[] }) => {
          const Cols = value.map(({ effectiveTime, expirationTime, id }) => {
            return (
              <Col span={8} key={id}>
                <div className={styles.effectiveTimeItem}>
                  <span>{effectiveTime}</span>-<span>{expirationTime}</span>
                </div>
              </Col>
            );
          });
          return <Row gutter={16}>{Cols}</Row>;
        },
      },
    ],
  },
  {
    title: (
      <div className={styles.title}>
        {formatMessage({
          id: 'siteManage.set.TimePeriodElectricityPrice',
          defaultMessage: '时段电价',
        })}
      </div>
    ),
    valueType: 'group',
    colProps: {
      span: 24,
    },
    columns: [
      {
        dataIndex: 'hoursPriceList',
        render: (_, { value: hoursPrices = [] }: { value: HoursPriceList[] }) => {
          const Cols = hoursPrices.map((priceItem, index) => {
            const { intervalStartTime, intervalEndTime, id, electricityFees, elecType } = priceItem;
            const isLastOneChild = index === hoursPrices.length - 1;
            return (
              <React.Fragment key={id}>
                <Col className={!isLastOneChild ? styles.timeIntervalCol : ''} span={4}>
                  {formatMessage({ id: 'siteManage.set.timeSlot', defaultMessage: '时间段' })}
                  {index + 1}:
                </Col>
                <Col span={6}>
                  {intervalStartTime} - {intervalEndTime}
                </Col>
                <Col span={2}>
                  {formatMessage({ id: 'device.electrovalence', defaultMessage: '电价' })}:
                </Col>
                <Col span={6}>
                  {electricityFees}
                  {formatMessage({ id: 'siteManage.set.rmb/kWh', defaultMessage: '元/kWh' })}
                </Col>
                {setType == 1 ? (
                  <>
                    <Col span={4}>
                      {formatMessage({
                        id: 'device.electricityPriceType',
                        defaultMessage: '电价类型',
                      })}
                      :
                    </Col>
                    <Col span={2}>
                      {PriceTypeEnum[elecType as keyof typeof PriceTypeEnum]?.text}
                    </Col>
                  </>
                ) : (
                  <Col span={6} />
                )}
              </React.Fragment>
            );
          });
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
