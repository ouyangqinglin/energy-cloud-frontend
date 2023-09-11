/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-11 14:10:26
 * @LastEditTime: 2023-09-11 14:10:30
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\index.tsx
 */
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { DeviceRealTimeMapType, DeviceRealTimeType, deviceRealTimeMap } from './config';
import { Spin } from 'antd';

const DeviceRealTime: React.FC<DeviceRealTimeType> = (props) => {
  const { id, productId, ...restProps } = props;

  const [Component, setComponent] = useState<React.FC<DeviceRealTimeType>>();
  const [componentProps, setComponentProps] = useState<Record<string, any>>();

  useEffect(() => {
    const result: DeviceRealTimeMapType =
      deviceRealTimeMap?.[productId] || deviceRealTimeMap.default;
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
          <Component id={id} productId={productId} {...restProps} {...componentProps} />
        </Suspense>
      )}
    </>
  );
};

export default DeviceRealTime;
