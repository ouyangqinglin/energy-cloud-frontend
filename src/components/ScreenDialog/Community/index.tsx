/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-01 14:56:51
 * @LastEditTime: 2023-07-28 15:18:34
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\ScreenDialog\Community\index.tsx
 */

import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Button, Spin } from 'antd';
import { useBoolean } from 'ahooks';

export enum CommunityTypeEnum {
  Account = 1,
  Meter,
  StationGun,
  Station,
}

export const communityTypeMap = new Map([
  [CommunityTypeEnum.Account, 'Account'],
  [CommunityTypeEnum.Meter, 'Meter'],
  [CommunityTypeEnum.StationGun, 'StationGun'],
  [CommunityTypeEnum.Station, 'Station'],
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
  const [Component, setComponent] = useState<React.FC<CommunityProps>>();

  useEffect(() => {
    if (type) {
      const result = communityTypeMap.get(type);
      if (result) {
        setComponent(lazy(() => import('./' + result)));
      }
    }
  }, [type]);

  return (
    <>
      {type ? (
        <Button type="link" onClick={setTrue}>
          设置
        </Button>
      ) : (
        <></>
      )}
      <Suspense
        fallback={
          <div className="tx-center">
            <Spin />
          </div>
        }
      >
        {Component && <Component open={open} onOpenChange={set} {...restProps} />}
      </Suspense>
    </>
  );
};

export default Community;
