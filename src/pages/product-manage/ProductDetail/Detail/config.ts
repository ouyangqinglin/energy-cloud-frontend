/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-18 14:51:19
 * @LastEditTime: 2023-08-18 14:51:19
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\product-manage\ProductDetail\Detail\config.ts
 */

import { DetailItem } from '@/components/Detail';
import { DevicePropsType } from '@/types/device';
import { ProColumns } from '@ant-design/pro-components';

export type CollectionDataType = {
  properties?: DevicePropsType[];
  services?: DevicePropsType[];
  events?: DevicePropsType[];
};

export const detailItems: DetailItem[] = [
  { label: '产品型号', field: 'model' },
  { label: '产品类型', field: 'productType' },
  { label: '产品ID', field: 'id' },
  { label: '录入时间', field: 'createTime' },
];

export const columns: ProColumns[] = [
  {
    title: '序号',
    valueType: 'index',
    width: 48,
  },
  {
    title: '功能点ID',
    dataIndex: 'id',
    width: 120,
    ellipsis: true,
  },
  {
    title: '功能点名称',
    dataIndex: 'name',
    width: 120,
    ellipsis: true,
  },
  {
    title: '值',
    dataIndex: 'value',
    width: 120,
    ellipsis: true,
  },
];
