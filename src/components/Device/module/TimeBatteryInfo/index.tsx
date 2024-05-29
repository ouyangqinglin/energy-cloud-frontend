/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-05-29 15:49:29
 * @LastEditTime: 2024-05-29 17:03:55
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\module\TimeBatteryInfo\index.tsx
 */

import { DatePicker, Tabs, TabsProps } from 'antd';
import React, { memo, useCallback, useContext, useMemo, useState } from 'react';
import DeviceContext from '../../Context/DeviceContext';
import { formatMessage, getLocale } from '@/utils';
import TimeBattery from './TimeBattery';
import moment from 'moment';

const TimeBatteryInfo: React.FC = () => {
  const { data: deviceData } = useContext(DeviceContext);
  const [date, setDate] = useState(moment().format(getLocale().dateFormat));

  const items: TabsProps['items'] = useMemo(() => {
    return [
      {
        key: 'charge',
        label: formatMessage({ id: 'device.chargingCapacity', defaultMessage: '充电量' }),
        children: (
          <TimeBattery deviceId={deviceData?.deviceId} date={date} params={{ chargeType: 2 }} />
        ),
      },
      {
        key: 'disCharge',
        label: formatMessage({ id: 'device.1005', defaultMessage: '放电量' }),
        children: (
          <TimeBattery deviceId={deviceData?.deviceId} date={date} params={{ chargeType: 3 }} />
        ),
      },
    ];
  }, [deviceData?.deviceId, date]);

  const onChange = useCallback((_, value) => {
    setDate(value);
  }, []);

  return (
    <>
      <Tabs
        items={items}
        tabBarExtraContent={
          <DatePicker
            defaultValue={moment()}
            allowClear={false}
            format={getLocale().dateFormat}
            onChange={onChange}
          />
        }
      />
    </>
  );
};

export default memo(TimeBatteryInfo);
