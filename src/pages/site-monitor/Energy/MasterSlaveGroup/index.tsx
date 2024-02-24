/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-02-21 14:42:23
 * @LastEditTime: 2024-02-21 16:23:29
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Energy\MasterSlaveGroup\index.tsx
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRequest } from 'umi';
import { getGroupList } from '../service';
import EnergyInfo, { EnergySourceEnum } from '@/components/EnergyInfo';
import GroupTabs from './GroupTabs';
import { GroupType } from '../type';

type MasterSlaveGroupType = {
  siteId?: string;
};

const MasterSlaveGroup: React.FC<MasterSlaveGroupType> = (props) => {
  const { siteId } = props;

  const {
    data: groupData,
    run,
    loading,
  } = useRequest(getGroupList, {
    manual: true,
  });

  const showGruop = useMemo(() => {
    return (
      groupData?.length &&
      (groupData?.length > 1 ||
        (groupData?.[0]?.devices?.length && groupData?.[0]?.devices?.length > 1))
    );
  }, [groupData]);

  useEffect(() => {
    if (siteId) {
      run({ siteId });
    }
  }, [siteId]);

  return (
    <>
      {showGruop ? (
        <GroupTabs groupData={groupData} />
      ) : (
        <EnergyInfo
          deviceData={groupData?.[0]?.devices?.[0]}
          showLabel
          loading={loading}
          source={EnergySourceEnum.SiteMonitor}
        />
      )}
    </>
  );
};

export default MasterSlaveGroup;
