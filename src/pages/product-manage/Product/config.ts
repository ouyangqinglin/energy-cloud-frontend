/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-17 16:31:45
 * @LastEditTime: 2024-01-24 16:18:40
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\product-manage\Product\config.ts
 */

import { getFactoryList, getProductModelByType } from '@/services/equipment';
import { formatMessage } from '@/utils';
import { ProColumns } from '@ant-design/pro-components';
import { getLocale } from '@/utils';

export type ProductDataType = {
  id?: string;
  createTime?: string;
  productTypeId?: string;
};

export const getColumns = (
  productTypeColumn: ProColumns<ProductDataType>,
): ProColumns<ProductDataType>[] => {
  return [
    {
      title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
      valueType: 'index',
      width: 48,
    },
    productTypeColumn,
    {
      title: formatMessage({ id: 'common.model', defaultMessage: '产品型号' }),
      dataIndex: 'model',
      valueType: 'select',
      formItemProps: {
        name: 'id',
      },
      width: 150,
      ellipsis: true,
      dependencies: ['productTypeId'],
      request: (params: ProductDataType) => {
        if (params.productTypeId) {
          return getProductModelByType({ productTypeId: params.productTypeId }).then(({ data }) => {
            return data?.map?.((item) => {
              return {
                label: item?.model || '',
                value: item?.id || '',
              };
            });
          });
        } else {
          return Promise.resolve([]);
        }
      },
    },
    {
      title: formatMessage({ id: 'user.productId', defaultMessage: '产品ID' }),
      dataIndex: 'id',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: formatMessage({ id: 'user.productManufacturer', defaultMessage: '产品厂商' }),
      dataIndex: 'productFactory',
      valueType: 'select',
      formItemProps: {
        name: 'factoryId',
      },
      width: 150,
      ellipsis: true,
      request: () => {
        return getFactoryList().then(({ data }) => {
          return data?.map?.((item) => {
            return {
              label: item?.name || '',
              value: item?.id || '',
            };
          });
        });
      },
    },
    {
      title: formatMessage({ id: 'user.inputTime', defaultMessage: '录入时间' }),
      dataIndex: 'createTime',
      valueType: 'dateRange',
      render: (_, record) => record.createTime,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
      fieldProps: {
        format: getLocale().dateFormat,
      },
      width: 150,
    },
  ];
};
