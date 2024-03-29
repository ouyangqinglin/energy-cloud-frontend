import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import type { ProFormColumnsType } from '@ant-design/pro-form';
import { Col, Row } from 'antd';
import dayjs from 'dayjs';
import { isEmpty, uniqueId } from 'lodash';
import React from 'react';
import type { EffectiveTimeList, HoursPriceList } from '../../type';
import styles from '../index.less';
import { PriceType } from '../../type';
import { formatMessage, getLocale } from '@/utils';
const isUS = getLocale().isEnUS;

export const PriceTypeOptions = [
  {
    label: formatMessage({ id: 'dataManage.theTip', defaultMessage: '尖' }),
    value: PriceType.SHARP,
  },
  {
    label: formatMessage({ id: 'dataManage.peak', defaultMessage: '峰' }),
    value: PriceType.PEAK,
  },
  {
    label: formatMessage({ id: 'dataManage.flat', defaultMessage: '平' }),
    value: PriceType.SHOULDER,
  },
  {
    label: formatMessage({ id: 'dataManage.valley', defaultMessage: '谷' }),
    value: PriceType.OFF_PEAK,
  },
];

export const columns: (timeColum: ProFormColumnsType, setType: 0 | 1) => ProFormColumnsType[] = (
  timeColum,
  setType,
) => [
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
        fieldProps: {
          placeholder: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: formatMessage({
                id: 'pages.searchTable.updateForm.ruleName.nameRules',
                defaultMessage: '请输入规则名称',
              }),
            },
          ],
        },
        colProps: {
          span: 8,
        },
        dataIndex: 'name',
      },
      {
        title: formatMessage({
          id: 'siteManage.siteList.effectiveDate',
          defaultMessage: '生效日期',
        }),
        valueType: 'formList',
        dataIndex: 'effectiveTimeList',
        initialValue: [{ effectiveTime: [] }],
        fieldProps: {
          copyIconProps: false,
          creatorButtonProps: {
            creatorButtonText: formatMessage({
              id: 'siteManage.siteList.addEffectiveDate',
              defaultMessage: '新增生效日期',
            }),
            icon: <PlusCircleOutlined />,
            type: 'link',
            style: { width: 'unset' },
          },
          min: 1,
          deleteIconProps: {
            Icon: (prop: any) => {
              return <MinusCircleOutlined {...prop} style={{ color: '#165dff' }} />;
            },
            tooltipText: formatMessage({ id: 'common.delete', defaultMessage: '删除' }),
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
                      message: formatMessage({
                        id: 'common.pleaseEnter',
                        defaultMessage: '请输入',
                      }),
                    },
                  ],
                },
                fieldProps: {
                  format: isUS ? 'MM/DD' : 'MM-DD',
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
        valueType: 'formList',
        dataIndex: 'hoursPriceList',
        initialValue: [{ effectiveTime: [] }],
        fieldProps: {
          copyIconProps: false,
          creatorButtonProps: {
            className: 'pl0',
            creatorButtonText: formatMessage({
              id: 'siteManage.set.addTimeSlot',
              defaultMessage: '新增时间段',
            }),
            icon: <PlusCircleOutlined />,
            type: 'link',
            style: { width: 'unset' },
          },
          min: 1,
          ...(setType === 1 ? { max: 10 } : ''),
          deleteIconProps: {
            Icon: (prop: any) => {
              return <MinusCircleOutlined {...prop} style={{ color: '#165dff' }} />;
            },
            tooltipText: formatMessage({ id: 'common.delete', defaultMessage: '删除' }),
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
                title: formatMessage({
                  id: 'siteManage.set.feedInTariff',
                  defaultMessage: '上网电价',
                }),
                formItemProps: {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({
                        id: 'common.pleaseEnter',
                        defaultMessage: '请输入',
                      }),
                    },
                  ],
                },
                fieldProps: {
                  addonAfter: formatMessage({
                    id: 'siteManage.set.rmb/kwh',
                    defaultMessage: '元/kWh',
                  }),
                },
                dataIndex: 'electricityFees',
                valueType: 'digit',
                colProps: {
                  span: setType === 1 ? 7 : 11,
                  offset: 1,
                },
                width: '100%',
              },
              ...(setType === 1
                ? [
                    {
                      title: formatMessage({
                        id: 'device.electricityPriceType',
                        defaultMessage: '电价类型',
                      }),
                      formItemProps: {
                        rules: [
                          {
                            required: true,
                            message: formatMessage({
                              id: 'common.pleaseSelect',
                              defaultMessage: '请选择',
                            }),
                          },
                        ],
                      },
                      fieldProps: {
                        options: PriceTypeOptions,
                      },
                      dataIndex: 'elecType',
                      valueType: 'select',
                      colProps: {
                        span: 5,
                      },
                      width: '100%',
                    } as any,
                  ]
                : []),
            ],
          },
        ],
      },
    ],
  },
];

