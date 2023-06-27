/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-26 19:40:28
 * @LastEditTime: 2023-06-26 19:40:32
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\index.tsx
 */
import React, { useMemo } from 'react';
import { DeviceDetailType, deviceDetailMap } from './config';
import type { DeviceDialogMapType } from './config';

const DeviceDetail: React.FC<
  DeviceDetailType & {
    productId: number;
  }
> = (props) => {
  const { id, productId } = props;

  const deviceDialog = useMemo<DeviceDialogMapType>(() => {
    return deviceDetailMap?.[productId] || deviceDetailMap.default;
  }, [productId]);

  return (
    <>{deviceDialog.component && <deviceDialog.component id={id} {...deviceDialog.props} />}</>
  );
};

export default DeviceDetail;
