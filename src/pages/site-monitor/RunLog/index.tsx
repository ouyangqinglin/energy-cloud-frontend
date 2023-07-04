/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-30 08:50:38
 * @LastEditTime: 2023-07-04 15:51:39
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\RunLog\index.tsx
 */
import React, { useCallback, useState, useEffect } from 'react';
import { useRequest } from 'umi';
import YTProTable from '@/components/YTProTable';
import type { ProColumns } from '@ant-design/pro-table';
import { getList, getDetail } from './service';
import type { OperationLogType } from './data';
import DetailDialog from '@/components/DetailDialog';
import type { DetailItem } from '@/components/Detail';
import { getStations } from '@/services/station';
import type { OptionType } from '@/utils/dictionary';
import { debounce } from 'lodash';
import { format } from 'timeago.js';

const OperationLog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [stationOptions, setStationOptions] = useState<OptionType[]>();
  const { data: logData, run } = useRequest(getDetail, {
    manual: true,
  });

  const switchOpen = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  const requestList = useCallback((params: OperationLogType) => {
    return getList(params);
  }, []);

  const onDetailClick = useCallback((_, record) => {
    switchOpen();
    run(record.id);
  }, []);

  const requestStation = useCallback(
    debounce((searchText) => {
      getStations({ name: searchText }).then(({ data }) => {
        setStationOptions(
          data?.map?.((item: any) => {
            return {
              label: item.name,
              value: item.id,
            };
          }),
        );
      });
    }, 700),
    [],
  );

  useEffect(() => {
    requestStation('');
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
      title: '日志ID',
      dataIndex: 'id',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '日志内容',
      dataIndex: 'content',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '所属站点',
      dataIndex: 'siteName',
      valueType: 'select',
      render: (_, record) => record.siteName,
      formItemProps: {
        name: 'siteId',
      },
      fieldProps: {
        showSearch: true,
        filterOption: false,
        onSearch: requestStation,
        options: stationOptions,
      },
      width: 150,
      ellipsis: true,
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      width: 150,
      ellipsis: true,
    },
    {
      title: '操作人',
      dataIndex: 'createByName',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '发生时间',
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
    },
  ];

  return (
    <>
      <YTProTable<OperationLogType, OperationLogType>
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
