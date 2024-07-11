/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-07-09 17:45:23
 * @LastEditTime: 2024-07-10 18:18:23
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\module\BmuTabs\Table\index.tsx
 */

import React, { memo, useCallback, useMemo, useState } from 'react';
import { BmuType, MaxDataType } from '../type';
import Gird from './Gird';
import styles from './index.less';
import { formatMessage, getLocale } from '@/utils';
import Detail from '@/components/Detail';
import { items } from './helper';
import moment from 'moment';

const Table: React.FC<BmuType> = (props) => {
  const { bmuMap, onOpenChart, modelMap } = props;

  const detailItems = useMemo(() => {
    return items.map((item, index) => {
      return {
        ...item,
        unit:
          index > 1 ? modelMap?.['Temperature1']?.specs?.unit : modelMap?.['Voltage1']?.specs?.unit,
      };
    });
  }, [modelMap]);

  const [maxData, setMaxData] = useState<Record<string, any> & MaxDataType>({
    cell: {
      max: {
        bmu: 0,
        index: 0,
        value: Number.MIN_SAFE_INTEGER,
      },
      min: {
        bmu: 0,
        index: 0,
        value: Number.MAX_SAFE_INTEGER,
      },
    },
    temp: {
      max: {
        bmu: 0,
        index: 0,
        value: Number.MIN_SAFE_INTEGER,
      },
      min: {
        bmu: 0,
        index: 0,
        value: Number.MAX_SAFE_INTEGER,
      },
    },
  });

  const onDataChange = useCallback((bmuName?: string, data?: MaxDataType) => {
    setMaxData((prevData) => {
      const bmu = Number(bmuName?.replace?.(/[^0-9]/g, ''));
      if (data?.cell?.max?.index) {
        if (data.cell.max.value >= prevData.cell.max.value) {
          if (
            data.cell.max.value != prevData.cell.max.value ||
            bmu <= (prevData.cell.max?.bmu as any)
          ) {
            prevData.cell.max = { ...data.cell.max, bmu };
            prevData.maxCell = data.cell.max.value;
          }
        }
      }
      if (data?.cell?.min?.index) {
        if (data.cell.min.value <= prevData.cell.min.value) {
          if (
            data.cell.min.value != prevData.cell.min.value ||
            bmu <= (prevData.cell.min?.bmu as any)
          ) {
            prevData.cell.min = { ...data.cell.min, bmu };
            prevData.minCell = data.cell.min.value;
          }
        }
      }
      if (data?.temp?.max?.index) {
        if (data.temp.max.value >= prevData.temp.max.value) {
          if (
            data.temp.max.value != prevData.temp.max.value ||
            bmu <= (prevData.temp.max?.bmu as any)
          ) {
            prevData.temp.max = { ...data.temp.max, bmu };
            prevData.maxTemp = data.temp.max.value;
          }
        }
      }
      if (data?.temp?.min?.index) {
        if (data.temp.min.value <= prevData.temp.min.value) {
          if (
            data.temp.min.value != prevData.temp.min.value ||
            bmu <= (prevData.temp.min?.bmu as any)
          ) {
            prevData.temp.min = { ...data.temp.min, bmu };
            prevData.minTemp = data.temp.min.value;
          }
        }
      }
      return {
        ...prevData,
        time: moment().format(getLocale().dateTimeFormat),
      };
    });
  }, []);

  const girds = useMemo(() => {
    const result: React.ReactNode[] = [];
    bmuMap?.forEach?.((deviceId, bmuName) => {
      result.push(
        <Gird
          bmuName={bmuName}
          deviceId={deviceId}
          modelMap={modelMap}
          onDataChange={onDataChange}
          onOpenChart={onOpenChart}
        />,
      );
    });
    return result;
  }, [bmuMap, modelMap, onDataChange, onOpenChart]);

  return (
    <>
      <div className="flex flex-start">
        <Detail
          items={detailItems}
          data={maxData}
          column={{
            xxl: 4,
            xl: 3,
            lg: 2,
            sm: 1,
            xs: 1,
          }}
          unitInLabel={true}
        />
        <div className={`flex1 tx-center ${styles.time}`}>{maxData?.time}</div>
      </div>
      <div className={`flex flex-center mb12 ${styles.legend}`}>
        <span className={`mr6 ${styles.icon}`} />
        <span>{formatMessage({ id: 'device.1012', defaultMessage: '最高值' })}</span>
        <span className={`ml24 mr6 ${styles.icon} ${styles.iconMin}`} />
        <span>{formatMessage({ id: 'device.1013', defaultMessage: '最低值' })}</span>
      </div>
      {girds}
    </>
  );
};

export default memo(Table);
