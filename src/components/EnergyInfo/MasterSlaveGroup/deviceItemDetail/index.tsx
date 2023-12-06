import React, { useEffect, useRef, useCallback } from 'react';
import { EmsDevicesType } from '@/services/equipment';
import Cabinet from '../../Cabinet';
import styles from '../index.less';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';
import type { CarouselRef } from 'antd/lib/carousel';
import { formatMessage } from '@/utils';
export type DeviceItemDetailProps = {
  deviceData: EmsDevicesType; //当前device数据对象
  allDeviceData: any; //某单元下所有的设备
  changeShowDiv: any;
};

const DeviceItemDetail: React.FC<DeviceItemDetailProps> = (props) => {
  const { deviceData, allDeviceData } = props;
  const carouselRef = useRef<CarouselRef>(null);
  const onBackDevice = useCallback(() => {
    props.changeShowDiv();
  }, []);
  //箭头切换逻辑
  const onArrowClick = useCallback(
    (btnstr) => {
      carouselRef?.current?.next();
    },
    [deviceData],
  );
  //获取当前设备的索引
  useEffect(() => {
    const index = allDeviceData?.devices.findIndex((item: any) => {
      return item.deviceId == deviceData?.deviceId;
    });
    carouselRef?.current?.goTo(index || 0);
  }, [allDeviceData, deviceData, carouselRef?.current]);

  return (
    <>
      <div className={styles.detailDiv}>
        {/* 左边箭头 */}
        <div
          className={styles.leftArrowBox}
          onClick={() => onArrowClick('left')}
          style={allDeviceData?.devices.length > 1 ? { display: 'block' } : { display: 'none' }}
        >
          <ArrowLeftOutlined style={{ fontSize: '25px', padding: '10px' }} />
        </div>
        {/* 右边箭头 */}
        <div
          className={styles.rightArrowBox}
          onClick={() => onArrowClick('right')}
          style={allDeviceData?.devices.length > 1 ? { display: 'block' } : { display: 'none' }}
        >
          <ArrowRightOutlined style={{ fontSize: '25px', padding: '10px' }} />
        </div>
        <div className={styles.backFont} onClick={onBackDevice}>
          {formatMessage({ id: 'device.returnUnit', defaultMessage: '返回单元' })}
        </div>
        <Carousel dots={true} ref={carouselRef}>
          {/* <div className={styles.deviceNameFont}>{deviceData?.deviceName || '--'}</div> */}
          {allDeviceData?.devices.map((item: any) => {
            return <Cabinet deviceData={item} showLabel={true} />;
          })}
        </Carousel>
      </div>
    </>
  );
};

export default DeviceItemDetail;
