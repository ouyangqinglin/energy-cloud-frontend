import { DatePicker, Card } from 'antd';
import moment from 'moment';
import { useState, useRef } from 'react';
import TypeChart from '@/components/Chart/TypeChart';
import { chartTypeEnum } from '@/components/Chart/config';
import Detail from '@/components/Detail';
import { Voption, Coption } from './config';

const EVChargerChart = () => {
  const [VDate, setVDate] = useState(moment());
  const [CDate, setCDate] = useState(moment());

  const chartRef = useRef() as any;

  const onVChange = (value: any) => {
    setVDate(value);
  };
  const onCChange = (value: any) => {
    setCDate(value);
  };

  const ChartData = [
    { name: '电压', data: [{ label: '12', value: 20 }] },
    { name: '电流', data: [{ label: '13', value: 30 }] },
  ];
  return (
    <div>
      <Detail.Label title="今日曲线" className="mt16" />
      <Card
        title="电压电流曲线"
        extra={
          <DatePicker defaultValue={VDate} value={VDate} onChange={onVChange} picker={'date'} />
        }
      >
        <TypeChart
          type={chartTypeEnum.Day}
          step={5}
          chartRef={chartRef}
          date={VDate}
          option={Voption}
          style={{ height: '400px' }}
          data={ChartData}
        />
      </Card>
      <Card
        className="mt30"
        title="温度曲线"
        extra={
          <DatePicker defaultValue={CDate} value={CDate} onChange={onCChange} picker={'date'} />
        }
      >
        <TypeChart
          type={chartTypeEnum.Day}
          step={5}
          chartRef={chartRef}
          date={CDate}
          option={Coption}
          style={{ height: '400px' }}
          data={ChartData}
        />
      </Card>
    </div>
  );
};
export default EVChargerChart;
