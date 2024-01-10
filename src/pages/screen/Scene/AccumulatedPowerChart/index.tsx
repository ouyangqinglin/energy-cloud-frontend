import { DEFAULT_REQUEST_INTERVAL } from '@/utils/request';
import dayjs from 'dayjs';
import moment from 'moment';
import { useRequest } from 'umi';
import StatisticChart from '../SubsystemStatistic/Chart';
import { convertToData, sortedData } from '../SubsystemStatistic/Chart/helper';
import type { ChartData } from '../SubsystemStatistic/Chart/type';
import { getAccumulatedPowerChart } from './service';
import { formatMessage } from '@/utils';

const timeRange = ['00'];
const chartConfigMap = {
  me: {
    name: formatMessage({ id: 'device.electricSupply', defaultMessage: '市电' }),
    unit: 'kWh',
  },
  pv: {
    name: formatMessage({ id: 'screen.pvPowerGeneration', defaultMessage: '光伏发电' }),
    unit: 'kWh',
  },
  esCharge: {
    name: formatMessage({ id: 'dataManage.storageCharging', defaultMessage: '储能充电' }),
    unit: 'kWh',
  },
  esDischarge: {
    name: formatMessage({ id: 'dataManage.storageDischarge', defaultMessage: '储能放电' }),
    unit: 'kWh',
  },
  cs: {
    name: formatMessage({ id: 'device.chargingPile', defaultMessage: '充电桩' }),
    unit: 'kWh',
  },
  load: {
    name: formatMessage({ id: 'device.load', defaultMessage: '负载' }),
    unit: 'kWh',
  },
};

const AccumulatedPowerChart = () => {
  const { data: rawChartData } = useRequest(getAccumulatedPowerChart, {
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });

  const chartData: ChartData = [];
  if (rawChartData) {
    Object.keys(rawChartData).forEach((key) => {
      rawChartData[key].forEach(({ timeDimension, electricity }) => {
        const value = Math.floor(electricity * 100) / 100;
        const ts = dayjs(timeDimension).format('HH:mm');
        if (!timeRange.includes(ts.split(':')?.[1])) {
          return;
        }
        chartData.push({
          date: dayjs(timeDimension).format('HH:mm'),
          value,
          field: chartConfigMap[key].name,
        });
      });
    });
  }

  return (
    <StatisticChart
      showDatePicker={false}
      showLegend={true}
      height={266}
      chartConfigMap={{
        me: {
          name: formatMessage({ id: 'device.electricSupply', defaultMessage: '市电' }),
          unit: 'kWh',
        },
        pv: {
          name: formatMessage({ id: 'screen.pvPowerGeneration', defaultMessage: '光伏发电' }),
          unit: 'kWh',
        },
        esCharge: {
          name: formatMessage({ id: 'dataManage.storageCharging', defaultMessage: '储能充电' }),
          unit: 'kWh',
        },
        esDischarge: {
          name: formatMessage({ id: 'dataManage.storageDischarge', defaultMessage: '储能放电' }),
          unit: 'kWh',
        },
        cs: {
          name: formatMessage({ id: 'device.chargingPile', defaultMessage: '充电桩' }),
          unit: 'kWh',
        },
        load: {
          name: formatMessage({ id: 'device.load', defaultMessage: '负载' }),
          unit: 'kWh',
        },
      }}
      barSize={3}
      color={['#FF7B7B', '#FFD15C', '#159AFF', '#00E0DB', '#01CFA1', '#FF8144']}
      title={formatMessage({
        id: 'screen.storageChargingDischargingCapacity',
        defaultMessage: '储能充放电量',
      })}
      legendLayout={'vertical'}
      chartData={sortedData(chartData)}
    />
  );
};

export default AccumulatedPowerChart;
