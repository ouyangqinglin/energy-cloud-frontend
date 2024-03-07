import moment from 'moment';
import { useRef } from 'react';
import TypeChart from '@/components/Chart/TypeChart';
import { chartTypeEnum } from '@/components/Chart/config';
import Detail from '@/components/Detail';
import { Voption, Coption } from './config';
import { formatMessage } from '@/utils';

const EVChargerChart = () => {
  const chartRef = useRef() as any;
  //mock
  const VChartData = [
    {
      name: formatMessage({ id: 'device.maxAllowVoltage', defaultMessage: '最高允许充电电压' }),
      data: [
        { label: '2024-03-05 08:10:00', value: 220 },
        { label: '2024-03-05 08:15:00', value: 300 },
      ],
    },
    {
      name: formatMessage({ id: 'device.demandVoltage', defaultMessage: '需求电压' }),
      data: [
        { label: '2024-03-05 04:10:00', value: 250 },
        { label: '2024-03-05 04:15:00', value: 400 },
      ],
    },
    {
      name: formatMessage({ id: 'device.chargeOutputVoltage', defaultMessage: '充电出电压' }),
      data: [],
    },
    {
      name: formatMessage({ id: 'device.bMSMeasureVoltage', defaultMessage: 'BMS测量电压' }),
      data: [],
    },
    {
      name: formatMessage({ id: 'device.maxAllowCurrent', defaultMessage: '最高允许充电电流' }),
      data: [
        { label: '2024-03-05 08:10:00', value: 60 },
        { label: '2024-03-05 08:15:00', value: 80 },
      ],
    },
    { name: formatMessage({ id: 'device.demandCurrent', defaultMessage: '需求电流' }), data: [] },
    { name: formatMessage({ id: 'device.outputCurrent', defaultMessage: '电输出电流' }), data: [] },
    {
      name: formatMessage({ id: 'device.bMSMeasureCurrent', defaultMessage: 'BMS测量电流' }),
      data: [],
    },
  ];
  //mock
  const CChartData = [
    {
      name: formatMessage({ id: 'device.gunTemp', defaultMessage: '枪温度' }),
      data: [
        { label: '2024-03-05 08:10:00', value: 30 },
        { label: '2024-03-05 08:15:00', value: 50 },
      ],
    },
    {
      name: formatMessage({
        id: 'device.singleBatteryMaxtemp',
        defaultMessage: '单体电池最高温度',
      }),
      data: [
        { label: '2024-03-05 04:10:00', value: 10 },
        { label: '2024-03-05 04:15:00', value: 20 },
      ],
    },
    {
      name: formatMessage({
        id: 'device.singleBatteryMintemp',
        defaultMessage: '单体电池最低温度',
      }),
      data: [],
    },
    {
      name: formatMessage({ id: 'device.chargeGunAnodetemp', defaultMessage: '充电枪正极温度' }),
      data: [],
    },
    {
      name: formatMessage({
        id: 'device.chargeGunCathodetemp',
        defaultMessage: '充电枪负极负温度',
      }),
      data: [],
    },
  ];
  return (
    <div>
      <Detail.Label
        title={formatMessage({ id: 'device.todayCurve', defaultMessage: '今日曲线' })}
        className="mt16"
      />
      <Detail.Label
        title={formatMessage({ id: 'device.voltageCurrentCurve', defaultMessage: '电压电流曲线' })}
        className="mt16"
      />
      <TypeChart
        type={chartTypeEnum.Day}
        step={5}
        chartRef={chartRef}
        date={moment()}
        option={Voption}
        style={{ height: '400px' }}
        data={VChartData}
      />
      <Detail.Label
        title={formatMessage({ id: 'device.tempCurve', defaultMessage: '温度曲线' })}
        className="mt16"
      />
      <TypeChart
        type={chartTypeEnum.Day}
        step={5}
        chartRef={chartRef}
        date={moment()}
        option={Coption}
        style={{ height: '400px' }}
        data={CChartData}
      />
    </div>
  );
};
export default EVChargerChart;
