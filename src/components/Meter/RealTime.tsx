/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-27 14:07:10
 * @LastEditTime: 2023-06-27 14:07:14
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Meter\RealTime.tsx
 */

import React from 'react';
import { Skeleton } from 'antd';
import Meter, { MeterSkeleton } from '@/components/Meter';
import { RealTimeProps } from '@/components/ScreenDialog';
import Label from '@/components/Detail/label';
import useSubscribe from '@/pages/screen/useSubscribe';

const RealTime: React.FC<
  RealTimeProps & {
    label?: string;
  }
> = (props) => {
  const { id, loading, open = true, label = '运行信息' } = props;

  const equipmentData = useSubscribe(id, open);

  return (
    <>
      {loading ? (
        <>
          <Skeleton.Button className="mb12" size="small" active />
          <MeterSkeleton />
        </>
      ) : (
        <>
          <Label title={label} />
          <Meter data={equipmentData || {}} />
        </>
      )}
    </>
  );
};

export default RealTime;
