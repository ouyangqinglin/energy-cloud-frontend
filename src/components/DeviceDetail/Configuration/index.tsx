/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-31 16:22:51
 * @LastEditTime: 2023-09-01 14:09:22
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\Configuration\index.tsx
 */
import React, { useEffect } from 'react';
import { useRequest } from 'umi';
import Community from './Community';
import DeviceConfig from './DeviceConfig';
import { getEquipInfo } from '@/services/equipment';
import { isEmpty } from '@/utils';
import Empty from 'antd/es/empty';

export type ConfigProps = {
  deviceId: string;
};

const Configuration: React.FC<ConfigProps> = (props) => {
  const { deviceId } = props;

  const { data: deviceData, run } = useRequest(getEquipInfo, { manual: true });

  useEffect(() => {
    if (deviceId) {
      run({ deviceId });
    }
  }, [deviceId]);

  return (
    <>
      <div className="px24">
        {deviceData?.paramConfigType || !isEmpty(deviceData?.productConfigType) ? (
          <>
            <Community deviceData={deviceData} />
            <DeviceConfig deviceData={deviceData} />
          </>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};

export default Configuration;
