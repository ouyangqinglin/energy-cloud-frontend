import type { ProFormColumnsType } from '@ant-design/pro-form';
import { TimePicker } from 'antd';
import { useState } from 'react';
import { isWholeDay, timeStore } from './helper';
import styles from './index.less';

const useSafeTimeRangeColum = () => {
  const [disableTime, setDisableTime] = useState<Record<string, (0 | 15 | 30 | 45 | null)[]>>({});
  // 优化性能，避免重复校验的计算
  const record = {
    calc: false,
    pass: false,
  };
  return {
    colum: {
      title: '时间段',
      dataIndex: 'timeRange',
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
          {
            required: true,
            message: '所有时间范围相加未满24小时',
            validator: async (r, value) => {
              timeStore.update(r!.field, value);
              try {
                await Promise.resolve();
                if (record.calc) {
                  if (!record.pass) {
                    throw new Error();
                  }
                  return;
                }

                const timeMap: { ts: Date; tn: Date }[] = [];
                timeStore.value.forEach(([start, end]) => {
                  timeMap.push({
                    ts: start,
                    tn: end,
                  });
                });

                record.calc = true;
                record.pass = isWholeDay(timeMap);
                if (!isWholeDay(timeMap)) {
                  throw new Error();
                }
              } finally {
                await Promise.resolve();
                record.calc = false;
              }
            },
          },
        ],
      },
      renderFormItem: () => (
        <TimePicker.RangePicker
          order={true}
          disabledTime={(date, type) => {
            return {
              disabledHours() {
                return [...new Set(Reflect.ownKeys(disableTime).map(Number))];
              },
              disabledMinutes(hour) {
                const hours = Reflect.ownKeys(disableTime);
                return [];
              },
            };
          }}
          format={'HH:mm'}
          popupClassName={styles.timePicker}
        />
      ),
    } as ProFormColumnsType,
    resetTimeStore: () => timeStore.reset(),
  };
};

export default useSafeTimeRangeColum;
