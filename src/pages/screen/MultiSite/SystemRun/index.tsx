/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-22 09:54:42
 * @LastEditTime: 2024-04-30 09:10:35
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SystemRun\index.tsx
 */
import React, { useEffect, useMemo, useState } from 'react';
import Cell from '../../components/LayoutCell';
import DecorationCarousel from '../../components/DecorationCarousel';
import { TimeType } from '../../components/TimeButtonGroup';
import TypeChart, { TypeChartDataType } from '@/components/Chart/TypeChart';
import moment from 'moment';
import { useRequest } from 'umi';
import { getData } from './service';
import { REQUEST_INTERVAL_2_MINUTE } from '../config';
import { formatMessage } from '@/utils';

const powerColors = [
  'rgba(255, 123, 123, 1)',
  'rgba(255, 209, 92, 1)',
  'rgba(21, 154, 255, 1)',
  'rgba(0, 224, 219, 1)',
  'rgba(1, 207, 161, 1)',
  'rgba(255, 129, 68, 1)',
];
const elecColors = [
  'rgba(255, 123, 123, 1)',
  'rgba(255, 209, 92, 1)',
  'rgba(21, 154, 255, 1)',
  'rgba(1, 207, 161, 1)',
  'rgba(255, 129, 68, 1)',
];

const powerNameMap = new Map([
  ['mePower', formatMessage({ id: 'device.electricSupply', defaultMessage: '市电' })],
  ['pvPower', formatMessage({ id: 'device.pv', defaultMessage: '光伏' })],
  ['esPower', formatMessage({ id: 'device.storage', defaultMessage: '储能' })],
  ['csPower', formatMessage({ id: 'device.chargingPile', defaultMessage: '充电桩' })],
  ['loadPower', formatMessage({ id: 'device.otherLoad', defaultMessage: '其他负载' })],
]);
const elecNameMap = new Map([
  ['meConsumption', formatMessage({ id: 'device.electricSupply', defaultMessage: '市电' })],
  ['pvPowerGeneration', formatMessage({ id: 'device.1001', defaultMessage: '光伏发电' })],
  ['charge', formatMessage({ id: 'device.storageCharging', defaultMessage: '储能充电' })],
  ['discharge', formatMessage({ id: 'device.storageDischarge', defaultMessage: '储能放电' })],
  ['csCharge', formatMessage({ id: 'device.chargingPile', defaultMessage: '充电桩' })],
  ['loadConsumption', formatMessage({ id: 'device.otherLoad', defaultMessage: '其他负载' })],
]);

const SystemRun: React.FC = () => {
  const [timeType, setTimeType] = useState(TimeType.DAY);
  const [chartData, setChartData] = useState<TypeChartDataType[]>();
  const [allLabel, setAllLabel] = useState<string[]>([]);
  const { data: energyData, run } = useRequest(getData, {
    manual: true,
    pollingInterval: REQUEST_INTERVAL_2_MINUTE,
  });

  const chartOption = useMemo(() => {
    return {
      grid: {
        top: 60,
        bottom: 40,
        right: 40,
      },
      legend: {
        textStyle: {
          color: '#ACCCEC',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(9, 12, 21, 0.8)',
        borderColor: 'rgba(21,154,255,0.8)',
        extraCssText: 'box-shadow: 0 0 6px 0 rgba(21,154,255,0.7);',
        textStyle: {
          color: 'white',
        },
      },
      dataZoom: [
        {
          type: 'inside',
        },
        {
          start: 0,
          end: 100,
          height: 15,
          bottom: 15,
        },
      ],
      xAxis: {
        axisLabel: {
          color: '#ACCCEC',
        },
      },
      yAxis: {
        name:
          timeType === TimeType.DAY
            ? formatMessage({ id: 'common.unit', defaultMessage: '单位' }) + '（kW）'
            : formatMessage({ id: 'common.unit', defaultMessage: '单位' }) + '（kWh）',
        nameTextStyle: {
          color: '#ACCCEC',
        },
        splitLine: {
          lineStyle: {
            dashOffset: 2,
            color: '#2E3A45',
          },
        },
        axisLabel: {
          color: '#ACCCEC',
        },
      },
      series:
        timeType === TimeType.DAY
          ? Array.from({ length: 5 }).map((_, index) => ({
              type: 'line',
              color: powerColors[index],
              showAllSymbol: true,
              symbolSize: 1,
            }))
          : Array.from({ length: 6 }).map((_, index) => ({
              type: 'bar',
              color: elecColors[index],
              barMaxWidth: 4,
            })),
    };
  }, [timeType]);

  useEffect(() => {
    run({ type: timeType });
  }, [timeType]);

  useEffect(() => {
    const result: TypeChartDataType[] = [];
    if (timeType == TimeType.DAY) {
      powerNameMap.forEach((item, key) => {
        result.push({
          name: item,
          data: energyData?.[key]?.map?.((dataItem: any) => ({
            label: dataItem?.eventTs,
            value: dataItem?.doubleVal,
          })),
        });
      });
    } else {
      const labelSet = new Set<string>();
      elecNameMap.forEach((item, key) => {
        result.push({
          name: item,
          data: energyData?.[key]?.map?.((dataItem: any) => {
            if (timeType == TimeType.TOTAL) {
              const year = moment(dataItem?.timeDimension).format('YYYY');
              labelSet.add(year);
              return { label: year, value: dataItem?.electricity };
            } else {
              return { label: dataItem?.timeDimension, value: dataItem?.electricity };
            }
          }),
        });
      });
      if (timeType == TimeType.TOTAL) {
        const labels = Array.from(labelSet);
        labels.sort((a, b) => parseInt(a) - parseInt(b));
        setAllLabel(labels);
      }
    }
    setChartData(result);
  }, [energyData, timeType]);

  return (
    <>
      <Cell cursor="default" width={400} height={324} left={24} bottom={24}>
        <DecorationCarousel
          valueType="timeButtonGroup"
          panelStyle={{ padding: 0 }}
          title={formatMessage({ id: 'screen.systemRunningData', defaultMessage: '系统运行数据' })}
          onTimeButtonChange={setTimeType}
        >
          {timeType == TimeType.DAY ? (
            <TypeChart
              key="line"
              step={5}
              style={{ height: 290 }}
              type={timeType as any}
              option={chartOption}
              data={chartData}
            />
          ) : (
            <TypeChart
              key="bar"
              style={{ height: 290 }}
              type={timeType as any}
              date={moment()}
              option={chartOption}
              data={chartData}
              allLabel={allLabel}
            />
          )}
        </DecorationCarousel>
      </Cell>
    </>
  );
};

export default SystemRun;
