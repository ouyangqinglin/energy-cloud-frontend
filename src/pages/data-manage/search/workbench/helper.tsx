/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-10-10 16:33:30
 * @LastEditTime: 2024-08-19 10:21:13
 * @LastEditors: YangJianFei
 * @FilePath: /energy-cloud-frontend/src/pages/data-manage/search/workbench/helper.tsx
 */

import moment from 'moment';
import type { Moment } from 'moment';
import type { CollectionSearchType, SearchType } from './typing';
import { ProFormSelect } from '@ant-design/pro-components';
import type { ProColumns, ProFormColumnsType } from '@ant-design/pro-components';
import { YTCellFourOutlined, YTCellNineOutlined, YTCellSixOutlined } from '@/components/YTIcons';
import { TABLETREESELECT } from '@/components/TableSelect';
import type { TABLETREESELECTVALUETYPE } from '@/components/TableSelect';
import { getDeviceCollection, getSiteDeviceTree } from '@/services/equipment';
import type { DeviceTreeDataType } from '@/types/device';
import { formatMessage, parseToObj } from '@/utils';
import { getSitesList } from '@/services/station';
import { Checkbox, Col, Row } from 'antd';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { aggregationTime } from '@/utils/dict';

export const column: ProFormColumnsType<SearchType>[] = [
  {
    dataIndex: 'date',
    valueType: 'dateRange',
    formItemProps: {
      rules: [
        {
          required: true,
          message: formatMessage({
            id: 'common.pleaseSelect',
            defaultMessage: '请选择',
          }),
        },
      ],
    },
    initialValue: [moment(), moment()],
  },
];

export const layoutConfig = [
  {
    title: formatMessage({ id: 'siteManage.4grid', defaultMessage: '四宫格' }),
    value: 4,
    icon: <YTCellFourOutlined />,
  },
  {
    title: formatMessage({ id: 'siteManage.6grid', defaultMessage: '六宫格' }),
    value: 6,
    icon: <YTCellSixOutlined />,
  },
  {
    title: formatMessage({ id: 'siteManage.9grid', defaultMessage: '九宫格' }),
    value: 9,
    icon: <YTCellNineOutlined />,
  },
];

const aggregationMethod = {
  0: {
    text: formatMessage({ id: 'dataManage.1070', defaultMessage: '最大值' }),
  },
  1: {
    text: formatMessage({ id: 'dataManage.1071', defaultMessage: '最小值' }),
  },
  2: {
    text: formatMessage({ id: 'dataManage.1072', defaultMessage: '平均值' }),
  },
  3: {
    text: formatMessage({ id: 'dataManage.1073', defaultMessage: '第一个值' }),
  },
  4: {
    text: formatMessage({ id: 'dataManage.1074', defaultMessage: '最后一个值' }),
  },
};

export const tableSelectColumns: ProColumns[] = [
  {
    title: formatMessage({
      id: 'siteManage.set.dataCollectionPoints',
      defaultMessage: '数据采集点',
    }),
    dataIndex: 'modelName',
    width: 200,
    ellipsis: true,
    hideInTable: true,
    fieldProps: {
      onPressEnter: (e) => {
        e.preventDefault();
      },
    },
  },
  {
    title: formatMessage({
      id: 'siteManage.set.dataCollectionPoints',
      defaultMessage: '数据采集点',
    }),
    dataIndex: 'paramName',
    width: 200,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({
      id: 'siteManage.set.dataCollectionPointIdIdentify',
      defaultMessage: '数据采集点标识',
    }),
    dataIndex: 'paramCode',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'dataManage.1050', defaultMessage: '数据类型' }),
    dataIndex: 'type',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
    render: (_, record) => {
      const dataType = parseToObj(record.dataType);
      if (!dataType.type) {
        return '-';
      }
      return <span>{dataType.type}</span>;
    },
  },
];

export const requestTree = (node: DeviceTreeDataType) => {
  if (node.children) {
    return Promise.resolve();
  } else {
    return getSiteDeviceTree({ siteId: node.siteId }).then((res) => {
      return res?.data?.[0]?.children || [];
    });
  }
};

export const requestSiteList = () => {
  return getSitesList().then((res) => {
    res?.data?.map?.((item: DeviceTreeDataType) => {
      item.deviceName = item.name;
      item.isLeaf = false;
      item.siteId = item.id;
    });
    return res;
  });
};

