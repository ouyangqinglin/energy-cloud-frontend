import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import styles from '../index.less';
import { Card, List, Divider } from 'antd';
import DeviceItem from '../deviceItem';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { getPlaceholder } from '@/utils';

export enum EnergySourceEnum {
  SiteMonitor,
  DeviceManage,
}

export type GroupItemProps = {
  data: any; //设备数据
  allData: any;
  isShowDeviceDetail: any; //传递数据给父组件告诉如何显示
};

const statConfig = [
  {
    title: '总电压(V)',
    field: 'TotalBatteryVoltage',
  },
  {
    title: '总电流(A)',
    field: 'TotalBatteryCurrent',
  },
  {
    title: '总功率(kW)',
    field: 'P',
  },
  {
    title: '可充电量(kWh)',
    field: 'RechargeableCapacity',
  },
  {
    title: '可放电量(kWh)',
    field: 'DischargeableCapacity',
  },
];

const GroupItem: React.FC<GroupItemProps> = (props) => {
  const { data, isShowDeviceDetail } = props;
  const lineRef = useRef(null);
  const [lineWidth, setLineWidth] = useState(0);
  const [boxWidth, setBoxWidth] = useState(0);
  const [leftArrowCss, setLeftArrowCss] = useState(styles.leftArrowBox);
  const [rightArrowCss, setRightArrowCss] = useState(styles.rightArrowBox);
  const [currentList, setCurrentList] = useState([]); //当前显示的设备
  const [targetIndex, setTargetIndex] = useState(3); //当前显示的设备数
  const [isChangeWidth, setIsChangeWidth] = useState(false); //当前显示的设备数
  const [statData, setStatData] = useState<Record<string, any>>({});

  useLayoutEffect(() => {
    if (lineRef.current) {
      setLineWidth(lineRef.current.offsetWidth);
    }
  }, [lineRef.current]);

  const handleChildData = useCallback((line: any) => {
    setBoxWidth(line);
  }, []);
  const childDataForShow = useCallback((bool, deviceId) => {
    isShowDeviceDetail(bool, deviceId);
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

  useEffect(() => {
    if (data) {
      const list = data.length < 4 ? data : data.slice(0, 3);
      setCurrentList(list);
      const rightCss = data.length < 4 ? styles.disRightAbledCss : styles.rightArrowBox;
      const leftCss = data.length < 4 ? styles.disLeftCss : styles.leftArrowBox;
      setRightArrowCss(rightCss);
      setLeftArrowCss(leftCss);
    }
  }, [data]);

  //箭头切换逻辑
  const onArrowClick = useCallback(() => {
    const source = data;
    let newIndex: number;
    let newList: [];
    setCurrentList([]);
    if (source.length - targetIndex >= 3) {
      newIndex = targetIndex + 3;
      newList = source.slice(targetIndex, newIndex);
    } else {
      newIndex = source.length;
      newList = source.slice(targetIndex, newIndex);
      setRightArrowCss(styles.disRightAbledCss);
      setLeftArrowCss(styles.disLeftCss);
    }
    setTargetIndex(newIndex);
    setCurrentList(newList);
    setIsChangeWidth(true);
  }, [currentList, targetIndex, rightArrowCss, lineWidth, boxWidth]);

  return (
    <>
      <div className={styles.tabConent} ref={lineRef}>
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
        {/* 竖向直线 */}
        <div className={styles.verticalDiv}>
          <Divider type="vertical" />
        </div>
        {/* 横向直线-宽度需动态变化 */}
        <div className={styles.transverseDiv} style={{ width: lineWidth - boxWidth - 96 + 'px' }}>
          <Divider />
        </div>
        {/* 左边箭头 */}
        <div className={leftArrowCss} onClick={() => onArrowClick('left')}>
          <ArrowLeftOutlined style={{ fontSize: '25px', padding: '10px' }} />
        </div>
        {/* 右边箭头 */}
        <div className={rightArrowCss} onClick={() => onArrowClick('right')}>
          <ArrowRightOutlined style={{ fontSize: '25px', padding: '10px' }} />
        </div>
        {/* 所有的设备 */}
        <div className={styles.allDeviceDiv}>
          {currentList.map((item: any) => {
            return (
              <DeviceItem
                onChildData={handleChildData}
                isChangeWidth={isChangeWidth}
                deviceData={item}
                onClickDeviceData={childDataForShow}
                onRealTimeDataChange={onRealTimeDataChange}
              />
            );
          })}
          {/* 显示设备详情 */}
        </div>
      </div>
    </>
  );
};

export default GroupItem;
