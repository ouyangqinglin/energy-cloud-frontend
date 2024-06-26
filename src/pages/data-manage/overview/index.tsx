import React, { useState } from 'react';
import { formatMessage, getLocale } from '@/utils';
import Detail from '@/components/Detail';
import GroupBarChart from './groupBarChart';
import SiteRankTable from './siteRankTable';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import moment from 'moment';

const startTime = moment().subtract(1, 'week');
const endTime = moment();
const format = getLocale().dateFormat;

const Overview: React.FC = () => {
  const [date, setDate] = useState<string[]>([startTime.format(format), endTime.format(format)]);
  const onChange = (info: any, infoString: string[]) => {
    setDate(infoString);
  };
  return (
    <div className="p24">
      <Detail.Label
        title={formatMessage({ id: 'device.1018', defaultMessage: '统计概览' })}
        className="mt16"
      >
        <RangePicker onChange={onChange} format={format} defaultValue={[startTime, endTime]} />
      </Detail.Label>
      <GroupBarChart date={date} />
      <Detail.Label
        title={formatMessage({ id: 'device.1019', defaultMessage: '站点排名' })}
        className="mt16"
      />
      <SiteRankTable />
    </div>
  );
};

export default Overview;
