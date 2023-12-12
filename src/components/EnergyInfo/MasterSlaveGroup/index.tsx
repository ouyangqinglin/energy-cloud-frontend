import React, { useState, useMemo, useCallback } from 'react';
import { useRequest } from 'umi';
import { Skeleton } from 'antd';
import { useSubscribe } from '@/hooks';
import { getEnergy } from '../service';
import { energyType } from '../type';
import { Tabs, TabsProps } from 'antd';
import { DeviceDataType } from '@/services/equipment';
import GroupItem from './groupItem';
import DeviceItemDetail from './deviceItemDetail';

export type MasterSlaveGroupProp = {
  deviceData?: DeviceDataType;
  emsGroupData: any; //分组数据
  loadingEmsTabs: boolean;
  getUnitEchartsParameters?: any;
};
const MasterSlaveGroup: React.FC<MasterSlaveGroupProp> = (props) => {
  const { loadingEmsTabs, emsGroupData, getUnitEchartsParameters } = props;
  const [showDiv, setShowDiv] = useState(false);
  const [showId, setShowId] = useState(false);
  const isShowDeviceDetail = useCallback((bool, id) => {
    setShowDiv(bool);
    setShowId(id);
  }, []);
  const changeShowDiv = useCallback(() => {
    setShowDiv(false);
  }, []);

  const tabItems = useMemo<TabsProps['items']>(() => {
    return emsGroupData.map((item: any, index: any) => {
      return {
        label: item.groupName,
        key: item.devices[0].deviceId,
        children: showDiv ? (
          <DeviceItemDetail
            deviceData={item.devices.find((obj: any) => obj.deviceId == showId)}
            allDeviceData={item}
            changeShowDiv={changeShowDiv}
          />
        ) : (
          <GroupItem data={item.devices} isShowDeviceDetail={isShowDeviceDetail} />
        ),
      };
    });
  }, [emsGroupData, showDiv, showId]);
  const onTabChange = useCallback((key) => {
    getUnitEchartsParameters(key);
  }, []);

  return (
    <>
      {loadingEmsTabs ? (
        <>
          <Skeleton.Button size="small" active />
        </>
      ) : (
        <>
          <Tabs
            className="category-tabs"
            items={tabItems}
            tabBarGutter={24}
            size="large"
            onChange={onTabChange}
          />
        </>
      )}
    </>
  );
};

export default MasterSlaveGroup;
