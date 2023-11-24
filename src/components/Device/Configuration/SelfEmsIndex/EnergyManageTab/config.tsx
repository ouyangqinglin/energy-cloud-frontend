import type { DetailItem } from '@/components/Detail';
import { chargePutFormat, moneyPowerFormat, percentageFormat, powerFormat } from '@/utils/format';
import type { ProFormColumnsType } from '@ant-design/pro-components';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import styles from '../index.less';
import { Col, Row, TimePicker } from 'antd';
import { useState } from 'react';
import useSafeTimeRangeColum from '../../../../../pages/station/stationManage/setting/ElectricityPrice/components/FormUpdate/SafeTimeRange';
import { chargingPutStatus } from '@/utils/dictionary';
//const {  colum: timeColum } = useSafeTimeRangeColum();
//const [disableTime, setDisableTime] = useState<Record<string, (0 | 15 | 30 | 45 | null)[]>>({});
export const manaulParamsItems: DetailItem[] = [
  {
    label: '充电功率',
    field: 'ChargingPower',
    format: powerFormat,
    parentField: 'ManualModeSetting',
  },
  {
    label: '放电功率',
    field: 'DischargePower',
    format: powerFormat,
    parentField: 'ManualModeSetting',
  },
];
export const backupModeItems: DetailItem[] = [
  {
    label: '充电功率',
    field: 'BackupChargingPower',
    format: powerFormat,
    parentField: 'BackupPowerModeSetting',
  },
  {
    label: '放电功率',
    field: 'BackupDischargePower',
    format: powerFormat,
    parentField: 'BackupPowerModeSetting',
  },
  {
    label: '最高SOC',
    field: 'BackupHighestSOC',
    format: percentageFormat,
    parentField: 'BackupPowerModeSetting',
  },
  {
    label: '最低SOC',
    field: 'BackupMinimumSOC',
    format: percentageFormat,
    parentField: 'BackupPowerModeSetting',
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
    parentField: 'PeakAndValleyTimeSettings',
  },
  {
    label: '峰电价',
    field: 'PeakElectrovalence',
    format: moneyPowerFormat,
    parentField: 'PeakAndValleyTimeSettings',
  },
  {
    label: '平电价',
    field: 'FlatElectrovalence',
    format: moneyPowerFormat,
    parentField: 'PeakAndValleyTimeSettings',
  },
  {
    label: '谷电价',
    field: 'ValleyElectrovalence',
    format: moneyPowerFormat,
    parentField: 'PeakAndValleyTimeSettings',
  },

  { label: '尖时段', field: 'TimeFrame', parentField: 'ElectrovalenceTimeFrame' },
  { label: '峰时段', field: 'TimeFrame', parentField: 'ElectrovalenceTimeFrame' },
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
    colProps: {
      span: 24,
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
    colProps: {
      span: 24,
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
    colProps: {
      span: 12,
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
    colProps: {
      span: 12,
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
            title: '时间段',
            dataIndex: 'TimeFrame',
            valueType: 'timeRange',
            colProps: {
              span: 12,
            },
            width: '100%',
            formItemProps: {
              validateTrigger: 'submit',
              rules: [
                // {
                //   message: '请继续选择时间范围',
                //   validateTrigger: 'onChange',
                //   validator: (r, value, cb) => {
                //     const [_list, index, _field] = r?.field?.split('.') ?? [];
                //     if (!isNil(index)) {
                //       timeStore.update(index, value);
                //     }
                //     console.log(r, value, [...timeStore.value]);
                //     throw new Error('12');
                //   },
                // },
                // {
                //   message: '时间范围未满一天',
                //   validator: async (r, value) => {
                //     timeStore.update(r!.field, value);
                //     try {
                //       await Promise.resolve();
                //       if (record.calc) {
                //         if (!record.pass) {
                //           throw new Error();
                //         }
                //         return;
                //       }
                //       const timeMap: { ts: Date; tn: Date }[] = [];
                //       timeStore.value.forEach(([start, end]) => {
                //         timeMap.push({
                //           ts: start,
                //           tn: end,
                //         });
                //       });
                //       record.calc = true;
                //       record.pass = isWholeDay(timeMap);
                //       if (!isWholeDay(timeMap)) {
                //         throw new Error();
                //       }
                //     } finally {
                //       await Promise.resolve();
                //       record.calc = false;
                //     }
                //   },
                // },
              ],
            },
            renderFormItem: () => (
              <TimePicker.RangePicker
                order={true}
                // disabledTime={(date, type) => {
                //   return {
                //     disabledHours() {
                //       return [...new Set(Reflect.ownKeys(disableTime).map(Number))];
                //     },
                //     disabledMinutes(hour) {
                //       const hours = Reflect.ownKeys(disableTime);
                //       return [];
                //     },
                //   };
                // }}
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
              offset: 1,
            },
            width: '100px',
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
];
