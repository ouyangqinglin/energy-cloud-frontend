/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-27 15:46:04
 * @LastEditTime: 2023-06-27 16:05:20
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\station\index.tsx
 */

import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import ElectricityPrice from '../setting/ElectricityPrice';
import System from '../setting/System';
import StationInfo from '../info/stationInfo';

const Setting = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `基础信息`,
      children: <StationInfo />,
    },
    {
      key: '2',
      label: `运行管理`,
      children: <System />,
    },
    {
      key: '3',
      label: `电价管理`,
      children: <ElectricityPrice />,
    },
  ];

  return <Tabs className="page-tabs" tabBarGutter={34} items={items} />;
};

export default Setting;
