/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-30 08:50:38
 * @LastEditTime: 2023-12-06 15:04:24
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\RunLog\index.tsx
 */
import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useRequest } from 'umi';
import YTProTable from '@/components/YTProTable';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { getList, getDetail } from './service';
import type { OperationLogType } from './data';
import DetailDialog from '@/components/DetailDialog';
import type { DetailItem } from '@/components/Detail';
import type { SiteDataType } from '@/services/station';
import { logType } from '@/utils/dict';
import { format } from 'timeago.js';
import SiteLabel from '@/components/SiteLabel';
import { formatMessage, getLocale } from '@/utils';
const isUS = getLocale().isEnUS;

export type OperationLogProps = {
  isDeviceChild?: boolean;
  deviceId?: string;
};
const OperationLog: React.FC<OperationLogProps> = (props) => {
  const { isDeviceChild, deviceId } = props;
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

  useEffect(() => {
    actionRef?.current?.reloadAndRest?.();
  }, [deviceId]);

  const detailItems: DetailItem[] = [
    {
      label: formatMessage({ id: 'siteMonitor.logs', defaultMessage: '日志' }) + 'ID',
      field: 'id',
    },
    {
      label: formatMessage({ id: 'siteMonitor.logContent', defaultMessage: '日志内容' }),
      field: 'content',
    },
    {
      label: formatMessage({ id: 'common.deviceName', defaultMessage: '设备名称' }),
      field: 'deviceName',
    },
    {
      label: formatMessage({ id: 'siteMonitor.owningSite', defaultMessage: '所属站点' }),
      field: 'siteName',
    },
    {
      label: formatMessage({ id: 'common.operator', defaultMessage: '操作人' }),
      field: 'createByName',
    },
    {
      label: formatMessage({ id: 'common.occurrenceTime', defaultMessage: '发生时间' }),
      field: 'createTime',
    },
  ];

  const columns: ProColumns<OperationLogType>[] = [
    {
      title: formatMessage({ id: 'siteMonitor.logtype', defaultMessage: '日志类型' }),
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: logType,
      width: 120,
      hideInTable: true,
    },
    {
      title: formatMessage({ id: 'common.time', defaultMessage: '时间' }),
      dataIndex: 'createTime',
      width: 150,
      ellipsis: true,
      render: (_, record) =>
        `${record.createTime} (${format(record.createTime, isUS ? 'en-US' : 'zh_CN')})`,
      hideInSearch: true,
    },
    {
      title: formatMessage({ id: 'common.deviceName', defaultMessage: '设备名称' }),
      dataIndex: 'deviceName',
      width: 150,
      ellipsis: true,
      hideInSearch: isDeviceChild,
    },
    {
      title: formatMessage({ id: 'common.equipmentSerial', defaultMessage: '设备序列号' }),
      dataIndex: 'sn',
      width: 120,
      ellipsis: true,
      hideInSearch: isDeviceChild,
    },
    {
      title: formatMessage({ id: 'siteMonitor.logFileName', defaultMessage: '日志文件名称' }),
      dataIndex: 'content',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: formatMessage({ id: 'siteMonitor.logtype', defaultMessage: '日志类型' }),
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: logType,
      width: 120,
      hideInSearch: true,
    },
    {
      title: formatMessage({ id: 'common.time', defaultMessage: '时间' }),
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
      title: formatMessage({ id: 'siteMonitor.owningSite', defaultMessage: '所属站点' }),
      dataIndex: 'siteName',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: formatMessage({ id: 'common.operatingUser', defaultMessage: '操作用户' }),
      dataIndex: 'createByName',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
  ];

  return (
    <>
      {isDeviceChild ? <></> : <SiteLabel className="px24 pt24 mb0" onChange={onChange} />}
      <YTProTable<OperationLogType, OperationLogType>
        actionRef={actionRef}
        columns={columns}
        request={requestList}
        manualRequest={true}
        toolBarRender={() => [<></>]}
        option={{
          columnsProp: {
            width: '100px',
          },
          onDetailChange: onDetailClick,
        }}
        scroll={
          isDeviceChild
            ? {
                y: 550,
              }
            : {}
        }
      />
      <DetailDialog
        width="420px"
        title={formatMessage({ id: 'siteMonitor.logDetails', defaultMessage: '日志详情' })}
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
