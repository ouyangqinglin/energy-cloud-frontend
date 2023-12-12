import React, { useEffect, useRef, useCallback, useState } from 'react';
import { EmsDevicesType } from '@/services/equipment';
import Cabinet from '../../Cabinet';
import styles from '../index.less';
import { ArrowLeftOutlined, ArrowRightOutlined, RollbackOutlined } from '@ant-design/icons';
import { Button, Carousel } from 'antd';
import type { CarouselRef } from 'antd/lib/carousel';
export type DeviceItemDetailProps = {
  deviceData: EmsDevicesType; //当前device数据对象
  allDeviceData: any; //某单元下所有的设备
  changeShowDiv: any;
};

const DeviceItemDetail: React.FC<DeviceItemDetailProps> = (props) => {
  const { deviceData, allDeviceData } = props;

  const carouselRef = useRef<CarouselRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onBackDevice = useCallback(() => {
    props.changeShowDiv();
  }, []);

  const onCarouselChange = useCallback((nowIndex) => {
    setActiveIndex(nowIndex);
  }, []);

  useEffect(() => {
    const index = allDeviceData?.devices.findIndex((item: any) => {
      return item.deviceId == deviceData?.deviceId;
    });
    carouselRef?.current?.goTo(index || 0);
    setActiveIndex(index || 0);
  }, [allDeviceData, deviceData]);

  return (
    <>
      <div className={styles.detailDiv}>
        {activeIndex !== 0 ? (
          <Button
            className={styles.leftArrowBox}
            shape="circle"
            icon={<ArrowLeftOutlined />}
            onClick={() => carouselRef?.current?.prev?.()}
          />
        ) : (
          <></>
        )}
        {activeIndex != allDeviceData?.devices?.length - 1 ? (
          <Button
            className={styles.rightArrowBox}
            shape="circle"
            icon={<ArrowRightOutlined />}
            onClick={() => carouselRef?.current?.next?.()}
          />
        ) : (
          <></>
        )}
        <Button
          className={styles.backFont}
          type="primary"
          icon={<RollbackOutlined />}
          onClick={onBackDevice}
        >
          返回
        </Button>
        <Carousel dots={true} ref={carouselRef} afterChange={onCarouselChange}>
          {allDeviceData?.devices.map((item: any) => {
            return <Cabinet deviceData={item} showLabel={true} />;
          })}
        </Carousel>
      </div>
    </>
  );
};

export default DeviceItemDetail;
