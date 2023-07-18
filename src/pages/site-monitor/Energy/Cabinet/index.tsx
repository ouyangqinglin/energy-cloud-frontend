/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-12 13:53:34
 * @LastEditTime: 2023-07-17 15:11:16
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Energy\Cabinet\index.tsx
 */
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useRequest, useHistory } from 'umi';
import { useSize } from 'ahooks';
import { Skeleton, message } from 'antd';
import { useSubscribe } from '@/hooks';
import { getEnergy } from '../service';
import { ComProps, energyType } from '../type';
import styles from '../index.less';
import EnergyImg from '@/assets/image/station/energy/enery.png';
import AirImg from '@/assets/image/station/energy/air.png';
import AirLineImg from '@/assets/image/station/energy/air-line.png';
import DoorImg from '@/assets/image/station/energy/door.png';
import DoorLineImg from '@/assets/image/station/energy/door-line.png';
import EmsImg from '@/assets/image/station/energy/ems.png';
import EmsLineImg from '@/assets/image/station/energy/ems-line.png';
import StackImg from '@/assets/image/station/energy/stack.png';
import StackLineImg from '@/assets/image/station/energy/stack-line.png';
import PcsImg from '@/assets/image/station/energy/pcs.png';
import PcsLineImg from '@/assets/image/station/energy/pcs-line.png';
import PackImg from '@/assets/image/station/energy/pack.png';
import PackLineImg from '@/assets/image/station/energy/pack-line.png';
import { isEmpty } from '@/utils';
import { DeviceTypeEnum } from '@/utils/dictionary';
import {
  openFormat,
  tempFormat,
  wetFormat,
  doorFormat,
  runFormat,
  modelFormat,
  percentageFormat,
  workFormat,
  electricModel,
  voltageFormat,
  chargeFormat,
  powerFormat,
} from '@/utils/format';

const voltageNumFormat = (value: number): number => {
  return value % 24;
};

const tempNumFormat = (value: number): number => {
  return value % 13;
};

const energyPowerFormat = (value: number, data: any) => {
  return (
    <span>
      {powerFormat(value)}({chargeFormat(data.CADI)})
    </span>
  );
};

const unitItems = [
  {
    label: '空调',
    productId: DeviceTypeEnum.Air,
    position: { top: 51, left: 14 },
    icon: AirImg,
    line: AirLineImg,
    linePosition: { top: 11, left: 82 },
    data: [
      {
        label: '运行状态：',
        field: 'AirConditioningWorkingStatus',
        format: (value: number) => openFormat(value, false),
      },
      { label: '回风温度：', field: 'ReturnAirTemperature', format: tempFormat },
      { label: '回风湿度：', field: 'ReturnAirHumidity', format: wetFormat },
    ],
  },
  {
    label: '储能仓门',
    position: { top: 203, left: 14 },
    icon: DoorImg,
    line: DoorLineImg,
    linePosition: { top: 11, left: 140 },
    data: [
      {
        label: '储能仓门:',
        field: 'AccessControlStatus',
        format: (value: number) => doorFormat(value, false),
      },
    ],
  },
  {
    label: 'EMS',
    productId: DeviceTypeEnum.Ems,
    position: { top: 302, left: 14 },
    icon: EmsImg,
    line: EmsLineImg,
    linePosition: { top: 11, left: 75 },
    data: [
      {
        label: '运行状态：',
        field: 'emsSysStatus',
        format: (value: number) => runFormat(value, false),
      },
      {
        label: '系统模式：',
        field: 'sysModel',
        format: (value: number) => modelFormat(value, false),
      },
    ],
  },
  {
    label: '电池堆',
    productId: DeviceTypeEnum.BatteryStack,
    position: { top: 450, left: 14 },
    icon: StackImg,
    line: StackLineImg,
    linePosition: { top: -74, left: 85 },
    data: [
      { label: 'SoC：', field: 'SOC', format: percentageFormat },
      // { label: '单体最高温度：', field: 0 },
      // { label: '单体最低温度：', field: 0 },
    ],
  },
  {
    label: 'PCS',
    productId: DeviceTypeEnum.Pcs,
    position: { top: 487, left: 802 },
    icon: PcsImg,
    line: PcsLineImg,
    linePosition: { top: 11, left: -233 },
    data: [
      {
        label: '工作状态：',
        field: 'WorkStatus',
        format: (value: number) => workFormat(value, false),
      },
      {
        label: '工作模式：',
        field: 'CurrentChargingAndDischargingModel',
        format: (value: number) => electricModel(value, false),
      },
      { label: '储能功率：', field: 'P', format: energyPowerFormat },
    ],
  },
  {
    label: '单体极值信息',
    productId: DeviceTypeEnum.BatteryStack,
    position: { top: 175, left: 802 },
    icon: EmsImg,
    line: PackLineImg,
    linePosition: { top: 11, left: -60 },
    data: [
      { label: '最高电压：', field: 'MVVOASU', format: voltageFormat },
      { label: '编号：', field: 'MaxNOIV' },
      { label: '最低电压：', field: 'MVVOSU', format: voltageFormat },
      { label: '编号：', field: 'MNOIV' },
      { label: '最高温度：', field: 'MaximumIndividualTemperature', format: tempFormat },
      { label: '编号：', field: 'MITN' },
      { label: '最低温度：', field: 'LVOMT', format: tempFormat },
      { label: '编号：', field: 'MNOIT' },
    ],
  },
];

