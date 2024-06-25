import React from 'react';
import { useAuthority } from '@/hooks';
import { formatMessage } from '@/utils';
import Detail from '@/components/Detail';
import GroupBarChart from './groupBarChart';
import SiteRankTable from './siteRankTable';

const Overview: React.FC = () => {
  const { authorityMap } = useAuthority([
    'oss:dataStatistics:refresh:rect',
    'oss:dataStatistics:refresh:power',
    'oss:dataStatistics:refresh:income',
  ]);
  return (
    <div className="p10">
      <Detail.Label
        title={formatMessage({ id: 'device.1018', defaultMessage: '统计概览' })}
        className="mt16"
      />
      <GroupBarChart />
      <Detail.Label
        title={formatMessage({ id: 'device.1019', defaultMessage: '站点排名' })}
        className="mt16"
      />
      <SiteRankTable />
    </div>
  );
};

export default Overview;
