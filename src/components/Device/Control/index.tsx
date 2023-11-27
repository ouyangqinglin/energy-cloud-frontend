/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-11-27 14:38:35
 * @LastEditTime: 2023-11-27 18:07:38
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Control\index.tsx
 */
import React, { memo, useCallback, useMemo } from 'react';
import {
  DeviceArrayType,
  DeviceDoubleType,
  DeviceModelDataType,
  DeviceServiceGroupType,
  DeviceServiceModelType,
  DeviceServiceType,
  DeviceTimeRangeType,
} from '@/types/device';
import Detail, { DetailItem, GroupItem } from '@/components/Detail';
import { DeviceModelTypeEnum, formatModelValue, parseToArray } from '@/utils';
import ConfigModal from '../ConfigModal';
import { ProFormColumnsType } from '@ant-design/pro-components';
import { timeRangeColumn } from './helper';
import { merge } from 'lodash';

export type ControlType = {
  deviceId: string;
  groupData?: DeviceServiceGroupType[];
  realTimeData?: Record<string, any>;
};

const Control: React.FC<ControlType> = memo((props) => {
  const { deviceId, groupData, realTimeData } = props;

  const getServiceItem = useCallback(
    (service: DeviceServiceType) => {
      const detailItems: DetailItem[] = [];
      const columns: ProFormColumnsType[] = [];
      service?.outputData?.forEach?.((field) => {
        switch (field?.dataType?.type) {
          case DeviceModelTypeEnum.Array:
            const fieldValue = parseToArray(realTimeData?.[field?.id || '']);
            const items: DetailItem[] = fieldValue?.map?.((value, index) => {
              const detailItem: DetailItem = {
                field: 'array' + index,
                label:
                  (field?.dataType as DeviceArrayType)?.specs?.item?.type ==
                  DeviceModelTypeEnum.TimeRange
                    ? '时段' + (index + 1)
                    : '',
                format: () => value,
              };
              return detailItem;
            });
            if (!items?.length) {
              items.push({
                field: 'arrayxxx',
                label: '时段1',
              });
            }
            detailItems.push(...items);
            const column: ProFormColumnsType = {
              dataIndex: field.id,
              formItemProps: {
                rules:
                  field?.required === false
                    ? []
                    : [{ required: true, message: '请输入' + field?.name }],
              },
            };
            columns.push(merge({}, timeRangeColumn, column));
            break;
          case DeviceModelTypeEnum.Double:
            detailItems.push?.({
              field: field?.id || '',
              label: field?.name,
              format: (value) => formatModelValue(value, field?.dataType || {}),
            });
            columns.push({
              title: field?.name,
              dataIndex: field?.id,
              valueType: 'digit',
              fieldProps: (field?.dataType as DeviceDoubleType)?.specs?.unit
                ? {
                    addonAfter: (field?.dataType as DeviceDoubleType)?.specs?.unit,
                  }
                : {},
              formItemProps: {
                rules:
                  field?.required === false
                    ? []
                    : [{ required: true, message: '请输入' + field?.name }],
              },
            });
            break;
          default:
        }
      });
      const groupItem: GroupItem = {
        label: (
          <Detail.Label title={service?.groupName}>
            <ConfigModal
              title={service?.groupName || ''}
              deviceId={deviceId}
              realTimeData={realTimeData}
              serviceId={service?.id || ''}
              columns={columns}
            />
          </Detail.Label>
        ),
        items: detailItems,
      };
      return groupItem;
    },
    [deviceId, realTimeData],
  );

  const groups = useMemo(() => {
    const items: GroupItem[] = [];
    groupData?.forEach?.((group) => {
      if (group?.services?.length && group?.services?.length > 1) {
        items.push({
          label: <Detail.Label title={group.groupName} />,
        });
      }
      group?.services?.forEach?.((service) => {
        items.push(getServiceItem(service));
      });
    });
    return <Detail.Group data={realTimeData} items={items} />;
  }, [groupData, realTimeData]);

  return <>{groups}</>;
});

export default Control;
