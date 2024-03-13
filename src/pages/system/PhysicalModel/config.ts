import { formatMessage } from '@/utils';
import type { ProColumnType } from '@ant-design/pro-components';
import type { TabsProps } from 'antd';

export const tabsItem: TabsProps['items'] = [
  {
    key: 'property',
    label: formatMessage({ id: 'user.attribute', defaultMessage: '属性' }),
  },
  {
    key: 'event',
    label: formatMessage({ id: 'user.event', defaultMessage: '事件' }),
  },
  {
    key: 'service',
    label: formatMessage({ id: 'user.service', defaultMessage: '服务' }),
  },
];

export const alarmLevelOptions = [
  {
    value: 'info',
    label: formatMessage({ id: 'alarmManage.tips', defaultMessage: '提示' }),
  },
  {
    value: 'warn',
    label: formatMessage({ id: 'alarmManage.secondary', defaultMessage: '次要' }),
  },
  {
    value: 'alarm',
    label: formatMessage({ id: 'alarmManage.importance', defaultMessage: '重要' }),
  },
  {
    value: 'error',
    label: formatMessage({ id: 'alarmManage.emergent', defaultMessage: '严重' }),
  },
];

export const typeObj = {
  property: 'properties',
  event: 'events',
  service: 'services',
};

export const modeType = {
  property: {
    text: formatMessage({ id: 'user.attribute', defaultMessage: '属性' }),
  },
  event: {
    text: formatMessage({ id: 'user.event', defaultMessage: '事件' }),
  },
  service: {
    text: formatMessage({ id: 'user.service', defaultMessage: '服务' }),
  },
};

export const modeDefine = {
  0: {
    text: formatMessage({ id: 'common.predefine', defaultMessage: '预定义' }),
  },
  1: {
    text: formatMessage({ id: 'common.custom', defaultMessage: '自定义' }),
  },
};
export const getColumns = (operationColumn: ProColumnType): ProColumnType[] => [
  {
    title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
    valueType: 'index',
    width: 100,
  },
  {
    title: formatMessage({ id: 'physicalModel.name', defaultMessage: '物模型名称' }),
    dataIndex: 'name',
    ellipsis: true,
    formItemProps: {
      name: 'name',
    },
  },
  {
    title: formatMessage({ id: 'physicalModel.editable', defaultMessage: '物模型类型' }),
    dataIndex: 'editable',
    ellipsis: true,
    hideInSearch: true,
    valueEnum: modeDefine,
  },
  {
    title: formatMessage({ id: 'physicalModel.remark', defaultMessage: '备注' }),
    dataIndex: 'remark',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'physicalModel.createTime', defaultMessage: '创建时间' }),
    dataIndex: 'createTime',
    hideInSearch: true,
  },
  operationColumn,
];

export const getTypeColumns = (operationColumn: ProColumnType): ProColumnType[] => [
  {
    title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
    valueType: 'index',
    width: 100,
  },
  {
    title: formatMessage({ id: 'physicalModel.typeName', defaultMessage: '属性名称' }),
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'physicalModel.typeKey', defaultMessage: '属性key' }),
    dataIndex: 'id',
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'physicalModel.typeJson', defaultMessage: '属性json' }),
    dataIndex: 'json',
    ellipsis: true,
    hideInSearch: true,
  },
  operationColumn,
];
export const fieldColumns: ProColumnType[] = [
  {
    title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
    valueType: 'index',
    width: 100,
  },
  {
    title: formatMessage({ id: 'physicalModel.source', defaultMessage: '字段来源' }),
    dataIndex: 'sourceName',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'physicalModel.fieldName', defaultMessage: '字段名称' }),
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'physicalModel.fieldKey', defaultMessage: '字段key' }),
    dataIndex: 'id',
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'physicalModel.fieldType', defaultMessage: '字段类型' }),
    dataIndex: 'type',
    ellipsis: true,
    hideInSearch: true,
    valueEnum: modeType,
  },
  {
    title: formatMessage({ id: 'physicalModel.fieldJson', defaultMessage: '结构体' }),
    dataIndex: 'json',
    ellipsis: true,
    hideInSearch: true,
    renderText: (json) => JSON.stringify(json),
  },
];

export const eventsDefaultJson = {
  dataType: {
    specs: {
      '0': '正常',
      '1': '故障',
    },
    type: 'enum',
  },
};
