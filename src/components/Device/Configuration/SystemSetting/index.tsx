/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 23:36:42
 * @LastEditTime: 2023-09-11 19:12:36
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\Ems\Run\index.tsx
 */
import React, { useCallback, useMemo } from 'react';

import Detail from '@/components/Detail';
import type { GroupItem } from '@/components/Detail';
import { emsSystemEnabletems, reportItems } from './config';
import RemoteUpgrade from '../RemoteUpgrade';
import Button from 'antd/lib/button';
import _ from 'lodash';

export type StackProps = {
  deviceId: string;
  productId: string;
  realTimeData?: Record<string, any>;
};

const SystemSetting: React.FC<StackProps> = (props) => {
  const { realTimeData, deviceId } = props;

  const serSystemEnable = useCallback((_) => {
    console.log("系统使能设置");
  
    // run(record.id);
  }, []);

  const serCommunicationParams = useCallback((_) => {
    console.log("通信参数设置");
    
    // run(record.id);
  }, []);


  const detailGroup = useMemo<GroupItem[]>(() => {
    return [
      {
        label: <Detail.Label title="系统使能设置">
                <Button type="primary" onClick={() => serSystemEnable(_)}>配置参数</Button>
               </Detail.Label>,
        items: emsSystemEnabletems,
      },
      {
        label: <Detail.Label title="通信参数设置">
                  <Button type="primary" onClick={() => serCommunicationParams(_)}>配置参数</Button>
               </Detail.Label>,
        items: reportItems,
      },
    ];
  }, []);

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
            // column: 2,
          }}
        />
        {/* <RemoteUpgrade deviceId={deviceId} /> */}
      </div>
    </>
  );
};

export default SystemSetting;
