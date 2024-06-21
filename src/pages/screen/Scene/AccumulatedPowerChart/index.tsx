import { DEFAULT_REQUEST_INTERVAL } from '@/utils/request';
import dayjs from 'dayjs';
import { useRequest } from 'umi';
import StatisticChart from '../SubsystemStatistic/Chart';
import { sortedData } from '../SubsystemStatistic/Chart/helper';
import type { ChartData } from '../SubsystemStatistic/Chart/type';
import { getAccumulatedPowerChart } from './service';
import { formatMessage } from '@/utils';
import { useMemo } from 'react';
import type { UnitType } from '@/models/siteType';

const timeRange = ['00'];

type RealTimePowerProps = {
  siteTypeConfig: UnitType;
};

const AccumulatedPowerChart: React.FC<RealTimePowerProps> = (props) => {
  const { siteTypeConfig } = props;
  const { data: rawChartData } = useRequest(getAccumulatedPowerChart, {
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });
  const chartConfigMap = useMemo(() => {
    const map = {
      me: {
        name: formatMessage({ id: 'device.electricSupply', defaultMessage: '市电' }),
        unit: 'kWh',
      },
    } as any;
    if (siteTypeConfig.hasPv) {
      map.pv = {
        name: formatMessage({ id: 'screen.pvPowerGeneration', defaultMessage: '光伏发电' }),
        unit: 'kWh',
      };
    }
    if (siteTypeConfig.hasEnergy) {
      map.esCharge = {
        name: formatMessage({ id: 'dataManage.storageCharging', defaultMessage: '储能充电' }),
        unit: 'kWh',
      };
    }
    if (siteTypeConfig.hasEnergy) {
      map.esDischarge = {
        name: formatMessage({ id: 'dataManage.storageDischarge', defaultMessage: '储能放电' }),
        unit: 'kWh',
      };
    }
    if (siteTypeConfig.hasCharge) {
      map.cs = {
        name: formatMessage({ id: 'device.chargingPile', defaultMessage: '充电桩' }),
        unit: 'kWh',
      };
    }
    if (true) {
      map.load = {
        name: formatMessage({ id: 'device.load', defaultMessage: '负载' }),
        unit: 'kWh',
      };
    }
    if (siteTypeConfig.hasFan) {
      map.fan = {
        name: formatMessage({ id: 'screen.1010', defaultMessage: '风机' }),
        unit: 'kWh',
      };
    }
    if (siteTypeConfig.hasDiesel) {
      map.diesel = {
        name: formatMessage({ id: 'screen.1009', defaultMessage: '柴发' }),
        unit: 'kWh',
      };
    }
    return map;
  }, [siteTypeConfig]);

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
          field: chartConfigMap[key]?.name || '',
        });
      });
    });
  }

  return (
    <StatisticChart
      showDatePicker={false}
      showLegend={true}
      height={Object.keys(chartConfigMap).length > 6 ? 163 : 235}
      chartConfigMap={chartConfigMap}
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
