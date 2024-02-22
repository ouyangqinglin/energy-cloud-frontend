/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-02-21 15:58:28
 * @LastEditTime: 2024-02-22 09:15:36
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Energy\MasterSlaveGroup\GroupTabs\index.tsx
 */

import React, { memo, useMemo } from 'react';
import { GroupType } from '../../type';
import { Tabs, TabsProps } from 'antd';
import TabName from './TabName';
import TabContent from './TabContent';

type GroupTabsType = {
  groupData?: GroupType[];
};

const GroupTabs: React.FC<GroupTabsType> = (props) => {
  const { groupData } = props;

  const tabItems = useMemo<TabsProps['items']>(() => {
    return groupData?.map?.((item: any, index: any) => {
      return {
        label: (
          <>
            <TabName groupData={item} />
          </>
        ),
        key: index,
        children: <TabContent groupData={item} />,
      };
    });
  }, [groupData]);

  return (
    <>
      <Tabs className="card-tabs" type="card" items={tabItems} />
    </>
  );
};

export default memo(GroupTabs);
