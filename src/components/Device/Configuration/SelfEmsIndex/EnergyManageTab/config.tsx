import type { DetailItem } from '@/components/Detail';
import { chargePutFormat, moneyPowerFormat, percentageFormat, powerFormat } from '@/utils/format';
import type { FormInstance, ProFormColumnsType } from '@ant-design/pro-components';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import styles from '../index.less';
import { Col, Row, TimePicker } from 'antd';
import { Moment } from 'moment';

const hourFormat = 'HH:mm';

export const validateAllTime = (value: any, field: string) => {
  if (
    value?.[0]?.[field]?.[0]?.format?.(hourFormat) != '00:00' ||
    value?.[value?.length - 1]?.[field]?.[1]?.format?.(hourFormat) != '23:59'
  ) {
    return Promise.reject('时间段应满24小时');
  } else {
    return Promise.resolve();
  }
};

const validatorTime = (
  rule: any,
  value: Moment[],
  field: string,
  getFieldValue: FormInstance['getFieldValue'],
) => {
  const periodOfTime = getFieldValue(field);
  const ruleField = rule?.field?.split?.('.');
  const index = ruleField?.[1] * 1;
  const prevValue: Moment[] = periodOfTime[index - 1]?.[ruleField?.[2]];
  const nextValue: Moment[] = periodOfTime[index + 1]?.[ruleField?.[2]];
  if (value && value.length) {
    if (
      prevValue &&
      prevValue.length &&
      value[0].format(hourFormat) != prevValue[1].format(hourFormat)
    ) {
      return Promise.reject(new Error(`时段${index + 1}开始时间应等于时段${index}结束时间`));
    }
    if (
      nextValue &&
      nextValue.length &&
      value[1].format(hourFormat) != nextValue[0].format(hourFormat)
    ) {
      return Promise.reject(new Error(`时段${index + 1}结束时间应等于时段${index + 2}开始时间`));
    }
  }
  return Promise.resolve();
};

export const validateTime = (field: string, getFieldValue: FormInstance['getFieldValue']) => {
  return {
    validator: (_: any, value: Moment[]) => {
      return validatorTime(_, value, field, getFieldValue);
    },
  };
};

export const manaulParamsItems: DetailItem[] = [
  {
    label: '充电功率',
    field: 'ChargingPower',
    format: powerFormat,
  },
  {
    label: '放电功率',
    field: 'DischargePower',
    format: powerFormat,
  },
];
export const backupModeItems: DetailItem[] = [
  {
    label: '充电功率',
    field: 'BackupChargingPower',
    format: powerFormat,
  },
  {
    label: '放电功率',
    field: 'BackupDischargePower',
    format: powerFormat,
  },
  {
    label: '最高SOC',
    field: 'BackupHighestSOC',
    format: percentageFormat,
  },
  {
    label: '最低SOC',
    field: 'BackupMinimumSOC',
    format: percentageFormat,
  },
];
export const BackupPowerSetColumns: ProFormColumnsType[] = [
  {
    title: '充电功率',
    dataIndex: 'BackupChargingPower',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入充电功率' }],
    },
  },
  {
    title: '放电功率',
    dataIndex: 'BackupDischargePower',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入放电功率' }],
    },
  },
  {
    title: '最高SOC',
    dataIndex: 'BackupHighestSOC',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入最高SOC' }],
    },
  },
  {
    title: '最低SOC',
    dataIndex: 'BackupMinimumSOC',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入最低SOC' }],
    },
  },
];

export const manulSetColumns: ProFormColumnsType[] = [
  {
    title: '充电功率',
    dataIndex: 'ChargingPower',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入充电功率' }],
    },
  },
  {
    title: '放电功率',
    dataIndex: 'DischargePower',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入放电功率' }],
    },
  },
];

export const peakTimeItems: DetailItem[] = [
  {
    label: '尖电价',
    field: 'SharpElectrovalence',
    format: moneyPowerFormat,
  },
  {
    label: '峰电价',
    field: 'PeakElectrovalence',
    format: moneyPowerFormat,
  },
  {
    label: '平电价',
    field: 'FlatElectrovalence',
    format: moneyPowerFormat,
  },
  {
    label: '谷电价',
    field: 'ValleyElectrovalence',
    format: moneyPowerFormat,
    span: 3,
  },
  { label: '尖时段', field: 'sharpTime', span: 3 },
  { label: '峰时段', field: 'peakTime', span: 3 },
  { label: '平时段', field: 'flatTime', span: 3 },
  { label: '谷时段', field: 'valleyTime', span: 3 },
];

export const PeakSetColumns: ProFormColumnsType[] = [
  {
    title: '尖电价',
    valueType: 'digit',
    dataIndex: 'SharpElectrovalence',
    fieldProps: {
      placeholder: '请输入',
      addonAfter: '元/kWh',
    },
    formItemProps: {
      rules: [{ required: true, message: '请输入尖电价' }],
    },
  },
  {
    title: '峰电价',
    valueType: 'digit',
    dataIndex: 'PeakElectrovalence',
    fieldProps: {
      placeholder: '请输入',
      addonAfter: '元/kWh',
    },
    formItemProps: {
      rules: [{ required: true, message: '请输入峰电价' }],
    },
  },
  {
    title: '平电价',
    valueType: 'digit',
    dataIndex: 'FlatElectrovalence',
    fieldProps: {
      placeholder: '请输入',
      addonAfter: '元/kWh',
    },
    formItemProps: {
      rules: [{ required: true, message: '请输入平电价' }],
    },
  },
  {
    title: '谷电价',
    valueType: 'digit',
    dataIndex: 'ValleyElectrovalence',
    fieldProps: {
      placeholder: '请输入',
      addonAfter: '元/kWh',
    },
    formItemProps: {
      rules: [{ required: true, message: '请输入谷电价' }],
    },
  },
  {
    valueType: 'formList',
    dataIndex: 'ElectrovalenceTimeFrame',
    // initialValue: [{ effectiveTime: [] }],
    initialValue: [],
    fieldProps: {
      copyIconProps: false,
      creatorButtonProps: {
        className: 'pl0',
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
      itemRender: ({ listDom, action }: any) => {
        return (
          <div>
            <Row>
              <Col style={{ display: 'inline-flex', alignItems: 'flex-end' }} span={24}>
                {listDom}
                {action}
              </Col>
            </Row>
          </div>
        );
      },
    },
    formItemProps: {
      rules: [
        {
          validator: (_, value) => validateAllTime(value, 'TimeFrame'),
        },
      ],
    },
    colProps: {
      span: 18,
    },
    columns: [
      {
        valueType: 'group',
        columns: [
          {
            title: '时间段',
            dataIndex: 'TimeFrame',
            valueType: 'timeRange',
            colProps: {
              span: 12,
            },
            formItemProps: ({ getFieldValue }) => {
              return {
                rules: [
                  {
                    required: true,
                    message: '请选择时间段',
                  },
                  {
                    validator: (rule, value) => {
                      return validatorTime(rule, value, 'ElectrovalenceTimeFrame', getFieldValue);
                    },
                  },
                ],
              };
            },
            renderFormItem: () => (
              <TimePicker.RangePicker
                order={true}
                format={'HH:mm'}
                popupClassName={styles.timePicker}
              />
            ),
          },
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
            dataIndex: 'ElectrovalenceType',
            valueType: 'select',
            colProps: {
              span: 12,
            },
            valueEnum: new Map([
              [0, '尖'],
              [1, '峰'],
              [2, '平'],
              [3, '谷'],
            ]),
          },
        ],
        colProps: {
          span: 24,
        },
      },
    ],
  },
];
