/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-25 10:21:56
 * @LastEditTime: 2023-06-16 17:03:16
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\equipment\alarm\index.tsx
 */
import React, { useState, useCallback, useEffect } from 'react';
import { useRequest, useModel } from 'umi';
import type { ProColumns, ProTableProps } from '@ant-design/pro-table';
import type { AlarmType } from './data';
import { alarmStatus, alarmSourceStatus } from '@/utils/dictionary';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { getList, getDetail } from './service';
import DetailDialog from '@/components/DetailDialog';
import type { DetailItem } from '@/components/Detail';
import { getStations } from '@/services/station';
import { debounce } from 'lodash';
import type { OptionType } from '@/utils/dictionary';

type AlarmProps = {
  isStationChild?: boolean;
};

const Alarm: React.FC<AlarmProps> = (props) => {
  const { isStationChild } = props;
  const [open, setOpen] = useState(false);
  const { siteId } = useModel('station', (model) => ({ siteId: model?.state.id }));
  const [stationOptions, setStationOptions] = useState<OptionType[]>();
  const { data: detailData, run } = useRequest(getDetail, {
    manual: true,
  });

  const switchOpen = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  const requestList: YTProTableCustomProps<AlarmType, AlarmType>['request'] = (params) => {
    return getList({ ...params, ...(isStationChild ? { siteId } : {}) });
  };

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
    { label: '告警ID', field: 'id' },
    { label: '告警内容', field: 'content' },
    { label: '所属站点', field: 'siteName' },
    { label: '告警状态', field: 'status', format: (value) => alarmStatus[value]?.text },
    { label: '告警来源', field: 'fromResource', format: (value) => alarmSourceStatus[value]?.text },
    { label: '关联设备', field: 'deviceName' },
    { label: '发生时间', field: 'alarmTime' },
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
      dataIndex: 'deviceName',
      width: 150,
      ellipsis: true,
    },
    ...(isStationChild
      ? []
      : [
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
          } as ProColumns<AlarmType>,
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
      dataIndex: 'fromResource',
      valueEnum: alarmSourceStatus,
      width: 120,
    },
    {
      title: '发生时间',
      dataIndex: 'alarmTime',
      valueType: 'dateRange',
      width: 150,
      render: (_, record) => record.alarmTime,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
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
        title="告警详情"
        open={open}
        onCancel={switchOpen}
        detailProps={{
          data: detailData,
          items: detailItems,
          column: 1,
          labelStyle: { width: '90px' },
        }}
      />
    </>
  );
};

export default Alarm;
