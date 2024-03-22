/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-21 14:39:51
 * @LastEditTime: 2024-03-22 14:57:21
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\components\Debug\VPN\index.tsx
 */

import Detail, { DetailItem } from '@/components/Detail';
import DeviceContext from '@/components/Device/Context/DeviceContext';
import { useSubscribe } from '@/hooks';
import { openVpn } from '@/services/equipment';
import { formatMessage } from '@/utils';
import { openFormat, yesFormat } from '@/utils/format';
import { Button, message } from 'antd';
import React, { memo, useContext } from 'react';
import { useRequest } from 'umi';

const VPN: React.FC = () => {
  const { data: deviceData } = useContext(DeviceContext);
  const realTimeData = useSubscribe(deviceData?.deviceId, true);

  const { run, loading } = useRequest(openVpn, {
    manual: true,
  });

  const onControl = (value: number) => {
    run({
      deviceId: deviceData?.deviceId,
      keyValues: [
        {
          key: 'vpnSwitch',
          value,
        },
      ],
    }).then((data) => {
      if (data) {
        message.success('操作成功');
      }
    });
  };

  const items: DetailItem[] = [
    {
      label: formatMessage({ id: 'debug.VPNTunnelCapabilities', defaultMessage: 'VPN隧道能力' }),
      field: 'vpnSupport',
      format: yesFormat,
    },
    {
      label: formatMessage({ id: 'debug.VPNTunnelStatus', defaultMessage: 'VPN隧道状态' }),
      field: 'vpnSwitch',
      format: openFormat,
      show: (value, data) => data.vpnSupport == 1,
    },
    {
      label: formatMessage({ id: 'debug.VPNTunnelIp', defaultMessage: 'VPN隧道IP' }),
      field: 'vip',
    },
    {
      label: formatMessage({
        id: 'debug.VPNTunnelStatusControl',
        defaultMessage: 'VPN隧道状态控制',
      }),
      field: 'a',
      showPlaceholder: false,
      labelStyle: {
        lineHeight: '32px',
      },
      format: (_, data) => (
        <>
          <Button
            loading={loading}
            className="mr12"
            onClick={() => {
              onControl(1);
            }}
            disabled={data.vpnSupport != 1}
          >
            {formatMessage({ id: 'things.open1', defaultMessage: '开启' })}
          </Button>
          <Button
            loading={loading}
            onClick={() => {
              onControl(0);
            }}
            disabled={data.vpnSupport != 1}
          >
            {formatMessage({ id: 'things.closeDown', defaultMessage: '关闭' })}
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Detail items={items} data={realTimeData} />
    </>
  );
};

export default memo(VPN);
