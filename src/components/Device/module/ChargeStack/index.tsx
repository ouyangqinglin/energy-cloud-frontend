/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-05 09:11:33
 * @LastEditTime: 2024-03-06 11:32:38
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\module\ChargeStack\index.tsx
 */

import React, { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Cabinet from '@/components/EnergyInfo/Cabinet';
import { Col, Row, Spin, Divider, Button, Carousel } from 'antd';
import DeviceContext from '../../Context/DeviceContext';
import { useRequest } from 'umi';
import { getWholeDeviceTree } from '@/services/equipment';
import { DeviceProductTypeEnum } from '@/utils/dictionary';
import { CarouselRef } from 'antd/lib/carousel';
import styles from './index.less';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import MasterTrend from '../../components/MasterTrend';
import { getPower } from './service';
import Trend from '../../components/Trend';
import { formatMessage } from '@/utils';

const Charge: React.FC = () => {
  const { data: deviceData } = useContext(DeviceContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<CarouselRef>(null);

  const {
    loading: loading,
    data: energyData,
    run,
  } = useRequest(getWholeDeviceTree, {
    manual: true,
  });

  const masterDeviceData = useMemo(() => {
    return energyData?.children?.find?.(
      (item) => item.productTypeId == DeviceProductTypeEnum.ChargeMaster,
    );
  }, [energyData]);

  const terminalsDeviceData = useMemo(() => {
    return (
      energyData?.children?.filter?.(
        (item) => item.productTypeId == DeviceProductTypeEnum.ChargeTerminal,
      ) || []
    );
  }, [energyData]);

  const carouselItems = useMemo(() => {
    return terminalsDeviceData?.map((item) => {
      return <Cabinet key={item.deviceId} deviceData={item} />;
    });
  }, [terminalsDeviceData]);

  const onCarouselChange = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (deviceData?.deviceId) {
      run({ deviceId: deviceData?.deviceId });
    }
  }, [deviceData?.deviceId]);

  return (
    <>
      {loading ? (
        <div className="tx-center mt24">
          <Spin className="ml12" />
        </div>
      ) : (
        <Row className="mb20" gutter={20}>
          <Col span={14}>
            <Cabinet deviceData={masterDeviceData} />
          </Col>
          <Col span={10}>
            <MasterTrend deviceData={deviceData} request={getPower} />
          </Col>
          <Col span={24}>
            <Divider />
          </Col>
          <Col span={14}>
            {activeIndex !== 0 && (
              <Button
                className={styles.leftArrowBox}
                shape="circle"
                icon={<ArrowLeftOutlined />}
                onClick={() => carouselRef?.current?.prev?.()}
              />
            )}
            {activeIndex != terminalsDeviceData.length - 1 && (
              <Button
                className={styles.rightArrowBox}
                shape="circle"
                icon={<ArrowRightOutlined />}
                onClick={() => carouselRef?.current?.next?.()}
              />
            )}
            <Carousel ref={carouselRef} afterChange={onCarouselChange}>
              {carouselItems}
            </Carousel>
          </Col>
          <Col span={10}>
            <Trend
              label={formatMessage({
                id: 'device.terminalChargingTrends',
                defaultMessage: '终端充电趋势',
              })}
              className="mt20"
              deviceData={terminalsDeviceData[activeIndex]}
              request={getPower}
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default memo(Charge);
