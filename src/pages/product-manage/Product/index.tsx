/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-16 15:18:54
 * @LastEditTime: 2023-08-17 17:44:36
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\product-manage\Product\index.tsx
 */
import React, { useCallback, useMemo } from 'react';
import { history } from 'umi';
import { getColumns } from './config';
import type { ProductDataType } from './config';
import YTProTable from '@/components/YTProTable';
import { useSearchSelect } from '@/hooks';
import type { SearchParams } from '@/hooks/useSearchSelect';
import { getProductTypeList } from '@/services/equipment';
import { getPage } from './service';
import { formatMessage } from '@/utils';

const Product: React.FC = () => {
  const requestProductType = useCallback((searchParams: SearchParams) => {
    return getProductTypeList(searchParams).then(({ data }) => {
      return data?.map?.((item) => {
        return {
          label: item?.name || '',
          value: item?.id || '',
        };
      });
    });
  }, []);

  const [productTypeColumn] = useSearchSelect<ProductDataType>({
    proColumns: {
      title: formatMessage({ id: 'common.productType', defaultMessage: '产品类型' }),
      dataIndex: 'productType',
      formItemProps: (form) => {
        form?.setFieldValue?.('modelId', '');
        return {
          name: 'productTypeId',
        };
      },
      width: 150,
      ellipsis: true,
    },
    request: requestProductType,
  });

  const columns = useMemo(() => {
    return getColumns(productTypeColumn);
  }, [productTypeColumn]);

  const onDetailChange = useCallback((_, record: ProductDataType) => {
    history.push({
      pathname: '/system/product-detail',
      search: '?id=' + record?.id,
    });
  }, []);

  return (
    <>
      <YTProTable
        columns={columns}
        toolBarRender={false}
        request={getPage}
        option={{
          onDetailChange,
        }}
      />
    </>
  );
};

export default Product;
