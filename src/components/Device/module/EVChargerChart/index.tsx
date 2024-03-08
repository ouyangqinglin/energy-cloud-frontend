import moment from 'moment';
import { useRef, useEffect, useContext, useState } from 'react';
import TypeChart from '@/components/Chart/TypeChart';
import { chartTypeEnum } from '@/components/Chart/config';
import Detail from '@/components/Detail';
import { Voption, Coption } from './config';
import { formatMessage } from '@/utils';
import { getChargeDayCurve, getChargeTCurve } from '@/services/equipment';
import DeviceContext from '@/components/Device/Context/DeviceContext';
import { cloneDeep } from 'lodash';

const defaultVChartData = [
  { data: [] }, //最高允许充电电压
  { data: [] }, //需求电压
  { data: [] }, //充电出电压
  { data: [] }, //BMS测量电压
  { data: [] }, //最高允许充电电流
  { data: [] }, //需求电流
  { data: [] }, //电输出电流
  { data: [] }, //BMS测量电流
];
const defaultCChartData = [
  { data: [] }, //枪温度
  { data: [] }, //单体电池最高温度{ label: '2024-03-05 04:10:00', value: 10 }
  { data: [] }, //单体电池最低温度
  { data: [] }, //充电枪正极温度
  { data: [] }, //充电枪负极负温度
];

const EVChargerChart = () => {
  const chartRef = useRef() as any;
  const { data: deviceData } = useContext(DeviceContext);
  const [VChartData, setVChartData] = useState(defaultVChartData);
  const [CChartData, setCChartData] = useState(defaultCChartData);
  useEffect(() => {
    const timer = setInterval(() => {
      if (deviceData?.deviceId) {
        getChargeDayCurve({ deviceId: deviceData?.deviceId }).then(({ data }) => {
          if (!data || !data.length) return;
          const currentVChartData = cloneDeep(defaultVChartData);
          data.forEach((item) => {
            if (!item.values || !item.values.length) return;
            const currentValue = item.values.map((i) => ({
              label: i.eventTs,
              value: i.val,
            })) as never[];
            switch (item.key) {
              case 'gcmaxoutvo': //最高允许充电电压
                currentVChartData[0].data = currentValue;
                break;
              case 'gxqu': //需求电压
                currentVChartData[1].data = currentValue;
                break;
              case 'gcu': //充电出电压
                currentVChartData[2].data = currentValue;
                break;
              case 'gcut': //BMS测量电压
                currentVChartData[3].data = currentValue;
                break;
              case 'gcmaxoutcu': //最高允许充电电流
                currentVChartData[4].data = currentValue;
                break;
              case 'gxqi': //需求电流
                currentVChartData[5].data = currentValue;
                break;
              case 'gci': //电输出电流
                currentVChartData[6].data = currentValue;
                break;
              case 'gxqi': //BMS测量电流
                currentVChartData[7].data = currentValue;
                break;
              default:
                return;
            }
          });
          setVChartData(currentVChartData);
        });
        getChargeTCurve({ deviceId: deviceData?.deviceId }).then(({ data }) => {
          if (!data || !data.length) return;
          const currentCChartData = cloneDeep(defaultCChartData);
          data.forEach((item) => {
            if (!item.values || !item.values.length) return;
            const currentValue = item.values.map((i) => ({
              label: i.eventTs,
              value: i.val,
            })) as never[];
            switch (item.key) {
              case 'gdct': //枪温度
                currentCChartData[0].data = currentValue;
                break;
              case 'ght': //单体电池最高温度
                currentCChartData[1].data = currentValue;
                break;
              case 'ghu': //单体电池最低温度
                currentCChartData[2].data = currentValue;
                break;
              case 'gdct': //充电枪正极温度
                currentCChartData[3].data = currentValue;
                break;
              case 'gdct2': //充电枪负极负温度
                currentCChartData[4].data = currentValue;
                break;
              default:
                return;
            }
          });
          setCChartData(currentCChartData);
        });
      }
    }, 5 * 60 * 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [deviceData?.deviceId]);

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
        step={1}
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
        step={1}
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
