/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-11-27 14:38:35
 * @LastEditTime: 2023-12-28 17:17:19
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Control\index.tsx
 */
import React, { Suspense, lazy, memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  DeviceArrayType,
  DeviceDoubleType,
  DeviceEnumType,
  DeviceModelAuthorityType,
  DeviceModelDescribeType,
  DeviceServiceModelType,
  DeviceServiceType,
  DeviceStructType,
} from '@/types/device';
import Detail, { DetailItem, GroupItem } from '@/components/Detail';
import {
  DeviceModelDescribeTypeEnum,
  DeviceModelShowTypeEnum,
  DeviceModelTypeEnum,
  formatMessage,
  formatModelValue,
  getPropsFromTree,
  parseToArray,
  parseToObj,
} from '@/utils';
import ConfigModal from '../ConfigModal';
import { ProFormColumnsType } from '@ant-design/pro-components';
import { timeRangeColumn } from './helper';
import { merge } from 'lodash';
import { Button, Modal, Spin, TabsProps, message } from 'antd';
import { useBoolean } from 'ahooks';
import { TimeRangePicker, DateStamp } from '@/components/Time';
import { DeviceDataType, editSetting } from '@/services/equipment';
import { OnlineStatusEnum } from '@/utils/dictionary';
import Authority from '@/components/Authority';
import useAuthority, { AuthorityModeEnum } from '@/hooks/useAuthority';
import RadioButton from '@/components/RadioButton';
import { useRequest } from 'umi';
import styels from './index.less';

export type ControlType = {
  deviceId?: string;
  groupData?: DeviceModelDescribeType[];
  realTimeData?: Record<string, any>;
  deviceData?: DeviceDataType;
  onLoadChange?: () => void;
};

const singleFieldName = 'arryField';

