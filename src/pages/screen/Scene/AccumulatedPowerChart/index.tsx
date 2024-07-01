import { DEFAULT_REQUEST_INTERVAL } from '@/utils/request';
import { useRequest } from 'umi';
import { getAccumulatedPowerChart } from './service';
import { formatMessage } from '@/utils';
import { useEffect, useMemo, useState, useRef } from 'react';
import type { UnitType } from '@/models/siteType';
import type EChartsReact from 'echarts-for-react';
import { defaultOptions } from './config';
import TypeChart from '@/components/Chart/TypeChart';
import type { Moment } from 'moment';

const getChartData = (data: any[]) => {
  return data.map((item) => {
    return { label: item?.timeDimension, value: Math.floor(item?.electricity * 100) / 100 };
  });
};

type RealTimePowerProps = {
  siteTypeConfig: UnitType;
  date?: Moment;
};

const AccumulatedPowerChart: React.FC<RealTimePowerProps> = (props) => {
  const { date, siteTypeConfig } = props;
  const chartRef = useRef<EChartsReact>();
  const [chartData, setChartData] = useState<[]>();
  const [options, setOptions] = useState(defaultOptions());
  const timerRef = useRef({ stop: false });
  const { data: rawChartData } = useRequest(getAccumulatedPowerChart, {
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });
  const chartConfigMap = useMemo(() => {
    const map = new Map([
      [
        'me',
        {
          name: formatMessage({ id: 'device.electricSupply', defaultMessage: '市电' }),
          color: '#FF7B7B',
          unit: 'kWh',
        },
      ],
      [
        'load',
        {
          name: formatMessage({ id: 'device.load', defaultMessage: '负载' }),
          unit: 'kWh',
          color: '#FF9AD5',
        },
      ],
    ]);

    if (siteTypeConfig.hasPv) {
      map.set('pv', {
        name: formatMessage({ id: 'screen.pvPowerGeneration', defaultMessage: '光伏发电' }),
        unit: 'kWh',
        color: '#FFD15C',
      });
    }
    if (siteTypeConfig.hasEnergy) {
      map.set('esCharge', {
        name: formatMessage({ id: 'dataManage.storageCharging', defaultMessage: '储能充电' }),
        unit: 'kWh',
        color: '#159AFF',
      });
    }
    if (siteTypeConfig.hasEnergy) {
      map.set('esDischarge', {
        name: formatMessage({ id: 'dataManage.storageDischarge', defaultMessage: '储能放电' }),
        unit: 'kWh',
        color: '#FF974A',
      });
    }
    if (siteTypeConfig.hasCharge) {
      map.set('cs', {
        name: formatMessage({ id: 'device.chargingPile', defaultMessage: '充电桩' }),
        unit: 'kWh',
        color: '#01CFA1',
      });
    }
    if (siteTypeConfig.hasFan) {
      map.set('fan', {
        name: formatMessage({ id: 'screen.1010', defaultMessage: '风机' }),
        unit: 'kWh',
        color: '#66E1DF',
      });
    }
    if (siteTypeConfig.hasDiesel) {
      map.set('diesel', {
        name: formatMessage({ id: 'screen.1009', defaultMessage: '柴发' }),
        unit: 'kWh',
        color: '#7A79FF',
      });
    }
    return map;
  }, [siteTypeConfig]);

  useEffect(() => {
    const result: any = [];
    const series: any[] = [];
    chartConfigMap.forEach(({ name, color }, key) => {
      result.push({ data: getChartData(rawChartData?.[key] || []), name });
      series.push({ type: 'bar', color });
    });
    const instance = chartRef?.current?.getEchartsInstance();
    let currentIndex = -1;
    const dataLen = result?.[0]?.data?.length || 0;
    const timer = setInterval(() => {
      if (dataLen && !timerRef.current.stop) {
        currentIndex = (currentIndex + 1) % dataLen; // 取余 循环展示
        instance &&
          instance.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: currentIndex,
            name: 'wahaha',
          });
      }
    }, 3000);
    setChartData(result);
    setOptions(defaultOptions(series));
    return () => clearInterval(timer);
  }, [chartConfigMap, rawChartData]);

  return (
    <div>
      <TypeChart
        height={chartConfigMap.size > 6 ? 163 : 235}
        date={date}
        chartRef={chartRef}
        option={options}
        data={chartData}
      />
    </div>
  );
};

export default AccumulatedPowerChart;
