/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-31 16:22:51
 * @LastEditTime: 2023-08-31 18:48:02
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\Configuration\Community\index.tsx
 */
import React, { memo, useMemo } from 'react';
import Detail, { GroupItem } from '@/components/Detail';
import {
  accountItem,
  meterItem,
  thirtySiteItem,
  thirtySiteGunItem,
  bWattItem,
  selfEnergyMeterItem,
} from './config';
import Community, { CommunityTypeEnum } from '@/components/ScreenDialog/Community';
import { DeviceDataType } from '@/services/equipment';
import { DeviceTypeEnum } from '@/utils/dictionary';
import { formatMessage } from '@/utils';

export type CommunityProps = {
  deviceData: DeviceDataType;
};

const communityItemMap = new Map([
  [CommunityTypeEnum.Account, accountItem],
  [CommunityTypeEnum.Meter, meterItem],
  [CommunityTypeEnum.Station, thirtySiteItem],
  [CommunityTypeEnum.StationGun, thirtySiteGunItem],
  [CommunityTypeEnum.BWatt, bWattItem],
  [CommunityTypeEnum.SelfEnergyMeter, selfEnergyMeterItem],
]);

const CommunityDetail: React.FC<CommunityProps> = memo((props) => {
  const { deviceData } = props;

  const communityData = useMemo(() => {
    let data: any = (deviceData || {})?.config || '{}';
    try {
      data = JSON.parse(data);
    } catch (e) {
      data = {};
    }
    return data;
  }, [deviceData]);

  const communityItems = useMemo(() => {
    const groupItem: GroupItem[] = [];
    if (deviceData?.paramConfigType && deviceData?.deviceId) {
      groupItem.push({
        label: (
          <Detail.Label
            title={formatMessage({
              id: 'device.communicationInformation',
              defaultMessage: '通信信息',
            })}
          >
            <Community
              id={deviceData?.deviceId}
              deviceData={deviceData}
              siteId={deviceData?.siteId}
              type={deviceData?.paramConfigType}
              {...([DeviceTypeEnum.Energy, DeviceTypeEnum.Gateway].includes(
                deviceData?.productId as any,
              )
                ? {
                    userLabel:
                      'EMS mqtt' +
                      formatMessage({ id: 'common.userName', defaultMessage: '用户名' }),
                    passwordLabel:
                      'EMS mqtt' + formatMessage({ id: 'common.password', defaultMessage: '密码' }),
                  }
                : {})}
            />
          </Detail.Label>
        ),
        items: communityItemMap.get(deviceData.paramConfigType) || [],
      });
    }
    return groupItem;
  }, [deviceData]);

  return (
    <>
      {deviceData?.paramConfigType ? (
        <Detail.Group data={communityData} items={communityItems} />
      ) : (
        <></>
      )}
    </>
  );
});

export default CommunityDetail;
