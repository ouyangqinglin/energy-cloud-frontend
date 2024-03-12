/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-01-29 10:00:23
 * @LastEditTime: 2024-03-08 10:45:54
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\Cabinet\Model\index.tsx
 */

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useRequest, useHistory } from 'umi';
import { useSize } from 'ahooks';
import { Skeleton } from 'antd';
import { ComProps } from '../../type';
import styles from '../../index.less';
import { formatMessage, getPlaceholder } from '@/utils';
import { deviceAlarmStatusFormat, onlineStatusFormat } from '@/utils/format';
import Detail from '@/components/Detail';
import { ConfigType } from '../type';
import { EnergySourceEnum } from '../../';
import { getWholeDeviceTree } from '@/services/equipment';
import { getProductTypeIdMap } from '../helper';
import { ProductIdMapType } from '../type';
import Part from './Part';

type CabinetProps = ComProps & {
  showLabel?: boolean;
  source?: EnergySourceEnum;
  configs?: ConfigType[];
  modelStyle?: React.CSSProperties;
};

const Model: React.FC<CabinetProps> = (props) => {
  const {
    deviceData,
    showLabel,
    loading,
    source = EnergySourceEnum.DeviceManage,
    children,
    configs,
    modelStyle,
  } = props;

  const divRef = useRef(null);
  const bodySize = useSize(divRef);
  const history = useHistory();
  const [productIdMap, setProductIdMap] = useState<ProductIdMapType>();
  const {
    loading: loadingEnergy,
    data: energyData,
    run,
  } = useRequest(getWholeDeviceTree, {
    manual: true,
  });

  const scaleNum = useMemo(() => {
    const scaleWidth = (bodySize?.width || 964.83) / 964.83;
    const scaleHeight = (bodySize?.height || 300) / 300;
    return Math.min(scaleWidth, scaleHeight);
  }, [bodySize]);

  const onAlarmClick = useCallback(() => {
    history.push({
      pathname: '/alarm/current',
      search: `?siteId=${deviceData?.siteId}&deviceName=${energyData?.name}`,
    });
  }, [deviceData?.siteId, energyData]);

  const partItems = useMemo(() => {
    return configs?.map?.((config) => {
      return (
        <Part
          config={config}
          deviceId={
            productIdMap?.[(config.productTypeId || '') + (config?.fixValue || '')]?.deviceId
          }
          productId={
            productIdMap?.[(config.productTypeId || '') + (config?.fixValue || '')]?.productId
          }
          productIdMap={productIdMap}
          source={source}
        />
      );
    });
  }, [configs, productIdMap, source]);

  useEffect(() => {
    if (deviceData?.deviceId) {
      run({ deviceId: deviceData?.deviceId }).then((data) => {
        setProductIdMap(getProductTypeIdMap(data ? [data] : []));
      });
    } else {
      setProductIdMap({});
    }
  }, [deviceData?.deviceId]);

  return (
    <>
      {showLabel && (
        <Detail.Label
          showLine={false}
          title={deviceData?.deviceId ? energyData?.name : getPlaceholder('')}
          labelClassName={styles.label}
        >
          {formatMessage({ id: 'siteMonitor.communication', defaultMessage: '通信' })}：
          <span className="mr24">
            {onlineStatusFormat(deviceData?.status ?? (deviceData?.networkStatus as any))}
          </span>
          {formatMessage({ id: 'common.warning', defaultMessage: '告警' })}：
          <span className={`flex ${styles.alarm}`}>
            {deviceAlarmStatusFormat((deviceData?.alarmStatus ?? '') as string)}
            <span className="cursor ml8" onClick={onAlarmClick}>
              {!!deviceData?.alarmCount && deviceData?.alarmCount}
            </span>
          </span>
        </Detail.Label>
      )}
      <div ref={divRef} className="tx-center">
        <div
          className={styles.energy}
          style={{
            ...modelStyle,
            transform: `scale(${scaleNum})`,
          }}
        >
          {children}
          {partItems}
        </div>
      </div>
    </>
  );
};

export default Model;
