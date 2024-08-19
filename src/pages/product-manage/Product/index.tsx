/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-16 15:18:54
 * @LastEditTime: 2023-08-17 17:44:36
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\product-manage\Product\index.tsx
 */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { history } from 'umi';
import { getColumns } from './config';
import type { ProductDataType } from './config';
import YTProTable from '@/components/YTProTable';
import { useSearchSelect } from '@/hooks';
import type { SearchParams } from '@/hooks/useSearchSelect';
import { getProductTypeList } from '@/services/equipment';
import { getPage } from './service';
import { formatMessage } from '@/utils';
import { ActionType, ProConfigProvider } from '@ant-design/pro-components';
import { YTDateRangeValueTypeMap } from '@/components/YTDateRange';
import { Button, Modal, Input } from 'antd';
import { useBoolean } from 'ahooks';
import { editDescription } from './service';

const Product: React.FC = () => {
  const [open, { set, setTrue, setFalse }] = useBoolean(false);
  const { TextArea } = Input;
  const [description, setDescription] = useState(''); // 使用 useState 钩子来管理输入值的状态
  const [id, setId] = useState();
  const actionRef = useRef<ActionType>();
  const [des, setDes] = useState('');

  const onOk = (e: any) => {
    editDescription({ id, description }).then((res) => {
      if (res.data) {
        if (actionRef.current) {
          actionRef.current?.reload();
        }
      }
    });
    setFalse();
  };

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
      <ProConfigProvider
        valueTypeMap={{
          ...YTDateRangeValueTypeMap,
        }}
      >
        <YTProTable
          columns={columns}
          actionRef={actionRef}
          toolBarRender={() => []}
          request={getPage}
          option={{
            onDetailChange,
            render: (_, record) => (
              <>
                <Button
                  type="link"
                  onClick={() => {
                    setTrue();
                    //@ts-ignore
                    setId(record?.id);
                    setDes(record?.description);
                  }}
                >
                  编辑
                </Button>
              </>
            ),
          }}
        />
        <Modal
          open={open}
          //@ts-ignore
          onCancel={setFalse}
          onOk={onOk}
          title={formatMessage({ id: 'siteManage.editNote', defaultMessage: '编辑备注' })}
          destroyOnClose
          maskClosable={false}
        >
          <TextArea
            name="postContent"
            rows={4}
            defaultValue={des}
            onChange={(e) => {
              setDescription(e.target.value);
            }} // 监听改变事件来更新状态
          />
        </Modal>
      </ProConfigProvider>
    </>
  );
};

export default Product;