export const columnsReadonly: ProFormColumnsType[] = [
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
          id: 'siteManage.set.ElectricityPriceRulesName',
          defaultMessage: '电价规则名称',
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
      {
        title: formatMessage({ id: 'siteManage.set.EffectiveStatus', defaultMessage: '生效状态' }),
        colProps: {
          span: 8,
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
          id: 'siteManage.set.powerFactorAssessment',
          defaultMessage: '功率因数考核',
        }),
        fieldProps: {
          placeholder: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
        },
        colProps: {
          span: 8,
        },
        dataIndex: 'powerFactor',
      },
      {
        title: formatMessage({
          id: 'siteManage.set.BasicElectricityType',
          defaultMessage: '基本电费类型',
        }),
        dataIndex: 'electricityType',
        fieldProps: {
          placeholder: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
        },
        colProps: {
          span: 8,
        },
        valueEnum: new Map([
          [1, formatMessage({ id: 'siteManage.set.demandCharge', defaultMessage: '需量电费' })],
          [0, formatMessage({ id: 'siteManage.set.capacityCharge', defaultMessage: '容量电费' })],
        ]),
      },
      {
        title: formatMessage({ id: 'siteManage.set.maximumDemand', defaultMessage: '最大需量' }),
        dataIndex: 'maxDemand',
        fieldProps: {
          placeholder: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
          addonAfter: 'kW',
        },
        colProps: {
          span: 8,
        },
      },
      {
        title: formatMessage({
          id: 'siteManage.set.DemandElectricityPrice',
          defaultMessage: '需量电价',
        }),
        dataIndex: 'demandElectrovalency',
        fieldProps: {
          placeholder: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
          addonAfter: formatMessage({ id: 'common.rmb', defaultMessage: '元' }),
        },
        colProps: {
          span: 8,
        },
      },
      {
        title: formatMessage({ id: 'common.rmb', defaultMessage: '生效日期' }),
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
          id: 'siteManage.set.PeakAndFlatValleyPrices',
          defaultMessage: '尖峰平谷价格',
        })}
      </div>
    ),
    valueType: 'group',
    colProps: {
      span: 24,
    },
    columns: [
      {
        title: formatMessage({ id: 'siteManage.set.SharpPrices', defaultMessage: '尖价格' }),
        dataIndex: 'sharpPrice',
        formItemProps: {
          labelCol: {
            flex: '0 1 60px',
          },
        },
        fieldProps: {
          placeholder: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
          addonAfter: formatMessage({ id: 'common.rmb', defaultMessage: '元' }),
        },
        colProps: {
          span: 6,
        },
      },
      {
        title: formatMessage({ id: 'siteManage.set.PeakPrices', defaultMessage: '峰价格' }),
        dataIndex: 'peakPrice',
        formItemProps: {
          labelCol: {
            flex: '0 1 60px',
          },
        },
        fieldProps: {
          placeholder: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
          addonAfter: formatMessage({ id: 'common.rmb', defaultMessage: '元' }),
        },
        colProps: {
          span: 6,
        },
      },
      {
        title: formatMessage({ id: 'siteManage.set.AveragePrices', defaultMessage: '平价格' }),
        dataIndex: 'flatPrice',
        formItemProps: {
          labelCol: {
            flex: '0 1 60px',
          },
        },
        fieldProps: {
          placeholder: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
          addonAfter: formatMessage({ id: 'common.rmb', defaultMessage: '元' }),
        },
        colProps: {
          span: 6,
        },
      },
      {
        title: formatMessage({ id: 'siteManage.set.ValleyPrices', defaultMessage: '谷价格' }),
        dataIndex: 'valleyPrice',
        formItemProps: {
          labelCol: {
            flex: '0 1 60px',
          },
        },
        fieldProps: {
          placeholder: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
          addonAfter: formatMessage({ id: 'common.rmb', defaultMessage: '元' }),
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
          return <span>{value}</span>;
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
