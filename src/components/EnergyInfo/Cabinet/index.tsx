/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-12 13:53:34
 * @LastEditTime: 2023-08-08 09:37:16
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
import { DeviceTypeEnum } from '@/utils/dictionary';
import { deviceAlarmStatusFormat, onlineStatusFormat } from '@/utils/format';
import Detail from '@/components/Detail';
import { unitItems } from './config';
import { EnergySourceEnum } from '../';

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

export type CabinetProps = ComProps & {
  showLabel?: boolean;
  source?: EnergySourceEnum;
};

const Cabinet: React.FC<CabinetProps> = (props) => {
  const { deviceData, showLabel, loading, source = EnergySourceEnum.DeviceManage } = props;

  const divRef = useRef(null);
  const bodySize = useSize(divRef);
  const [deviceIds, setDeviceIds] = useState<string[]>([]);
  const realTimeData = useSubscribe(deviceIds, true);
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
        const unit = item.productId ? getUnitByProductId([energyData], item.productId) : energyData;
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
        setDeviceIds(getDataIds([data]));
      });
    }
  }, [deviceData?.deviceId]);

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
                      {!isEmpty(realTimeData?.[field.field])
                        ? field.format
                          ? field.format(realTimeData?.[field.field], realTimeData)
                          : realTimeData?.[field.field]
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
  }, [realTimeData]);

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
              <span className="mr24">{onlineStatusFormat(deviceData?.status as any)}</span>
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
              {items}
              <div className={styles.parckContain}>{packItems}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cabinet;
