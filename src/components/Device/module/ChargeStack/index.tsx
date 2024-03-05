/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-05 09:11:33
 * @LastEditTime: 2024-03-05 14:09:13
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\module\ChargeStack\index.tsx
 */

import React, { memo, useContext } from 'react';
import Cabinet from '@/components/EnergyInfo/Cabinet';
import { Col, Row } from 'antd';
import DeviceContext from '../../Context/DeviceContext';

const Charge: React.FC = () => {
  const { data: deviceData } = useContext(DeviceContext);

  return (
    <>
      <Row className="mb20" gutter={20}>
        <Col span={14}>
          <Cabinet deviceData={deviceData} />
        </Col>
        <Col span={10}></Col>
      </Row>
    </>
  );
};

export default memo(Charge);
