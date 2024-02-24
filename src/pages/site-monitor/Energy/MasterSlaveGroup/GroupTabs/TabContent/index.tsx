/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-02-22 09:16:16
 * @LastEditTime: 2024-02-22 16:40:30
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Energy\MasterSlaveGroup\GroupTabs\TabContent\index.tsx
 */

import React, { useCallback, useState } from 'react';
import { GroupType } from '../../../type';
import { Row, Col } from 'antd';
import Power from '@/components/EnergyInfo/Power';
import Electric from '@/components/EnergyInfo/Electric';
import TabItem from '../../TabItem';
import { EnergySourceEnum } from '@/components/EnergyInfo';
import styles from '../../index.less';

type TabContentType = {
  groupData?: GroupType;
};

const TabContent: React.FC<TabContentType> = (props) => {
  const { groupData } = props;

  const [deviceData, setDeviceData] = useState({});

  const onDeviceChange = useCallback((deviceId) => {
    setDeviceData({
      deviceId,
    });
  }, []);

  return (
    <>
      <Row className="mb20" gutter={20}>
        <Col className={styles.col} span={14}>
          <TabItem devices={groupData?.devices} onDeviceChange={onDeviceChange} />
        </Col>
        <Col span={10}>
          <Power deviceData={deviceData} source={EnergySourceEnum.SiteMonitor} />
          <Electric deviceData={deviceData} source={EnergySourceEnum.SiteMonitor} />
        </Col>
      </Row>
    </>
  );
};

export default TabContent;
