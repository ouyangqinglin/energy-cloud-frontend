/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-12 13:53:34
 * @LastEditTime: 2023-12-06 11:40:04
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\Cabinet\index.tsx
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
import PackImg from '@/assets/image/station/energy/pack.png';
import { isEmpty } from '@/utils';
import { DeviceTypeEnum, OnlineStatusEnum } from '@/utils/dictionary';
import { deviceAlarmStatusFormat, onlineStatusFormat } from '@/utils/format';
import Detail from '@/components/Detail';
import {
  airItem,
  bmsConfig,
  bwattAirItem,
  doorConfigs,
  emsItem,
  pcsConfig,
  peakConfig,
  ytEmsItem,
} from './config';
import { EnergySourceEnum } from '../';

const airProductIds = [
  DeviceTypeEnum.Air,
  DeviceTypeEnum.BWattAir,
  DeviceTypeEnum.PvEnergyAir,
  DeviceTypeEnum.YTEnergyAir,
];
const bmsProductIds = [
  DeviceTypeEnum.BatteryStack,
  DeviceTypeEnum.BWattBatteryStack,
  DeviceTypeEnum.YTEnergyBatteryStack,
  DeviceTypeEnum.PvEnergyBms,
];
const emsProductIds = [DeviceTypeEnum.Ems, DeviceTypeEnum.BWattEms, DeviceTypeEnum.YTEnergyEms];
const pcsProductIds = [
  DeviceTypeEnum.Pcs,
  DeviceTypeEnum.BWattPcs,
  DeviceTypeEnum.YTEnergyPcs,
  DeviceTypeEnum.PvEnergyPcs,
];

const getDataIds = (data: energyType[]): Record<string, string[]> => {
  const ids: Record<string, any> = {
    air: [],
    bms: [],
    ems: [],
    pcs: [],
  };
  data?.forEach?.((item) => {
    if (airProductIds.includes(item.productId)) {
      ids.air.push(item.id);
    } else if (bmsProductIds.includes(item.productId)) {
      ids.bms.push(item.id);
    } else if (emsProductIds.includes(item.productId)) {
      ids.ems.push(item.id);
    } else if (pcsProductIds.includes(item.productId)) {
      ids.pcs.push(item.id);
    }
  });
  return ids;
};

const getUnitByProductId = (
  data: energyType[],
  productIds: [DeviceTypeEnum],
): energyType | undefined => {
  let result: energyType | undefined;
  if (data && data.length) {
    for (let i = 0; i < data?.length; i++) {
      if (productIds.includes(data[i]?.productId)) {
        result = data[i];
        return result;
      }
      if (data[i]?.children && data[i]?.children?.length) {
        result = getUnitByProductId(data[i].children || [], productIds);
        if (result) {
          return result;
        }
      }
    }
  }
};

export type CabinetProps = ComProps & {
  showLabel?: boolean;
  source?: EnergySourceEnum;
};