const Control: React.FC<ControlType> = memo((props) => {
  const { deviceId, deviceData, groupData, realTimeData, onLoadChange } = props;

  const [transformData, setTransformData] = useState({});
  const [openForm, { set, setTrue }] = useBoolean(false);
  const [currentFormInfo, setCurrentFormInfo] = useState<{
    service?: DeviceServiceType;
    columns?: ProFormColumnsType[];
  }>({});
  const { loading, run } = useRequest(editSetting, {
    manual: true,
  });

  const authorityCodes = useMemo(() => {
    const result: string[] = [];
    const authoritys = getPropsFromTree<DeviceModelDescribeType, DeviceModelAuthorityType[]>(
      groupData,
      'authority',
    );
    authoritys?.forEach?.((item) => {
      item?.forEach?.((child) => {
        if (child.detail) {
          result.push(child.detail);
        }
      });
    });
    return result;
  }, [groupData]);

  const { authorityMap } = useAuthority(authorityCodes);

  const onClick = useCallback((service: DeviceServiceType, columns: ProFormColumnsType[]) => {
    setCurrentFormInfo({
      service,
      columns,
    });
    setTrue();
  }, []);

  const btnClick = useCallback(
    (field: DeviceServiceModelType, value: any) => {
      Modal.confirm({
        title: field?.name,
        content: formatMessage({
          id: 'device.whetherExecuteCurrentParameter',
          defaultMessage: '是否执行当前参数下发',
        }),
        okText: formatMessage({ id: 'common.confirm', defaultMessage: '确认' }),
        cancelText: formatMessage({ id: 'common.cancel', defaultMessage: '取消' }),
        onOk: () =>
          run({
            deviceId: deviceData?.deviceId,
            input: { [field.id || '']: value },
            serviceId: field.serviceId,
          }).then((data: any) => {
            if (data) {
              message.success(
                formatMessage({ id: 'device.issueSuccess', defaultMessage: '下发成功' }),
              );
            }
          }),
      });
    },
    [deviceData?.deviceId],
  );

  const getFieldItem = useCallback(
    (field: DeviceServiceModelType) => {
      const detailItems: DetailItem[] = [];
      const columns: ProFormColumnsType[] = [];
      let valueType: ProFormColumnsType['valueType'] = 'text';
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
          const formData = fieldValue?.map?.((value, index) => {
            const specs = ((field?.dataType as DeviceArrayType)?.specs?.item as DeviceStructType)
              ?.specs;
            let transformValue = value;
            if (typeof transformValue != 'object' || Array.isArray(transformValue)) {
              transformValue = {
                [singleFieldName]: transformValue,
              };
            }
            specs?.forEach?.((item, itemFieldIndex) => {
              items.push({
                field: (item?.id || '') + index,
                label: (item?.name ?? '') + (itemFieldIndex ? '' : index + 1),
                format: (formatValue) => formatModelValue(formatValue, item?.dataType || {}),
              });
              detailData[(item?.id || '') + index] = transformValue[item?.id || ''];
            });
            if (items.length > 1 && specs?.length) {
              items[items.length - 1].span = 4 - specs.length;
            }
            return transformValue;
          });
          if (!items?.length) {
            items.push({
              field: 'arrayxxx',
              label:
                ((field?.dataType as DeviceArrayType)?.specs?.item as DeviceStructType)?.specs?.[0]
                  ?.name + '1',
            });
          }
          detailItems.push(...items);
          setTransformData((prevData) => ({
            ...prevData,
            ...detailData,
            [field?.id || '']: formData,
          }));
          break;
        case DeviceModelTypeEnum.TimeRange:
          detailItems.push?.({
            field: field?.id || '',
            label: field?.name,
            format: (value) => formatModelValue(value, field?.dataType || {}),
          });
          columns.push({
            title: field?.name,
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
                        message: '请选择' + field?.name,
                      },
                    ],
            },
            renderFormItem: () => <TimeRangePicker />,
          });
          break;
        case DeviceModelTypeEnum.Enum:
        case DeviceModelTypeEnum.Boolean:
          switch (field.showType) {
            case DeviceModelShowTypeEnum.Button:
              const buttonEnum = parseToObj((field?.dataType as DeviceEnumType)?.specs || {});
              const options = Object.entries(buttonEnum).map(([value, label]) => ({
                value: isNaN(value as any) ? value : (value as any) * 1,
                label,
              }));
              detailItems.push?.({
                field: field?.id || '',
                label: field?.name,
                span: 3,
                showPlaceholder: false,
                labelStyle: {
                  width: '130px',
                },
                format: (value) => (
                  <RadioButton
                    options={options}
                    value={value}
                    disabled={deviceData?.status === OnlineStatusEnum.Offline}
                    onChange={(btnValue) => btnClick(field, btnValue)}
                    loading={loading}
                  />
                ),
              });
              break;
            default:
              const enumSpecs = parseToObj((field?.dataType as DeviceEnumType)?.specs || {});
              detailItems.push?.({
                field: field?.id || '',
                label: field?.name,
                format: (value) => formatModelValue(value, field?.dataType || {}),
              });
              columns.push({
                title: field?.name,
                dataIndex: field?.id,
                valueType: 'select',
                fieldProps: {
                  options: Object.entries(enumSpecs)?.map?.(([value, label]) => ({
                    value,
                    label,
                  })),
                },
                formItemProps: {
                  rules:
                    field?.required === false
                      ? []
                      : [
                          {
                            required: true,
                            message: '请选择' + (field?.name ?? ''),
                          },
                        ],
                },
              });
              break;
          }
          break;
        case DeviceModelTypeEnum.TimeStamp:
          detailItems.push?.({
            field: field?.id || '',
            label: field?.name,
            format: (value) => formatModelValue(value, field?.dataType || {}),
          });
          columns.push({
            title: field?.name,
            dataIndex: field?.id,
            formItemProps: {
              validateTrigger: 'submit',
              rules:
                field?.required === false
                  ? []
                  : [
                      {
                        required: true,
                        message: '请选择' + field?.name,
                      },
                    ],
            },
            renderFormItem: () => <DateStamp />,
          });
          break;
        case DeviceModelTypeEnum.Int:
        case DeviceModelTypeEnum.Double:
        case DeviceModelTypeEnum.Long:
          valueType = 'digit';
        case DeviceModelTypeEnum.String:
        default:
          detailItems.push?.({
            field: field?.id || '',
            label: field?.name,
            format: (value) => formatModelValue(value, field?.dataType || {}),
          });
          columns.push({
            title: field?.name,
            dataIndex: field?.id,
            valueType: valueType,
            fieldProps: {
              ...(valueType == 'digit'
                ? {
                    min: Number.MIN_SAFE_INTEGER,
                  }
                : {}),
              ...((field?.dataType as DeviceDoubleType)?.specs?.unit
                ? {
                    addonAfter: (field?.dataType as DeviceDoubleType)?.specs?.unit,
                  }
                : {}),
            },
            formItemProps: {
              rules:
                field?.required === false
                  ? []
                  : [{ required: true, message: '请输入' + field?.name }],
            },
          });
      }
      return {
        items: detailItems,
        cols: columns,
      };
    },
    [realTimeData, deviceData, btnClick, loading],
  );

  const getServiceItem = useCallback(
    (service: DeviceServiceType) => {
      const detailItems: DetailItem[] = [];
      const columns: ProFormColumnsType[] = [];
      service?.children?.forEach?.((field) => {
        field.serviceId = service.id;
        const { items, cols } = getFieldItem(field);
        if (field.dataType?.type == DeviceModelTypeEnum.Array) {
          if (detailItems.length > 1) {
            detailItems[detailItems?.length - 1].span = 4 - (detailItems.length % 3);
          }
        }
        detailItems.push(...items);
        columns.push(...cols);
      });
      if (detailItems?.length == 2) {
        detailItems[1].span = 2;
      }
      const groupItem: GroupItem = {
        className: styels.btnDetail,
        items: detailItems,
      };
      if (service.showType != DeviceModelShowTypeEnum.HideServiceName) {
        groupItem.label = (
          <Detail.Label title={service?.name}>
            <Authority
              code={service?.authority?.map?.((item) => item.edit)?.join?.(',')}
              mode={AuthorityModeEnum.Within}
            >
              <Button
                type="primary"
                onClick={() => onClick(service, columns)}
                disabled={deviceData?.status === OnlineStatusEnum.Offline}
              >
                配置参数
              </Button>
            </Authority>
          </Detail.Label>
        );
      }
      return groupItem;
    },
    [deviceData, getFieldItem, onClick],
  );

  const passAuthority = useCallback(
    (authoritys?: DeviceModelAuthorityType[]) => {
      const codes: string[] = [];
      authoritys?.forEach?.((item) => {
        if (item?.detail) {
          codes.push(item.detail);
        }
      });
      const passCodes = codes?.some?.((item) => authorityMap.get(item));
      if (!codes?.length || passCodes) {
        return true;
      } else {
        return false;
      }
    },
    [authorityMap],
  );

  const getGroupItems = useCallback(
    (modelDescribeItem: DeviceModelDescribeType) => {
      const result: GroupItem[] = [];
      switch (modelDescribeItem.type) {
        case DeviceModelDescribeTypeEnum.Group:
          if (passAuthority(modelDescribeItem?.authority)) {
            if (modelDescribeItem.children && modelDescribeItem.children.length > 1) {
              result.push({
                label: <Detail.Label title={modelDescribeItem.name} />,
              });
            }
            modelDescribeItem?.children?.forEach?.((item) => {
              if (passAuthority(item?.authority)) {
                result.push(...getGroupItems(item));
              }
            });
          }
          break;
        case DeviceModelDescribeTypeEnum.Service:
          result.push(getServiceItem(modelDescribeItem));
          break;
        case DeviceModelDescribeTypeEnum.Tab:
          const tabItems: GroupItem['tabItems'] = [];
          modelDescribeItem?.children?.forEach?.((item) => {
            if (passAuthority(item?.authority)) {
              if (item?.type == DeviceModelDescribeTypeEnum.TabItem) {
                const tabGroupItems: GroupItem[] = [];
                (item as DeviceModelDescribeType)?.children?.forEach?.((tabGroupItem) => {
                  tabGroupItems.push(...getGroupItems(tabGroupItem));
                });
                tabItems.push({
                  key: item.id || '',
                  label: item.name,
                  groupItems: tabGroupItems,
                });
              }
            }
          });
          result.push({
            tabItems,
          });
          break;
        case DeviceModelDescribeTypeEnum.Component:
          const Component = lazy(
            () => import('@/components/Device/module/' + modelDescribeItem.id),
          );
          result.push({
            component: (
              <Suspense
                fallback={
                  <div className="tx-center">
                    <Spin />
                  </div>
                }
              >
                <Component deviceId={deviceData?.deviceId} />
              </Suspense>
            ),
          });
          break;
        default:
      }
      return result;
    },
    [realTimeData, deviceData, getServiceItem, passAuthority],
  );

  const groupsItems = useMemo(() => {
    const result: GroupItem[] = [];
    groupData?.forEach?.((item) => {
      result.push(...getGroupItems(item));
    });
    return result;
  }, [groupData, getGroupItems, realTimeData, authorityMap]);

  useEffect(() => {
    onLoadChange?.();
  }, [groupsItems]);

  return (
    <>
      {!!groupsItems?.length && (
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
      )}
    </>
  );
});

export default Control;
