import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import type { ProFormColumnsType } from '@ant-design/pro-form';
import { Col, Row, Tag } from 'antd';
import styles from './index.less';

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
                  console.log(value, field);
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
    title: <div className={styles.title}>尖峰平谷价格</div>,
    valueType: 'group',
    colProps: {
      span: 24,
    },
    columns: [
      {
        title: '尖价格',
        dataIndex: 'sharpPrice',
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
        fieldProps: {
          placeholder: '请输入',
          addonAfter: '元',
        },
        colProps: {
          span: 6,
        },
      },
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
                title: '电价类型',
                formItemProps: {
                  rules: [
                    {
                      required: true,
                      message: '请选择电价类型',
                    },
                  ],
                },
                dataIndex: 'type',
                valueType: 'select',
                colProps: {
                  span: 11,
                  offset: 1,
                },
                width: '100%',
                valueEnum: new Map([
                  [0, '尖'],
                  [1, '峰'],
                  [2, '平'],
                  [3, '谷'],
                ]),
              },
            ],
          },
        ],
      },
    ],
  },
];

export const columnsReadonly = [
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
            span: 3,
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
        render: (_, entity) => {
          console.log(entity);
          return <Tag color="success">success</Tag>;
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
                  console.log(value, field);
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
    title: <div className={styles.title}>尖峰平谷价格</div>,
    valueType: 'group',
    colProps: {
      span: 24,
    },
    columns: [
      {
        title: '尖价格',
        dataIndex: 'sharpPrice',
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
        fieldProps: {
          placeholder: '请输入',
          addonAfter: '元',
        },
        colProps: {
          span: 6,
        },
      },
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
              {
                title: '电价类型',
                formItemProps: {
                  rules: [
                    {
                      required: true,
                      message: '请选择电价类型',
                    },
                  ],
                },
                dataIndex: 'type',
                valueType: 'select',
                colProps: {
                  span: 11,
                  offset: 1,
                },
                width: '100%',
                valueEnum: new Map([
                  [0, '尖'],
                  [1, '峰'],
                  [2, '平'],
                  [3, '谷'],
                ]),
              },
            ],
          },
        ],
      },
    ],
  },
];
