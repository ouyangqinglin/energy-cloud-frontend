/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-24 15:15:42
 * @LastEditTime: 2024-06-06 16:16:09
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\system\authorization\index.tsx
 */
import React, { useCallback, useRef, useState } from 'react';
import YTProTable from '@/components/YTProTable';
import { columns, formColumns, getLogColumns } from './config';
import { deleteData, getPage, editData, addData, getData, updateStatus, getLog } from './service';
import type { AuthDataType } from './type';
import { formatMessage } from '@/utils';
import { Button, Modal, message } from 'antd';
import type { ActionType } from '@ant-design/pro-components';
import { ProConfigProvider } from '@ant-design/pro-components';
import SchemaForm, { FormTypeEnum } from '@/components/SchemaForm';
import { useBoolean } from 'ahooks';
import { tableSelectValueTypeMap } from '@/components/TableSelect';
import type { getLogData } from './data';

const RemoteUpgrade: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [openForm, { set }] = useBoolean(false);
  const [appId, setAppId] = useState<string>('');
  const [formInfo, setFormInfo] = useState({
    type: FormTypeEnum.Add,
    id: '',
  });

  const [open, setOpen] = useState(false);
  const request = useCallback((params) => {
    return getPage(params);
  }, []);

  const onSuccess = useCallback(() => {
    actionRef.current?.reload?.();
  }, []);

  const onAddClick = useCallback(() => {
    setFormInfo({
      type: FormTypeEnum.Add,
      id: '',
    });
    set(true);
  }, [set]);

  const onEvent = useCallback(
    (_, params: AuthDataType) => {
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
              onSuccess();
            }
          }),
      });
    },
    [onSuccess],
  );

  const onDeleteClick = useCallback(
    (_, record: AuthDataType) => {
      return deleteData({ id: record.id }).then(({ data }) => {
        if (data) {
          message.success(formatMessage({ id: 'common.del', defaultMessage: '删除成功' }));
          onSuccess();
        }
      });
    },
    [onSuccess],
  );

  const afterRequest = useCallback((data) => {
    data.status = !!data.status;
    data.siteIds = data?.sites || [];
  }, []);

  const beforeSubmit = useCallback((data) => {
    data.status = Number(data.status);
    data.siteIds = data?.siteIds?.map?.((item: any) => item.id) || [];
  }, []);

  const onEditClick = useCallback(
    (_, record: AuthDataType) => {
      setFormInfo({
        type: FormTypeEnum.Edit,
        id: record.id,
      });
      set(true);
    },
    [set],
  );

  //
  const onLogClick = useCallback((params) => {
    setAppId(params.appId);
    setOpen(true);
    return getLog(params);
  }, []);

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const requestList = useCallback(
    (params: getLogData) => {
      return getLog({ ...params, appId });
    },
    [appId],
  );

  return (
    <>
      <YTProTable
        actionRef={actionRef}
        columns={columns}
        toolBarRenderOptions={{
          add: {
            onClick: onAddClick,
          },
        }}
        option={{
          columnsProp: {
            width: '160px',
          },
          onEditChange: onEditClick,
          onDeleteChange: onDeleteClick,
          render: (_, record) => (
            <Button type="link" onClick={() => onLogClick(record)}>
              日志
            </Button>
          ),
          modalDeleteText: formatMessage({
            id: 'common.1017',
            defaultMessage: '您确认要删除该授权吗？删除之后无法恢复！',
          }),
        }}
        request={request}
        onEvent={onEvent}
        resizable
      />

      <Modal
        title="站点查看"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        destroyOnClose
        maskClosable={false}
        footer={[
          <Button key="back" onClick={handleCancel}>
            关闭
          </Button>,
        ]}
      >
        <YTProTable<getLogData, getLogData>
          actionRef={actionRef}
          // @ts-ignore
          columns={getLogColumns}
          request={requestList}
          toolBarRender={() => []}
        />
      </Modal>

      <ProConfigProvider valueTypeMap={tableSelectValueTypeMap}>
        <SchemaForm
          width="816px"
          type={formInfo.type}
          columns={formColumns}
          open={openForm}
          onOpenChange={set}
          shouldUpdate={false}
          id={formInfo.id}
          editData={editData}
          addData={addData}
          getData={getData}
          beforeSubmit={beforeSubmit}
          afterRequest={afterRequest}
          onSuccess={onSuccess}
          grid={true}
          colProps={{
            span: 12,
          }}
        />
      </ProConfigProvider>
    </>
  );
};

export default RemoteUpgrade;
