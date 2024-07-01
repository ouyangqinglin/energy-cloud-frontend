import React, { useState } from 'react';
import { formatMessage, getLocale } from '@/utils';
import Detail from '@/components/Detail';
import GroupBarChart from './groupBarChart';
import SiteRankTable from './siteRankTable';
import { DatePicker, Button, Space } from 'antd';
import moment from 'moment';

const startTime = moment().subtract(1, 'week');
const endTime = moment();
const format = getLocale().dateFormat;

const Overview: React.FC = () => {
  let dataString: string[] = [];
  const [date, setDate] = useState<string[]>([startTime.format(format), endTime.format(format)]);
  const onChange = (info: any, infoString: string[]) => {
    dataString = infoString;
  };
  return (
    <>
      <div className="px24 pt24">
        <Detail.Label title={formatMessage({ id: 'device.1018', defaultMessage: '统计概览' })}>
          <Space>
            <DatePicker.RangePicker
              onChange={onChange}
              format={format}
              defaultValue={[startTime, endTime]}
            />
            <Button type="primary" onClick={() => setDate(dataString)}>
              {formatMessage({ id: 'common.search', defaultMessage: '搜索' })}
            </Button>
          </Space>
        </Detail.Label>
        <GroupBarChart date={date} />
        <Detail.Label
          title={formatMessage({ id: 'device.1019', defaultMessage: '站点排名' })}
          className="mt16"
          dividerProps={{
            className: 'mb0',
          }}
        />
      </div>
      <SiteRankTable />
    </>
  );
};

export default Overview;
