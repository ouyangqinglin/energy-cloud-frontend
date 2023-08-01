/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-26 19:40:28
 * @LastEditTime: 2023-07-28 14:45:31
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\index.tsx
 */
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Spin } from 'antd';
import { DeviceDetailType, deviceDetailMap } from './config';
import type { DeviceDialogMapType } from './config';

const DeviceMonitor: React.FC<
  DeviceDetailType & {
    productId: number;
  }
> = (props) => {
  const { id, productId, onChange } = props;

  const [Component, setComponent] = useState<React.FC<DeviceDetailType>>();
  const [componentProps, setComponentProps] = useState<Record<string, any>>();

  useEffect(() => {
    const result: DeviceDialogMapType = deviceDetailMap?.[productId] || deviceDetailMap.default;
    setComponent(lazy(() => import('./' + result.component)));
    setComponentProps(result.props || {});
  }, [productId]);

  return (
    <>
      {Component && (
        <Suspense
          fallback={
            <div className="tx-center">
              <Spin />
            </div>
          }
        >
          <Component id={id} onChange={onChange} {...componentProps} />
        </Suspense>
      )}
    </>
  );
};

export default DeviceMonitor;
