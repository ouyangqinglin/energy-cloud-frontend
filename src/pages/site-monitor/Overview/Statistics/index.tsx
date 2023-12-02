import { DEFAULT_REQUEST_INTERVAL } from '@/utils/request';
import { isNil } from 'lodash';
import { useEffect } from 'react';
import { useRequest } from 'umi';
import DescriptionCard from '../components/CardDescription';
import { config } from './config';
import { getElectricityStatistics } from './service';

const Statistics = ({ siteId }: { siteId?: number }) => {
  const { data = {}, run } = useRequest(getElectricityStatistics, {
    manual: true,
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });

  useEffect(() => {
    if (!isNil(siteId)) {
      run(siteId);
    }
  }, [run, siteId]);

  return (
    <>
      {config.map((column) => {
        return (
          <DescriptionCard data={data?.[column.field] ?? {}} key={column.title} config={column} />
        );
      })}
    </>
  );
};

export default Statistics;
