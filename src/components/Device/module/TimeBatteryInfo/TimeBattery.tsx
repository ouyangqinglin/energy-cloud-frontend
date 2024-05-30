/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-05-29 15:59:08
 * @LastEditTime: 2024-05-30 11:48:12
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\module\TimeBatteryInfo\TimeBattery.tsx
 */

import YTProTable from '@/components/YTProTable';
import React, { memo, useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { getTimeBatteryData } from './service';
import { columns, detailItems } from './helper';
import Detail from '@/components/Detail';

type TimeBatteryType = {
  deviceId?: string;
  params?: Record<string, any>;
  date?: string;
};

const TimeBattery: React.FC<TimeBatteryType> = (props) => {
  const { deviceId, params, date } = props;

  const [totalData, setTotalData] = useState<Record<string, any>>({});

  const {
    data: dataSource,
    loading,
    run,
  } = useRequest(getTimeBatteryData, {
    manual: true,
    formatResult(res) {
      const result: Record<string, any>[] = [{}];
      let totalCharge = 0,
        totalDischarge = 0,
        hourTotalCharge = 0,
        hourTotalDischarge = 0;
      res?.data?.forEach?.((item, index) => {
        if (index % 4 == 0 && index) {
          result[result.length - 1].hourTotalCharge = Number(hourTotalCharge.toFixed(2));
          result[result.length - 1].totalDischarge = Number(hourTotalDischarge.toFixed(2));
          totalCharge += hourTotalCharge;
          totalDischarge += hourTotalDischarge;
          hourTotalCharge = 0;
          hourTotalDischarge = 0;
          result.push({});
        }
        result[result.length - 1]['time' + (index % 4)] = `${item?.startTime}-${item?.endTime}`;
        result[result.length - 1]['charge' + (index % 4)] = item.charge;
        result[result.length - 1]['discharge' + (index % 4)] = item.discharge;
        hourTotalCharge += item.charge || 0;
        hourTotalDischarge += item.discharge || 0;
      });
      setTotalData({
        charge: totalCharge,
        discharge: totalDischarge,
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
      <Detail
        className="detail-center detail-two-center"
        items={detailItems}
        data={totalData}
        unitInLabel
        column={2}
      />
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
        size="small"
      />
    </>
  );
};

export default memo(TimeBattery);
