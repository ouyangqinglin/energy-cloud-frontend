/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-24 15:15:42
 * @LastEditTime: 2024-06-06 10:10:59
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\system\authorization\index.tsx
 */
import React, { useCallback, useRef } from 'react';
import YTProTable from '@/components/YTProTable';
import { columns } from './config';
import { deleteData, getPage, updateStatus } from './service';
import { AuthDataType } from './type';
import { formatMessage } from '@/utils';
import { Modal, message } from 'antd';
import { ActionType } from '@ant-design/pro-components';

const RemoteUpgrade: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const request = useCallback((params) => {
    return getPage(params);
  }, []);

  const onAddClick = useCallback(() => {}, []);

  const onEditClick = useCallback((_, record: AuthDataType) => {}, []);

  const onEvent = useCallback((_, params: AuthDataType) => {
    Modal.confirm({
      title: formatMessage({ id: 'common.confirm', defaultMessage: '确认' }),
      content: params?.status
        ? formatMessage({
            id: 'system.1018',
            defaultMessage: '您确认要启用吗',
          })
        : formatMessage({
            id: 'system.1019',
            defaultMessage: '您确认要禁用吗',
          }),
      okText: formatMessage({ id: 'common.confirm', defaultMessage: '确认' }),
      cancelText: formatMessage({ id: 'common.cancel', defaultMessage: '取消' }),
      onOk: () =>
        updateStatus(params).then(({ data }) => {
          if (data) {
            message.success(
              formatMessage({ id: 'common.operateSuccess', defaultMessage: '操作成功' }),
            );
            actionRef.current?.reload?.();
          }
        }),
    });
  }, []);

  const onDeleteClick = useCallback((_, record: AuthDataType) => {
    return deleteData({ id: record.id }).then(({ data }) => {
      if (data) {
        message.success(formatMessage({ id: 'common.del', defaultMessage: '删除成功' }));
        actionRef.current?.reload();
      }
    });
  }, []);

  return (
    <>
      <YTProTable
        actionRef={actionRef}
        columns={columns}
        toolBarRenderOptions={{
          add: {
            onClick: () => {},
            text: formatMessage({ id: 'common.newBuilt', defaultMessage: '新建' }),
          },
        }}
        option={{
          columnsProp: {
            width: '120px',
          },
          onEditChange: onEditClick,
          onDeleteChange: onDeleteClick,
          modalDeleteText: formatMessage({
            id: 'common.1017',
            defaultMessage: '您确认要删除该授权吗？删除之后无法恢复！',
          }),
        }}
        request={request}
        onEvent={onEvent}
        resizable
      />
    </>
  );
};

export default RemoteUpgrade;
