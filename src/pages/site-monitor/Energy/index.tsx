/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-04 15:17:13
 * @LastEditTime: 2023-07-25 16:43:28
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Energy\index.tsx
 */
import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col } from 'antd';
import { useHistory, useModel } from 'umi';
import Stat from './Stat';
import Cabinet from './Cabinet';
import Power from './Power';
import Electric from './Electric';
import SiteLabel from '@/components/SiteLabel';
import { SiteDataType } from '@/services/station';

const Index: React.FC = () => {
  const [siteId, setSiteId] = useState<number>();
  const { initialState } = useModel('@@initialState');
  const history = useHistory();

  const onChange = useCallback((data: SiteDataType) => {
    if (data?.id) {
      setSiteId(Number(data.id));
    }
  }, []);

  useEffect(() => {
    if (
      initialState?.menuPathTitleMap &&
      !initialState?.menuPathTitleMap?.get?.('/site-monitor/energy')
    ) {
      history.push({
        pathname: '/site-monitor/overview',
      });
    }
  }, [initialState?.menuPathTitleMap]);

  return (
    <>
      <div className="p24">
        <SiteLabel onChange={onChange} />
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
    </>
  );
};

export default Index;
