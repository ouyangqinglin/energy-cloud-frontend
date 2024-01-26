import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import styles from '../index.less';
import { Button, Card, List, Divider, Carousel } from 'antd';
import type { CarouselRef } from 'antd/lib/carousel';
import DeviceItem from '../deviceItem';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { getPlaceholder } from '@/utils';
import { statConfig } from './helper';
import { DeviceDataType } from '@/services/equipment';

export enum EnergySourceEnum {
  SiteMonitor,
  DeviceManage,
}

export type GroupItemProps = {
  data?: DeviceDataType[]; //设备数据
  isShowDeviceDetail: (deviceId: string) => void; //传递数据给父组件告诉如何显示
};

const GroupItem: React.FC<GroupItemProps> = (props) => {
  const { data, isShowDeviceDetail } = props;
  const [statData, setStatData] = useState<Record<string, any>>({});
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<CarouselRef>(null);

  const childDataForShow = useCallback((bool, deviceId) => {
    isShowDeviceDetail(deviceId);
  }, []);

  const onRealTimeDataChange = useCallback((id: string, realTimeData: Record<string, any>) => {
    setStatData((prevData) => {
      const {
        TotalBatteryVoltage,
        TotalBatteryCurrent,
        P,
        RechargeableCapacity,
        DischargeableCapacity,
      } = realTimeData || {};
      prevData[id] = {
        TotalBatteryVoltage,
        TotalBatteryCurrent,
        P,
        RechargeableCapacity,
        DischargeableCapacity,
      };
      const total: Record<string, any> = {
        TotalBatteryVoltage: 0,
        TotalBatteryCurrent: 0,
        P: 0,
        RechargeableCapacity: 0,
        DischargeableCapacity: 0,
      };
      const totalKeys = Object.keys(total);
      Object.entries(prevData).forEach(([prevDataKey, deviceData]) => {
        if (prevDataKey != 'total') {
          totalKeys.forEach((key) => {
            total[key] = total[key] + (deviceData?.[key] ?? 0);
          });
        }
      });
      return {
        ...prevData,
        total,
      };
    });
  }, []);

  const onCarouselChange = useCallback((nowIndex) => {
    setActiveIndex(nowIndex);
  }, []);

  const carouselItems = useMemo(() => {
    const items: React.ReactNode[][] = [[]];
    data?.forEach?.((device) => {
      const lastIndex = items.length - 1;
      if (items[lastIndex].length >= 3) {
        items.push([
          <div className={`flex1 ${styles.itemContain}`}>
            <DeviceItem
              key={device.deviceId}
              deviceData={device}
              onClickDeviceData={childDataForShow}
              onRealTimeDataChange={onRealTimeDataChange}
            />
          </div>,
        ]);
      } else {
        items[lastIndex].push(
          <div className={`flex1 ${styles.itemContain}`}>
            <DeviceItem
              key={device.deviceId}
              deviceData={device}
              onClickDeviceData={childDataForShow}
              onRealTimeDataChange={onRealTimeDataChange}
            />
          </div>,
        );
      }
    });
    return items.map((item) => {
      return (
        <div>
          <div className="flex flex-start">{item}</div>
        </div>
      );
    });
  }, [data, childDataForShow, onRealTimeDataChange]);

  return (
    <>
      <div className={styles.tabConent}>
        <List
          grid={{
            gutter: 10,
            column: 5,
          }}
          bordered={false}
          dataSource={statConfig}
          className={styles.totalList}
          renderItem={(item) => (
            <List.Item className={styles.totalDataDiv} key={item.field}>
              <div>
                <Card title={item.title} bordered={false}>
                  {getPlaceholder(statData?.total?.[item.field])}
                </Card>
              </div>
            </List.Item>
          )}
        />
        <div className={styles.verticalDiv}>
          <Divider type="vertical" />
        </div>
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
        {activeIndex != carouselItems.length - 1 ? (
          <Button
            className={styles.rightArrowBox}
            shape="circle"
            icon={<ArrowRightOutlined />}
            onClick={() => carouselRef?.current?.next?.()}
          />
        ) : (
          <></>
        )}
        <Carousel ref={carouselRef} afterChange={onCarouselChange}>
          {carouselItems}
        </Carousel>
      </div>
    </>
  );
};

export default GroupItem;
