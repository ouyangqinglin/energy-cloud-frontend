/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-01 14:56:51
 * @LastEditTime: 2023-06-20 13:17:09
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\ScreenDialog\Community\index.tsx
 */

import React from 'react';
import { Button } from 'antd';
import { useBoolean } from 'ahooks';
import AccountCom from './Account';
import MeterCom from './Meter';
import StationCom from './Station';
import StationGunCom from './StationGun';

export enum CommunityTypeEnum {
  Account = 1,
  Meter,
  StationGun,
  Station,
}

export const communityTypeMap = new Map([
  [CommunityTypeEnum.Account, AccountCom],
  [CommunityTypeEnum.Meter, MeterCom],
  [CommunityTypeEnum.StationGun, StationGunCom],
  [CommunityTypeEnum.Station, StationCom],
]);

export type CommunityProps = {
  id: string;
  siteId?: string;
  model?: string;
  open: boolean;
  onOpenChange: (value: boolean) => void;
  userLabel?: string;
  passwordLabel?: string;
  type?: CommunityTypeEnum;
};

const Community: React.FC<Omit<CommunityProps, 'open' | 'onOpenChange'>> = (props) => {
  const { type, ...restProps } = props;

  const [open, { set, setTrue }] = useBoolean(false);

  const Empty = () => <></>;

  const Component = type ? communityTypeMap.get(type) || Empty : Empty;

  return (
    <>
      {type ? (
        <Button type="link" onClick={setTrue}>
          设置
        </Button>
      ) : (
        <></>
      )}
      <Component open={open} onOpenChange={set} {...restProps} />
    </>
  );
};

export default Community;
