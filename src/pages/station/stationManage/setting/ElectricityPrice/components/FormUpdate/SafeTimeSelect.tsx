import type { ProFormColumnsType } from '@ant-design/pro-form';
import { Row, Select, Col } from 'antd';
import { isWholeDay, timeStore, timeList } from './helper';
import { formatMessage } from '@/utils';
import { SwapRightOutlined } from '@ant-design/icons';
import React, { memo, useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import moment from 'moment';

let currentField = '';
type SelectProps = {
  value?: string[];
  onChange?: (value?: string[]) => void;
};

const SafeTimeSelect: React.FC<SelectProps> = memo((props) => {
  const { value = [], onChange } = props;
  const [currentValue, setCurrentValue] = useState<string[]>(value);

  const timeChange = (e: string, index: number) => {
    let cloneValue = cloneDeep(currentValue);
    cloneValue[index] = e;
    const [satrtValue, endValue] = cloneValue;
    const startIndex = timeList.findIndex((item) => item.value == satrtValue);
    const endIndex = timeList.findIndex((item) => item.value == endValue);
    if (startIndex != -1 && endIndex != -1 && endIndex < startIndex) {
      cloneValue = [endValue, satrtValue];
    }
    setCurrentValue(cloneValue);
    onChange?.(cloneValue);
  };

  useEffect(() => {
    return () => {
      timeStore.remove(currentField);
    };
  }, []);

  return (
    <Row align="middle">
      <Col span={10}>
        <Select
          showSearch
          onChange={(e) => timeChange(e, 0)}
          value={currentValue[0]}
          options={timeList}
          placeholder={formatMessage({
            id: 'pages.searchTable.updateForm.schedulingPeriod.timeLabel',
            defaultMessage: '开始时间',
          })}
        />
      </Col>
      <Col span={2} style={{ textAlign: 'center' }}>
        <SwapRightOutlined />
      </Col>
      <Col span={10}>
        <Select
          showSearch
          onChange={(e) => timeChange(e, 1)}
          value={currentValue[1]}
          options={timeList}
          placeholder={formatMessage({ id: 'dataManage.endTime', defaultMessage: '结束时间' })}
        />
      </Col>
    </Row>
  );
});

const useSafeTimeRangeColum = () => {
  // 优化性能，避免重复校验的计算
  const record = {
    calc: false,
    pass: false,
  };
  return {
    colum: {
      title: formatMessage({ id: 'device.timePeriod', defaultMessage: '时间段' }),
      dataIndex: 'timeRange',
      colProps: {
        span: 11,
      },
      width: '100%',
      formItemProps: {
        validateTrigger: 'submit',
        rules: [
          {
            required: true,
            message: formatMessage({
              id: 'device.timeRequire',
              defaultMessage: '所有时间范围相加未满24小时',
            }),
            validator: async (r, value) => {
              timeStore.update(r!.field, value);
              currentField = r!.field;
              try {
                await Promise.resolve();
                if (record.calc) {
                  if (!record.pass) {
                    throw new Error();
                  }
                  return;
                }
                const timeMap: any[] = [];
                timeStore.value.forEach(([start, end]) => {
                  timeMap.push({
                    ts: moment(start, 'HH:mm:ss'),
                    tn: moment(end, 'HH:mm:ss'),
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
      renderFormItem: () => <SafeTimeSelect />,
    } as ProFormColumnsType,
    resetTimeStore: () => timeStore.reset(),
  };
};

export default useSafeTimeRangeColum;
