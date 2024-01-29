import { formatMessage } from '@/utils';
import type { ProColumns } from '@ant-design/pro-components';
import type { TabsProps, TreeDataNode } from 'antd';
export type PhysicalModelType = {
  editable?: number;
  name?: string;
  remark?: string;
  thingsConfig?: object;
};

export type MenuType = {
  menuId: number;
  menuName: string;
  parentId: string;
  orderNum: number;
  path: string;
  component: string;
  isFrame: number;
  isCache: number;
  menuType: string;
  visible: string;
  status: string;
  perms: string;
  icon: string;
  createBy: string;
  createTime: Date;
  updateBy: string;
  updateTime: Date;
  remark: string;
};

export const tabsItem: TabsProps['items'] = [
  {
    key: 'property',
    label: '属性',
  },
  {
    key: 'event',
    label: '事件',
  },
  {
    key: 'service',
    label: '服务',
  },
];

export const typeOption = [
  {
    value: 'property',
    label: '属性',
  },
  {
    value: 'service',
    label: '服务',
  },
];

export const typeObj = {
  property: 'properties',
  event: 'events',
  service: 'services',
};

export const modeType = {
  property: {
    text: '属性',
  },
  event: {
    text: '事件',
  },
  service: {
    text: '服务',
  },
};
export const defaultData: TreeDataNode[] = [
  {
    name: '运行数据',
    id: 'runningData',
    sortOrder: 1,
    draggable: false, // 设置节点不可拖动
    type: 'page',
    children: [],
  },
  {
    name: '远程控制',
    id: 'remoteControl',
    sortOrder: 2,
    draggable: false, // 设置节点不可拖动
    type: 'page',
    children: [],
  },
  {
    name: '配置',
    id: 'config',
    sortOrder: 3,
    draggable: false, // 设置节点不可拖动
    type: 'page',
    children: [],
  },
];

export const modeDefine = {
  0: {
    text: '预定义',
  },
  1: {
    text: '自定义',
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
    label: 'app',
    value: 0,
  },
  {
    label: 'web',
    value: 1,
  },
];
export const getColumns = (
  operationColumn: ProColumns<PhysicalModelType>[],
): ProColumns<PhysicalModelType>[] => [
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
