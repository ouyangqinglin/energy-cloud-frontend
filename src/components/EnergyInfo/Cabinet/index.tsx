/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-12 13:53:34
 * @LastEditTime: 2024-01-19 10:34:10
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\Cabinet\index.tsx
 */
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useRequest, useHistory } from 'umi';
import { useSize } from 'ahooks';
import { Skeleton, message } from 'antd';
import { useDeviceModel, useSubscribe } from '@/hooks';
import { ComProps } from '../type';
import styles from '../index.less';
import EnergyImg from '@/assets/image/station/energy/enery.png';
import LiquidEnergyImg from '@/assets/image/station/liquid-energy/energy.png';
import PackImg from '@/assets/image/station/energy/pack.png';
import { formatMessage, formatModelValue, getPlaceholder } from '@/utils';
import { DeviceTypeEnum } from '@/utils/dictionary';
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
import { getWholeDeviceTree } from '@/services/equipment';
import { getDataIds, getItemsByConfig, getUnitByProductId } from './helper';

const energyItemsMap = new Map<DeviceTypeEnum | undefined, EnergyComponentType>([
  [DeviceTypeEnum.Energy, RectEnergy],
  [DeviceTypeEnum.BWattEnergy, BwtEnergy],
  [DeviceTypeEnum.YTEnergy, WindEnergy],
  [DeviceTypeEnum.LiquidEnergy, LiquidEnergy],
  [DeviceTypeEnum.Wind2Energy, Wind2Energy],
  [DeviceTypeEnum.Liquid2Energy, Liquid2Energy],
]);

const liquidProductIds: (DeviceTypeEnum | undefined)[] = [
  DeviceTypeEnum.LiquidEnergy,
  DeviceTypeEnum.Liquid2Energy,
];

const newWindAndLiquidEnergy = [DeviceTypeEnum.Wind2Energy, DeviceTypeEnum.Liquid2Energy];

export type CabinetProps = ComProps & {
  showLabel?: boolean;
  source?: EnergySourceEnum;
};

