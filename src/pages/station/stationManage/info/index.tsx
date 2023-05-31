/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-30 16:01:37
 * @LastEditTime: 2023-05-30 16:01:41
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\info\index.tsx
 */
import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import StationInfo from './stationInfo';
import styles from './index.less';

const Info: React.FC = () => {
  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: '站点信息',
      children: <StationInfo />,
    },
    {
      key: '2',
      label: '服务记录',
      children: <></>,
    },
    {
      key: '3',
      label: '故障申报',
    },
  ];

  return (
    <>
      <Tabs className={styles.tabs} items={tabItems}></Tabs>
    </>
  );
};

export default Info;
