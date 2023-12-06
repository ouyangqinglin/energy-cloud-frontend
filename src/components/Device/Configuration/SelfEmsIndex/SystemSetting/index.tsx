/*
 *@Author: aoshilin
 *@Date: 2023-11-03 15:25:48
 *@parms: 自研ems详情-配置--系统化设置
 *@Description:
 */
import React, { useMemo } from 'react';
import Detail from '@/components/Detail';
import type { GroupItem } from '@/components/Detail';
import { emsSystemEnabletems, reportItems, systemColumns, reportColumns } from './config';
import ConfigModal from '../ConfigModal';
import RemoteUpgrade from '../../RemoteUpgrade';
import { formatMessage } from '@/utils';
export type StackProps = {
  deviceId: string;
  productId: string;
  realTimeData?: Record<string, any>;
};

const SystemSetting: React.FC<StackProps> = (props) => {
  const { realTimeData, deviceId, productId } = props;
  const detailGroup = useMemo<GroupItem[]>(() => {
    return [
      {
        label: (
          <Detail.Label
            title={formatMessage({
              id: 'device.systemEnablingSettings',
              defaultMessage: '系统使能设置',
            })}
          >
            <ConfigModal
              title={formatMessage({ id: 'device.enableSettings', defaultMessage: '使能设置' })}
              deviceId={deviceId}
              productId={productId}
              realTimeData={realTimeData}
              columns={systemColumns}
              serviceId={'SettingSysEnable'}
            />
          </Detail.Label>
        ),
        items: emsSystemEnabletems,
      },
      {
        label: (
          <Detail.Label
            title={formatMessage({
              id: 'device.communicationParameterSetting',
              defaultMessage: '通信参数设置',
            })}
          >
            <ConfigModal
              title={formatMessage({ id: 'device.parameterSetting', defaultMessage: '参数设置' })}
              deviceId={deviceId}
              productId={productId}
              realTimeData={realTimeData}
              columns={reportColumns}
              serviceId={'report'}
            />
          </Detail.Label>
        ),
        items: reportItems,
      },
    ];
  }, [deviceId, productId, realTimeData]);

  return (
    <>
      <div className="px24">
        <Detail.Group
          data={realTimeData}
          items={detailGroup}
          detailProps={{
            colon: false,
            labelStyle: { width: 140 },
            valueStyle: { width: '40%' },
          }}
        />
        <RemoteUpgrade deviceId={deviceId} />
      </div>
    </>
  );
};

export default SystemSetting;
