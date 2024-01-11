/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-11-27 16:00:49
 * @LastEditTime: 2024-01-11 13:52:49
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Control\helper.tsx
 */
import React from 'react';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { ProFormColumnsType } from '@ant-design/pro-components';
import { Col, FormInstance, Row, TimePicker } from 'antd';
import { Moment } from 'moment';
import { formatMessage, formatModelValue } from '@/utils';
import moment from 'moment';
import { DeviceServiceModelType } from '@/types/device';

const hourFormat = 'HH:mm';
const contrastDate = '2023-01-01 ';

export const validateAllTime = (value: any, field: string) => {
  if (
    value?.[0]?.[field]?.[0]?.format?.(hourFormat) != '00:00' ||
    value?.[value?.length - 1]?.[field]?.[1]?.format?.(hourFormat) != '23:59'
  ) {
    return Promise.reject(
      formatMessage({ id: 'device.timePeriod', defaultMessage: '时间段' }) +
        formatMessage({ id: 'common.should24Hour', defaultMessage: '应满24小时' }),
    );
  } else {
    return Promise.resolve();
  }
};

export const validatorTime = (
  rule: any,
  value: string,
  field: string,
  getFieldValue: FormInstance['getFieldValue'],
) => {
  const valueArr = value?.split?.('-');
  const periodOfTime = getFieldValue(field);
  const ruleField = rule?.field?.split?.('.');
  const index = ruleField?.[1] * 1;
  const prevValue: string[] = periodOfTime?.[index - 1]?.[ruleField?.[2]]?.split?.('-');
  const nextValue: string[] = periodOfTime?.[index + 1]?.[ruleField?.[2]]?.split?.('-');
  if (valueArr && valueArr.length) {
    if (
      prevValue &&
      prevValue.length &&
      moment(contrastDate + valueArr[0]).isBefore(moment(contrastDate + prevValue[1]))
    ) {
      return Promise.reject(
        new Error(
          formatMessage(
            {
              id: 'common.timeStartShouldGreaterEnd',
              defaultMessage: `时段${index + 1}开始时间应大于等于时段${index}结束时间`,
            },
            {
              start: index + 1,
              end: index,
            },
          ),
        ),
      );
    }
    if (
      nextValue &&
      nextValue.length &&
      moment(contrastDate + valueArr[1]).isAfter(moment(contrastDate + nextValue[0]))
    ) {
      return Promise.reject(
        new Error(
          formatMessage(
            {
              id: 'common.timeStartShouldGreaterEnd',
              defaultMessage: `时段${index + 1}结束时间应小于等于时段${index + 2}开始时间`,
            },
            {
              end: index + 1,
              start: index + 2,
            },
          ),
        ),
      );
    }
  }
  return Promise.resolve();
};

export const timeRangeColumn: ProFormColumnsType = {
  valueType: 'formList',
  // dataIndex: 'ElectrovalenceTimeFrame',
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
  colProps: {
    span: 24,
  },
  columns: [
    {
      valueType: 'group',
      columns: [],
      colProps: {
        span: 24,
      },
    },
  ],
};

export const getColumnsLength = (columns?: ProFormColumnsType[]): number => {
  const columnGruop: ProFormColumnsType[][] = [[]];
  let maxColumnLength = 0;
  columns?.forEach?.((item) => {
    if (item.valueType == 'formList') {
      const length = (item?.columns as any)?.[0]?.columns?.length || 0;
      maxColumnLength = Math.max(length, maxColumnLength);
      columnGruop.push([]);
    } else {
      columnGruop[columnGruop.length - 1].push(item);
    }
  });
  columnGruop.forEach((item) => {
    maxColumnLength = Math.max(maxColumnLength, item.length);
  });
  return maxColumnLength;
};
