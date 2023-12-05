/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-25 14:42:09
 * @LastEditTime: 2023-12-05 20:08:18
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Configuration\RemoteUpgrade\index.tsx
 */

import React, { useEffect, useMemo } from 'react';
import { RemoteUpgradeType } from './typing';
import Detail, { GroupItem } from '@/components/Detail';
import UpgradeForm from './UpgradeForm';
import { upgradeItems } from './helper';
import { useRequest } from 'umi';
import { getUpgradeVersion } from '@/services/equipment';
import UpgradeRecord from './UpgradeRecord';

const RemoteUpgrade: React.FC<RemoteUpgradeType> = (props) => {
  const { deviceId, deviceData } = props;

  const { data: versionData, run } = useRequest(getUpgradeVersion, {
    manual: true,
  });

  useEffect(() => {
    if (deviceId) {
      run({ deviceId });
    }
  }, [deviceId]);

  const groupItems = useMemo<GroupItem[]>(() => {
    return [
      {
        label: (
          <Detail.Label title="远程升级">
            <UpgradeForm
              deviceId={deviceId}
              versionItems={versionData?.upgradeableVersionVOList}
              deviceData={deviceData}
            />
            <UpgradeRecord deviceId={deviceId} deviceData={deviceData} />
          </Detail.Label>
        ),
        items: upgradeItems,
      },
    ];
  }, [deviceId, deviceData, versionData]);

  return (
    <>
      <Detail.Group items={groupItems} data={versionData} />
    </>
  );
};

export default RemoteUpgrade;
