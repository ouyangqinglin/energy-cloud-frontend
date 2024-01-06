/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-12 13:53:34
 * @LastEditTime: 2024-01-06 10:08:06
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\Cabinet\index.tsx
 */
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useRequest, useHistory } from 'umi';
import { useSize } from 'ahooks';
import { Skeleton, message } from 'antd';
import { useSubscribe } from '@/hooks';
import { ComProps } from '../type';
import styles from '../index.less';
import EnergyImg from '@/assets/image/station/energy/enery.png';
import LiquidEnergyImg from '@/assets/image/station/liquid-energy/energy.png';
import PackImg from '@/assets/image/station/energy/pack.png';
import { formatMessage } from '@/utils';
import { DeviceProductTypeEnum, DeviceTypeEnum } from '@/utils/dictionary';
import { deviceAlarmStatusFormat, onlineStatusFormat } from '@/utils/format';
import Detail from '@/components/Detail';
import {
  BwtEnergy,
  ConfigType,
  EnergyComponentType,
  Liquid2Energy,
  LiquidEnergy,
  RectEnergy,
  Wind2Energy,
  WindEnergy,
} from './config';
import { EnergySourceEnum } from '../';
import { DeviceDataType, getWholeDeviceTree } from '@/services/equipment';

const energyItemsMap = new Map<DeviceTypeEnum | undefined, EnergyComponentType>([
  [DeviceTypeEnum.Energy, RectEnergy],
  [DeviceTypeEnum.BWattEnergy, BwtEnergy],
  [DeviceTypeEnum.YTEnergy, WindEnergy],
  [DeviceTypeEnum.LiquidEnergy, LiquidEnergy],
  [DeviceTypeEnum.Wind2Energy, Wind2Energy],
  [DeviceTypeEnum.Liquid2Energy, Liquid2Energy],
]);

const getDataIds = (data: DeviceDataType[]): Record<string, string[]> => {
  const ids: Record<string, any> = {
    air: [],
    bms: [],
    ems: [],
    pcs: [],
    fire: [],
    dehumidifire: [],
  };
  data?.forEach?.((item) => {
    if (DeviceProductTypeEnum.Air == item.productTypeId) {
      ids.air.push(item.id);
    } else if (DeviceProductTypeEnum.BatteryStack == item.productTypeId) {
      ids.bms.push(item.id);
    } else if (DeviceProductTypeEnum.Ems == item.productTypeId) {
      ids.ems.push(item.id);
    } else if (DeviceProductTypeEnum.Pcs == item.productTypeId) {
      ids.pcs.push(item.id);
    } else if (DeviceProductTypeEnum.FireFight == item.productTypeId) {
      ids.fire.push(item.id);
    } else if (DeviceProductTypeEnum.Dehumidifier == item.productTypeId) {
      ids.dehumidifire.push(item.id);
    }
  });
  return ids;
};

const getUnitByProductId = (
  data: DeviceDataType[],
  productTypeId: DeviceProductTypeEnum,
): DeviceDataType | void => {
  let result: DeviceDataType | void;
  if (data && data.length) {
    for (let i = 0; i < data?.length; i++) {
      if (productTypeId == data[i]?.productTypeId) {
        result = data[i];
        return result;
      }
      if (data[i]?.children && data[i]?.children?.length) {
        result = getUnitByProductId(data[i].children || [], productTypeId);
        if (result) {
          return result;
        }
      }
    }
  }
};

const getItemsByConfig = (
  configs: ConfigType[],
  data: Record<string, any>,
  onMoreClick: (params: ConfigType) => void,
) => {
  return configs.map((item, index) => {
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
          {item.showLabel === false ? (
            <></>
          ) : (
            <label className={styles.unitTitle}>{item.label}</label>
          )}
          <Detail className={styles.detail} items={item.data} data={data} column={1} />
          {item.showLabel === false ? (
            <></>
          ) : (
            <span className={`cl-primary cursor ${styles.field}`} onClick={() => onMoreClick(item)}>
              {formatMessage({ id: 'common.more', defaultMessage: '更多' })}
              {'>'}
            </span>
          )}
        </div>
      </>
    );
  });
};

