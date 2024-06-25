import type { Moment } from 'moment';
import React, { useMemo } from 'react';
import { useRequest } from 'umi';
import { getData, getDeviceData, getAlarmData } from './service';
import { Row, Col } from 'antd';

type GroupBarChartProps = {
  date: Moment;
};

const GroupBarChart: React.FC<GroupBarChartProps> = (props) => {
  const { date } = props;
  const { data, run } = useRequest(getData, {
    manual: true,
  });
  // const { data: deviceData, run:deviceDataRun } = useRequest(getDeviceData, {
  //   manual: true,
  // });
  // const { data: alarmData, run:deviceDataRun } = useRequest(getAlarmData, {
  //   manual: true,
  // });

  // useEffect(() => {
  //   if (siteId) {
  //     run({
  //       date: date ? date.format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
  //     });
  //   }
  // }, [siteId, date, run, timeType]);

  const item = useMemo(() => {
    return date;
  }, [date]);
  return (
    <>
      <Row>
        <Col>{item}</Col>
      </Row>
    </>
  );
};

export default GroupBarChart;
