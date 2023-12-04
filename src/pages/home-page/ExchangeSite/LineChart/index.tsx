/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-03 16:30:29
 * @LastEditTime: 2023-12-03 17:50:10
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\home-page\ExchangeSite\LineChart\index.tsx
 */
import TypeChart, { TypeChartDataType } from '@/components/Chart/TypeChart';
import { chartTypeEnum } from '@/components/Chart/config';
import { Radio, RadioChangeEvent } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRequest } from 'umi';
import { getLineAllData, getLineBatteryData, getLineExchangeData } from '../service';
import moment from 'moment';

export enum LineTypeEnum {
  Energy = '0',
  Charge = '1',
  Exchange = '2',
  Mileage = '3',
}

export type LineChartType = {
  type: LineTypeEnum;
};

const titleMap = new Map([
  [LineTypeEnum.Energy, ['总能耗', '单公里能耗']],
  [LineTypeEnum.Charge, ['插枪充电', '换电站充电']],
  [LineTypeEnum.Exchange, ['换电次数']],
  [LineTypeEnum.Mileage, ['里程']],
]);

const seriesMap = new Map([
  [LineTypeEnum.Energy, [{ type: 'line' }, { type: 'line' }]],
  [LineTypeEnum.Charge, [{ type: 'line' }]],
  [LineTypeEnum.Exchange, [{ type: 'bar' }]],
  [LineTypeEnum.Mileage, [{ type: 'line' }]],
]);

const LineChart: React.FC<LineChartType> = (props) => {
  const { type } = props;
  const [range, setRange] = useState(0);
  const [chartData, setChartData] = useState<TypeChartDataType[]>();
  const { data: allData, run: runGetAllData } = useRequest(getLineAllData, {
    manual: true,
  });
  const { data: batteryData, run: runGetBatteryData } = useRequest(getLineBatteryData, {
    manual: true,
  });
  const { data: exchangeData, run: runGetExchangeData } = useRequest(getLineExchangeData, {
    manual: true,
  });

  const onChange = useCallback((e: RadioChangeEvent) => {
    setRange(e.target?.value);
  }, []);

  const chartOption = useMemo(() => {
    const result: any = {
      color: ['#3DD598', '#007DFF'],
      grid: {
        top: 10,
        bottom: 50,
        right: 35,
      },
      legend: {
        show: false,
      },
      tooltip: {
        trigger: 'axis',
      },
      dataZoom: [
        {
          type: 'inside',
          realtime: false,
        },
        {
          start: 0,
          end: 100,
          height: 15,
          realtime: false,
        },
      ],
      series: seriesMap.get(type),
    };
    return result;
  }, [type]);

  const allLabel = useMemo<string[]>(() => {
    if (range) {
      return Array.from({ length: range })
        .map((_, index) => {
          return moment().subtract(index, 'd').format('YYYY-MM-DD');
        })
        .reverse();
    } else {
      return chartData?.[0]?.data?.map((item) => item.label) || [];
    }
  }, [chartData, range]);

  const bindData = useCallback(
    (data) => {
      const result: TypeChartDataType[] = [
        {
          name: titleMap.get(type)?.[0] || '',
          data: [],
        },
      ];
      if ([LineTypeEnum.Energy, LineTypeEnum.Charge].includes(type)) {
        result.push({
          name: titleMap.get(type)?.[1] || '',
          data: [],
        });
      }
      if (LineTypeEnum.Energy === type) {
        data?.slice?.(range ? data.length - 1 - range : 0)?.forEach?.((item: any) => {
          result[0].data?.push({
            label: item.reportDate,
            value: item.energy,
          });
          result[1].data?.push({
            label: item.reportDate,
            value: item.energyUse,
          });
        });
      }
      if (LineTypeEnum.Charge === type) {
        data?.slice?.(range ? data.length - 1 - range : 0)?.forEach?.((item: any) => {
          result[0].data?.push({
            label: item.reportDate,
            value: item.chargeDegree,
          });
          result[1].data?.push({
            label: item.reportDate,
            value: item.gunChargeEnergy,
          });
        });
      }
      if (LineTypeEnum.Exchange === type) {
        data?.slice?.(range ? data.length - 1 - range : 0)?.forEach?.((item: any) => {
          result[0].data?.push({
            label: item.reportDate,
            value: item.count,
          });
        });
      }
      if (LineTypeEnum.Mileage === type) {
        data?.slice?.(range ? data.length - 1 - range : 0)?.forEach?.((item: any) => {
          result[0].data?.push({
            label: item.reportDate,
            value: item.mile,
          });
        });
      }
      setChartData(result);
    },
    [type, range],
  );

  useEffect(() => {
    let request;
    if (type === LineTypeEnum.Charge) {
      request = runGetBatteryData;
    } else if (type === LineTypeEnum.Exchange) {
      request = runGetExchangeData;
    } else {
      request = runGetAllData;
    }
    request().then((data) => {
      bindData(data);
    });
  }, [type]);

  return (
    <>
      <div className="tx-right">
        <Radio.Group value={range} buttonStyle="solid" onChange={onChange}>
          <Radio.Button value={0}>总</Radio.Button>
          <Radio.Button value={7}>7天</Radio.Button>
          <Radio.Button value={30}>30天</Radio.Button>
          <Radio.Button value={90}>90天</Radio.Button>
        </Radio.Group>
      </div>
      <TypeChart
        type={chartTypeEnum.Label}
        option={chartOption}
        style={{ height: '360px' }}
        data={chartData}
        allLabel={allLabel}
      />
    </>
  );
};

export default LineChart;