const getDataIds = (data: energyType[]): string[] => {
  const ids: string[] = [];
  data?.forEach?.((item) => {
    ids.push(item?.id || '');
    if (item?.children && item.children.length) {
      ids.push(...getDataIds(item.children));
    }
  });
  return ids;
};

const getUnitByProductId = (
  data: energyType[],
  productId: DeviceTypeEnum,
): energyType | undefined => {
  let result: energyType | undefined;
  if (data && data.length) {
    for (let i = 0; i < data?.length; i++) {
      if (data[i]?.productId == productId) {
        result = data[i];
        return result;
      }
      if (data[i]?.children && data[i]?.children?.length) {
        result = getUnitByProductId(data[i].children || [], productId);
        if (result) {
          return result;
        }
      }
    }
  }
};

const Cabinet: React.FC<ComProps> = (props) => {
  const { siteId } = props;

  const divRef = useRef(null);
  const bodySize = useSize(divRef);
  const [deviceIds, setDeviceIds] = useState<string[]>([]);
  const deviceData = useSubscribe(deviceIds, true);
  const history = useHistory();

  const {
    loading,
    data: energyData,
    run,
  } = useRequest(getEnergy, {
    manual: true,
  });

  const scaleNum = useMemo(() => {
    return (bodySize?.width || 964.83) / 964.83;
  }, [bodySize]);

  const onMoreClick = useCallback(
    (item) => {
      if (energyData) {
        const unit = item.productId ? getUnitByProductId([energyData], item.productId) : energyData;
        history.push({
          pathname: '/site-monitor/device-detail',
          search: `?id=${unit?.id}&productId=${unit?.productId}`,
        });
      } else {
        message.error('暂无数据');
      }
    },
    [energyData, history],
  );

  useEffect(() => {
    if (siteId) {
      run({ siteId }).then((data) => {
        setDeviceIds(getDataIds([data]));
      });
    }
  }, [siteId]);

  const items = useMemo(() => {
    return unitItems.map((item, index) => {
      return (
        <>
          <div
            key={item.label}
            className={styles.unit}
            style={{
              backgroundImage: `url(${item.icon})`,
              ...item.position,
            }}
          >
            <img className={styles.line} src={item.line} style={item.linePosition} />
            {index !== 1 && <label className={styles.unitTitle}>{item.label}</label>}
            {item.data.map((field: any, fieldIndex) => {
              return (
                <>
                  <div key={fieldIndex} className={index !== 1 ? styles.field : styles.unitTitle}>
                    {field.label}
                    <span className={styles.unitNum}>
                      {!isEmpty(deviceData?.[field.field])
                        ? field.format
                          ? field.format(deviceData?.[field.field], deviceData)
                          : deviceData?.[field.field]
                        : '--'}
                    </span>
                  </div>
                </>
              );
            })}
            {index !== 1 && (
              <span className={`cursor ${styles.field}`} onClick={() => onMoreClick(item)}>
                了解更多{'>'}
              </span>
            )}
          </div>
        </>
      );
    });
  }, [deviceData]);

  const packItems = useMemo(() => {
    return Array.from({ length: 10 }).map((_, index) => {
      return (
        <>
          <div key={index} className={styles.parck}>
            <div className="flex flex-center">
              <img className="mr4" src={PackImg} />
              PACK-{10 - index}
            </div>
          </div>
        </>
      );
    });
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Skeleton.Button size="small" active />
          <Skeleton.Image className="w-full mt12" style={{ height: 600 }} active />
        </>
      ) : (
        <>
          <label className={styles.label}>{energyData?.name}</label>
          <div ref={divRef} />
          <div
            className={styles.energy}
            style={{ backgroundImage: `url(${EnergyImg})`, transform: `scale(${scaleNum})` }}
          >
            {items}
            <div className={styles.parckContain}>{packItems}</div>
          </div>
        </>
      )}
    </>
  );
};

export default Cabinet;
