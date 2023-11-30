/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-11-27 14:38:35
 * @LastEditTime: 2023-11-30 10:24:40
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Control\index.tsx
 */
import React, { memo, useCallback, useMemo, useState } from 'react';
import {
  DeviceArrayType,
  DeviceDoubleType,
  DeviceServiceGroupType,
  DeviceServiceModelType,
  DeviceServiceType,
  DeviceStructType,
} from '@/types/device';
import Detail, { DetailItem, GroupItem } from '@/components/Detail';
import { DeviceModelTypeEnum, formatModelValue, parseToArray } from '@/utils';
import ConfigModal from '../ConfigModal';
import { ProFormColumnsType } from '@ant-design/pro-components';
import { timeRangeColumn } from './helper';
import { merge } from 'lodash';
import { Button, TimePicker } from 'antd';
import moment from 'moment';
import { useBoolean } from 'ahooks';
import { RemoteSettingDataType } from '../ConfigModal/config';
import TimeRangePicker from '@/components/TimeRangePicker';

export type ControlType = {
  deviceId: string;
  groupData?: DeviceServiceGroupType[];
  realTimeData?: Record<string, any>;
};

const singleFieldName = 'arryField';

const Control: React.FC<ControlType> = memo((props) => {
  const { deviceId, groupData, realTimeData } = props;

  const [transformData, setTransformData] = useState({});
  const [openForm, { set, setTrue }] = useBoolean(false);
  const [currentFormInfo, setCurrentFormInfo] = useState<{
    service?: DeviceServiceType;
    columns?: ProFormColumnsType[];
  }>({});

  const onClick = useCallback((service: DeviceServiceType, columns: ProFormColumnsType[]) => {
    setCurrentFormInfo({
      service,
      columns,
    });
    setTrue();
  }, []);

  const getFieldItem = useCallback(
    (field: DeviceServiceModelType) => {
      const detailItems: DetailItem[] = [];
      const columns: ProFormColumnsType[] = [];
      switch (field?.dataType?.type) {
        case DeviceModelTypeEnum.Array:
          const specsItem = (field?.dataType as DeviceArrayType)?.specs?.item || {};
          if (specsItem?.type == DeviceModelTypeEnum.Struct) {
          } else {
            if (field.dataType.specs) {
              (field.dataType.specs as any) = {
                originalItem: specsItem,
                item: {
                  type: 'struct',
                  specs: [
                    {
                      id: singleFieldName,
                      name: specsItem?.type == DeviceModelTypeEnum.TimeRange ? '时段' : '',
                      dataType: specsItem,
                    },
                  ],
                },
              };
            }
          }
          const column: ProFormColumnsType = {
            dataIndex: field.id,
            formItemProps: {
              rules:
                field?.required === false
                  ? []
                  : [{ required: true, message: '请输入' + field?.name }],
            },
            columns: [],
            fieldProps: {
              creatorButtonProps: {
                creatorButtonText: '新增' + field?.name,
              },
            },
          };
          ((field.dataType as DeviceArrayType)?.specs?.item as DeviceStructType)?.specs?.forEach?.(
            (structField) => {
              const { cols } = getFieldItem(structField);
              cols[0].colProps = { span: 24 };
              (column?.columns as any)?.push?.(...cols);
            },
          );
          columns.push(merge({}, timeRangeColumn, column));

          const fieldValue = parseToArray(realTimeData?.[field?.id || '']);
          const items: DetailItem[] = [];
          const detailData: Record<string, any> = {};
          const formData = fieldValue?.forEach?.((value, index) => {
            let transformValue = value;
            if (typeof transformValue != 'object' || Array.isArray(transformValue)) {
              transformValue = {
                [singleFieldName]: transformValue,
              };
            }
            (
              (field?.dataType as DeviceArrayType)?.specs?.item as DeviceStructType
            )?.specs?.forEach?.((item) => {
              items.push({
                field: (item?.id || '') + index,
                label: item?.name,
                span: item?.span || 3,
              });
              detailData[(item?.id || '') + index] = transformValue[item?.id || ''];
            });
            return transformValue;
          });
          if (!items?.length) {
            items.push({
              field: 'arrayxxx',
              label: ((field?.dataType as DeviceArrayType)?.specs?.item as DeviceStructType)
                ?.specs?.[0]?.name,
            });
          }
          detailItems.push(...items);
          setTransformData((prevData) => ({
            ...prevData,
            ...detailData,
            [field?.id || '']: formData,
          }));
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
        case DeviceModelTypeEnum.TimeRange:
          detailItems.push?.({
            field: field?.id || '',
            label: field?.name,
            format: (value) => formatModelValue(value, field?.dataType || {}),
          });
          columns.push({
            title: '时间段',
            dataIndex: field?.id,
            valueType: 'timeRange',
            formItemProps: {
              validateTrigger: 'submit',
              rules:
                field?.required === false
                  ? []
                  : [
                      {
                        required: true,
                        message: '请选择时间段',
                      },
                    ],
            },
            renderFormItem: () => <TimeRangePicker className="w-full" format={'HH:mm'} />,
          });
          break;
        default:
      }
      return {
        items: detailItems,
        cols: columns,
      };
    },
    [realTimeData],
  );

  const getServiceItem = useCallback((service: DeviceServiceType) => {
    const detailItems: DetailItem[] = [];
    const columns: ProFormColumnsType[] = [];
    service?.outputData?.forEach?.((field) => {
      const { items, cols } = getFieldItem(field);
      detailItems.push(...items);
      columns.push(...cols);
    });
    const groupItem: GroupItem = {
      label: (
        <Detail.Label title={service?.groupName}>
          <Button type="primary" onClick={() => onClick(service, columns)}>
            配置参数
          </Button>
        </Detail.Label>
      ),
      items: detailItems,
    };
    return groupItem;
  }, []);

  const groupsItems = useMemo(() => {
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
    return items;
  }, [groupData, realTimeData]);

  return (
    <>
      <Detail.Group data={{ ...realTimeData, ...transformData }} items={groupsItems} />
      <ConfigModal
        open={openForm}
        onOpenChange={set}
        title={currentFormInfo?.service?.groupName || ''}
        deviceId={deviceId}
        realTimeData={{ ...realTimeData, ...transformData }}
        serviceId={currentFormInfo?.service?.id || ''}
        columns={currentFormInfo?.columns || []}
        showClickButton={false}
      />
    </>
  );
});

export default Control;
