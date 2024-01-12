import { DEFAULT_REQUEST_INTERVAL } from '@/utils/request';
import { isNil } from 'lodash';
import { useEffect } from 'react';
import { useRequest } from 'umi';
import DescriptionCard from '../components/CardDescription';
import { config } from './config';
import { getElectricityStatistics } from './service';

const Statistics = ({ siteId, siteType }: { siteId?: number; siteType: string }) => {
  const { data = {}, run } = useRequest(getElectricityStatistics, {
    manual: true,
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });
  const siteconfig = config(siteType);
  const span = siteconfig.length ? 24 / siteconfig.length : 6;
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
            data={data?.[column.field] ?? {}}
            key={column.title}
            config={column}
          />
        );
      })}
    </>
  );
};

export default Statistics;
