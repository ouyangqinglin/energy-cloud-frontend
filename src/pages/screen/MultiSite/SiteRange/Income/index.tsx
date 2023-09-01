/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-31 14:06:20
 * @LastEditTime: 2023-08-31 16:13:29
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

const colors = ['#FF8144', '#FF7B7B', '#FFD15C', '#01CFA1', '#159AFF'];

const getOptionsByData = (data: SiteDataType[]) => {
  const result = merge({}, defaultPolarBar);
  result.angleAxis.max = ((data?.[0]?.income || 4) * 4) / 3;
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
    return getOptionsByData(chargeData?.charge || []);
  }, [chargeData]);

  const energyOptions = useMemo(() => {
    return getOptionsByData(chargeData?.energy || []);
  }, [chargeData]);

  return (
    <>
      <Row className="mt24" gutter={64}>
        <Col span={12}>
          <Title className="mb16" title="充电桩收益" unit="单位(元)" />
          <Chart option={chargeOptions} style={{ height: 156 }} calculateMax={false} />
        </Col>
        <Col span={12}>
          <Title className="mb16" title="储能收益" unit="单位(元)" />
          <Chart option={energyOptions} style={{ height: 156 }} calculateMax={false} />
        </Col>
      </Row>
    </>
  );
};

export default Income;
