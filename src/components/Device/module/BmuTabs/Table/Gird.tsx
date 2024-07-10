/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-07-10 11:14:21
 * @LastEditTime: 2024-07-10 15:40:29
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\module\BmuTabs\Table\Gird.tsx
 */

import React, { memo, useContext, useMemo } from 'react';
import styles from './index.less';
import { bumConfigMap, cellText, defaultLables, getFieldByLabel, tempText } from '../helper';
import DeviceContext from '@/components/Device/Context/DeviceContext';
import { useSubscribe } from '@/hooks';
import { DeviceModelType } from '@/types/device';
import { MaxDataType } from '../type';

type GridType = {
  bmuName?: string;
  deviceId?: string;
  modelMap?: Record<string, DeviceModelType>;
  onDataChange?: (bmuName?: string, data?: MaxDataType) => void;
};

const Grid: React.FC<GridType> = (props) => {
  const { bmuName, deviceId, modelMap, onDataChange } = props;

  const { data: deviceData } = useContext(DeviceContext);

  const realTimeData = useSubscribe(deviceId, true);

  const maxData = useMemo(() => {
    const result = {
      cell: {
        max: {
          index: 0,
          value: Number.MIN_SAFE_INTEGER,
        },
        min: {
          index: 0,
          value: Number.MAX_SAFE_INTEGER,
        },
      },
      temp: {
        max: {
          index: 0,
          value: Number.MIN_SAFE_INTEGER,
        },
        min: {
          index: 0,
          value: Number.MAX_SAFE_INTEGER,
        },
      },
    };
    const labels = bumConfigMap.get(deviceData?.productId)?.labels || defaultLables;
    labels.toReversed().forEach((item) => {
      const isCell = item.indexOf(cellText) > -1;
      const num = isCell ? item.replace(cellText, '') : item.replace(tempText, '');
      const field = getFieldByLabel(item);
      if (isCell) {
        if (realTimeData[field] >= result.cell.max.value) {
          result.cell.max.index = Number(num);
          result.cell.max.value = realTimeData[field];
        }
        if (realTimeData[field] <= result.cell.min.value) {
          result.cell.min.index = Number(num);
          result.cell.min.value = realTimeData[field];
        }
      } else {
        if (realTimeData[field] >= result.temp.max.value) {
          result.temp.max.index = Number(num);
          result.temp.max.value = realTimeData[field];
        }
        if (realTimeData[field] <= result.temp.min.value) {
          result.temp.min.index = Number(num);
          result.temp.min.value = realTimeData[field];
        }
      }
    });
    onDataChange?.(bmuName, result);
    return result;
  }, [realTimeData, deviceData]);

  const items = useMemo(() => {
    const labels = bumConfigMap.get(deviceData?.productId)?.labels || defaultLables;
    return labels.map((item) => {
      const isCell = item.indexOf(cellText) > -1;
      const num = Number(isCell ? item.replace(cellText, '') : item.replace(tempText, ''));
      const field = getFieldByLabel(item);
      let className = '';
      if (isCell) {
        if (maxData.cell.min.index == num) {
          className = styles.min;
        }
        if (maxData.cell.max.index == num) {
          className = styles.max;
        }
      } else {
        if (maxData.temp.min.index == num) {
          className = styles.min;
        }
        if (maxData.temp.max.index == num) {
          className = styles.max;
        }
      }
      return (
        <div className={`${styles.box} ${isCell ? '' : styles.temp} ${className}`}>
          <div className={styles.dot}>{num}</div>
          <div>{realTimeData[field]}</div>
          <span>{modelMap?.[field]?.specs?.unit}</span>
        </div>
      );
    });
  }, [realTimeData, deviceData, modelMap, maxData]);

  return (
    <>
      <div className={`${styles.card} flex`}>
        <span className={styles.title}>{bmuName}</span>
        <div className="flex1">{items}</div>
      </div>
    </>
  );
};

export default memo(Grid);
