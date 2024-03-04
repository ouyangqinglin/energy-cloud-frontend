/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-31 16:22:51
 * @LastEditTime: 2023-08-31 18:48:02
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\Configuration\Community\index.tsx
 */
import React, { useMemo } from 'react';
import Detail from '@/components/Detail';
import type { GroupItem } from '@/components/Detail';
import { Button } from 'antd';
import type { DeviceDataType } from '@/services/equipment';
import { formatMessage } from '@/utils';
import { download } from './service';

export type CommunityProps = {
  deviceData: DeviceDataType;
};

const CommunityDetail: React.FC<CommunityProps> = (props) => {
  const { deviceData } = props;
  const templatedownload = () => {
    const deviceId = deviceData?.deviceId || '';
    download(deviceId);
  };
  const importFile = () => {
    console.log('importFile>>', 'importFile');
  };
  const communityItems = useMemo(() => {
    const groupItem: GroupItem[] = [];
    if (deviceData?.paramConfigType && deviceData?.deviceId) {
      groupItem.push({
        label: (
          <Detail.Label
            title={formatMessage({
              id: 'device.pointTableConfig',
              defaultMessage: '通信点表配置',
            })}
          >
            <Button type="primary" className="mr12" onClick={templatedownload}>
              {formatMessage({ id: 'common.modify1', defaultMessage: '模版下载' })}
            </Button>
            <Button type="primary" onClick={importFile}>
              {formatMessage({ id: 'common.modify1', defaultMessage: '电表文件导入' })}
            </Button>
          </Detail.Label>
        ),
      });
    }
    return groupItem;
  }, [deviceData]);

  return <>{deviceData?.paramConfigType ? <Detail.Group items={communityItems} /> : <></>}</>;
};

export default CommunityDetail;
