import type { ProFormColumnsType } from '@ant-design/pro-form';
import { Col, Row } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import type { EffectiveTimeList, HoursPriceList } from '../../type';
import styles from '../index.less';

export const columns: ProFormColumnsType[] = [
  {
    title: <div className={styles.title}>基础信息</div>,
    valueType: 'group',
    colProps: {
      span: 24,
    },
    columns: [
      {
        title: '规则名称:',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '请输入规则名称',
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
        title: '生效状态',
        colProps: {
          span: 12,
        },
        render: (_, { value: status }) => {
          return status ? (
            <div className={styles.statusSuccess}>已生效</div>
          ) : (
            <div className={styles.statusFail}>未生效</div>
          );
        },
        dataIndex: 'status',
      },
      {
        title: '生效日期',
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
    title: <div className={styles.title}>时段电价</div>,
    valueType: 'group',
    colProps: {
      span: 24,
    },
    columns: [
      {
        dataIndex: 'hoursPriceList',
        render: (_, { value: hoursPrices = [] }: { value: HoursPriceList[] }) => {
          const Cols = hoursPrices.map((priceItem, index) => {
            const { intervalStartTime, intervalEndTime, id, electricityFees, serviceFees } =
              priceItem;
            const isLastOneChild = index === hoursPrices.length - 1;
            return (
              <React.Fragment key={id}>
                <Col className={!isLastOneChild ? styles.timeIntervalCol : ''} span={3}>
                  时间段{index + 1}:
                </Col>
                <Col span={9}>
                  {intervalStartTime} - {intervalEndTime}
                </Col>
                <Col span={2}>电价:</Col>
                <Col span={4}>{electricityFees}元/kWh</Col>
                <Col span={2}>服务费:</Col>
                <Col span={4}>{serviceFees}元</Col>
              </React.Fragment>
            );
          });

          return <Row gutter={16}>{Cols}</Row>;
        },
      },
      {
        title: '操作人：',
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
          return <span>{value}</span>;
        },
      },
      {
        title: '最后更新时间：',
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
