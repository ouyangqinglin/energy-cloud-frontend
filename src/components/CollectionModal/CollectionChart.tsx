/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-10-17 15:53:59
 * @LastEditTime: 2024-01-16 09:13:51
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\CollectionModal\CollectionChart.tsx
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getCollectionData } from '@/services/data';
import { useRequest } from 'umi';
import TypeChart, { TypeChartDataType } from '../Chart/TypeChart';
import { chartTypeEnum } from '@/components/Chart/config';
import moment from 'moment';
import EChartsReact from 'echarts-for-react';
import { DeviceModelTypeEnum } from '@/utils';
import { parseToObj } from '@/utils';
import { CollectionChartType } from './helper';

const CollectionChart: React.FC<CollectionChartType> = (props) => {
  const { deviceId, collection, model, title, date, height = 400 } = props;

  const chartRef = useRef<EChartsReact>(null);
  const [chartData, setChartData] = useState<TypeChartDataType[]>();
  const [chartType, setChartType] = useState<chartTypeEnum>(chartTypeEnum.Day);
  const { run } = useRequest(getCollectionData, {
    manual: true,
  });

  const modelData = useMemo(() => {
    const enumObj: any = parseToObj(model?.specs);
    let enumKeys: string[] = [];
    if (model?.type === DeviceModelTypeEnum.Enum) {
      enumKeys = ['wahaha'].concat(Object.keys(enumObj));
    }
    return {
      type: model?.type,
      keys: enumKeys,
      data: enumObj,
      unit: enumObj?.unit,
    };
  }, [model]);

  const chartOption = useMemo(() => {
    return {
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
        formatter: (params: any) => {
          const { value, name } = (params || [{}])[0];
          const result = [name];
          result.push(
            (title ?? '') +
              (modelData.unit ? `（${modelData.unit}）` : '') +
              '：' +
              ((modelData.type === DeviceModelTypeEnum.Enum
                ? modelData.data[modelData.keys[value?.[1]]] ?? '--'
                : value?.[1]) ?? ''),
          );
          return result.join('<br/>');
        },
      },
      xAxis: {
        axisLabel: {
          formatter: (value: string) => {
            return value.replace(' ', '\n');
          },
        },
      },
      yAxis:
        modelData.type === DeviceModelTypeEnum.Enum
          ? {
              interval: 1,
              axisLabel: {
                formatter: (value: number) => {
                  return modelData.data?.[modelData.keys[value]] || '';
                },
              },
            }
          : {},
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
      series: [
        {
          type: 'line',
          showAllSymbol: true,
          symbolSize: 1,
          large: true,
          sampling: 'lttb',
        },
      ],
    };
  }, [title, modelData]);

  const allLabel = useMemo(() => {
    return chartData?.[0]?.data?.map?.((item) => item.label);
  }, [chartData]);

  useEffect(() => {
    if (deviceId && collection && date && date[0] && date[1]) {
      run({
        deviceId: deviceId,
        key: collection,
        startTime: date[0] + ' 00:00:00',
        endTime: date[1] + ' 23:59:59',
        // msgType: 1,
      }).then((data) => {
        if (moment(date[0]).format('YYYY-MM-DD') == moment(date[1]).format('YYYY-MM-DD')) {
          setChartType(chartTypeEnum.Day);
          const result: TypeChartDataType = {
            name: title || '',
            data: [],
          };
          data?.forEach?.((collectionValue) => {
            if (modelData.type == DeviceModelTypeEnum.Enum) {
              const index = modelData.keys.findIndex(
                (item) => item == (collectionValue?.value as any),
              );
              result?.data?.push?.({
                label: collectionValue?.eventTs || '',
                value: index,
              });
            } else {
              result?.data?.push?.({
                label: collectionValue?.eventTs || '',
                value: collectionValue?.value,
              });
            }
          });
          setChartData([result]);
        } else {
          setChartType(chartTypeEnum.Label);
          const resultData = {
            dataset: {
              source: [['product', title]],
            },
            yAxis: {
              max:
                modelData.type == DeviceModelTypeEnum.Enum ? modelData.keys.length - 1 : undefined,
              min: undefined,
            },
          };
          data?.forEach?.((collectionValue) => {
            if (modelData.type == DeviceModelTypeEnum.Enum) {
              const index = modelData.keys.findIndex(
                (item) => item == (collectionValue?.value as any),
              );
              resultData.dataset.source.push([collectionValue?.eventTs || '', index as any]);
            } else {
              resultData.dataset.source.push([
                collectionValue?.eventTs || '',
                collectionValue?.value as any,
              ]);
            }
          });
          setTimeout(() => {
            chartRef?.current?.getEchartsInstance().setOption(resultData);
          }, 300);
        }
        return true;
      });
    }
  }, [deviceId, collection, modelData, date]);

  return (
    <>
      <TypeChart
        chartRef={chartRef}
        type={chartType}
        option={chartOption}
        style={{ height }}
        data={chartData}
        allLabel={allLabel}
        max={modelData.type == DeviceModelTypeEnum.Enum ? modelData.keys.length - 1 : 0}
      />
    </>
  );
};

export default CollectionChart;
