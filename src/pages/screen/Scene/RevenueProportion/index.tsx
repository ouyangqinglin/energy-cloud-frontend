/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-10 14:53:34
 * @LastEditTime: 2023-07-13 22:40:34
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\Scene\RevenueProportion\index.tsx
 */
import React, { useEffect, useState, useMemo } from 'react';
import { useRequest } from 'umi';
import type { TimeType } from '../../components/TimeButtonGroup';
import { getData } from './service';
import { getSiteId } from '../helper';
import { pieConfig } from './config';
import { formatMessage } from '@/utils';
import type { UnitType } from '@/models/siteType';
import Chart from '@/components/Chart/index';
import styles from './index.less';

type RevenueProportionProps = {
  timeType: TimeType;
  siteTypeConfig: UnitType;
};

type DataType = {
  name: string;
  text: string;
  value: number;
};

const unit =
  formatMessage({ id: 'dataManage.income', defaultMessage: '收益' }) +
  formatMessage({ id: 'device.unitRevenue', defaultMessage: '(元)' });

const RevenueProportion: React.FC<RevenueProportionProps> = (props) => {
  const { timeType, siteTypeConfig } = props;
  const [option, setOption] = useState(pieConfig());
  const siteId = getSiteId();
  const { data: revenueData, run } = useRequest(getData, {
    manual: true,
    pollingInterval: 5 * 60 * 1000,
  });

  const typeMap = useMemo(() => {
    const map = [] as any;
    if (siteTypeConfig.hasPv || siteTypeConfig.hasFan || true) {
      map.push([
        formatMessage({ id: 'device.green', defaultMessage: '绿电' }),
        ['photovoltaicGains', 'photovoltaicProportion'],
      ]);
    }
    if (siteTypeConfig.hasEnergy || true) {
      map.push([
        formatMessage({ id: 'device.storage', defaultMessage: '储能' }),
        ['essGains', 'essProportion'],
      ]);
    }
    if (siteTypeConfig.hasCharge || true) {
      map.push([
        formatMessage({ id: 'device.chargingPile', defaultMessage: '充电桩' }),
        ['chargingPileGains', 'chargingPileProportion'],
      ]);
    }
    return new Map(map);
  }, [siteTypeConfig]);

  useEffect(() => {
    const typeData: DataType[] = [];
    typeMap.forEach((item: any, key) => {
      let valueNum = (revenueData?.[item[0]] || 0) * 1;
      valueNum = (valueNum + '').length > 7 ? Math.floor(valueNum) : valueNum;
      let percentNum = (revenueData?.[item[1]] || 0) * 1;
      percentNum = (percentNum + '').length > 7 ? Math.floor(percentNum) : percentNum;
      typeData.push({
        name: key + unit,
        text: `${key} ${percentNum}% `,
        value: valueNum || 0,
      });
    });
    const totalNum = (revenueData?.totalGains || 0) * 1;
    setOption(pieConfig(typeData as any, totalNum));
  }, [revenueData, typeMap]);

  useEffect(() => {
    run({ siteId, type: timeType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeType, siteId]);

  return (
    <div className={styles.pieContain}>
      <Chart height={270} option={option} calculateMax={false} />
    </div>
  );
};

export default RevenueProportion;
