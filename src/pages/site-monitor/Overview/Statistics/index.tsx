import { DEFAULT_REQUEST_INTERVAL } from '@/utils/request';
import { isNil, merge } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useRequest } from 'umi';
import DescriptionCard from '../components/CardDescription';
import { config } from './config';
import { getElectricityStatistics } from './service';
import { PowerFlowDataType } from '../typing';

type StatisticsType = {
  siteId?: number;
  siteType: string;
  data?: PowerFlowDataType;
};

const FieldMap = ['', 'photovoltaic', 'storedEnergy', 'load', 'load', 'electricSupply'];

const Statistics: React.FC<StatisticsType> = (props) => {
  const { siteId, siteType, data: powerFlowData } = props;

  const { data = {}, run } = useRequest(getElectricityStatistics, {
    manual: true,
    pollingInterval: 60 * 1000,
  });
  const siteconfig = config(siteType);
  const span = siteconfig.length ? 24 / siteconfig.length : 6;

  const mergedData = useMemo(() => {
    const result = powerFlowData?.list?.reduce?.((res, item) => {
      return {
        ...res,
        [FieldMap[item.type || 0]]: { p: item.p },
      };
    }, {});
    return merge({}, data, result);
  }, [data, powerFlowData]);

  useEffect(() => {
    if (!isNil(siteId)) {
      run(siteId);
    }
  }, [run, siteId]);
  return (
    <>
      {siteconfig.map((column) => {
        return (
          <DescriptionCard
            span={span}
            data={mergedData?.[column.field] ?? {}}
            key={column.title}
            config={column}
          />
        );
      })}
    </>
  );
};

export default Statistics;
