/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-10-17 16:03:16
 * @LastEditTime: 2023-10-17 16:03:49
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\CollectionModal\helper.ts
 */
import { ModalProps } from 'antd';
import { DeviceModelType } from '@/types/device';
import { formatMessage } from '@/utils';
import { ProFormColumnsType } from '@ant-design/pro-components';
import moment, { Moment } from 'moment';
import { aggregationTime } from '@/utils/dict';

export type CollectionChartType = {
  title?: string;
  deviceId?: string;
  collection?: string;
  model?: DeviceModelType;
  date?: string[];
  height?: number | string;
  onLoadingChange?: (value: boolean) => void;
  containClassName?: string;
  searchParams?: Record<string, any>;
};

export type CollectionModalType = Omit<ModalProps, 'title'> & CollectionChartType;

export const columns: ProFormColumnsType[] = [
  {
    title: formatMessage({ id: 'common.selectDate', defaultMessage: '选择日期' }),
    dataIndex: 'date',
    valueType: 'dateRange',
    formItemProps: {
      rules: [{ required: true }],
    },
    initialValue: [moment(), moment()],
    fieldProps: (form) => {
      return {
        onOpenChange: (openDate: boolean) => {
          if (openDate) {
            window.collectionSearchDates = [];
            window.collectionSelectDates = form?.getFieldValue?.('date');
            form?.setFieldValue?.('date', []);
          } else {
            if (window.collectionSearchDates?.[0] && window.collectionSearchDates?.[1]) {
              form?.setFieldValue?.('date', window.collectionSearchDates);
            } else {
              form?.setFieldValue?.('date', window.collectionSelectDates);
            }
          }
        },
        onCalendarChange: (val: Moment[]) => {
          window.collectionSearchDates = [...(val || [])];
        },
        disabledDate: (current: Moment) => {
          if (!window.collectionSearchDates) {
            return false;
          }
          const tooLate =
            window.collectionSearchDates?.[0] &&
            current.diff(window.collectionSearchDates?.[0], 'days') > 6;
          const tooEarly =
            window.collectionSearchDates?.[1] &&
            window.collectionSearchDates?.[1].diff(current, 'days') > 6;
          return !!tooEarly || !!tooLate;
        },
      };
    },
  },
  {
    title: formatMessage({ id: 'dataManage.1061', defaultMessage: '聚合周期' }),
    dataIndex: 'aggregationPeriod',
    valueType: 'select',
    valueEnum: aggregationTime,
  },
];
