/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-03 17:29:33
 * @LastEditTime: 2023-12-03 17:38:56
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\home-page\ExchangeSite\ChartTabs.tsx
 */
import React, { useState } from 'react';
import LineChart, { LineTypeEnum } from './LineChart';
import { Tabs, TabsProps } from 'antd';

const ChartTabs: React.FC = () => {
  const [activeKey, setActiveKey] = useState(LineTypeEnum.Energy);

  const tabItems: TabsProps['items'] = [
    {
      key: LineTypeEnum.Energy,
      label: '车辆运营能耗统计',
    },
    {
      key: LineTypeEnum.Charge,
      label: '电池充电量',
    },
    {
      key: LineTypeEnum.Exchange,
      label: '车辆换电次数',
    },
    {
      key: LineTypeEnum.Mileage,
      label: '车辆运营里程统计',
    },
  ];

  const onChange = (key: string) => {
    setActiveKey(key as any);
  };

  return (
    <>
      <div className="card-wrap shadow px20">
        <Tabs items={tabItems} activeKey={activeKey} onChange={onChange} />
        <LineChart type={activeKey} />
      </div>
    </>
  );
};

export default ChartTabs;
