import { formatMessage } from '@/utils';
import type { TabsProps } from 'antd';
import type { ProColumnType } from '@ant-design/pro-components';
import type { ModeTreeDataNode } from './data';
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

export const typeOption = [
  {
    value: 'property',
    label: formatMessage({ id: 'user.attribute', defaultMessage: '属性' }),
  },
  {
    value: 'service',
    label: formatMessage({ id: 'user.service', defaultMessage: '服务' }),
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
export const defaultData: ModeTreeDataNode[] = [
  {
    name: '运行数据',
    id: 'runningData',
    key: 'runningDatapage',
    sortOrder: 1,
    draggable: false, // 设置节点不可拖动
    type: 'page',
    children: [],
  },
  {
    name: '远程控制',
    id: 'remoteControl',
    key: 'remoteControlpage',
    sortOrder: 2,
    draggable: false, // 设置节点不可拖动
    type: 'page',
    children: [],
  },
  {
    name: '配置',
    id: 'config',
    sortOrder: 3,
    key: 'configpage',
    draggable: false, // 设置节点不可拖动
    type: 'page',
    children: [],
  },
];
export const modeDefine = {
  0: {
    text: formatMessage({ id: 'common.predefine', defaultMessage: '预定义' }),
  },
  1: {
    text: formatMessage({ id: 'common.custom', defaultMessage: '自定义' }),
  },
};

export const platformDefine = {
  0: {
    text: 'web',
  },
  1: {
    text: 'app',
  },
};
export const platformEnum = [
  {
    label: 'web',
    value: 0,
  },
  {
    label: 'app',
    value: 1,
  },
];
export const getColumns = (operationColumn: ProColumnType[]): ProColumnType[] => [
  {
    title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
    valueType: 'index',
    width: 100,
  },
  {
    title: formatMessage({ id: 'pageTemplate.name', defaultMessage: '页面名称' }),
    dataIndex: 'name',
    ellipsis: true,
    formItemProps: {
      name: 'name',
    },
  },
  {
    title: formatMessage({ id: 'pageTemplate.editable', defaultMessage: '页面类型' }),
    dataIndex: 'editable',
    ellipsis: true,
    hideInSearch: true,
    valueEnum: modeDefine,
  },
  {
    title: formatMessage({ id: 'pageTemplate.platform', defaultMessage: '引用端' }),
    dataIndex: 'platform',
    ellipsis: true,
    valueEnum: platformDefine,
  },
  {
    title: formatMessage({ id: 'pageTemplate.remark', defaultMessage: '页面描述' }),
    dataIndex: 'remark',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'pageTemplate.productModels', defaultMessage: '关联产品型号' }),
    dataIndex: 'productModels',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'physicalModel.createTime', defaultMessage: '创建时间' }),
    dataIndex: 'createTime',
    hideInSearch: true,
  },
  ...operationColumn,
];
