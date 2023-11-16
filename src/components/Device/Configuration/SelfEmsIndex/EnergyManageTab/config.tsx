import type { DetailItem } from '@/components/Detail';
import { powerFormat } from '@/utils/format';
import type { ProFormColumnsType } from '@ant-design/pro-components';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import styles from '../index.less';
import { Col, Row, TimePicker } from 'antd';
import { useState } from 'react';
import useSafeTimeRangeColum from '../../../../../pages/station/stationManage/setting/ElectricityPrice/components/FormUpdate/SafeTimeRange';
//const {  colum: timeColum } = useSafeTimeRangeColum();
//const [disableTime, setDisableTime] = useState<Record<string, (0 | 15 | 30 | 45 | null)[]>>({});
export const manaulParamsItems: DetailItem[] = [
  { label: '充电功率', field: 'ChargePower', unit: 'KW', parentField: 'ManualModeSetting' },
  { label: '放电功率', field: 'DischargePower', unit: 'KW', parentField: 'ManualModeSetting' },
];
export const backupModeItems: DetailItem[] = [
  { label: '充电功率', field: 'BackupChargingPower', parentField: 'BackupPowerModeSetting' },
  { label: '放电功率', field: 'BackupDischargePower', parentField: 'BackupPowerModeSetting' },
  { label: '最高SOC', field: 'BackupHighestSOC', parentField: 'BackupPowerModeSetting' },
  { label: '最低SOC', field: 'BackupMinimumSOC', parentField: 'BackupPowerModeSetting' },
];
export const BackupPowerSetColumns: ProFormColumnsType[] = [
  {
    title: '充电功率',
    dataIndex: 'BackupChargingPower',
    valueType: 'text',
    formItemProps: {
      rules: [{ required: true, message: '请输入充电功率' }],
    },
  },
  {
    title: '放电功率',
    dataIndex: 'BackupDischargePower',
    valueType: 'text',
    formItemProps: {
      rules: [{ required: true, message: '请输入放电功率' }],
    },
  },
  {
    title: '最高SOC',
    dataIndex: 'BackupHighestSOC',
    valueType: 'text',
    formItemProps: {
      rules: [{ required: true, message: '请输入最高SOC' }],
    },
  },
  {
    title: '最低SOC',
    dataIndex: 'BackupMinimumSOC',
    valueType: 'text',
    formItemProps: {
      rules: [{ required: true, message: '请输入最低SOC' }],
    },
  },
];

export const manulSetColumns: ProFormColumnsType[] = [
  {
    title: '充电功率',
    dataIndex: 'ChargePower',
    valueType: 'text',
    formItemProps: {
      rules: [{ required: true, message: '请输入充电功率' }],
    },
  },
  {
    title: '放电功率',
    dataIndex: 'DischargePower',
    valueType: 'text',
    formItemProps: {
      rules: [{ required: true, message: '请输入放电功率' }],
    },
  },
];

