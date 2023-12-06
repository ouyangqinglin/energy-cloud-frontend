import type { DetailItem } from '@/components/Detail';
import { powerFormat } from '@/utils/format';
import type { ProFormColumnsType } from '@ant-design/pro-components';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import styles from '../index.less';
import { Col, Row, TimePicker } from 'antd';
import { useState } from 'react';
import useSafeTimeRangeColum from '../../../../../pages/station/stationManage/setting/ElectricityPrice/components/FormUpdate/SafeTimeRange';
import { formatMessage } from '@/utils';
//const {  colum: timeColum } = useSafeTimeRangeColum();
//const [disableTime, setDisableTime] = useState<Record<string, (0 | 15 | 30 | 45 | null)[]>>({});
export const manaulParamsItems: DetailItem[] = [
  {
    label: formatMessage({ id: 'device.chargingPower', defaultMessage: '充电功率' }),
    field: 'ChargePower',
    unit: 'KW',
    parentField: 'ManualModeSetting',
  },
  {
    label: formatMessage({ id: 'device.dischargePower', defaultMessage: '放电功率' }),
    field: 'DischargePower',
    unit: 'KW',
    parentField: 'ManualModeSetting',
  },
];
export const backupModeItems: DetailItem[] = [
  {
    label: formatMessage({ id: 'device.chargingPower', defaultMessage: '充电功率' }),
    field: 'BackupChargingPower',
    parentField: 'BackupPowerModeSetting',
  },
  {
    label: formatMessage({ id: 'device.dischargePower', defaultMessage: '放电功率' }),
    field: 'BackupDischargePower',
    parentField: 'BackupPowerModeSetting',
  },
  {
    label: formatMessage({ id: 'device.maxSoc', defaultMessage: '最高SOC' }),
    field: 'BackupHighestSOC',
    parentField: 'BackupPowerModeSetting',
  },
  {
    label: formatMessage({ id: 'device.minSoc', defaultMessage: '最低SOC' }),
    field: 'BackupMinimumSOC',
    parentField: 'BackupPowerModeSetting',
  },
];
export const BackupPowerSetColumns: ProFormColumnsType[] = [
  {
    title: formatMessage({ id: 'device.chargingPower', defaultMessage: '充电功率' }),
    dataIndex: 'BackupChargingPower',
    valueType: 'digit',
    formItemProps: {
      rules: [
        {
          required: true,
          message:
            formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
            formatMessage({ id: 'device.chargingPower', defaultMessage: '充电功率' }),
        },
      ],
    },
  },
  {
    title: formatMessage({ id: 'device.dischargePower', defaultMessage: '放电功率' }),
    dataIndex: 'BackupDischargePower',
    valueType: 'digit',
    formItemProps: {
      rules: [
        {
          required: true,
          message:
            formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
            formatMessage({ id: 'device.dischargePower', defaultMessage: '放电功率' }),
        },
      ],
    },
  },
  {
    title: formatMessage({ id: 'device.maxSoc', defaultMessage: '最高SOC' }),
    dataIndex: 'BackupHighestSOC',
    valueType: 'digit',
    formItemProps: {
      rules: [
        {
          required: true,
          message:
            formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
            formatMessage({ id: 'device.maxSoc', defaultMessage: '放最高SOC电功率' }),
        },
      ],
    },
  },
  {
    title: formatMessage({ id: 'device.minSoc', defaultMessage: '最低SOC' }),
    dataIndex: 'BackupMinimumSOC',
    valueType: 'digit',
    formItemProps: {
      rules: [
        {
          required: true,
          message:
            formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
            formatMessage({ id: 'device.minSoc', defaultMessage: '最低SOC' }),
        },
      ],
    },
  },
];

export const manulSetColumns: ProFormColumnsType[] = [
  {
    title: formatMessage({ id: 'device.chargingPower', defaultMessage: '充电功率' }),
    dataIndex: 'ChargePower',
    valueType: 'digit',
    formItemProps: {
      rules: [
        {
          required: true,
          message:
            formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
            formatMessage({ id: 'device.chargingPower', defaultMessage: '充电功率' }),
        },
      ],
    },
  },
  {
    title: formatMessage({ id: 'device.dischargePower', defaultMessage: '放电功率' }),
    dataIndex: 'DischargePower',
    valueType: 'digit',
    formItemProps: {
      rules: [
        {
          required: true,
          message:
            formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
            formatMessage({ id: 'device.dischargePower', defaultMessage: '放电功率' }),
        },
      ],
    },
  },
];

