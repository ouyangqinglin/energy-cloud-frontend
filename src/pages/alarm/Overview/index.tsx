import React from 'react';
import { formatMessage } from '@/utils';
import Detail from '@/components/Detail';
import SingleSite from './SingleSite';
import Multistite from './Multistite';

const Overview: React.FC = () => {
  return (
    <>
      <div className="px24 pt24">
        <Detail.Label
          title={formatMessage({ id: 'alarmManage.1002', defaultMessage: '单站点统计' })}
        />
        <SingleSite />
        <Detail.Label
          title={formatMessage({ id: 'alarmManage.1003', defaultMessage: '多站点统计' })}
          className="mt24"
        />
        <Multistite />
      </div>
    </>
  );
};

export default Overview;