const Cabinet: React.FC<CabinetProps> = (props) => {
  const { deviceData, showLabel, loading, source = EnergySourceEnum.DeviceManage } = props;

  const divRef = useRef(null);
  const bodySize = useSize(divRef);
  const [deviceIds, setDeviceIds] = useState<Record<string, any>>({});
  const airRealTimeData = useSubscribe(deviceIds?.deviceId?.air, true);
  const bmsRealTimeData = useSubscribe(deviceIds?.deviceId?.bms, true);
  const emsRealTimeData = useSubscribe(deviceIds?.deviceId?.ems, true);
  const pcsRealTimeData = useSubscribe(deviceIds?.deviceId?.pcs, true);
  const fireRealTimeData = useSubscribe(deviceIds?.deviceId?.fire, true);
  const dehumidifierRealTimeData = useSubscribe(deviceIds?.deviceId?.dehumidifire, true);
  const { modelMap: airModelMap } = useDeviceModel({
    productId: deviceIds?.productId?.air,
    isGroup: true,
  });
  const { modelMap: bmsModelMap } = useDeviceModel({
    productId: deviceIds?.productId?.bms,
    isGroup: true,
  });
  const { modelMap: emsModelMap } = useDeviceModel({
    productId: deviceIds?.productId?.ems,
    isGroup: true,
  });
  const { modelMap: pcsModelMap } = useDeviceModel({
    productId: deviceIds?.productId?.pcs,
    isGroup: true,
  });
  const { modelMap: fireModelMap } = useDeviceModel({
    productId: deviceIds?.productId?.fire,
    isGroup: true,
  });
  const { modelMap: dehumidifireModelMap } = useDeviceModel({
    productId: deviceIds?.productId?.dehumidifire,
    isGroup: true,
  });
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
      if (deviceData?.deviceId && energyData) {
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
    [energyData, history, deviceData],
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
    } else {
      setDeviceIds({
        productId: {
          air: '',
          bms: '',
          ems: '',
          pcs: '',
          fire: '',
          dehumidifire: '',
        },
        deviceId: {
          air: [],
          bms: [],
          ems: [],
          pcs: [],
          fire: [],
          dehumidifire: [],
        },
      });
    }
  }, [deviceData?.deviceId]);

  const airItems = useMemo(() => {
    const result = (energyItemsMap.get(deviceData?.productId) || RectEnergy)?.air;
    if (deviceData?.productId && newWindAndLiquidEnergy.includes(deviceData?.productId)) {
      result?.data?.forEach?.((item) => {
        item.format = (value) => formatModelValue(value, airModelMap?.[item?.field || '']);
      });
    }
    return getItemsByConfig(result ? [result] : [], airRealTimeData, onMoreClick);
  }, [airRealTimeData, deviceData, onMoreClick, airModelMap]);

  const doorItems = useMemo(() => {
    const result = (energyItemsMap.get(deviceData?.productId) || RectEnergy)?.door;
    if (deviceData?.productId && newWindAndLiquidEnergy.includes(deviceData?.productId)) {
      result?.data?.forEach?.((item) => {
        item.format = (value) => formatModelValue(value, bmsModelMap?.[item?.field || '']);
      });
    }
    return getItemsByConfig(result ? [result] : [], bmsRealTimeData, onMoreClick);
  }, [bmsRealTimeData, deviceData, onMoreClick, bmsModelMap]);

  const emsItems = useMemo(() => {
    const result = (energyItemsMap.get(deviceData?.productId) || RectEnergy)?.ems;
    if (deviceData?.productId && newWindAndLiquidEnergy.includes(deviceData?.productId)) {
      result?.data?.forEach?.((item) => {
        item.format = (value) => formatModelValue(value, emsModelMap?.[item?.field || '']);
      });
    }
    return getItemsByConfig(result ? [result] : [], emsRealTimeData, onMoreClick);
  }, [emsRealTimeData, deviceData, emsModelMap, onMoreClick]);

  const bmsItems = useMemo(() => {
    const result = (energyItemsMap.get(deviceData?.productId) || RectEnergy)?.bms;
    if (deviceData?.productId && newWindAndLiquidEnergy.includes(deviceData?.productId)) {
      result?.data?.forEach?.((item) => {
        item.format = (value) =>
          formatModelValue(value, { ...bmsModelMap, ...emsModelMap }?.[item?.field || '']);
      });
    }
    return getItemsByConfig(
      result ? [result] : [],
      { ...emsRealTimeData, ...bmsRealTimeData },
      onMoreClick,
    );
  }, [bmsRealTimeData, emsRealTimeData, deviceData, emsModelMap, bmsModelMap, onMoreClick]);

  const fireFightItems = useMemo(() => {
    const result = (energyItemsMap.get(deviceData?.productId) || RectEnergy)?.fireFight;
    if (deviceData?.productId && newWindAndLiquidEnergy.includes(deviceData?.productId)) {
      result?.data?.forEach?.((item) => {
        item.format = (value) => formatModelValue(value, fireModelMap?.[item?.field || '']);
      });
    }
    return getItemsByConfig(result ? [result] : [], fireRealTimeData, onMoreClick);
  }, [fireRealTimeData, deviceData, fireModelMap, onMoreClick]);

  const peakItems = useMemo(() => {
    const result = (energyItemsMap.get(deviceData?.productId) || RectEnergy)?.peak;
    if (deviceData?.productId && newWindAndLiquidEnergy.includes(deviceData?.productId)) {
      result?.data?.forEach?.((item) => {
        item.format =
          item.customFormat ||
          ((value) => formatModelValue(value, bmsModelMap?.[item?.field || '']));
      });
    }
    return getItemsByConfig(result ? [result] : [], bmsRealTimeData, onMoreClick);
  }, [bmsRealTimeData, deviceData, bmsModelMap, onMoreClick]);

  const pcsItems = useMemo(() => {
    const result = (energyItemsMap.get(deviceData?.productId) || RectEnergy)?.pcs;
    if (deviceData?.productId && newWindAndLiquidEnergy.includes(deviceData?.productId)) {
      result?.data?.forEach?.((item) => {
        item.format = (value) =>
          formatModelValue(value, { ...emsModelMap, ...pcsModelMap }?.[item?.field || '']);
      });
    }
    return getItemsByConfig(
      result ? [result] : [],
      { ...pcsRealTimeData, ...bmsRealTimeData, ...emsRealTimeData },
      onMoreClick,
    );
  }, [
    pcsRealTimeData,
    bmsRealTimeData,
    emsRealTimeData,
    deviceData,
    pcsModelMap,
    emsModelMap,
    onMoreClick,
  ]);

  const dehumidifierItems = useMemo(() => {
    const result = (energyItemsMap.get(deviceData?.productId) || RectEnergy)?.dehumidifier;
    if (deviceData?.productId && newWindAndLiquidEnergy.includes(deviceData?.productId)) {
      result?.data?.forEach?.((item) => {
        item.format = (value) =>
          formatModelValue(value, { ...bmsModelMap, ...dehumidifireModelMap }?.[item?.field || '']);
      });
    }
    return getItemsByConfig(result ? [result] : [], { ...dehumidifierRealTimeData }, onMoreClick);
  }, [
    dehumidifierRealTimeData,
    bmsRealTimeData,
    deviceData,
    dehumidifireModelMap,
    bmsModelMap,
    onMoreClick,
  ]);

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
            <Detail.Label
              showLine={false}
              title={deviceData?.deviceId ? energyData?.name : getPlaceholder('')}
              labelClassName={styles.label}
            >
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
