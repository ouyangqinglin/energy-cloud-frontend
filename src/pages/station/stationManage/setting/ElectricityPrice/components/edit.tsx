import type { ProFormColumnsType } from '@ant-design/pro-form';
import { getCustomerInfo, saveCustomerInfo } from '../service';
import YTModalForm from '@/components/YTModalForm';
import { FormOperations } from '@/components/YTModalForm/typing';
import styles from './index.less';
import { Col } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Row } from 'antd/lib/grid';
import useSafeTimeRangeColum from './SafeTimeRange';
const columns: (timeColum: ProFormColumnsType) => ProFormColumnsType[] = (timeColum) => [
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
        colProps: {
          span: 8,
        },
        dataIndex: 'account',
      },
      {
        title: '功率因素考核',
        fieldProps: {
          placeholder: '请输入',
        },
        colProps: {
          span: 8,
        },
        dataIndex: 'userName',
      },
      {
        title: '基本电费类型',
        dataIndex: 'status',
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
        dataIndex: 'max',
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
        dataIndex: 'price',
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
        dataIndex: 'list',
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
                dataIndex: 'effectiveTime',
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
        dataIndex: 'price',
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
        dataIndex: 'price',
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
        dataIndex: 'price',
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
        dataIndex: 'price',
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
        dataIndex: 'list',
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
                dataIndex: 'priceType',
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

const DEFAULT_PROPS = {
  layout: 'vertical',
  labelCol: { flex: 'auto' },
  wrapperCol: { flex: 'auto' },
};

export const UpdateModal = (props: {
  visible: boolean;
  onVisibleChange: (state: boolean) => void;
  operations: FormOperations;
  initialValues?: any;
}) => {
  const { resetTimeStore, colum: timeColum } = useSafeTimeRangeColum();
  return (
    <YTModalForm<any>
      title={'新增市电电价规则'}
      {...DEFAULT_PROPS}
      colProps={{
        span: 24,
      }}
      layoutType={'ModalForm'}
      columns={columns(timeColum)}
      onSubmitCapture={() => {
        resetTimeStore();
      }}
      onFinish={async (values) => {
        console.log(values);
        await saveCustomerInfo(values);
        return true;
      }}
      request={(param) => {
        return getCustomerInfo(param).then((res) => {
          return res.data;
        });
      }}
      {...props}
    />
  );
};