const Cabinet: React.FC<CabinetProps> = (props) => {
  const { deviceData, showLabel, loading, source = EnergySourceEnum.DeviceManage } = props;

  const divRef = useRef(null);
  const bodySize = useSize(divRef);
  const [deviceIds, setDeviceIds] = useState<Record<string, any>>({});
  const airRealTimeData = useSubscribe(deviceIds?.air, true);
  const bmsRealTimeData = useSubscribe(deviceIds?.bms, true);
  const emsRealTimeData = useSubscribe(deviceIds?.ems, true);
  const pcsRealTimeData = useSubscribe(deviceIds?.pcs, true);
  const history = useHistory();

  const {
    loading: loadingEnergy,
    data: energyData,
    run,
  } = useRequest(getEnergy, {
    manual: true,
  });

  const scaleNum = useMemo(() => {
    const scaleWidth = (bodySize?.width || 964.83) / 964.83;
    const scaleHeight = (bodySize?.height || 728) / 728;
    return Math.min(scaleWidth, scaleHeight);
  }, [bodySize]);

  const onMoreClick = useCallback(
    (item) => {
      if (energyData) {
        const unit = item.productIds
          ? getUnitByProductId([energyData], item.productIds)
          : energyData;
        history.push({
          pathname:
            source === EnergySourceEnum.SiteMonitor
              ? '/site-monitor/device-detail'
              : '/equipment/device-detail',
          search: `?id=${unit?.id}&productId=${unit?.productId}`,
        });
      } else {
        message.error('暂无数据');
      }
    },
    [energyData, history],
  );

  const onAlarmClick = useCallback(() => {
    history.push({
      pathname: '/alarm/current',
      search: `?siteId=${deviceData?.siteId}&deviceName=${energyData?.name}`,
    });
  }, [deviceData?.siteId]);

  useEffect(() => {
    if (deviceData?.deviceId) {
      run({ deviceId: deviceData?.deviceId }).then((data) => {
        setDeviceIds(getDataIds(data?.children || []));
      });
    }
  }, [deviceData?.deviceId]);

  const airItems = useMemo(() => {
    return [
      (deviceData?.productId as DeviceTypeEnum) == DeviceTypeEnum.BWattAir ||
      (deviceData?.productId as DeviceTypeEnum) == DeviceTypeEnum.YTEnergy
        ? bwattAirItem
        : airItem,
    ].map((item, index) => {
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
            <label className={styles.unitTitle}>{item.label}</label>
            {item.data.map((field: any, fieldIndex) => {
              return (
                <>
                  <div key={fieldIndex} className={styles.field}>
                    {field.label}
                    <span className={styles.unitNum}>
                      {!isEmpty(airRealTimeData?.[field.field])
                        ? field.format
                          ? field.format(airRealTimeData?.[field.field], airRealTimeData)
                          : airRealTimeData?.[field.field]
                        : '--'}
                    </span>
                  </div>
                </>
              );
            })}
            <span className={`cursor ${styles.field}`} onClick={() => onMoreClick(item)}>
              了解更多{'>'}
            </span>
          </div>
        </>
      );
    });
  }, [airRealTimeData, deviceData]);

  const doorItems = useMemo(() => {
    return doorConfigs.map((item, index) => {
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
            {item.data.map((field: any, fieldIndex) => {
              return (
                <>
                  <div key={fieldIndex} className={styles.unitTitle}>
                    {field.label}
                    <span className={styles.unitNum}>
                      {!isEmpty(bmsRealTimeData?.[field.field])
                        ? field.format
                          ? field.format(bmsRealTimeData?.[field.field], bmsRealTimeData)
                          : bmsRealTimeData?.[field.field]
                        : '--'}
                    </span>
                  </div>
                </>
              );
            })}
          </div>
        </>
      );
    });
  }, [bmsRealTimeData, deviceData]);

  const emsItems = useMemo(() => {
    return [
      (deviceData?.productId as DeviceTypeEnum) == DeviceTypeEnum.YTEnergy ? ytEmsItem : emsItem,
    ].map((item, index) => {
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
            <label className={styles.unitTitle}>{item.label}</label>
            {item.data.map((field: any, fieldIndex) => {
              return (
                <>
                  <div key={fieldIndex} className={styles.field}>
                    {field.label}
                    <span className={styles.unitNum}>
                      {!isEmpty(emsRealTimeData?.[field.field])
                        ? field.format
                          ? field.format(emsRealTimeData?.[field.field], emsRealTimeData)
                          : emsRealTimeData?.[field.field]
                        : '--'}
                    </span>
                  </div>
                </>
              );
            })}
            <span className={`cursor ${styles.field}`} onClick={() => onMoreClick(item)}>
              了解更多{'>'}
            </span>
          </div>
        </>
      );
    });
  }, [emsRealTimeData, deviceData]);

  const bmsItems = useMemo(() => {
    return bmsConfig.map((item, index) => {
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
            <label className={styles.unitTitle}>{item.label}</label>
            {item.data.map((field: any, fieldIndex) => {
              return (
                <>
                  <div key={fieldIndex} className={styles.field}>
                    {field.label}
                    <span className={styles.unitNum}>
                      {!isEmpty(bmsRealTimeData?.[field.field])
                        ? field.format
                          ? field.format(bmsRealTimeData?.[field.field], bmsRealTimeData)
                          : bmsRealTimeData?.[field.field]
                        : '--'}
                    </span>
                  </div>
                </>
              );
            })}
            <span className={`cursor ${styles.field}`} onClick={() => onMoreClick(item)}>
              了解更多{'>'}
            </span>
          </div>
        </>
      );
    });
  }, [bmsRealTimeData, deviceData]);

  const pcsItems = useMemo(() => {
    return pcsConfig.map((item, index) => {
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
            <label className={styles.unitTitle}>{item.label}</label>
            {item.data.map((field: any, fieldIndex) => {
              return (
                <>
                  <div key={fieldIndex} className={styles.field}>
                    {field.label}
                    <span className={styles.unitNum}>
                      {!isEmpty({ ...pcsRealTimeData, ...bmsRealTimeData }?.[field.field])
                        ? field.format
                          ? field.format(
                              { ...pcsRealTimeData, ...bmsRealTimeData }?.[field.field],
                              { ...pcsRealTimeData, ...bmsRealTimeData },
                            )
                          : { ...pcsRealTimeData, ...bmsRealTimeData }?.[field.field]
                        : '--'}
                    </span>
                  </div>
                </>
              );
            })}
            <span className={`cursor ${styles.field}`} onClick={() => onMoreClick(item)}>
              了解更多{'>'}
            </span>
          </div>
        </>
      );
    });
  }, [pcsRealTimeData, bmsRealTimeData, deviceData]);

  const peakItems = useMemo(() => {
    return peakConfig.map((item, index) => {
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
            <label className={styles.unitTitle}>{item.label}</label>
            {item.data.map((field: any, fieldIndex) => {
              return (
                <>
                  <div key={fieldIndex} className={styles.field}>
                    {field.label}
                    <span className={styles.unitNum}>
                      {!isEmpty(bmsRealTimeData?.[field.field])
                        ? field.format
                          ? field.format(bmsRealTimeData?.[field.field], bmsRealTimeData)
                          : bmsRealTimeData?.[field.field]
                        : '--'}
                    </span>
                  </div>
                </>
              );
            })}
            <span className={`cursor ${styles.field}`} onClick={() => onMoreClick(item)}>
              了解更多{'>'}
            </span>
          </div>
        </>
      );
    });
  }, [bmsRealTimeData, deviceData]);

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
      {loading || loadingEnergy ? (
        <>
          <Skeleton.Button size="small" active />
          <Skeleton.Image className="w-full mt12" style={{ height: 600 }} active />
        </>
      ) : (
        <>
          {showLabel && (
            <Detail.Label showLine={false} title={energyData?.name} labelClassName={styles.label}>
              通信：
              <span className="mr24">
                {onlineStatusFormat(deviceData?.status || (deviceData?.networkStatus as any))}
              </span>
              告警：
              <span className={styles.alarm}>
                {deviceAlarmStatusFormat((deviceData?.alarmStatus ?? '') as string)}
                <span className="cursor ml8" onClick={onAlarmClick}>
                  {deviceData?.alarmCount}
                </span>
              </span>
            </Detail.Label>
          )}
          <div ref={divRef} className="tx-center">
            <div
              className={styles.energy}
              style={{ backgroundImage: `url(${EnergyImg})`, transform: `scale(${scaleNum})` }}
            >
              {airItems}
              {doorItems}
              {emsItems}
              {bmsItems}
              {peakItems}
              {pcsItems}
              <div className={styles.parckContain}>{packItems}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cabinet;