export const peakTimeItems: DetailItem[] = [
  {
    label:
      formatMessage({ id: 'dataManage.theTip', defaultMessage: '尖' }) +
      formatMessage({ id: 'device.electrovalence', defaultMessage: '电价' }),
    field: 'SharpElectrovalence',
    unit: formatMessage({ id: 'common.rmb', defaultMessage: '元' }) + '/kWh',
    parentField: 'PeakAndValleyTimeSettings',
  },
  {
    label:
      formatMessage({ id: 'dataManage.peak', defaultMessage: '峰' }) +
      formatMessage({ id: 'device.electrovalence', defaultMessage: '电价' }),
    field: 'PeakElectrovalence',
    unit: formatMessage({ id: 'common.rmb', defaultMessage: '元' }) + '/kWh',
    parentField: 'PeakAndValleyTimeSettings',
  },
  {
    label:
      formatMessage({ id: 'dataManage.flat', defaultMessage: '平' }) +
      formatMessage({ id: 'device.electrovalence', defaultMessage: '电价' }),
    field: 'FlatElectrovalence',
    unit: formatMessage({ id: 'common.rmb', defaultMessage: '元' }) + '/kWh',
    parentField: 'PeakAndValleyTimeSettings',
  },
  {
    label:
      formatMessage({ id: 'dataManage.valley', defaultMessage: '谷' }) +
      formatMessage({ id: 'device.electrovalence', defaultMessage: '电价' }),
    field: 'ValleyElectrovalence',
    unit: formatMessage({ id: 'common.rmb', defaultMessage: '元' }) + '/kWh',
    parentField: 'PeakAndValleyTimeSettings',
  },
  {
    label:
      formatMessage({ id: 'dataManage.theTip', defaultMessage: '尖' }) +
      formatMessage({ id: 'device.timePeriod', defaultMessage: '时段' }),
    field: 'TimeFrame',
    parentField: 'ElectrovalenceTimeFrame',
  },
  {
    label:
      formatMessage({ id: 'dataManage.peak', defaultMessage: '峰' }) +
      formatMessage({ id: 'device.timePeriod', defaultMessage: '时段' }),
    field: 'TimeFrame',
    parentField: 'ElectrovalenceTimeFrame',
  },
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
    title:
      formatMessage({ id: 'dataManage.theTip', defaultMessage: '尖' }) +
      formatMessage({ id: 'device.electrovalence', defaultMessage: '电价' }),
    valueType: 'digit',
    dataIndex: 'SharpElectrovalence',
    fieldProps: {
      placeholder: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
      addonAfter: formatMessage({ id: 'common.rmb', defaultMessage: '元' }) + '/kWh',
    },
    colProps: {
      span: 24,
    },
  },
  {
    title:
      formatMessage({ id: 'dataManage.peak', defaultMessage: '峰' }) +
      formatMessage({ id: 'device.electrovalence', defaultMessage: '电价' }),
    valueType: 'digit',
    dataIndex: 'PeakElectrovalence',
    fieldProps: {
      placeholder: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
      addonAfter: formatMessage({ id: 'common.rmb', defaultMessage: '元' }) + '/kWh',
    },
    colProps: {
      span: 24,
    },
  },
  {
    title:
      formatMessage({ id: 'dataManage.flat', defaultMessage: '平' }) +
      formatMessage({ id: 'device.electrovalence', defaultMessage: '电价' }),
    valueType: 'digit',
    dataIndex: 'FlatElectrovalence',
    fieldProps: {
      placeholder: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
      addonAfter: formatMessage({ id: 'common.rmb', defaultMessage: '元' }) + '/kWh',
    },
    colProps: {
      span: 12,
    },
  },
  {
    title:
      formatMessage({ id: 'dataManage.valley', defaultMessage: '谷' }) +
      formatMessage({ id: 'device.electrovalence', defaultMessage: '电价' }),
    valueType: 'digit',
    dataIndex: 'ValleyElectrovalence',
    fieldProps: {
      placeholder: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
      addonAfter: formatMessage({ id: 'common.rmb', defaultMessage: '元' }) + '/kWh',
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
        creatorButtonText:
          formatMessage({ id: 'common.add', defaultMessage: '新建' }) +
          formatMessage({ id: 'device.timePeriod', defaultMessage: '时间段' }),
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
          {
            title: formatMessage({ id: 'device.timePeriod', defaultMessage: '时间段' }),
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
            title: formatMessage({ id: 'device.electricityPriceType', defaultMessage: '电价类型' }),
            formItemProps: {
              rules: [
                {
                  required: true,
                  message:
                    formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }) +
                    formatMessage({
                      id: 'device.electricityPriceType',
                      defaultMessage: '电价类型',
                    }),
                },
              ],
            },
            dataIndex: 'ElectrovalenceType',
            valueType: 'select',
            colProps: {
              span: 12,
              offset: 1,
            },
            width: '100%',
            valueEnum: new Map([
              [0, formatMessage({ id: 'dataManage.theTip', defaultMessage: '尖' })],
              [1, formatMessage({ id: 'dataManage.peak', defaultMessage: '峰' })],
              [2, formatMessage({ id: 'dataManage.flat', defaultMessage: '平' })],
              [3, formatMessage({ id: 'dataManage.valley', defaultMessage: '谷' })],
            ]),
          },
        ],
      },
    ],
  },
];
