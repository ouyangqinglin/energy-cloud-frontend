/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-11-27 14:38:35
 * @LastEditTime: 2024-06-12 13:52:20
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Control\index.tsx
 */
import React, {
  Suspense,
  lazy,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type {
  DeviceArrayType,
  DeviceDoubleType,
  DeviceEnumType,
  DeviceModelAuthorityType,
  DeviceModelDescribeType,
  DeviceServiceModelType,
  DeviceServiceType,
  DeviceStructType,
  TipType,
} from '@/types/device';
import Detail from '@/components/Detail';
import type { DetailItem, GroupItem } from '@/components/Detail';
import {
  DeviceModelDescribeTypeEnum,
  DeviceModelShowTypeEnum,
  DeviceModelTypeEnum,
  formatMessage,
  formatModelValue,
  getPropsFromTree,
  isEmpty,
  parseToArray,
  parseToObj,
} from '@/utils';
import ConfigModal from '../ConfigModal';
import type { ProFormColumnsType } from '@ant-design/pro-components';
import {
  getColumnsLength,
  getFieldItems,
  getRealField,
  timeRangeColumn,
  validatorTime,
} from './helper';
import { merge, template } from 'lodash';
import { Button, Modal, Spin, message, Typography, Switch } from 'antd';
import { useBoolean } from 'ahooks';
import { TimeRangePicker, DateStamp } from '@/components/Time';
import type { DeviceDataType } from '@/services/equipment';
import { editSetting } from '@/services/equipment';
import { DeviceMasterMode, OnlineStatusEnum } from '@/utils/dictionary';
import Authority from '@/components/Authority';
import useAuthority, { AuthorityModeEnum } from '@/hooks/useAuthority';
import RadioButton from '@/components/RadioButton';
import { useRequest } from 'umi';
import styles from './index.less';
import { useSubscribe } from '@/hooks';
import { EditOutlined, RedoOutlined } from '@ant-design/icons';
import DeviceContext, { RefreshRequestParams } from '../Context/DeviceContext';

export type ControlType = {
  deviceId?: string;
  groupData?: DeviceModelDescribeType[];
  realTimeData?: Record<string, any>;
  deviceData?: DeviceDataType;
  onLoadChange?: (groupLength: number) => void;
};

type FormInfoType = {
  service?: DeviceServiceType;
  columns?: ProFormColumnsType[];
  width?: string;
  dataDeviceIds?: string[];
};

const singleFieldName = 'arryField';

const Control: React.FC<ControlType> = memo((props) => {
  const { deviceId, deviceData, groupData, realTimeData, onLoadChange } = props;

  const { refreshDataByRequest } = useContext(DeviceContext);
  const [transformData, setTransformData] = useState({});
  const [openForm, { set, setTrue }] = useBoolean(false);
  const [currentFormInfo, setCurrentFormInfo] = useState<FormInfoType>({});
  const { loading, run } = useRequest(editSetting, {
    manual: true,
  });
  const extralDeviceIds = useMemo(() => {
    const result = getPropsFromTree(groupData, 'deviceId');
    return Array.from(new Set(result));
  }, [groupData]);
  const extralDeviceRealTimeData = useSubscribe(extralDeviceIds, true);

  const components = useMemo<
    Record<string, React.LazyExoticComponent<React.ComponentType<any>>>
  >(() => {
    const ids = getPropsFromTree(
      groupData,
      'id',
      'children',
      (item) => item.type == DeviceModelDescribeTypeEnum.Component,
    );
    return ids.reduce((result, item) => {
      return {
        ...result,
        [item]: lazy(() => import('@/components/Device/module/' + item)),
      };
    }, {});
  }, [groupData]);

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
        if (child.edit) {
          result.push(child.edit);
        }
      });
    });
    return result;
  }, [groupData]);

  const { authorityMap } = useAuthority(authorityCodes);

  const onClick = useCallback(
    (service: DeviceServiceType, columns: ProFormColumnsType[], columnsLength: number) => {
      setCurrentFormInfo({
        service,
        columns,
        width: columnsLength < 3 ? '552px' : '816px',
        dataDeviceIds: getPropsFromTree(service?.children, 'deviceId'),
      });
      setTrue();
    },
    [],
  );

  const getTipConfirm = useCallback(
    (rules: TipType[], callback: () => Promise<any>, cancelBack?: () => void) => {
      let num = 0;
      const confirm = () => {
        const rule = rules?.[num];
        Modal.confirm({
          title: rule?.title || '',
          content: rule?.content,
          okText: formatMessage({ id: 'common.confirm', defaultMessage: '确认' }),
          cancelText: formatMessage({ id: 'common.cancel', defaultMessage: '取消' }),
          onOk: () => {
            num++;
            if (num < rules?.length) {
              confirm();
              return;
            } else {
              return callback?.();
            }
          },
          onCancel: () => {
            cancelBack?.();
          },
        });
      };
      confirm();
    },
    [],
  );

  const btnClick = useCallback(
    (field: DeviceServiceModelType, value: any, oldValue: any) => {
      const templeData = {
        ...field,
        oldValue,
        oldValueFormat: formatModelValue(oldValue, field?.dataType || {}, false),
        newValue: value,
        newValueFormat: formatModelValue(value, field?.dataType || {}, false),
      };
      const rules: TipType[] = field?.promptRule?.map?.((item) => {
        try {
          return {
            title: template(item.title)(templeData),
            content: template(item.content)(templeData),
          };
        } catch (e) {
          console.error(e);
          return {
            title: item.title,
            content: item.content,
          };
        }
      }) || [
        {
          title: field?.name,
          content: formatMessage({
            id: 'device.whetherExecuteCurrentParameter',
            defaultMessage: '是否执行当前参数下发',
          }),
        },
      ];

      getTipConfirm(rules, () => {
        const idArr = (field.id || '')?.split('.') || [''];
        return run({
          deviceId: field.deviceId || deviceData?.deviceId,
          input: { [idArr[idArr.length - 1]]: value },
          serviceId: field.serviceId,
        }).then((data: any) => {
          if (data) {
            message.success(
              formatMessage({ id: 'device.issueSuccess', defaultMessage: '下发成功' }),
            );
          }
        });
      });
    },
    [deviceData?.deviceId],
  );

  const onBeforeSubmit = useCallback(
    (result) => {
      result.input = { ...result.input, ...currentFormInfo.service?.extraParams };

      const templeData = {
        ...currentFormInfo.service,
        ...result.input,
      };
      const rules: TipType[] = currentFormInfo.service?.promptRule?.map?.((item) => {
        try {
          return {
            title: template(item.title)(templeData),
            content: template(item.content)(templeData),
          };
        } catch (e) {
          console.error(e);
          return {
            title: item.title,
            content: item.content,
          };
        }
      }) || [
        {
          title: currentFormInfo.service?.name,
          content: formatMessage({
            id: 'device.whetherExecuteCurrentParameter',
            defaultMessage: '是否执行当前参数下发',
          }),
        },
      ];

      return new Promise((resolve, reject) => {
        getTipConfirm(
          rules,
          () => {
            resolve(result);
            return Promise.resolve(true);
          },
          () => {
            reject();
          },
        );
      });
    },
    [currentFormInfo],
  );

  const onRefresh = useCallback(
    (service: DeviceServiceType | DeviceServiceModelType) => {
      const ids = getPropsFromTree([service]);
      const refreshParams: RefreshRequestParams = {
        deviceId: service?.deviceId || deviceId || '',
        input: {
          queryList: ids,
        },
      };
      if (service.queryId) {
        refreshParams.serviceId = service.queryId;
      }
      refreshDataByRequest?.(refreshParams).then(({ code }) => {
        if (code == '200') {
          message.success(
            formatMessage({ id: 'device.refreshSuccess', defaultMessage: '刷新成功' }),
          );
        }
      });
    },
    [refreshDataByRequest, deviceId],
  );

  const passAuthority = useCallback(
    (authoritys?: DeviceModelAuthorityType[], type?: 'detail' | 'edit') => {
      const codes: string[] = [];
      authoritys?.forEach?.((item) => {
        if (type == 'edit') {
          if (item?.edit) {
            codes.push(item.edit);
          }
        } else {
          if (item?.detail) {
            codes.push(item.detail);
          }
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
                      name:
                        specsItem?.type == DeviceModelTypeEnum.TimeRange
                          ? formatMessage({ id: 'common.periodTime', defaultMessage: '时段' })
                          : '',
                      dataType: specsItem,
                    },
                  ],
                },
              };
            }
          }
          const column: ProFormColumnsType = merge(
            {
              dataIndex: getRealField(field.id),
              formItemProps: {
                rules:
                  field?.required === false
                    ? []
                    : [
                        {
                          required: true,
                          message: formatMessage(
                            { id: 'common.pleaseEnterSentence', defaultMessage: '请输入' },
                            {
                              content: field?.name,
                            },
                          ),
                        },
                      ],
              },
              fieldProps: {
                creatorButtonProps: {
                  creatorButtonText: formatMessage(
                    { id: 'common.addSentence', defaultMessage: '新增' },
                    {
                      content: field?.name,
                    },
                  ),
                },
              },
            },
            timeRangeColumn,
          );
          const specsLength = (specsItem as DeviceStructType)?.specs?.length || 0;
          (specsItem as DeviceStructType)?.specs?.forEach?.((structField) => {
            structField.parentId = field?.id;
            const { cols } = getFieldItem(structField);
            cols[0].colProps = { span: specsLength < 3 ? 24 / specsLength : 8 };
            (column?.columns as any)?.[0]?.columns?.push?.(...cols);
          });

          if (passAuthority(field?.authority, 'edit')) {
            columns.push(column);
          }

          let fieldValue = parseToArray(realTimeData?.[field?.id || '']);
          if (field?.deviceId) {
            fieldValue = parseToArray(
              realTimeData?.[field?.deviceId || '']?.[getRealField(field?.id)],
            );
          }
          const items: DetailItem[] = [];
          const detailData: Record<string, any> = {
            [field?.deviceId || deviceData?.deviceId || '']: {},
          };
          const formData = fieldValue?.map?.((value, index) => {
            const specs = (specsItem as DeviceStructType)?.specs;
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
                unit: (item?.dataType as DeviceDoubleType)?.specs?.unit,
                valueInterceptor: (_, data) => {
                  if (item?.deviceId) {
                    return data?.[item?.deviceId || '']?.[getRealField(item?.id) + index];
                  } else {
                    return data?.[deviceData?.deviceId || '']?.[(item?.id || '') + index];
                  }
                },
                format: (formatValue) => formatModelValue(formatValue, item?.dataType || {}, false),
              });
              detailData[field?.deviceId || deviceData?.deviceId || ''][(item?.id || '') + index] =
                transformValue[item?.id || ''];
            });
            if (items.length > 1 && specs?.length) {
              items[items.length - 1].span = 4 - specs.length;
            }
            return transformValue;
          });
          if (!items?.length) {
            items.push({
              field: 'arrayxxx',
              label: (specsItem as DeviceStructType)?.specs?.[0]?.name + '1',
            });
          }
          detailItems.push(...items);
          setTransformData((prevData: any) => {
            const mergedData = merge({}, prevData, detailData);
            return {
              ...mergedData,
              [field?.id || '']: formData,
            };
          });
          break;
        case DeviceModelTypeEnum.TimeRange:
          if (passAuthority(field?.authority, 'edit')) {
            columns.push({
              title: field?.name,
              dataIndex: getRealField(field?.id),
              valueType: 'timeRange',
              formItemProps: ({ getFieldValue }) => {
                return {
                  rules: [
                    ...(field?.required === false
                      ? []
                      : [
                          {
                            required: true,
                            message: formatMessage(
                              { id: 'common.pleaseSelectSentence', defaultMessage: '请选择' },
                              {
                                content: field?.name,
                              },
                            ),
                          },
                        ]),
                    {
                      validator: (rule, value) => {
                        return validatorTime(rule, value, field?.parentId || '', getFieldValue);
                      },
                    },
                  ],
                };
              },
              renderFormItem: () => <TimeRangePicker />,
              initialValue: isEmpty(field?.defaultValue) ? undefined : field?.defaultValue + '',
            });
            if (field?.span == 24) {
              columns.push({
                formItemProps: {
                  noStyle: true,
                },
                renderFormItem: () => <div />,
                colProps: {
                  span: 24,
                },
              });
            }
          }
          if (field.showType != DeviceModelShowTypeEnum.HideName) {
            detailItems.push?.({
              field: field?.id || '',
              label: field?.name,
              unit: (field?.dataType as DeviceDoubleType)?.specs?.unit,
              valueInterceptor: (_, data) => {
                if (field?.deviceId) {
                  return data?.[field?.deviceId || '']?.[getRealField(field?.id)];
                } else {
                  return data?.[deviceData?.deviceId || '']?.[field?.id || ''];
                }
              },
              format: (value) => formatModelValue(value, field?.dataType || {}, false),
              extral: (
                <>
                  {field?.buttons?.includes?.('refresh') && (
                    <RedoOutlined
                      className={`cl-primary cursor ${styles.refresh}`}
                      onClick={() => onRefresh(field)}
                      title={formatMessage({
                        id: 'common.refresh',
                        defaultMessage: '刷新',
                      })}
                    />
                  )}
                  {field?.buttons?.includes?.('edit') && (
                    <EditOutlined
                      className={`cl-primary cursor ${styles.refresh}`}
                      onClick={() =>
                        onClick(
                          { ...field, id: field.serviceId },
                          columns.map((item) => ({ ...item, colProps: { span: 24 } })),
                          1,
                        )
                      }
                      title={formatMessage({
                        id: 'common.edit',
                        defaultMessage: '编辑',
                      })}
                    />
                  )}
                </>
              ),
            });
          }
          break;
        case DeviceModelTypeEnum.Enum:
        case DeviceModelTypeEnum.Boolean:
          const enumSpecs = parseToObj((field?.dataType as DeviceEnumType)?.specs || {});
          switch (field.showType) {
            case DeviceModelShowTypeEnum.Switch:
              detailItems.push?.({
                field: field?.id || '',
                label: field?.name,
                showPlaceholder: false,
                labelStyle: {
                  marginTop: '4px',
                },
                span: 3,
                format: (value, data) => {
                  let formatValue = value;
                  if (field?.deviceId) {
                    formatValue = data?.[field?.deviceId || '']?.[getRealField(field?.id)];
                  } else {
                    formatValue = data?.[deviceData?.deviceId || '']?.[field?.id || ''];
                  }
                  return (
                    <Switch
                      checked={!!formatValue}
                      disabled={
                        deviceData?.networkStatus === OnlineStatusEnum.Offline ||
                        !passAuthority(field?.authority, 'edit')
                      }
                      loading={loading}
                      onClick={() => btnClick(field, !!formatValue ? 1 : 0, formatValue)}
                    />
                  );
                },
              });
              break;
            case DeviceModelShowTypeEnum.RadioButton:
            case DeviceModelShowTypeEnum.Button:
              const options = Object.entries(enumSpecs).map(([value, label]) => ({
                value: isEmpty(value) ? '' : value + '',
                label,
              }));
              detailItems.push?.({
                field: field?.id || '',
                label: field?.name,
                showPlaceholder: false,
                labelStyle: {
                  marginTop: '4px',
                },
                span: 3,
                format: (value, formatData) => {
                  let data;
                  let childData;
                  let formatValue = value;
                  if (field?.deviceId) {
                    childData = formatData?.[field?.deviceId || ''];
                    data = childData;
                    formatValue = childData?.[getRealField(field?.id)];
                  } else {
                    data = formatData?.[deviceData?.deviceId || ''];
                    formatValue = data?.[field?.id || ''];
                  }
                  let fieldDisabled = false;
                  if (field?.disabled) {
                    try {
                      const evalResult = eval(field?.disabled?.replace?.(/\$data/g, 'data'));
                      if (typeof evalResult == 'boolean') {
                        fieldDisabled = evalResult;
                      }
                    } catch {}
                  }
                  return (
                    <>
                      <RadioButton
                        options={options}
                        type={field.showType == DeviceModelShowTypeEnum.Button ? 'button' : 'radio'}
                        value={isEmpty(formatValue) ? '' : formatValue + ''}
                        disabled={
                          deviceData?.networkStatus === OnlineStatusEnum.Offline ||
                          fieldDisabled ||
                          !passAuthority(field?.authority, 'edit')
                        }
                        onChange={(btnValue) => btnClick(field, btnValue, formatValue)}
                        loading={loading}
                      />
                      {!!field?.tip && (
                        <div>
                          <Typography.Text type="secondary">{field?.tip}</Typography.Text>
                        </div>
                      )}
                    </>
                  );
                },
              });
              break;
            default:
              if (passAuthority(field?.authority, 'edit')) {
                columns.push({
                  title: field?.name,
                  dataIndex: getRealField(field?.id),
                  valueType: 'select',
                  fieldProps: {
                    options: Object.entries(enumSpecs)?.map?.(([value, label]) => ({
                      value: isEmpty(value) ? '' : value + '',
                      label,
                    })),
                    placeholder: formatMessage({
                      id: 'common.pleaseSelect',
                      defaultMessage: '请选择',
                    }),
                  },
                  convertValue: (value) => (isEmpty(value) ? '' : value + ''),
                  formItemProps: {
                    rules:
                      field?.required === false
                        ? []
                        : [
                            {
                              required: true,
                              message: formatMessage(
                                { id: 'common.pleaseSelectSentence', defaultMessage: '请选择' },
                                {
                                  content: field?.name,
                                },
                              ),
                            },
                          ],
                  },
                  initialValue: isEmpty(field?.defaultValue) ? undefined : field?.defaultValue + '',
                });
                if (field?.span == 24) {
                  columns.push({
                    formItemProps: {
                      noStyle: true,
                    },
                    renderFormItem: () => <div />,
                    colProps: {
                      span: 24,
                    },
                  });
                }
              }
              if (field.showType != DeviceModelShowTypeEnum.HideName) {
                detailItems.push?.({
                  field: field?.id || '',
                  label: field?.name,
                  unit: (field?.dataType as DeviceDoubleType)?.specs?.unit,
                  valueInterceptor: (_, data) => {
                    if (field?.deviceId) {
                      return data?.[field?.deviceId || '']?.[getRealField(field?.id)];
                    } else {
                      return data?.[deviceData?.deviceId || '']?.[field?.id || ''];
                    }
                  },
                  format: (value) => formatModelValue(value, field?.dataType || {}, false),
                  extral: (
                    <>
                      {field?.buttons?.includes?.('refresh') && (
                        <RedoOutlined
                          className={`cl-primary cursor ${styles.refresh}`}
                          onClick={() => onRefresh(field)}
                          title={formatMessage({
                            id: 'common.refresh',
                            defaultMessage: '刷新',
                          })}
                        />
                      )}
                      {field?.buttons?.includes?.('edit') && (
                        <EditOutlined
                          className={`cl-primary cursor ${styles.refresh}`}
                          onClick={() =>
                            onClick(
                              { ...field, id: field.serviceId },
                              columns.map((item) => ({ ...item, colProps: { span: 24 } })),
                              1,
                            )
                          }
                          title={formatMessage({
                            id: 'common.edit',
                            defaultMessage: '编辑',
                          })}
                        />
                      )}
                    </>
                  ),
                });
              }
              break;
          }
          break;
        case DeviceModelTypeEnum.TimeStamp:
          if (passAuthority(field?.authority, 'edit')) {
            columns.push({
              title: field?.name,
              dataIndex: getRealField(field?.id),
              formItemProps: {
                validateTrigger: 'submit',
                rules:
                  field?.required === false
                    ? []
                    : [
                        {
                          required: true,
                          message: formatMessage(
                            { id: 'common.pleaseSelectSentence', defaultMessage: '请选择' },
                            {
                              content: field?.name,
                            },
                          ),
                        },
                      ],
              },
              renderFormItem: () => <DateStamp />,
              initialValue: isEmpty(field?.defaultValue) ? undefined : field?.defaultValue + '',
            });
            if (field?.span == 24) {
              columns.push({
                formItemProps: {
                  noStyle: true,
                },
                renderFormItem: () => <div />,
                colProps: {
                  span: 24,
                },
              });
            }
          }
          if (field.showType != DeviceModelShowTypeEnum.HideName) {
            detailItems.push?.({
              field: field?.id || '',
              label: field?.name,
              unit: (field?.dataType as DeviceDoubleType)?.specs?.unit,
              valueInterceptor: (_, data) => {
                if (field?.deviceId) {
                  return data?.[field?.deviceId || '']?.[getRealField(field?.id)];
                } else {
                  return data?.[deviceData?.deviceId || '']?.[field?.id || ''];
                }
              },
              format: (value) => formatModelValue(value, field?.dataType || {}, false),
              extral: (
                <>
                  {field?.buttons?.includes?.('refresh') && (
                    <RedoOutlined
                      className={`cl-primary cursor ${styles.refresh}`}
                      onClick={() => onRefresh(field)}
                      title={formatMessage({
                        id: 'common.refresh',
                        defaultMessage: '刷新',
                      })}
                    />
                  )}
                  {field?.buttons?.includes?.('edit') && (
                    <EditOutlined
                      className={`cl-primary cursor ${styles.refresh}`}
                      onClick={() =>
                        onClick(
                          { ...field, id: field.serviceId },
                          columns.map((item) => ({ ...item, colProps: { span: 24 } })),
                          1,
                        )
                      }
                      title={formatMessage({
                        id: 'common.edit',
                        defaultMessage: '编辑',
                      })}
                    />
                  )}
                </>
              ),
            });
          }
          break;
        case DeviceModelTypeEnum.TreeSelect: // 未来的字段都走这个逻辑
          const result = getFieldItems(field, {
            deviceData,
            onRefresh,
            onClick,
            passAuthority,
          });
          columns.push(...result.columns);
          detailItems.push(...result.details);
          break;
        case DeviceModelTypeEnum.Int:
        case DeviceModelTypeEnum.Double:
        case DeviceModelTypeEnum.Long:
          valueType = 'digit';
        case DeviceModelTypeEnum.String:
        default:
          const doubleSpecs = (field?.dataType as DeviceDoubleType)?.specs;
          if (passAuthority(field?.authority, 'edit')) {
            columns.push({
              title: field?.name,
              dataIndex: getRealField(field?.id),
              valueType: valueType,
              fieldProps: (form) => {
                const data = form?.getFieldsValue?.() || {};
                let fieldDisabled = false;
                if (field?.disabled) {
                  try {
                    const evalResult = eval(field?.disabled?.replace?.(/\$data/g, 'data'));
                    if (typeof evalResult == 'boolean') {
                      fieldDisabled = evalResult;
                    }
                  } catch {}
                }
                return {
                  ...(valueType == 'digit'
                    ? {
                        min: (doubleSpecs?.enable && doubleSpecs?.min) || Number.MIN_SAFE_INTEGER,
                        max: (doubleSpecs?.enable && doubleSpecs?.max) || Number.MAX_SAFE_INTEGER,
                      }
                    : {}),
                  ...(doubleSpecs?.unit
                    ? {
                        addonAfter: doubleSpecs?.unit,
                      }
                    : {}),
                  disabled: fieldDisabled,
                };
              },
              formItemProps: (form) => {
                const data = form?.getFieldsValue?.() || {};
                let fieldDisabled = false;
                if (field?.disabled) {
                  try {
                    const evalResult = eval(field?.disabled?.replace?.(/\$data/g, 'data'));
                    if (typeof evalResult == 'boolean') {
                      fieldDisabled = evalResult;
                    }
                  } catch {}
                }
                return {
                  rules:
                    field?.required === false || fieldDisabled
                      ? []
                      : [
                          {
                            required: true,
                            message: formatMessage(
                              { id: 'common.pleaseEnterSentence', defaultMessage: '请输入' },
                              {
                                content: field?.name,
                              },
                            ),
                          },
                        ],
                  extra: doubleSpecs?.enable
                    ? `${formatMessage({ id: 'device.min', defaultMessage: '最小值' })}：${
                        doubleSpecs?.min
                      },${formatMessage({ id: 'device.max', defaultMessage: '最大值' })}：${
                        doubleSpecs?.max
                      }`
                    : undefined,
                };
              },
              initialValue: isEmpty(field?.defaultValue)
                ? undefined
                : valueType == 'digit'
                ? field?.defaultValue
                : field?.defaultValue + '',
            });
            if (field?.span == 24) {
              columns.push({
                formItemProps: {
                  noStyle: true,
                },
                renderFormItem: () => <div />,
                colProps: {
                  span: 24,
                },
              });
            }
          }
          if (field.showType != DeviceModelShowTypeEnum.HideName) {
            detailItems.push?.({
              field: field?.id || '',
              label: field?.name,
              unit: (field?.dataType as DeviceDoubleType)?.specs?.unit,
              valueInterceptor: (_, data) => {
                if (field?.deviceId) {
                  return data?.[field?.deviceId || '']?.[getRealField(field?.id)];
                } else {
                  return data?.[deviceData?.deviceId || '']?.[field?.id || ''];
                }
              },
              format: (value) => formatModelValue(value, field?.dataType || {}, false),
              extral: (
                <>
                  {field?.buttons?.includes?.('refresh') && (
                    <RedoOutlined
                      className={`cl-primary cursor ${styles.refresh}`}
                      onClick={() => onRefresh(field)}
                      title={formatMessage({
                        id: 'common.refresh',
                        defaultMessage: '刷新',
                      })}
                    />
                  )}
                  {field?.buttons?.includes?.('edit') && (
                    <EditOutlined
                      className={`cl-primary cursor ${styles.refresh}`}
                      onClick={() =>
                        onClick(
                          { ...field, id: field.serviceId },
                          columns.map((item) => ({ ...item, colProps: { span: 24 } })),
                          1,
                        )
                      }
                      title={formatMessage({
                        id: 'common.edit',
                        defaultMessage: '编辑',
                      })}
                    />
                  )}
                </>
              ),
            });
          }
      }
      return {
        items: detailItems,
        cols: columns,
      };
    },
    [realTimeData, deviceData, btnClick, loading, passAuthority, onClick, onRefresh],
  );

  const getServiceItem = useCallback(
    (service: DeviceServiceType) => {
      const detailItems: DetailItem[] = [];
      const columns: ProFormColumnsType[] = [];
      service?.children?.forEach?.((field) => {
        if (passAuthority(field.authority)) {
          field.serviceId = service.id;
          field.queryId = service.queryId;
          const { items, cols } = getFieldItem(field);
          if (field.dataType?.type == DeviceModelTypeEnum.Array) {
            if (detailItems.length > 1) {
              detailItems[detailItems?.length - 1].span = 4 - (detailItems.length % 3);
            }
          }
          detailItems.push(...items);
          columns.push(...cols);
        }
      });
      const columnsLength = getColumnsLength(columns);
      if (columnsLength < 3) {
        columns.forEach((item) => {
          item.colProps = {
            span: 24 / columnsLength,
          };
        });
      }
      if (detailItems?.length == 2) {
        detailItems[1].span = 2;
      }
      if (detailItems.length) {
        const groupItem: GroupItem = {
          className: styles.btnDetail,
          items: detailItems,
        };
        if (service.showType != DeviceModelShowTypeEnum.HideName) {
          groupItem.label = (
            <Detail.Label
              title={
                <>
                  {service?.name}
                  {!!service?.tip && (
                    <Typography.Text className={styles.tip} type="secondary">
                      ({service?.tip})
                    </Typography.Text>
                  )}
                </>
              }
            >
              {service?.buttons?.includes?.('refresh') ? (
                <RedoOutlined
                  className={`cl-primary cursor ${styles.refresh}`}
                  onClick={() => onRefresh(service)}
                  title={formatMessage({
                    id: 'common.refresh',
                    defaultMessage: '刷新',
                  })}
                />
              ) : (
                <Authority
                  code={service?.authority?.map?.((item) => item.edit)?.join?.(',')}
                  mode={AuthorityModeEnum.Within}
                >
                  <Button
                    type="primary"
                    onClick={() => onClick(service, columns, columnsLength)}
                    disabled={deviceData?.networkStatus === OnlineStatusEnum.Offline}
                  >
                    {formatMessage({ id: 'common.configParam', defaultMessage: '配置参数' })}
                  </Button>
                </Authority>
              )}
            </Detail.Label>
          );
        }
        return groupItem;
      } else {
        return;
      }
    },
    [deviceData, getFieldItem, onClick, onRefresh, passAuthority],
  );

  const getGroupItems = useCallback(
    (modelDescribeItem: DeviceModelDescribeType) => {
      const result: GroupItem[] = [];
      if (passAuthority(modelDescribeItem?.authority)) {
        switch (modelDescribeItem.type) {
          case DeviceModelDescribeTypeEnum.Group:
            modelDescribeItem?.children?.forEach?.((item) => {
              if (passAuthority(item?.authority)) {
                const groupResult = getGroupItems(item);
                groupResult.length && result.push(...groupResult);
              }
            });
            if (
              result.length &&
              modelDescribeItem.children &&
              (modelDescribeItem.children.length > 1 ||
                modelDescribeItem.children?.[0]?.showType == DeviceModelShowTypeEnum.HideName)
            ) {
              result.unshift({
                label: (
                  <Detail.Label
                    title={
                      <>
                        {modelDescribeItem?.name}
                        {!!modelDescribeItem?.tip && (
                          <Typography.Text className={`ml12 ${styles.tip}`} type="secondary">
                            ({modelDescribeItem?.tip})
                          </Typography.Text>
                        )}
                      </>
                    }
                  />
                ),
              });
            }
            break;
          case DeviceModelDescribeTypeEnum.PropertyGroup:
          case DeviceModelDescribeTypeEnum.Service:
            const serviceGroup = getServiceItem(modelDescribeItem);
            serviceGroup && result.push(serviceGroup);
            break;
          case DeviceModelDescribeTypeEnum.Tab:
            const tabItems: GroupItem['tabItems'] = [];
            modelDescribeItem?.children?.forEach?.((item) => {
              if (passAuthority(item?.authority)) {
                if (item?.type == DeviceModelDescribeTypeEnum.TabItem) {
                  const tabGroupItems: GroupItem[] = [];
                  (item as DeviceModelDescribeType)?.children?.forEach?.((tabGroupItem) => {
                    const tabGroupResult = getGroupItems(tabGroupItem);
                    tabGroupResult.length && tabGroupItems.push(...tabGroupResult);
                  });
                  if (tabGroupItems.length) {
                    tabItems.push({
                      key: item.id || '',
                      label: item.name,
                      groupItems: tabGroupItems,
                    });
                  }
                }
              }
            });
            if (tabItems.length) {
              result.push({
                tabItems,
              });
            }
            break;
          case DeviceModelDescribeTypeEnum.Component:
            if (modelDescribeItem.id) {
              const Component = components[modelDescribeItem.id];
              Component &&
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
            }
            break;
          default:
        }
      }
      return result;
    },
    [realTimeData, deviceData, getServiceItem, passAuthority, components],
  );

  const groupsItems = useMemo(() => {
    const result: GroupItem[] = [];
    if (deviceData?.masterSlaveMode != DeviceMasterMode.Slave) {
      groupData?.forEach?.((item) => {
        result.push(...getGroupItems(item));
      });
    } else {
      const childrens = getPropsFromTree<DeviceModelDescribeType, DeviceModelDescribeType[]>(
        [{ children: groupData }],
        'children',
      );
      childrens.forEach((item) => {
        item.forEach((childItem) => {
          if (childItem.id == 'RemoteUpgrade') {
            result.push(...getGroupItems(childItem));
          }
        });
      });
    }
    return result;
  }, [groupData, deviceData, getGroupItems, realTimeData, authorityMap]);

  useEffect(() => {
    onLoadChange?.(groupsItems.length);
  }, [groupsItems]);

  return (
    <>
      {!!groupsItems?.length && (
        <>
          <Detail.Group
            data={{ ...merge({}, realTimeData, transformData, extralDeviceRealTimeData) }}
            items={groupsItems}
            detailProps={{
              labelStyle: { width: 167, paddingRight: 12 },
              unitInLabel: true,
              ellipsis: false,
              colon: false,
            }}
          />
          <ConfigModal
            width={currentFormInfo?.width || '816px'}
            open={openForm}
            onOpenChange={set}
            title={currentFormInfo?.service?.name || ''}
            deviceId={currentFormInfo?.service?.deviceId || deviceId}
            realTimeData={{
              ...merge(
                {},
                currentFormInfo?.service?.deviceId
                  ? extralDeviceRealTimeData?.[currentFormInfo?.service?.deviceId]
                  : realTimeData,
                currentFormInfo?.dataDeviceIds?.reduce?.(
                  (result, item) => ({ ...result, ...extralDeviceRealTimeData?.[item] }),
                  {},
                ),
                transformData,
              ),
            }}
            serviceId={currentFormInfo?.service?.id || ''}
            columns={currentFormInfo?.columns || []}
            showClickButton={false}
            colProps={{
              span: 8,
            }}
            beforeSubmit={onBeforeSubmit}
          />
        </>
      )}
    </>
  );
});

export default Control;
