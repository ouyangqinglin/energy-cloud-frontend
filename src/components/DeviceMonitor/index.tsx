/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-26 19:40:28
 * @LastEditTime: 2023-07-19 11:12:47
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\index.tsx
 */
import React, { useMemo } from 'react';
import { DeviceDetailType, deviceDetailMap } from './config';
import type { DeviceDialogMapType } from './config';

const DeviceMonitor: React.FC<
  DeviceDetailType & {
    productId: number;
  }
> = (props) => {
  const { id, productId, onChange } = props;

  const deviceDialog = useMemo<DeviceDialogMapType>(() => {
    return deviceDetailMap?.[productId] || deviceDetailMap.default;
  }, [productId]);

  return (
    <>
      {deviceDialog.component && (
        <deviceDialog.component id={id} onChange={onChange} {...deviceDialog.props} />
      )}
    </>
  );
};

export default DeviceMonitor;
