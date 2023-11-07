/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-31 14:06:20
 * @LastEditTime: 2023-09-21 16:48:34
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SiteRange\Income\index.tsx
 */
import React, { useMemo } from 'react';
import { useRequest } from 'umi';
import Title from '../../../components/LayoutCell/title';
import Chart from '@/components/Chart';
import { defaultPolarBar } from '@/components/Chart/config';
import { merge } from 'lodash';
import { SiteDataType, getIncomeData } from '../service';
import { REQUEST_INTERVAL_5_MINUTE } from '../../config';
import { Col, Row } from 'antd';
import { formatNum } from '@/utils';
import styles from './index.less';

const colors = ['#FF8144', '#FF7B7B', '#FFD15C', '#01CFA1', '#159AFF'];

const getOptionsByData = (data: SiteDataType[], totalNum?: number) => {
  const result = merge({}, defaultPolarBar);
  result.tooltip.formatter = '{b}<br/>{c}';
  result.angleAxis.max = ((data?.[0]?.income || 4) * 4) / 3;
  const value = formatNum(totalNum || 0);
  result.title[0].text = `总收益(${value.unit}元)`;
  result.title[1].text = value.value;
  data?.reverse()?.forEach?.((item, index) => {
    result.radiusAxis.data.push(item.name);
    result.series.data.push({
      value: item.income || 0,
      itemStyle: {
        color: colors[index],
      },
    });
  });
  return result;
};

const Income: React.FC = () => {
  const { data: chargeData } = useRequest(getIncomeData, {
    pollingInterval: REQUEST_INTERVAL_5_MINUTE,
  });

  const chargeOptions = useMemo(() => {
    return getOptionsByData(
      (chargeData?.sitesRankingIncomeList || []).slice(0, 5),
      chargeData?.totalIncome,
    );
  }, [chargeData]);

  const legend = useMemo(() => {
    const legendColors = [...colors].reverse();
    legendColors.push('#00C9EC');
    return chargeData?.sitesRankingIncomeList?.map?.((item, index) => {
      return (
        <div className={styles.bar} title={item.name}>
          <span className={styles.title}>
            <span style={{ backgroundColor: legendColors[index] }} />
            {item.name}
          </span>
          {item.income || 0}
        </div>
      );
    });
  }, [chargeData]);

  return (
    <>
      <Title className="mt6 mb8" title="站点收益" unit="单位(元)" />
      <Row className="" gutter={32}>
        <Col span={12} className="flex flex-center">
          <Chart
            option={chargeOptions}
            style={{ width: '100%', height: 156 }}
            calculateMax={false}
          />
        </Col>
        <Col span={12}>
          <div className={styles.legend}>{legend}</div>
        </Col>
      </Row>
    </>
  );
};

export default Income;
