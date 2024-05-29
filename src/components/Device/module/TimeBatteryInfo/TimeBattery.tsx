/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-05-29 15:59:08
 * @LastEditTime: 2024-05-29 17:50:05
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\module\TimeBatteryInfo\TimeBattery.tsx
 */

import YTProTable from '@/components/YTProTable';
import React, { memo, useEffect } from 'react';
import { useRequest } from 'umi';
import { getTimeBatteryData } from './service';
import { columns } from './helper';

type TimeBatteryType = {
  deviceId?: string;
  params?: Record<string, any>;
  date?: string;
};

const TimeBattery: React.FC<TimeBatteryType> = (props) => {
  const { deviceId, params, date } = props;

  const {
    data: dataSource,
    loading,
    run,
  } = useRequest(getTimeBatteryData, {
    manual: true,
    formatResult(res) {
      const result: Record<string, any>[] = [];
      res?.data?.forEach?.((item, index) => {
        if (index % 4 == 0) {
          result.push({});
        }
        result[result.length - 1]['time' + (index % 4)] = `${item?.startTime}-${item?.endTime}`;
        result[result.length - 1]['capacity' + (index % 4)] = item.electricity;
      });
      return result;
    },
  });

  useEffect(() => {
    if (deviceId) {
      run({
        ...params,
        deviceId,
        date,
      });
    }
  }, [deviceId, date]);

  return (
    <>
      <YTProTable
        className="mb16"
        search={false}
        options={false}
        columns={columns}
        toolBarRender={false}
        dataSource={dataSource}
        scroll={{ y: 'auto' }}
        pagination={false}
        loading={loading}
      />
    </>
  );
};

export default memo(TimeBattery);
