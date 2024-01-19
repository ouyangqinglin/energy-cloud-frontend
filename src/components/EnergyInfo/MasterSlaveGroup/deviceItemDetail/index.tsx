import React, { useEffect, useRef, useCallback, useState } from 'react';
import { DeviceDataType } from '@/services/equipment';
import Cabinet from '../../Cabinet';
import styles from '../index.less';
import { ArrowLeftOutlined, ArrowRightOutlined, RollbackOutlined } from '@ant-design/icons';
import { Button, Carousel } from 'antd';
import type { CarouselRef } from 'antd/lib/carousel';
import { formatMessage } from '@/utils';

export type DeviceItemDetailProps = {
  deviceData?: DeviceDataType; //当前device数据对象
  allDeviceData?: DeviceDataType[]; //某单元下所有的设备
  changeShowDiv: any;
  showBack?: boolean;
};

const DeviceItemDetail: React.FC<DeviceItemDetailProps> = (props) => {
  const { deviceData, allDeviceData, showBack } = props;

  const carouselRef = useRef<CarouselRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onBackDevice = useCallback(() => {
    props.changeShowDiv();
  }, []);

  const onCarouselChange = useCallback((nowIndex) => {
    setActiveIndex(nowIndex);
  }, []);

  useEffect(() => {
    const index = allDeviceData?.findIndex((item: any) => {
      return item.deviceId == deviceData?.deviceId;
    });
    carouselRef?.current?.goTo(index || 0);
    setActiveIndex(index || 0);
  }, [allDeviceData, deviceData]);

  return (
    <>
      <div className={styles.detailDiv}>
        {activeIndex !== 0 && (allDeviceData?.length ?? 0) > 1 ? (
          <Button
            className={styles.leftArrowBox}
            shape="circle"
            icon={<ArrowLeftOutlined />}
            onClick={() => carouselRef?.current?.prev?.()}
          />
        ) : (
          <></>
        )}
        {activeIndex != (allDeviceData?.length ?? 0 - 1) && (allDeviceData?.length ?? 0) > 1 ? (
          <Button
            className={styles.rightArrowBox}
            shape="circle"
            icon={<ArrowRightOutlined />}
            onClick={() => carouselRef?.current?.next?.()}
          />
        ) : (
          <></>
        )}
        {showBack && (
          <Button
            className={styles.backFont}
            type="primary"
            icon={<RollbackOutlined />}
            onClick={onBackDevice}
          >
            {formatMessage({ id: 'common.back', defaultMessage: '返回' })}
          </Button>
        )}
        <Carousel dots={true} ref={carouselRef} afterChange={onCarouselChange}>
          {allDeviceData?.map((item: any) => {
            return <Cabinet deviceData={item} showLabel={true} />;
          })}
        </Carousel>
      </div>
    </>
  );
};

export default DeviceItemDetail;
