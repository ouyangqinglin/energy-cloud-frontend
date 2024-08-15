import { formatMessage } from '@/utils';
import type { ProColumns, ProFormColumnsType } from '@ant-design/pro-components';
import { taskStatusEnum } from '@/utils/dict';
import { CollectionSearchType } from '@/services/data';
import { TABLETREESELECT, TABLETREESELECTVALUETYPE } from '@/components/TableSelect';
import { Moment } from 'moment';
import { DeviceTreeDataType } from '@/types/device';
import { getDeviceCollection } from '@/services/equipment';
import { Checkbox } from 'antd';
import { requestSiteList, requestTree, tableSelectColumns } from '../search/workbench/helper';

export interface DataType {
  key: React.Key;
  siteId: string;
  siteName: string;
  energyOptions: string;
  platform: number;
  deliveryTime: string;
  deviceCount: number;
  charge: number;
  discharge: number;
  efficiency: number;
  gain: number;
}

export const columns: ProColumns<DataType>[] = [
  {
    title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
    dataIndex: 'index',
    valueType: 'index',
    width: 50,
    align: 'center',
  },
  {
    title: formatMessage({ id: 'monitor.Job.job_name', defaultMessage: '任务名称' }),
    dataIndex: 'name',
    hideInSearch: false,
    ellipsis: true,
    align: 'center',
  },
  {
    title: formatMessage({
      id: 'dataManage.1083',
      defaultMessage: '查询开始时间',
    }),
    dataIndex: 'startTime',
    ellipsis: true,
    valueType: 'dateTime',
    hideInSearch: true,
    align: 'center',
  },
  {
    title: formatMessage({ id: 'dataManage.1084', defaultMessage: '查询结束时间' }),
    dataIndex: 'endTime',
    ellipsis: true,
    valueType: 'dateTime',
    hideInSearch: true,
    align: 'center',
  },
  {
    title: formatMessage({ id: 'dataManage.1080', defaultMessage: '查询参数' }),
    dataIndex: 'config',
    ellipsis: true,
    hideInSearch: true,
    align: 'center',
  },
  {
    title: formatMessage({ id: 'dataManage.1081', defaultMessage: '任务状态' }),
    dataIndex: 'status',
    valueEnum: taskStatusEnum,
    ellipsis: true,
    hideInSearch: false,
    align: 'center',
  },
  {
    title: formatMessage({ id: 'dataManage.1082', defaultMessage: '进度' }),
    dataIndex: 'schedule',
    hideInSearch: true,
    hideInTable: false,
    ellipsis: true,
    align: 'center',
  },
  {
    title: formatMessage({ id: 'dataManage.1085', defaultMessage: '任务执行时间' }),
    dataIndex: 'taskStartTime',
    valueType: 'dateRange',
    hideInTable: true,
    hideInSearch: false,
    width: 200,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: formatMessage({ id: 'dataManage.1085', defaultMessage: '任务执行时间' }),
    dataIndex: 'taskStartTime',
    ellipsis: true,
    valueType: 'dateTime',
    hideInSearch: true,
    align: 'center',
  },
];

export const exportTaskColumns: ProFormColumnsType<
  CollectionSearchType,
  TABLETREESELECTVALUETYPE
>[] = [
  {
    title: formatMessage({ id: 'monitor.Job.job_name', defaultMessage: '任务名称' }),
    dataIndex: 'name',
    formItemProps: { rules: [{ required: true, message: '请输入任务名称' }] },
    colProps: { span: 12 },
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
            window.workbenchDates?.[0] && current.diff(window.workbenchDates?.[0], 'days') > 30;
          const tooEarly =
            window.workbenchDates?.[1] && window.workbenchDates?.[1].diff(current, 'days') > 30;
          return !!tooEarly || !!tooLate;
        },
      };
    },
  },
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
      title: formatMessage({
        id: 'common.pleaseSelect',
        defaultMessage: '请选择',
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
        request: getDeviceCollection,
        // rowSelection: {
        //   renderCell: (checked: any, record: any, index: any, originNode: any) => {
        //     const dataType = JSON.parse(record.dataType);
        //     if (['long', 'double', 'enum'].includes(dataType.type)) {
        //       return originNode;
        //     } else {
        //       return <Checkbox defaultChecked={false} disabled />;
        //     }
        //   },
        // },
      },
      valueId: 'selectName',
      valueName: 'paramName',
      limit: 2,
      limitSelect: 100,
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
];
