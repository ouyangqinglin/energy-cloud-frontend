/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-12 13:53:34
 * @LastEditTime: 2023-12-20 17:38:53
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
  ConfigType,
  airItem,
  bmsConfig,
  bwattAirItem,
  doorConfigs,
  emsItem,
  fireFightConfig,
  liquidAirItem,
  liquidBmsConfig,
  liquidDoorConfigs,
  liquidEmsItem,
  liquidFireFightConfig,
  liquidPcsConfig,
  liquidPeakConfig,
  pcsConfig,
  peakConfig,
  ytEmsItem,
} from './config';
import { EnergySourceEnum } from '../';
import { DeviceDataType, getWholeDeviceTree } from '@/services/equipment';

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
): DeviceDataType | undefined => {
  let result: DeviceDataType | undefined;
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
            <span className={`cursor ${styles.field}`} onClick={() => onMoreClick(item)}>
              {formatMessage({ id: 'common.more', defaultMessage: '了解更多' })}
              {'>'}
            </span>
          )}
        </div>
      </>
    );
  });
};

const liquidProductIds: (DeviceTypeEnum | undefined)[] = [DeviceTypeEnum.LiquidEnergy];

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
            search: `?id=${unit?.id}&productId=${unit?.productId}`,
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
    return getItemsByConfig(
      liquidProductIds.includes(deviceData?.productId)
        ? [liquidAirItem]
        : [
            (deviceData?.productId as DeviceTypeEnum) == DeviceTypeEnum.BWattAir ||
            (deviceData?.productId as DeviceTypeEnum) == DeviceTypeEnum.YTEnergy
              ? bwattAirItem
              : airItem,
          ],
      airRealTimeData,
      onMoreClick,
    );
  }, [airRealTimeData, deviceData, onMoreClick]);

  const doorItems = useMemo(() => {
    return getItemsByConfig(
      liquidProductIds.includes(deviceData?.productId) ? liquidDoorConfigs : doorConfigs,
      bmsRealTimeData,
      onMoreClick,
    );
  }, [bmsRealTimeData, deviceData, onMoreClick]);

  const emsItems = useMemo(() => {
    return getItemsByConfig(
      liquidProductIds.includes(deviceData?.productId)
        ? [liquidEmsItem]
        : [
            (deviceData?.productId as DeviceTypeEnum) == DeviceTypeEnum.YTEnergy
              ? ytEmsItem
              : emsItem,
          ],
      emsRealTimeData,
      onMoreClick,
    );
  }, [emsRealTimeData, deviceData]);

  const bmsItems = useMemo(() => {
    return getItemsByConfig(
      liquidProductIds.includes(deviceData?.productId) ? liquidBmsConfig : bmsConfig,
      bmsRealTimeData,
      onMoreClick,
    );
  }, [bmsRealTimeData, deviceData]);

  const fireItems = useMemo(() => {
    return getItemsByConfig(
      liquidProductIds.includes(deviceData?.productId) ? liquidFireFightConfig : fireFightConfig,
      fireRealTimeData,
      onMoreClick,
    );
  }, [fireRealTimeData, deviceData]);

  const peakItems = useMemo(() => {
    return getItemsByConfig(
      liquidProductIds.includes(deviceData?.productId) ? liquidPeakConfig : peakConfig,
      bmsRealTimeData,
      onMoreClick,
    );
  }, [bmsRealTimeData, deviceData]);

  const pcsItems = useMemo(() => {
    return getItemsByConfig(
      liquidProductIds.includes(deviceData?.productId) ? liquidPcsConfig : pcsConfig,
      { ...pcsRealTimeData, ...bmsRealTimeData },
      onMoreClick,
    );
  }, [pcsRealTimeData, bmsRealTimeData, deviceData]);

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
              {formatMessage({ id: 'siteMonitor.communication', defaultMessage: 'Communication' })}
              ：
              <span className="mr24">
                {onlineStatusFormat(deviceData?.status ?? (deviceData?.networkStatus as any))}
              </span>
              {formatMessage({ id: 'common.warning', defaultMessage: '告警' })}：
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
              style={{
                backgroundImage: `url(${
                  liquidProductIds.includes(deviceData?.productId) ? LiquidEnergyImg : EnergyImg
                })`,
                transform: `scale(${scaleNum})`,
              }}
            >
              {airItems}
              {doorItems}
              {emsItems}
              {bmsItems}
              {(deviceData?.productId as any) == DeviceTypeEnum.YTEnergy ? fireItems : <></>}
              {peakItems}
              {pcsItems}
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
