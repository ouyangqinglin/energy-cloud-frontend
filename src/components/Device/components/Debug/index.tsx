/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-21 14:25:32
 * @LastEditTime: 2024-07-26 10:51:08
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\components\Debug\index.tsx
 */

import React, { memo } from 'react';
import { Tabs } from 'antd';
import { TabsProps } from 'antd/es/tabs';
import { formatMessage } from '@/utils';
import Adjust from '../../Adjust';
import { DeviceDataType } from '@/services/equipment';
import VPN from './VPN';
import { useAuthority } from '@/hooks';
import { DeviceProductTypeEnum } from '@/utils/dictionary';

type DebugType = {
  deviceData: DeviceDataType;
};

const Debug: React.FC<DebugType> = (props) => {
  const { deviceData } = props;

  const { authorityMap } = useAuthority([
    'device:detail:communicationMessage',
    'deviceManage:detail:debug:vpn',
  ]);

  const items: TabsProps['items'] = [];

  if (authorityMap.get('device:detail:communicationMessage')) {
    items.push({
      label: formatMessage({ id: 'debug.communicationMessage', defaultMessage: '通信报文' }),
      key: 'community',
      children: (
        <Adjust deviceId={deviceData?.deviceId || ''} productTypeId={deviceData?.productTypeId} />
      ),
    });
  }

  if (
    deviceData?.productTypeId &&
    [DeviceProductTypeEnum.Ems, DeviceProductTypeEnum.LocalEms].includes(
      deviceData?.productTypeId,
    ) &&
    authorityMap.get('deviceManage:detail:debug:vpn')
  ) {
    items.push({
      label: formatMessage({ id: 'debug.debugTunnel', defaultMessage: '调试隧道' }),
      key: 'vpn',
      children: <VPN />,
    });
  }

  return (
    <>
      <Tabs className="px24" items={items} />
    </>
  );
};

export default memo(Debug);
