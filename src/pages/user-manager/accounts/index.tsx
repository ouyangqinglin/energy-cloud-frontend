/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 13:54:37
 * @LastEditTime: 2023-05-04 13:54:41
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationList\data.d.ts
 */

import React, { useMemo } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Account, { PageTypeEnum } from './account';

const Accounts: React.FC = (props) => {
  const items = useMemo<TabsProps['items']>(() => {
    return [
      {
        key: '1',
        label: '客户账号',
        children: <Account type={PageTypeEnum.Custom} />,
      },
      {
        key: '2',
        label: '平台账号',
        children: <Account type={PageTypeEnum.Platform} />,
      },
    ];
  }, []);

  return (
    <>
      <Tabs className="page-tabs" tabBarGutter={34} items={items} />
    </>
  );
};

export default Accounts;