const TimeCom = ({ value, onChange }: any) => {
  const { timeBucket, polymerizationType, breakConnect } = value || {};
  return (
    <>
      <Row>
        <Col span={12}>
          <ProFormSelect
            name="timeBucket"
            label={formatMessage({ id: 'dataManage.1061', defaultMessage: '聚合周期' })}
            valueEnum={aggregationTime}
            initialValue={timeBucket}
            onChange={
              (params) =>
                onChange?.({
                  polymerizationType,
                  breakConnect,
                  timeBucket: params,
                })
              // form?.setFieldValue?.('extralData', {
              // polymerizationType,
              // breakConnect,
              // timeBucket: value
              // })
            }
          />
        </Col>
        <Col span={12}>
          {timeBucket ? (
            <ProFormSelect
              name="polymerizationType"
              label={formatMessage({ id: 'dataManage.1062', defaultMessage: '聚合方式' })}
              valueEnum={aggregationMethod}
              initialValue={polymerizationType}
              onChange={
                (params) =>
                  onChange?.({
                    polymerizationType: params,
                    breakConnect,
                    timeBucket,
                  })
                //   form?.setFieldValue?.('extralData', {
                //   polymerizationType: value,
                //   breakConnect,
                //   timeBucket
                // })
              }
            />
          ) : (
            <div className="flex flex-center h-full">
              <Checkbox
                defaultChecked={breakConnect}
                onChange={
                  (e: CheckboxChangeEvent) =>
                    onChange?.({
                      polymerizationType,
                      breakConnect: e.target.checked,
                      timeBucket,
                    })
                  // form?.setFieldValue?.('extralData', {
                  //   polymerizationType,
                  //   breakConnect: e.target.checked,
                  //   timeBucket
                  // })
                }
              >
                {formatMessage({ id: 'dataManage.1063', defaultMessage: '断点强连' })}
              </Checkbox>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

const requestList = (params: any) =>
  getDeviceCollection(params).then((res) => {
    res?.data?.forEach?.((item: any) => {
      const dataType = parseToObj(item.dataType);
      item.checkable = ['long', 'double', 'enum'].includes(dataType.type);
    });
    return res;
  });

export const searchColumns: ProFormColumnsType<CollectionSearchType, TABLETREESELECTVALUETYPE>[] = [
  {
    title: formatMessage({
      id: 'siteManage.set.dataCollectionPoints',
      defaultMessage: '数据采集点',
    }),
    dataIndex: 'collection',
    valueType: TABLETREESELECT,
    formItemProps: {
      labelCol: { span: '0 0 100px' },
      rules: [
        {
          required: true,
          message: formatMessage({
            id: 'common.pleaseSelect',
            defaultMessage: '请选择',
          }),
        },
      ],
    },
    fieldProps: {
      title:
        formatMessage({
          id: 'common.pleaseSelect',
          defaultMessage: '请选择',
        }) +
        formatMessage({
          id: 'dataManage.1087',
          defaultMessage: '（只能选择数据类型为: long、double、enum的数据）',
        }),
      treeProps: {
        fieldNames: {
          title: 'deviceName',
          key: 'id',
          children: 'children',
        },
        request: requestSiteList,
        loadData: requestTree,
        defaultExpandAll: false,
      },
      treeSearch: {
        filterData: (data: DeviceTreeDataType[], searchValue: string) => {
          const result: DeviceTreeDataType[] = [];
          data?.forEach?.((item) => {
            if (item?.deviceName?.indexOf && item?.deviceName?.indexOf?.(searchValue) > -1) {
              result.push(item);
            }
          });
          return result;
        },
        placeholder: formatMessage({ id: 'dataManage.1060', defaultMessage: '筛选站点' }),
      },
      proTableProps: {
        pagination: false,
        columns: tableSelectColumns,
        request: requestList,
        rowSelection: {
          renderCell: (checked: any, record: any, index: any, originNode: any) => {
            const dataType = parseToObj(record.dataType);
            if (['long', 'double', 'enum'].includes(dataType.type)) {
              return originNode;
            } else {
              return <Checkbox defaultChecked={false} disabled />;
            }
          },
        },
      },
      valueId: 'selectName',
      valueName: 'paramName',
      limit: 2,
      limitSelect: 10,
      virtual: true,
      dealTreeData: (data: DeviceTreeDataType) => {
        if (typeof data.component != 'undefined' && [0, 1].includes(data.component)) {
          data.selectable = true;
        } else {
          data.selectable = false;
          data.id = (data?.id ?? '') + Math.random().toFixed(8);
        }
        if (typeof data.isLeaf !== 'boolean' && !data?.children?.length) {
          data.isLeaf = true;
        }
      },
    },
  },
  {
    title: formatMessage({ id: 'common.time', defaultMessage: '时间' }),
    dataIndex: 'time',
    valueType: 'dateRange',
    transform: (value) => {
      return {
        startTime: value[0] + ' 00:00:00',
        endTime: value[1] + ' 23:59:59',
      };
    },
    initialValue: [moment().startOf('day'), moment().endOf('day')],
    formItemProps: {
      rules: [
        {
          required: true,
          message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
        },
      ],
    },
    fieldProps: (form) => {
      return {
        onOpenChange: (open: boolean) => {
          if (open) {
            window.workbenchDates = [];
            window.workbenchSelectDates = form?.getFieldValue?.('time');
            form?.setFieldValue?.('time', []);
          } else {
            if (window.workbenchDates?.[0] && window.workbenchDates?.[1]) {
              form?.setFieldValue?.('time', window.workbenchDates);
            } else {
              form?.setFieldValue?.('time', window.workbenchSelectDates);
            }
          }
        },
        onCalendarChange: (val: Moment[]) => {
          window.workbenchDates = [...(val || [])];
        },
        disabledDate: (current: Moment) => {
          if (!window.workbenchDates) {
            return false;
          }
          const tooLate =
            window.workbenchDates?.[0] && current.diff(window.workbenchDates?.[0], 'days') > 7;
          const tooEarly =
            window.workbenchDates?.[1] && window.workbenchDates?.[1].diff(current, 'days') > 7;
          return !!tooEarly || !!tooLate;
        },
      };
    },
  },
  {
    dataIndex: 'extralData',
    initialValue: {
      timeBucket: '1',
      polymerizationType: '0',
    },
    formItemProps: {
      labelCol: { span: 0 },
      wrapperCol: { span: 24 },
    },
    renderFormItem: () => {
      return <TimeCom />;
    },
  },
];
