/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-08 18:59:32
 * @LastEditTime: 2023-06-15 10:55:14
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\ScreenDialog\Alarm\index.tsx
 */

import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import Dialog from '@/components/Dialog';
import type { BusinessDialogProps } from '@/components/ScreenDialog';
import YTProTable from '@/components/YTProTable';
import { getPage } from './service';
import styles from './index.less';

const levelMap = new Map([
  ['info', <span className={styles.info}>提示</span>],
  ['warn', <span className={styles.warn}>次要</span>],
  ['alarm', <span className={styles.alarm}>重要</span>],
  ['error', <span className={styles.error}>严重</span>],
]);

const PvInverter: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;

  const actionRef = useRef<ActionType>();

  const requestList = useCallback((params) => {
    return getPage(params);
  }, []);

  useEffect(() => {
    if (open) {
      actionRef?.current?.reloadAndRest?.();
    }
  }, [open, actionRef]);

  const columns = useMemo<ProColumns[]>(
    () => [
      {
        title: '告警内容',
        dataIndex: 'content',
        width: 200,
        ellipsis: true,
      },
      {
        title: '告警级别',
        dataIndex: 'level',
        valueEnum: levelMap,
      },
      {
        title: '告警ID',
        dataIndex: 'id',
      },
      {
        title: '设备名称',
        dataIndex: 'deviceName',
      },
      {
        title: '产品类型',
        dataIndex: 'productTypeName',
      },
      {
        title: '产生时间',
        dataIndex: 'alarmTime',
      },
    ],
    [],
  );

  return (
    <>
      <Dialog
        model={model}
        title="告警列表"
        open={open}
        onCancel={onCancel}
        footer={null}
        bodyStyle={{
          height: '608px',
        }}
      >
        <YTProTable
          actionRef={actionRef}
          search={false}
          toolBarRender={() => []}
          params={{ siteId: id, pageSize: 10 }}
          pagination={{ pageSize: 10 }}
          columns={columns}
          request={requestList}
        />
      </Dialog>
    </>
  );
};

export default PvInverter;
