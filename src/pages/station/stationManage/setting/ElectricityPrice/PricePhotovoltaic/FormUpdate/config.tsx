import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import type { ProFormColumnsType } from '@ant-design/pro-form';
import { Col, Row } from 'antd';
import dayjs from 'dayjs';
import { isEmpty, uniqueId } from 'lodash';
import React from 'react';
import type { EffectiveTimeList, HoursPriceList } from '../../type';
import styles from '../index.less';
import { PriceType } from '../../type';

export const columns: (timeColum: ProFormColumnsType) => ProFormColumnsType[] = (timeColum) => [
  {
    title: <div className={styles.title}>基础信息</div>,
    valueType: 'group',
    colProps: {
      span: 24,
    },
    columns: [
      {
        title: '电价规则名称',
        fieldProps: {
          placeholder: '请输入',
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: '请输入电价规则名称',
            },
          ],
        },
        colProps: {
          span: 8,
        },
        dataIndex: 'name',
      },
      {
        title: '生效日期',
        valueType: 'formList',
        dataIndex: 'effectiveTimeList',
        initialValue: [{ effectiveTime: [] }],
        fieldProps: {
          copyIconProps: false,
          creatorButtonProps: {
            creatorButtonText: '新增生效日期',
            icon: <PlusCircleOutlined />,
            type: 'link',
            style: { width: 'unset' },
          },
          min: 1,
          deleteIconProps: {
            Icon: (prop: any) => {
              return <MinusCircleOutlined {...prop} style={{ color: '#165dff' }} />;
            },
            tooltipText: '删除',
          },
          itemRender: ({ listDom, action }) => {
            return (
              <Col style={{ display: 'inline-flex' }} span={8}>
                {listDom}
                {action}
              </Col>
            );
          },
        },
        colProps: {
          span: 24,
        },
        columns: [
          {
            valueType: 'group',
            columns: [
              {
                formItemProps: {
                  rules: [
                    {
                      required: true,
                      message: '请输入生效日期',
                    },
                  ],
                },
                convertValue: (value, field) => {
                  return value;
                },
                dataIndex: 'effectiveDateScoped',
                valueType: 'dateRange',
                colProps: {
                  span: 24,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: <div className={styles.title}>时段价格</div>,
    valueType: 'group',
    colProps: {
      span: 24,
    },
    columns: [
      {
        valueType: 'formList',
        dataIndex: 'hoursPriceList',
        initialValue: [{ effectiveTime: [] }],
        fieldProps: {
          copyIconProps: false,
          creatorButtonProps: {
            creatorButtonText: '新增时间段',
            icon: <PlusCircleOutlined />,
            type: 'link',
            style: { width: 'unset' },
          },
          min: 1,
          deleteIconProps: {
            Icon: (prop: any) => {
              return <MinusCircleOutlined {...prop} style={{ color: '#165dff' }} />;
            },
            tooltipText: '删除',
          },
          itemRender: ({ listDom, action }) => {
            return (
              <Row>
                <Col style={{ display: 'inline-flex', alignItems: 'flex-end' }} span={24}>
                  {listDom}
                  {action}
                </Col>
              </Row>
            );
          },
        },
        colProps: {
          span: 24,
        },
        columns: [
          {
            valueType: 'group',
            columns: [
              timeColum,
              {
                title: '上网电价',
                formItemProps: {
                  rules: [
                    {
                      required: true,
                      message: '请输入上网电价',
                    },
                  ],
                },
                dataIndex: 'electricityFees',
                colProps: {
                  span: 11,
                  offset: 1,
                },
                width: '100%',
              },
            ],
          },
        ],
      },
    ],
  },
];

export const columnsReadonly: ProFormColumnsType[] = [
  {
    title: <div className={styles.title}>基础信息</div>,
    valueType: 'group',
    colProps: {
      span: 24,
    },
    columns: [
      {
        title: '电价规则名称:',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '请输入电价规则名称',
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
      {
        title: '生效状态',
        colProps: {
          span: 8,
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
        title: '功率因素考核',
        fieldProps: {
          placeholder: '请输入',
        },
        colProps: {
          span: 8,
        },
        dataIndex: 'powerFactor',
      },
      {
        title: '基本电费类型',
        dataIndex: 'electricityType',
        fieldProps: {
          placeholder: '请输入',
        },
        colProps: {
          span: 8,
        },
        valueEnum: new Map([
          [1, '需量电费'],
          [0, '容量电费'],
        ]),
      },
      {
        title: '最大需量',
        dataIndex: 'maxDemand',
        fieldProps: {
          placeholder: '请输入',
          addonAfter: 'kW',
        },
        colProps: {
          span: 8,
        },
      },
      {
        title: '需量电价',
        dataIndex: 'demandElectrovalency',
        fieldProps: {
          placeholder: '请输入',
          addonAfter: '元',
        },
        colProps: {
          span: 8,
        },
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
    title: <div className={styles.title}>尖峰平谷价格</div>,
    valueType: 'group',
    colProps: {
      span: 24,
    },
    columns: [
      {
        title: '尖价格',
        dataIndex: 'sharpPrice',
        formItemProps: {
          labelCol: {
            flex: '0 1 60px',
          },
        },
        fieldProps: {
          placeholder: '请输入',
          addonAfter: '元',
        },
        colProps: {
          span: 6,
        },
      },
      {
        title: '峰价格',
        dataIndex: 'peakPrice',
        formItemProps: {
          labelCol: {
            flex: '0 1 60px',
          },
        },
        fieldProps: {
          placeholder: '请输入',
          addonAfter: '元',
        },
        colProps: {
          span: 6,
        },
      },
      {
        title: '平价格',
        dataIndex: 'flatPrice',
        formItemProps: {
          labelCol: {
            flex: '0 1 60px',
          },
        },
        fieldProps: {
          placeholder: '请输入',
          addonAfter: '元',
        },
        colProps: {
          span: 6,
        },
      },
      {
        title: '谷价格',
        dataIndex: 'valleyPrice',
        formItemProps: {
          labelCol: {
            flex: '0 1 60px',
          },
        },
        fieldProps: {
          placeholder: '请输入',
          addonAfter: '元',
        },
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
            if (priceItem?.type) {
              const priceList = priceTypeMap.get(priceItem.type);
              priceList?.push?.([priceItem.intervalStartTime, priceItem.intervalEndTime]);
            }
          });

          const labelMap = {
            [PriceType.SHARP]: '尖时段',
            [PriceType.PEAK]: '峰时段',
            [PriceType.SHOULDER]: '平时段',
            [PriceType.OFF_PEAK]: '谷时段',
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
