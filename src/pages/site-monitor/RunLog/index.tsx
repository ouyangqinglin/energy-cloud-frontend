/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-30 08:50:38
 * @LastEditTime: 2023-08-25 17:49:30
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\RunLog\index.tsx
 */
import React, { useCallback, useState, useRef } from 'react';
import { useRequest } from 'umi';
import YTProTable from '@/components/YTProTable';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { getList, getDetail } from './service';
import type { OperationLogType } from './data';
import DetailDialog from '@/components/DetailDialog';
import type { DetailItem } from '@/components/Detail';
import type { SiteDataType } from '@/services/station';
import { logType } from '@/utils/dictionary';
import { format } from 'timeago.js';
import SiteLabel from '@/components/SiteLabel';

export type LogTableProps = {
  deviceId?: string;
};
const OperationLog: React.FC<LogTableProps> = (props) => {
  const { deviceId } = props;
  const [open, setOpen] = useState(false);
  const [siteId, setSiteId] = useState<string>();
  const actionRef = useRef<ActionType>();
  const { data: logData, run } = useRequest(getDetail, {
    manual: true,
  });

  const switchOpen = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  const requestList = useCallback(
    (params: OperationLogType) => {
      return getList({ ...params, siteId, deviceId });
    },
    [siteId, deviceId],
  );

  const onDetailClick = useCallback((_, record) => {
    switchOpen();
    run(record.id);
  }, []);

  const onChange = useCallback((data: SiteDataType) => {
    if (data?.id) {
      setSiteId(data.id);
      actionRef.current?.reloadAndRest?.();
    }
  }, []);

  const detailItems: DetailItem[] = [
    { label: '日志ID', field: 'id' },
    { label: '日志内容', field: 'content' },
    { label: '设备名称', field: 'deviceName' },
    { label: '所属站点', field: 'siteName' },
    { label: '操作人', field: 'createByName' },
    { label: '发生时间', field: 'createTime' },
  ];

  const columns: ProColumns<OperationLogType>[] = [
    {
      title: '日志类型',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: logType,
      width: 120,
      hideInTable: true,
    },
    {
      title: '时间',
      dataIndex: 'createTime',
      width: 150,
      ellipsis: true,
      render: (_, record) => `${record.createTime} (${format(record.createTime, 'zh_CN')})`,
      hideInSearch: true,
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      width: 150,
      ellipsis: true,
    },
    {
      title: '设备序列号',
      dataIndex: 'sn',
      width: 120,
      ellipsis: true,
    },
    {
      title: '日志文件名称',
      dataIndex: 'content',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    // {
    //   title: '日志编码',
    //   dataIndex: 'id',
    //   width: 120,
    //   ellipsis: true,
    //   hideInSearch: true,
    // },
    {
      title: '日志类型',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: logType,
      width: 120,
      hideInSearch: true,
    },
    {
      title: '时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      width: 150,
      render: (_, record) => `${record.createTime} (${format(record.createTime, 'zh_CN')})`,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
      hideInTable: true,
    },
    {
      title: '所属站点',
      dataIndex: 'siteName',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '操作用户',
      dataIndex: 'createByName',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
  ];

  return (
    <>
      <SiteLabel className="px24 pt24 mb0" onChange={onChange} />
      <YTProTable<OperationLogType, OperationLogType>
        actionRef={actionRef}
        columns={columns}
        request={requestList}
        toolBarRender={() => [<></>]}
        option={{
          columnsProp: {
            width: '100px',
          },
          onDetailChange: onDetailClick,
        }}
      />
      <DetailDialog
        width="420px"
        title="日志详情"
        open={open}
        onCancel={switchOpen}
        detailProps={{
          data: logData,
          items: detailItems,
          column: 1,
          labelStyle: { width: '90px' },
        }}
      />
    </>
  );
};

export default OperationLog;
