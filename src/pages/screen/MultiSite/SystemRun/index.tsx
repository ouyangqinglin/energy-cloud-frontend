/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-22 09:54:42
 * @LastEditTime: 2024-05-23 16:51:14
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SystemRun\index.tsx
 */
import React, { useEffect, useMemo, useState } from 'react';
import Cell from '../../components/LayoutCell';
import DecorationCarousel from '../../components/DecorationCarousel';
import { TimeType } from '../../components/TimeButtonGroup';
import TypeChart, { TypeChartDataType } from '@/components/Chart/TypeChart';
import moment from 'moment';
import { useModel, useRequest } from 'umi';
import { getData } from './service';
import { REQUEST_INTERVAL_2_MINUTE } from '../config';
import { formatMessage } from '@/utils';
import type { UnitType } from '@/models/siteType';

const powerNameMap = new Map([
  [
    'mePower',
    {
      name: formatMessage({ id: 'device.electricSupply', defaultMessage: '市电' }),
      color: '#FF7B7B',
    },
  ],
  [
    'pvPower',
    { name: formatMessage({ id: 'device.pv', defaultMessage: '光伏' }), color: '#ffd15c' },
  ],
  [
    'fanPower',
    { name: formatMessage({ id: 'screen.1010', defaultMessage: '风机' }), color: '#66E1DF' },
  ],

  [
    'dieselPower',
    { name: formatMessage({ id: 'screen.1009', defaultMessage: '柴发' }), color: '#7A79FF' },
  ],
  [
    'esPower',
    { name: formatMessage({ id: 'device.storage', defaultMessage: '储能' }), color: '#159AFF' },
  ],
  [
    'csPower',
    {
      name: formatMessage({ id: 'device.chargingPile', defaultMessage: '充电桩' }),
      color: '#01CFA1',
    },
  ],
  [
    'loadPower',
    {
      name: formatMessage({ id: 'device.otherLoad', defaultMessage: '其他负载' }),
      color: '#FF9AD5',
    },
  ],
]);
const elecNameMap = new Map([
  [
    'meConsumption',
    {
      name: formatMessage({ id: 'device.electricSupply', defaultMessage: '市电' }),
      color: '#FF7B7B',
    },
  ],
  [
    'pvPowerGeneration',
    { name: formatMessage({ id: 'device.1001', defaultMessage: '光伏发电' }), color: '#FFD15C' },
  ],
  [
    'fanPower',
    { name: formatMessage({ id: 'screen.1010', defaultMessage: '风机' }), color: '#66E1DF' },
  ],

  [
    'dieselPower',
    { name: formatMessage({ id: 'screen.1009', defaultMessage: '柴发' }), color: '#7A79FF' },
  ],
  [
    'charge',
    {
      name: formatMessage({ id: 'device.storageCharging', defaultMessage: '储能充电' }),
      color: '#159aff',
    },
  ],
  [
    'discharge',
    {
      name: formatMessage({ id: 'device.storageDischarge', defaultMessage: '储能放电' }),
      color: '#01cfa1',
    },
  ],
  [
    'csCharge',
    {
      name: formatMessage({ id: 'device.chargingPile', defaultMessage: '充电桩' }),
      color: '#01CFA1',
    },
  ],
  [
    'loadConsumption',
    {
      name: formatMessage({ id: 'device.otherLoad', defaultMessage: '其他负载' }),
      color: '#FF9AD5',
    },
  ],
]);

const getShowByKey = (unit: UnitType, key: string) => {
  let show = true;
  if (key == 'pvPower') {
    if (!unit.hasPv) {
      show = false;
    }
  } else if (key == 'esPower') {
    if (!unit.hasEnergy) {
      show = false;
    }
  } else if (key == 'csPower') {
    if (!unit.hasCharge) {
      show = false;
    }
  } else if (key == 'pvPowerGeneration') {
    if (!unit.hasPv) {
      show = false;
    }
  } else if (key == 'charge' || key == 'discharge') {
    if (!unit.hasEnergy) {
      show = false;
    }
  } else if (key == 'csCharge') {
    if (!unit.hasCharge) {
      show = false;
    }
  }
  return show;
};

const SystemRun: React.FC = () => {
  const [timeType, setTimeType] = useState(TimeType.DAY);
  const [chartData, setChartData] = useState<TypeChartDataType[]>();
  const [allLabel, setAllLabel] = useState<string[]>([]);
  const { unit } = useModel('siteType');
  const { data: energyData, run } = useRequest(getData, {
    manual: true,
    pollingInterval: REQUEST_INTERVAL_2_MINUTE,
  });

  const chartOption = useMemo(() => {
    const series: any = [];
    if (timeType === TimeType.DAY) {
      powerNameMap.forEach(({ color }, key) => {
        if (getShowByKey(unit, key)) {
          series.push({
            type: 'line',
            color: color,
            showAllSymbol: true,
            symbolSize: 1,
          });
        }
      });
    } else {
      powerNameMap.forEach(({ color }, key) => {
        if (getShowByKey(unit, key)) {
          series.push({
            type: 'bar',
            color: color,
            barMaxWidth: 4,
          });
        }
      });
    }

    return {
      grid: {
        top: 90,
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
      series: series,
    };
  }, [timeType, unit]);

  useEffect(() => {
    run({ type: timeType });
  }, [timeType]);

  useEffect(() => {
    const result: TypeChartDataType[] = [];
    if (timeType == TimeType.DAY) {
      powerNameMap.forEach(({ name }, key) => {
        if (getShowByKey(unit, key)) {
          result.push({
            name,
            data: energyData?.[key]?.map?.((dataItem: any) => ({
              label: dataItem?.eventTs,
              value: dataItem?.doubleVal,
            })),
          });
        }
      });
    } else {
      const labelSet = new Set<string>();
      elecNameMap.forEach(({ name }, key) => {
        if (getShowByKey(unit, key)) {
          result.push({
            name,
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
        }
      });
      if (timeType == TimeType.TOTAL) {
        const labels = Array.from(labelSet);
        labels.sort((a, b) => parseInt(a) - parseInt(b));
        setAllLabel(labels);
      }
    }
    setChartData(result);
  }, [energyData, timeType, unit]);

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
