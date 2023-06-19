/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-10 14:53:34
 * @LastEditTime: 2023-06-13 16:50:43
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

const typeMap = new Map([
  ['光伏', ['photovoltaicGains', 'photovoltaicProportion']],
  ['储能', ['essGains', 'essProportion']],
  ['充电桩', ['chargingPileGains', 'chargingPileProportion']],
]);

const getCustomHtml = (value: number) => {
  return `<div>
        <span style="color:white;font-size:22px">${value}</span>
        <div style="font-size:12px;color:#ACCCEC;">总收益(元)</div>
    </div>`;
};

const RevenueProportion: React.FC<RevenueProportionProps> = (props) => {
  const { timeType } = props;
  const G = G2.getEngine('canvas');
  const [myConfig, setMyConfig] = useState(pieConfig);
  const [pieData, setPieData] = useState<PieDataType>({ data: [], totalGains: 0 });
  const siteId = getSiteId();
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
    group.addShape({
      type: 'text',
      attrs: {
        x: 0,
        y: 8,
        text: data.value,
        fill: mappingData.color,
        fontSize: 20,
      },
    });
    group.addShape({
      type: 'text',
      attrs: {
        x: 0,
        y: 25,
        text: data.type + '收益(元)',
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
    setPieData({
      totalGains: (totalNum + '').length > 7 ? Math.floor(totalNum) : totalNum,
      data: typeData,
    });
  }, [revenueData]);

  useEffect(() => {
    run({ siteId, type: timeType });
  }, [timeType, siteId]);

  return (
    <Pie className={styles.pieContain} height={270} data={pieData.data} {...(myConfig as any)} />
  );
};

export default RevenueProportion;
