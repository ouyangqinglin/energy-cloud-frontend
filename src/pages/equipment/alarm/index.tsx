/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-25 10:21:56
 * @LastEditTime: 2023-05-30 15:46:56
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\equipment\alarm\index.tsx
 */
import React, { useState, useCallback } from 'react';
import { useRequest, useModel } from 'umi';
import type { ProColumns, ProTableProps } from '@ant-design/pro-table';
import type { AlarmType } from './data.d';
import { alarmStatus, alarmSourceStatus } from '@/utils/dictionary';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { getList, getDetail } from './service';
import DetailDialog from '@/components/DetailDialog';
import type { DetailItem } from '@/components/Detail';

type AlarmProps = {
  isStationChild?: boolean;
};

const Alarm: React.FC<AlarmProps> = (props) => {
  const { isStationChild } = props;
  const [open, setOpen] = useState(false);
  const { stationId } = useModel('station', (model) => ({ stationId: model?.state.id }));
  const { data, run } = useRequest(getDetail, {
    manual: true,
  });

  const switchOpen = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  const requestList: YTProTableCustomProps<AlarmType, AlarmType>['request'] = (params) => {
    return getList({ ...params, ...(isStationChild ? { siteId: stationId } : {}) });
  };

  const onDetailClick = useCallback((_, record) => {
    switchOpen();
    run(record.id);
  }, []);

  const detailItems: DetailItem[] = [
    { label: '告警ID', field: 'id' },
    { label: '告警内容', field: 'content' },
    { label: '所属站点', field: 'siteName' },
    { label: '告警状态', field: 'status' },
    { label: '告警来源', field: 'source' },
    { label: '关联设备', field: 'device' },
    { label: '发生时间', field: 'createTime' },
    { label: '恢复时间', field: 'recoveryTime' },
  ];

  const columns: ProColumns<AlarmType>[] = [
    {
      title: '告警ID',
      dataIndex: 'id',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '告警内容',
      dataIndex: 'content',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '关联设备',
      dataIndex: 'device',
      width: 150,
      ellipsis: true,
    },
    ...(isStationChild
      ? []
      : [
          {
            title: '所属站点',
            dataIndex: 'station',
            width: 150,
            ellipsis: true,
          },
        ]),
    {
      title: '告警状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: alarmStatus,
      width: 120,
    },
    {
      title: '告警来源',
      dataIndex: 'source',
      valueEnum: alarmSourceStatus,
      width: 120,
    },
    {
      title: '发生时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      width: 150,
      render: (_, record) => record.createTime,
      search: {
        transform: (value) => {
          return {
            beginTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: '恢复时间',
      dataIndex: 'recoveryTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 150,
    },
  ];

  return (
    <>
      <YTProTable<AlarmType, AlarmType>
        columns={columns}
        request={requestList}
        option={{
          columnsProp: {
            width: '100px',
          },
          onDetailChange: onDetailClick,
        }}
      />
      <DetailDialog
        width="420px"
        title="告警详情"
        open={open}
        onCancel={switchOpen}
        detailProps={{
          data: data,
          items: detailItems,
          column: 1,
          labelStyle: { width: '90px' },
        }}
      />
    </>
  );
};

export default Alarm;
