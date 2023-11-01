import React, { useEffect, useLayoutEffect, useRef, useState, useMemo, useCallback } from 'react';
import styles from '../index.less';
import { Card, List, Divider } from 'antd';
import DeviceItem from '../deviceItem';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { EmsDevicesType } from '@/services/equipment';
import { set } from 'lodash';
import { Data } from '@/components/YTIcons/YTSvg';

export enum EnergySourceEnum {
  SiteMonitor,
  DeviceManage,
}

export type GroupItemProps = {
  data: any; //设备数据
  allData: any;
};

const GroupItem: React.FC<GroupItemProps> = (props) => {
  const { data, allData } = props;
  const lineRef = useRef(null);
  const [lineWidth, setLineWidth] = useState(0);
  const [boxWidth, setBoxWidth] = useState(0);
  const [leftArrowCss, setLeftArrowCss] = useState(styles.leftArrowBox);
  const [rightArrowCss, setRightArrowCss] = useState(styles.rightArrowBox);
  const [currentList, setCurrentList] = useState([]); //当前显示的设备
  const [targetIndex, setTargetIndex] = useState(3); //当前显示的设备数
  const [isChangeWidth, setIsChangeWidth] = useState(false); //当前显示的设备数

  useLayoutEffect(() => {
    if (lineRef.current) {
      setLineWidth(lineRef.current.offsetWidth);
    }
  }, [lineRef.current]);

  const totalData = [
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
  const handleChildData = useCallback((line: any) => {
    setBoxWidth(line);
  }, []);
  //计算总电流和总电压
  const totoalObj = useMemo(() => {
    if (data) {
      let obj = {
        TotalBatteryVoltage: 0,
        TotalBatteryCurrent: 0,
        P: 0,
        RechargeableCapacity: 0,
        DischargeableCapacity: 0,
      };
      data.forEach((item: any, index: any) => {
        if (item.realTimeData) {
          obj.TotalBatteryVoltage += item.realTimeData.TotalBatteryVoltage;
          obj.TotalBatteryCurrent += item.realTimeData.TotalBatteryCurrent;
          obj.P += item.realTimeData.P;
          obj.RechargeableCapacity += item.realTimeData.RechargeableCapacity;
          obj.DischargeableCapacity += item.realTimeData.DischargeableCapacity;
        } else {
          obj = {
            TotalBatteryVoltage: '--',
            TotalBatteryCurrent: '--',
            P: '--',
            RechargeableCapacity: '--',
            DischargeableCapacity: '--',
          };
        }
      });
      return obj;
    }
  }, [data]);
  useEffect(() => {
    if (data) {
      const list = data.length < 4 ? data : data.slice(0, 3);
      setCurrentList(list);
    }
  }, [data]);
  //箭头切换逻辑-右边-需修改
  const onRightClick = useCallback(() => {
    // const source = data;
    // let newIndex: number;
    // let newList: [];
    // setCurrentList([]);
    // if (source.length - targetIndex >= 3) {
    //   newIndex = targetIndex + 3;
    //   newList = source.slice(targetIndex, newIndex);
    // } else {
    //   newIndex = source.length;
    //   newList = source.slice(targetIndex, newIndex);
    //   setRightArrowCss(styles.disRightAbledCss);
    // }
    // setTargetIndex(newIndex);
    // setCurrentList(newList);
    // setIsChangeWidth(true);
  }, [currentList, targetIndex, rightArrowCss, lineWidth, boxWidth]);
  //箭头切换逻辑-左边
  const onLeftClick = useCallback(() => {
    // const source = data;
    // let newIndex:number;
    // let newList:[];
    // if (targetIndex - 3 > 0 ) {
    //   newIndex = targetIndex - 3;
    //   newList = source.slice(newIndex-2, newIndex+1);
    // } else {
    //   newIndex = source.length;
    //   newList =  source.slice(targetIndex, newIndex);
    //   setRightArrowCss(styles.disRightAbledCss)
    // }
    // setTargetIndex(newIndex);
    // setCurrentList(newList);
    // setIsChangeWidth(true);
  }, [currentList, targetIndex, leftArrowCss]);
  return (
    <>
      <div className={styles.tabConent} ref={lineRef}>
        <List
          grid={{
            gutter: 10,
            column: 5,
          }}
          bordered={false}
          dataSource={totalData}
          className={styles.totalList}
          renderItem={(item) => (
            <List.Item className={styles.totalDataDiv} key={item.field}>
              <div>
                <Card title={item.title} bordered={false}>
                  {totoalObj[item.field] || '--'}
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
        <div className={leftArrowCss} onClick={onLeftClick}>
          <ArrowLeftOutlined style={{ fontSize: '25px', padding: '10px' }} />
        </div>
        {/* 右边箭头 */}
        <div className={rightArrowCss} onClick={onRightClick}>
          <ArrowRightOutlined style={{ fontSize: '25px', padding: '10px' }} />
        </div>
        {/* 所有的设备 */}
        <div className={styles.allDeviceDiv}>
          {currentList.map((item: any) => {
            return (
              <DeviceItem
                realtimeData={item.realTimeData}
                onChildData={handleChildData}
                isChangeWidth={isChangeWidth}
                allDeviceData={item}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default GroupItem;
