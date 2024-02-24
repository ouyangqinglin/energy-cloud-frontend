import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import type { ProFormColumnsType } from '@ant-design/pro-form';
import { Col, Row } from 'antd';
import styles from '../index.less';
import { formatMessage } from '@/utils';
export const columns: (timeColum: ProFormColumnsType) => ProFormColumnsType[] = (timeColum) => [
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
                  format: 'MM/DD',
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
                title: formatMessage({ id: 'device.electrovalence', defaultMessage: '电价' }),
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
                  span: 5,
                  offset: 1,
                },
                width: '100%',
              },
              {
                title: formatMessage({
                  id: 'siteManage.set.serviceCharge',
                  defaultMessage: '服务费',
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
                dataIndex: 'serviceFees',
                valueType: 'digit',
                colProps: {
                  span: 5,
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
