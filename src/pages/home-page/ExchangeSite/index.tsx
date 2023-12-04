/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-02 15:22:58
 * @LastEditTime: 2023-12-03 15:45:42
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\home-page\ExchangeSite\index.tsx
 */
import React from 'react';
import { Row, Col } from 'antd';
import SiteMap from './SiteMap';
import Statistics from './SiteMap/Statistics';
import styles from './index.less';
import { useRequest } from 'umi';
import { getStatistics } from './service';
import TopStatistics from './Stastistics/Top';
import ChartTabs from './ChartTabs';
import Pie from './Pie';

const ExchangeSite: React.FC = () => {
  const { data: statisticsData } = useRequest(getStatistics);

  return (
    <>
      <div className="p20">
        <TopStatistics data={statisticsData} />
        <Row className="my20" gutter={20}>
          <Col span={18}>
            <SiteMap className="card-wrap shadow">
              <Statistics data={statisticsData} />
            </SiteMap>
          </Col>
          <Col span={6}>
            <Pie data={statisticsData} />
          </Col>
        </Row>
        <ChartTabs />
      </div>
    </>
  );
};

export default ExchangeSite;
