/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-18 15:07:21
 * @LastEditTime: 2023-08-18 15:07:25
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\product-manage\ProductDetail\Module\config.ts
 */

import { ProColumns, ProFormColumnsType } from '@ant-design/pro-components';

export type ModuleDataType = {
  productId?: string;
  id?: string;
  moduleName?: string;
  moduleMark?: string;
  moduleNotes?: string;
};

export const columns: ProColumns<ModuleDataType>[] = [
  {
    title: '序号',
    valueType: 'index',
    width: 48,
    hideInForm: true,
  },
  {
    title: '模块名称',
    dataIndex: 'moduleName',
    width: 120,
    ellipsis: true,
  },
  {
    title: '模块标识',
    dataIndex: 'moduleMark',
    width: 120,
    ellipsis: true,
  },
  {
    title: '备注',
    dataIndex: 'moduleNotes',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
];

export const formColumns: ProFormColumnsType<ModuleDataType, 'text'>[] = [
  {
    title: '模块名称',
    dataIndex: 'moduleName',
  },
  {
    title: '模块标识',
    dataIndex: 'moduleMark',
  },
  {
    title: '备注',
    dataIndex: 'moduleNotes',
    valueType: 'textarea',
  },
];
