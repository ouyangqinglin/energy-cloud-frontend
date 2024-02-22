/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-10 14:53:34
 * @LastEditTime: 2023-07-13 22:40:34
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\Scene\RevenueProportion\index.tsx
 */
import React, { useEffect, useState, useCallback } from 'react';
import { useRequest } from 'umi';
import type { TimeType } from '../../components/TimeButtonGroup';
import { Pie, G2 } from '@ant-design/plots';
import { getData } from './service';
import { getSiteId } from '../helper';
import { pieConfig } from './config';
import styles from './index.less';
import { useToolTip } from '@/hooks';
import { ChartTypeEnum } from '@/hooks/useTooltip';
import { formatMessage } from '@/utils';

type RevenueProportionProps = {
  timeType: TimeType;
};

type DataType = {
  type: string;
  value: number;
  percent: number;
};

type PieDataType = {
  data: DataType[];
  totalGains: number;
};
const unit =
  formatMessage({ id: 'dataManage.income', defaultMessage: '收益' }) +
  formatMessage({ id: 'device.unitRevenue', defaultMessage: '(元)' });
const typeMap = new Map([
  [
    formatMessage({ id: 'device.pv', defaultMessage: '光伏' }) + unit,
    ['photovoltaicGains', 'photovoltaicProportion'],
  ],
  [
    formatMessage({ id: 'device.storage', defaultMessage: '储能' }) + unit,
    ['essGains', 'essProportion'],
  ],
  [
    formatMessage({ id: 'device.chargingPile', defaultMessage: '充电桩' }) + unit,
    ['chargingPileGains', 'chargingPileProportion'],
  ],
]);

const getCustomHtml = (value: number) => {
  return `<div>
        <span style="color:white;font-size:20px;font-weight: 300">${value}</span>
        <div style="font-size:12px;color:#ACCCEC;font-weight: 300">${formatMessage({
          id: 'device.totalRevenue',
          defaultMessage: '总收益',
        })}${formatMessage({ id: 'device.unitRevenue', defaultMessage: '(元)' })}</div>
    </div>`;
};

const RevenueProportion: React.FC<RevenueProportionProps> = (props) => {
  const { timeType } = props;
  const G = G2.getEngine('canvas');
  const [myConfig, setMyConfig] = useState(pieConfig);
  const [pieData, setPieData] = useState<PieDataType>({ data: [], totalGains: 0 });
  const siteId = getSiteId();
  const [chartRef] = useToolTip({ type: ChartTypeEnum.Pie });
  const { data: revenueData, run } = useRequest(getData, {
    manual: true,
    pollingInterval: 5 * 60 * 1000,
  });

  const legendFormat = useCallback(
    (type) => {
      const data = pieData.data.find((item) => item.type === type);
      return data?.percent + '%';
    },
    [pieData],
  );

  const labelFormat = useCallback((data, mappingData) => {
    const group = new G.Group({});
    const lable = data.type.length > 12 ? data.type.substring(0, 12) + '...' : data.type;
    group.addShape({
      type: 'text',
      attrs: {
        x: 20,
        y: 8,
        text: data.value,
        fill: mappingData.color,
        fontSize: 20,
      },
    });
    group.addShape({
      type: 'text',
      attrs: {
        x: 20,
        y: 25,
        text: lable,
        fill: '#ACCCEC',
        fontWeight: 400,
        fontSize: 12,
      },
    });
    return group;
  }, []);

  useEffect(() => {
    setMyConfig((prevData) => {
      prevData.legend.itemValue.formatter = legendFormat;
      prevData.label.formatter = labelFormat;
      prevData.statistic.content.customHtml = getCustomHtml(pieData?.totalGains);
      return { ...prevData };
    });
  }, [pieData]);

  useEffect(() => {
    const typeData: DataType[] = [];
    typeMap.forEach((item, key) => {
      const valueNum = (revenueData?.[item[0]] || 0) * 1;
      const percentNum = (revenueData?.[item[1]] || 0) * 1;
      typeData.push({
        type: key,
        value: (valueNum + '').length > 7 ? Math.floor(valueNum) : valueNum,
        percent: (percentNum + '').length > 7 ? Math.floor(percentNum) : percentNum,
      });
    });
    const totalNum = (revenueData?.totalGains || 0) * 1;
    console.log('typeData>>', typeData);
    setPieData({
      totalGains: (totalNum + '').length > 7 ? Math.floor(totalNum) : totalNum,
      data: typeData,
    });
  }, [revenueData]);

  useEffect(() => {
    run({ siteId, type: timeType });
  }, [timeType, siteId]);

  return (
    <Pie
      ref={chartRef}
      className={styles.pieContain}
      height={270}
      data={pieData.data}
      {...(myConfig as any)}
    />
  );
};

export default RevenueProportion;
