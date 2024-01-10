/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-18 14:51:19
 * @LastEditTime: 2023-08-22 11:52:34
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\product-manage\ProductDetail\Detail\config.ts
 */

import { DetailItem } from '@/components/Detail';
import { DevicePropsType } from '@/types/device';
import { formatMessage } from '@/utils';
import { ProColumns } from '@ant-design/pro-components';

export type CollectionDetailType = {
  value?: string;
  unit?: string;
  type?: string;
};

export type CollectionDataType = {
  properties?: DevicePropsType[];
  services?: DevicePropsType[];
  events?: DevicePropsType[];
};

export const detailItems: DetailItem[] = [
  { label: formatMessage({ id: 'common.model', defaultMessage: '产品型号' }), field: 'model' },
  {
    label: formatMessage({ id: 'common.productType', defaultMessage: '产品类型' }),
    field: 'productType',
  },
  { label: formatMessage({ id: 'user.productId', defaultMessage: '产品ID' }), field: 'id' },
  {
    label: formatMessage({ id: 'user.inputTime', defaultMessage: '录入时间' }),
    field: 'createTime',
  },
];

export const columns: ProColumns[] = [
  {
    title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
    valueType: 'index',
    width: 48,
  },
  {
    title: formatMessage({ id: 'user.functionPointId', defaultMessage: '功能点ID' }),
    dataIndex: 'id',
    width: 120,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'user.functionPointName', defaultMessage: '功能点名称' }),
    dataIndex: 'name',
    width: 120,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'user.valueRange', defaultMessage: '值范围' }),
    dataIndex: 'value',
    width: 120,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'common.unit', defaultMessage: '单位' }),
    dataIndex: 'unit',
    width: 100,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'user.attributeType', defaultMessage: '属性类型' }),
    dataIndex: 'type',
    width: 100,
    ellipsis: true,
  },
];
