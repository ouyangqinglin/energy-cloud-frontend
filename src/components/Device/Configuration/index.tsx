/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-31 16:22:51
 * @LastEditTime: 2023-09-12 09:09:17
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\Configuration\index.tsx
 */
import React, { useEffect, useMemo } from 'react';
import { useRequest } from 'umi';
import Community from './Community';
import DeviceConfig from './DeviceConfig';
import { getEquipInfo } from '@/services/equipment';
import { isEmpty } from '@/utils';
import Empty from 'antd/es/empty';
import RemoteSetting from './RemoteSetting';
import { DeviceTypeEnum } from '@/utils/dictionary';

export type ConfigProps = {
  deviceId: string;
};

const Configuration: React.FC<ConfigProps> = (props) => {
  const { deviceId } = props;

  const { data: deviceData, run } = useRequest(getEquipInfo, { manual: true });

  const hasConfig = useMemo(() => {
    if (deviceData?.paramConfigType) {
      return true;
    } else if (!isEmpty(deviceData?.productConfigType)) {
      return true;
    } else if (deviceData?.productId == DeviceTypeEnum.Ems) {
      return true;
    }
    return false;
  }, [deviceData]);

  useEffect(() => {
    if (deviceId) {
      run({ deviceId });
    }
  }, [deviceId]);

  return (
    <>
      <div className="px24">
        {hasConfig ? (
          <>
            {deviceData?.paramConfigType ? <Community deviceData={deviceData} /> : <></>}
            {!isEmpty(deviceData?.productConfigType) ? (
              <DeviceConfig deviceData={deviceData} />
            ) : (
              <></>
            )}
            {deviceData?.productId == DeviceTypeEnum.Ems ? (
              <RemoteSetting deviceData={deviceData} />
            ) : (
              <></>
            )}
          </>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无配置" />
        )}
      </div>
    </>
  );
};

export default Configuration;