const liquidProductIds: (DeviceTypeEnum | undefined)[] = [
  DeviceTypeEnum.LiquidEnergy,
  DeviceTypeEnum.Liquid2Energy,
];
const ytEnergyProductIds: (DeviceTypeEnum | undefined)[] = [DeviceTypeEnum.YTEnergy];

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
  const fireRealTimeData = useSubscribe(deviceIds?.fire, true);
  const dehumidifierRealTimeData = useSubscribe(deviceIds?.dehumidifire, true);
  const history = useHistory();

  const {
    loading: loadingEnergy,
    data: energyData,
    run,
  } = useRequest(getWholeDeviceTree, {
    manual: true,
  });

  const scaleNum = useMemo(() => {
    const scaleWidth = (bodySize?.width || 964.83) / 964.83;
    const scaleHeight = (bodySize?.height || 728) / 728;
    return Math.min(scaleWidth, scaleHeight);
  }, [bodySize]);

  const onMoreClick = useCallback(
    (item: ConfigType) => {
      if (energyData) {
        const unit = item.productTypeId
          ? getUnitByProductId([energyData], item.productTypeId)
          : energyData;
        if (unit?.id && unit?.productId) {
          history.push({
            pathname:
              source === EnergySourceEnum.SiteMonitor
                ? '/site-monitor/device-detail'
                : '/equipment/device-detail',
            search: `?id=${unit?.id}`,
          });
        } else {
          message.error(formatMessage({ id: 'common.noData', defaultMessage: '暂无数据' }));
        }
      } else {
        message.error(formatMessage({ id: 'common.noData', defaultMessage: '暂无数据' }));
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
    const result = (energyItemsMap.get(deviceData?.productId) || RectEnergy)?.air;
    return getItemsByConfig(result ? [result] : [], airRealTimeData, onMoreClick);
  }, [airRealTimeData, deviceData, onMoreClick]);

  const doorItems = useMemo(() => {
    const result = (energyItemsMap.get(deviceData?.productId) || RectEnergy)?.door;
    return getItemsByConfig(result ? [result] : [], bmsRealTimeData, onMoreClick);
  }, [bmsRealTimeData, deviceData, onMoreClick]);

  const emsItems = useMemo(() => {
    const result = (energyItemsMap.get(deviceData?.productId) || RectEnergy)?.ems;
    return getItemsByConfig(result ? [result] : [], emsRealTimeData, onMoreClick);
  }, [emsRealTimeData, deviceData]);

  const bmsItems = useMemo(() => {
    const result = (energyItemsMap.get(deviceData?.productId) || RectEnergy)?.bms;
    return getItemsByConfig(result ? [result] : [], bmsRealTimeData, onMoreClick);
  }, [bmsRealTimeData, deviceData]);

  const fireFightItems = useMemo(() => {
    const result = (energyItemsMap.get(deviceData?.productId) || RectEnergy)?.fireFight;
    return getItemsByConfig(result ? [result] : [], fireRealTimeData, onMoreClick);
  }, [fireRealTimeData, deviceData]);

  const peakItems = useMemo(() => {
    const result = (energyItemsMap.get(deviceData?.productId) || RectEnergy)?.peak;
    return getItemsByConfig(result ? [result] : [], bmsRealTimeData, onMoreClick);
  }, [bmsRealTimeData, deviceData]);

  const pcsItems = useMemo(() => {
    const result = (energyItemsMap.get(deviceData?.productId) || RectEnergy)?.pcs;
    return getItemsByConfig(
      result ? [result] : [],
      { ...pcsRealTimeData, ...bmsRealTimeData },
      onMoreClick,
    );
  }, [pcsRealTimeData, bmsRealTimeData, deviceData]);

  const dehumidifierItems = useMemo(() => {
    const result = (energyItemsMap.get(deviceData?.productId) || RectEnergy)?.dehumidifier;
    return getItemsByConfig(result ? [result] : [], { ...dehumidifierRealTimeData }, onMoreClick);
  }, [pcsRealTimeData, bmsRealTimeData, deviceData]);

  const packItems = useMemo(() => {
    return Array.from({ length: 10 }).map((_, index) => {
      return (
        <>
          <div
            key={index}
            className={styles.parck}
            style={{ order: index < 5 ? 4 - index : index }}
          >
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
              {formatMessage({ id: 'siteMonitor.communication', defaultMessage: 'Communication' })}
              ：
              <span className="mr24">
                {onlineStatusFormat(deviceData?.status ?? (deviceData?.networkStatus as any))}
              </span>
              {formatMessage({ id: 'common.warning', defaultMessage: '告警' })}：
              <span className={`flex ${styles.alarm}`}>
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
              style={{
                backgroundImage: `url(${
                  liquidProductIds.includes(deviceData?.productId) ? LiquidEnergyImg : EnergyImg
                })`,
                ...(liquidProductIds.includes(deviceData?.productId)
                  ? {
                      backgroundSize: '45%',
                    }
                  : {}),
                transform: `scale(${scaleNum})`,
              }}
            >
              {airItems}
              {doorItems}
              {emsItems}
              {bmsItems}
              {fireFightItems}
              {peakItems}
              {pcsItems}
              {dehumidifierItems}
              {!liquidProductIds.includes(deviceData?.productId) && (
                <div className={styles.parckContain}>{packItems}</div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cabinet;
