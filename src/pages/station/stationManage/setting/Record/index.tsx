/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-16 09:11:52
 * @LastEditTime: 2024-06-19 09:14:31
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\setting\Record\index.tsx
 */
import React, { useState, useCallback } from 'react';
import { useRequest, useModel } from 'umi';
import type { ProColumns } from '@ant-design/pro-table';
import type { AlarmType } from './data.d';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { getList, getDetail } from './service';
import DetailDialog from '@/components/DetailDialog';
import type { DetailItem } from '@/components/Detail';
import { formatMessage } from '@/utils';
import { YTDATERANGE } from '@/components/YTDateRange';
import type { YTDATERANGEVALUETYPE } from '@/components/YTDateRange';
import { ProConfigProvider } from '@ant-design/pro-components';
import { YTDateRangeValueTypeMap } from '@/components/YTDateRange';
import { getLocale } from '@/utils';
import { ModelSizeEnum } from '@/utils/enum';
import { Typography } from 'antd';

const Alarm: React.FC = (props) => {
  const [open, setOpen] = useState(false);
  const { siteId } = useModel('station', (model) => ({ siteId: model?.state.id }));
  const { data, run } = useRequest(getDetail, {
    manual: true,
  });

  const switchOpen = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  const requestList: YTProTableCustomProps<AlarmType, AlarmType>['request'] = (params) => {
    return getList({ ...params, siteId });
  };

  const onDetailClick = useCallback((_, record) => {
    switchOpen();
    run(record.recordId);
  }, []);

  const detailItems: DetailItem[] = [
    {
      label: formatMessage({ id: 'common.lastOperationTime', defaultMessage: '最后操作时间' }),
      field: 'operTime',
    },
    {
      label: formatMessage({ id: 'common.operator', defaultMessage: '操作人' }),
      field: 'operName',
    },
    {
      label: formatMessage({ id: 'siteManage.set.setModule', defaultMessage: '设置模块' }),
      field: 'setSection',
    },
    {
      label: formatMessage({ id: 'siteManage.set.setContent', defaultMessage: '设置内容' }),
      field: 'operParam',
      format: (value) => (
        <Typography.Paragraph
          style={{
            whiteSpace: 'normal',
          }}
          ellipsis={{
            rows: 4,
            expandable: true,
            symbol: formatMessage({ id: 'common.more', defaultMessage: '更多' }),
          }}
        >
          {value}
        </Typography.Paragraph>
      ),
    },
  ];

  const columns: ProColumns<AlarmType>[] = [
    {
      title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
      dataIndex: 'index',
      valueType: 'index',
      width: 50,
    },
    {
      title: formatMessage({ id: 'siteManage.set.setModule', defaultMessage: '设置模块' }),
      dataIndex: 'setSection',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: formatMessage({ id: 'common.updatedTime', defaultMessage: '更新时间' }),
      dataIndex: 'operTime',
      valueType: YTDATERANGE,
      render: (_, record) => record.operTime,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
      fieldProps: {
        dateFormat: getLocale().dateFormat,
        format: 'YYYY-MM-DD',
      },
    },
    {
      title: formatMessage({ id: 'common.operator', defaultMessage: '操作人' }),
      dataIndex: 'operName',
      ellipsis: true,
    },
  ];

  return (
    <>
      <ProConfigProvider
        valueTypeMap={{
          ...YTDateRangeValueTypeMap,
        }}
      >
        <YTProTable<AlarmType, AlarmType>
          columns={columns}
          request={requestList}
          toolBarRender={() => [<></>]}
          rowKey="recordId"
          option={{
            columnsProp: {
              width: '100px',
            },
            onDetailChange: onDetailClick,
          }}
        />
      </ProConfigProvider>

      <DetailDialog
        width={ModelSizeEnum.TwoCol}
        title={formatMessage({ id: 'common.setDetails', defaultMessage: '设置详情' })}
        open={open}
        onCancel={switchOpen}
        detailProps={{
          data: data,
          items: detailItems,
          column: 1,
          labelStyle: { width: '100px' },
        }}
      />
    </>
  );
};

export default Alarm;
