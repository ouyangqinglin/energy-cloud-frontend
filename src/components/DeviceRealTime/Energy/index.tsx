/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-11 14:47:38
 * @LastEditTime: 2023-09-11 16:56:57
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\Energy\index.tsx
 */
import React, { useEffect } from 'react';
import { DeviceRealTimeType } from '../config';
import EnergyInfo from '@/components/EnergyInfo';
import { useRequest, useModel } from 'umi';
import { getGroupList } from '../../../pages/site-monitor/Energy/service';

const Energy: React.FC<Omit<DeviceRealTimeType, 'id' | 'productId'>> = (props) => {
  const { deviceData } = props;
  const { state: siteData } = useModel('site');
  const {
    data: groupData,
    run: getGroupData,
    loading: loadingGroupData,
  } = useRequest(getGroupList, {
    manual: true,
  });
  useEffect(() => {
    if (siteData?.id) {
      getGroupData({ siteId: siteData.id }); //新接口，兼容所有设备
    }
  }, [siteData]);
  return (
    <>
      <div className="p24">
        <EnergyInfo
          deviceData={deviceData}
          emsGroupData={groupData}
          loadingGroupData={loadingGroupData}
        />
      </div>
    </>
  );
};

export default Energy;