export const peakTimeItems: DetailItem[] = [
  {
    label: '尖电价',
    field: 'SharpElectrovalence',
    unit: '元/kWh',
    parentField: 'PeakAndValleyTimeSettings',
  },
  {
    label: '峰电价',
    field: 'PeakElectrovalence',
    unit: '元/kWh',
    parentField: 'PeakAndValleyTimeSettings',
  },
  {
    label: '平电价',
    field: 'FlatElectrovalence',
    unit: '元/kWh',
    parentField: 'PeakAndValleyTimeSettings',
  },
  {
    label: '谷电价',
    field: 'ValleyElectrovalence',
    unit: '元/kWh',
    parentField: 'PeakAndValleyTimeSettings',
  },

  { label: '尖时段', field: 'TimeFrame', parentField: 'ElectrovalenceTimeFrame' },
  { label: '峰时段', field: 'TimeFrame', parentField: 'ElectrovalenceTimeFrame' },
];
export const PeakSetColumns: ProFormColumnsType[] = [
  // {
  //   title: <div className={styles.title}>尖峰平谷电价</div>,
  //   valueType: 'group',
  //   colProps: {
  //     span: 24,
  //   },
  //   columns: [
  //     {
  //       title: '尖电价',
  //       dataIndex: 'sharpPrice',
  //       fieldProps: {
  //         placeholder: '请输入',
  //         addonAfter: '元/kWh',
  //       },
  //       colProps: {
  //         span: 12,
  //       },
  //     },
  //     {
  //       title: '峰电价',
  //       dataIndex: 'peakPrice',
  //       fieldProps: {
  //         placeholder: '请输入',
  //         addonAfter: '元/kWh',
  //       },
  //       colProps: {
  //         span: 12,
  //       },
  //     },
  //     {
  //       title: '平电价',
  //       dataIndex: 'flatPrice',
  //       fieldProps: {
  //         placeholder: '请输入',
  //         addonAfter: '元/kWh',
  //       },
  //       colProps: {
  //         span: 12,
  //       },
  //     },
  //     {
  //       title: '谷电价',
  //       dataIndex: 'valleyPrice',
  //       fieldProps: {
  //         placeholder: '请输入',
  //         addonAfter: '元/kWh',
  //       },
  //       colProps: {
  //         span: 12,
  //       },
  //     },
  //     {
  //       valueType: 'formList',
  //       dataIndex: 'hoursPriceList',
  //       initialValue: [{ effectiveTime: [] }],
  //       fieldProps: {
  //         copyIconProps: false,
  //         creatorButtonProps: {
  //           className: 'pl0',
  //           creatorButtonText: '新增时间段',
  //           icon: <PlusCircleOutlined />,
  //           type: 'link',
  //           style: { width: 'unset' },
  //         },
  //         min: 1,
  //         deleteIconProps: {
  //           Icon: (prop: any) => {
  //             return <MinusCircleOutlined {...prop} style={{ color: '#165dff' }} />;
  //           },
  //           tooltipText: '删除',
  //         },
  //         itemRender: ({ listDom, action }) => {
  //           return (
  //             <Row>
  //               <Col style={{ display: 'inline-flex', alignItems: 'flex-end' }} span={24}>
  //                 {listDom}
  //                 {action}
  //               </Col>
  //             </Row>
  //           );
  //         },
  //       },
  //       colProps: {
  //         span: 24,
  //       },
  //       columns: [
  //         {
  //           valueType: 'group',
  //           columns: [
  //             {
  //               title: '时间段',
  //               dataIndex: 'timeRange',
  //               valueType: 'timeRange',
  //               colProps: {
  //                 span: 11,
  //               },
  //               width: '100%',
  //               formItemProps: {
  //                 validateTrigger: 'submit',
  //                 rules: [
  //                   // {
  //                   //   message: '请继续选择时间范围',
  //                   //   validateTrigger: 'onChange',
  //                   //   validator: (r, value, cb) => {
  //                   //     const [_list, index, _field] = r?.field?.split('.') ?? [];
  //                   //     if (!isNil(index)) {
  //                   //       timeStore.update(index, value);
  //                   //     }
  //                   //     console.log(r, value, [...timeStore.value]);
  //                   //     throw new Error('12');
  //                   //   },
  //                   // },
  //                   // {
  //                   //   message: '时间范围未满一天',
  //                   //   validator: async (r, value) => {
  //                   //     timeStore.update(r!.field, value);
  //                   //     try {
  //                   //       await Promise.resolve();
  //                   //       if (record.calc) {
  //                   //         if (!record.pass) {
  //                   //           throw new Error();
  //                   //         }
  //                   //         return;
  //                   //       }

  //                   //       const timeMap: { ts: Date; tn: Date }[] = [];
  //                   //       timeStore.value.forEach(([start, end]) => {
  //                   //         timeMap.push({
  //                   //           ts: start,
  //                   //           tn: end,
  //                   //         });
  //                   //       });

  //                   //       record.calc = true;
  //                   //       record.pass = isWholeDay(timeMap);
  //                   //       if (!isWholeDay(timeMap)) {
  //                   //         throw new Error();
  //                   //       }
  //                   //     } finally {
  //                   //       await Promise.resolve();
  //                   //       record.calc = false;
  //                   //     }
  //                   //   },
  //                   // },
  //                 ],
  //               },
  //               renderFormItem: () => (
  //                 <TimePicker.RangePicker
  //                   order={true}
  //                   disabledTime={(date, type) => {
  //                     return {
  //                       disabledHours() {
  //                         return [...new Set(Reflect.ownKeys(disableTime).map(Number))];
  //                       },
  //                       disabledMinutes(hour) {
  //                         const hours = Reflect.ownKeys(disableTime);
  //                         return [];
  //                       },
  //                     };
  //                   }}
  //                   format={'HH:mm'}
  //                   popupClassName={styles.timePicker}
  //                 />
  //               ),
  //             },
  //             {
  //               title: '电价类型',
  //               formItemProps: {
  //                 rules: [
  //                   {
  //                     required: true,
  //                     message: '请选择电价类型',
  //                   },
  //                 ],
  //               },
  //               dataIndex: 'type',
  //               valueType: 'select',
  //               colProps: {
  //                 span: 11,
  //                 offset: 1,
  //               },
  //               width: '100%',
  //               valueEnum: new Map([
  //                 [0, '尖'],
  //                 [1, '峰'],
  //                 [2, '平'],
  //                 [3, '谷'],
  //               ]),
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    title: '尖电价',
    dataIndex: 'SharpElectrovalence',
    fieldProps: {
      placeholder: '请输入',
      addonAfter: '元/kWh',
    },
    colProps: {
      span: 12,
    },
  },
  {
    title: '峰电价',
    dataIndex: 'PeakElectrovalence',
    fieldProps: {
      placeholder: '请输入',
      addonAfter: '元/kWh',
    },
    colProps: {
      span: 12,
    },
  },
  {
    title: '平电价',
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
    initialValue: [{ effectiveTime: [] }],
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
              span: 11,
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
];
