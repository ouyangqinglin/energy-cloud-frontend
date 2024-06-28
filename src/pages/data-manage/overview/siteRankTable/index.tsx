import React, { useCallback } from 'react';
import { columns, OrderTypEnum } from './config';
import YTProTable from '@/components/YTProTable';
import { getData, exportList } from './service';
import { formatMessage } from '@/utils';
import moment from 'moment';

const SiteRankTable: React.FC = () => {
  const requestList = useCallback((params) => {
    if (params.time) {
      params.startTime = params.time[0];
      params.endTime = params.time[1];
      delete params.time;
    }
    if (params.sortMode) {
      Object.keys(params.sortMode).forEach((key: string) => {
        params.orderType = OrderTypEnum[key as keyof typeof OrderTypEnum];
        params.sortType = params.sortMode[key] == 0 ? 2 : 1;
      }),
        delete params.sortMode;
    }
    return getData({
      ...params,
    });
  }, []);
  const requestExport = useCallback((params) => {
    if (params.time) {
      params.startTime = moment(params.time[0]).format('YYYY-MM-DD');
      params.endTime = moment(params.time[1]).format('YYYY-MM-DD');
      delete params.time;
    }
    return exportList({ ...params });
  }, []);
  return (
    <>
      <YTProTable
        scroll={{ y: 471 }}
        pagination={{ defaultPageSize: 10 }}
        columns={columns}
        request={requestList}
        toolBarRenderOptions={{
          add: {
            show: false,
          },
          export: {
            show: true,
            requestExport: requestExport,
            getExportName: () => formatMessage({ id: 'device.1019', defaultMessage: '站点排名' }),
          },
        }}
        form={{
          ignoreRules: false,
        }}
        resizable={true}
      />
    </>
  );
};

export default SiteRankTable;
