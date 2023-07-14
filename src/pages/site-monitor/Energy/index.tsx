/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-04 15:17:13
 * @LastEditTime: 2023-07-14 12:12:12
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Energy\index.tsx
 */
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { useRequest } from 'umi';
import Stat from './Stat';
import Cabinet from './Cabinet';
import Power from './Power';
import Electric from './Electric';
import SiteDropdown from '../Overview/SiteDropdown';
import { getSiteUnitConfig } from '@/services/station';
import EmptyPage from '@/components/EmptyPage';

const Index: React.FC = () => {
  const [siteId, setSiteId] = useState<number>();

  const { data: siteConfig, run } = useRequest(getSiteUnitConfig, {
    manual: true,
  });

  useEffect(() => {
    if (siteId) {
      run({
        siteId,
        unitNum: 2,
      });
    }
  }, [siteId]);

  return (
    <>
      {siteConfig?.prompt ? (
        <EmptyPage description={siteConfig?.prompt} />
      ) : (
        <div className="p24">
          <SiteDropdown onChange={setSiteId} />
          <Stat siteId={siteId} className="mb24" />
          <Row gutter={20}>
            <Col span={14}>
              <Cabinet siteId={siteId} />
            </Col>
            <Col span={10}>
              <Power siteId={siteId} />
              <Electric siteId={siteId} />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Index;
