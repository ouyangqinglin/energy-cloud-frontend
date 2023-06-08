import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import type { ProFormColumnsType } from '@ant-design/pro-form';
import { Col, Row } from 'antd';
import styles from '../index.less';

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
                title: '电费',
                formItemProps: {
                  rules: [
                    {
                      required: true,
                      message: '请输入电费',
                    },
                  ],
                },
                dataIndex: 'electricityFees',
                colProps: {
                  span: 5,
                  offset: 1,
                },
                width: '100%',
              },
              {
                title: '服务费',
                formItemProps: {
                  rules: [
                    {
                      required: true,
                      message: '请输入服务费',
                    },
                  ],
                },
                dataIndex: 'serviceFees',
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
