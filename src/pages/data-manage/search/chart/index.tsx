/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-06-04 10:22:48
 * @LastEditTime: 2024-06-26 17:24:26
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\data-manage\search\chart\index.tsx
 */

import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import TypeChart, { TypeChartDataType } from '@/components/Chart/TypeChart';
import { chartTypeEnum } from '@/components/Chart/config';
import { defaultOptions } from './helper';
import EChartsReact from 'echarts-for-react';
import { TableDataType, TableSearchType } from '../type';
import { merge } from 'lodash';
import { DeviceModelTypeEnum, formatModelValue, getPlaceholder, isEmpty, saveFile } from '@/utils';
import { getModelMap } from '../config';

type ChartType = {
  searchData: TableSearchType;
  tableType: number;
  data?: TableDataType[];
  height?: string;
};

export type ChartRefType = {
  downLoadImg: (name: string) => void;
};

const Chart = forwardRef<any, ChartType>((props, ref) => {
  const { searchData, tableType, data, height } = props;

  const chartRef = useRef<EChartsReact>();
  const [chartData, setChartData] = useState<TypeChartDataType[]>([]);
  const [allLabel, setAllLabel] = useState<string[]>();

  useImperativeHandle<any, ChartRefType>(ref, () => {
    return {
      downLoadImg: (name) => {
        const base64 = chartRef.current?.getEchartsInstance?.()?.getDataURL?.();
        if (base64) {
          saveFile(base64, name, '.png');
        }
      },
    };
  });

  const modelMap = useMemo(() => {
    return getModelMap(searchData);
  }, [searchData]);

  const modelData = useMemo(() => {
    if (searchData?.keyValue?.length == 1) {
      const model = modelMap[searchData.keyValue[0].key + '-' + searchData.keyValue[0].deviceId];
      const enumObj: any = model?.specs;
      let enumKeys: string[] = [];
      if (model?.type === DeviceModelTypeEnum.Enum) {
        enumKeys = ['heifa'].concat(Object.keys(enumObj));
      }
      return {
        type: model?.type,
        keys: enumKeys,
        data: enumObj,
        unit: enumObj?.unit,
      };
    } else {
      return {};
    }
  }, [modelMap, searchData]);

  const chartOptions = useMemo(() => {
    const options: any = {
      series: [],
    };
    searchData?.keyValue?.forEach?.(() => {
      options.series.push({
        type: 'line',
        showAllSymbol: true,
        symbolSize: 1,
        large: true,
        sampling: 'lttb',
      });
    });
    options.tooltip = {
      formatter: (params: any) => {
        const result: any[] = [params?.[0]?.name];
        params?.forEach?.((item: any, index: number) => {
          const { data: formatterData, seriesIndex, marker, seriesName } = item || {};
          const value = formatterData?.[seriesIndex + 1];
          const collection = searchData?.keyValue?.[index];
          result.push(
            marker +
              seriesName +
              ': ' +
              (modelData?.type == DeviceModelTypeEnum.Enum
                ? getPlaceholder(modelData.data[modelData.keys[value]])
                : formatModelValue(
                    value,
                    modelMap[collection?.key + '-' + collection?.deviceId] || {},
                    false,
                  )),
          );
        });
        return result.join('<br/>');
      },
    };
    if (modelData.type == DeviceModelTypeEnum.Enum) {
      options.yAxis = {
        interval: 1,
        axisLabel: {
          formatter: (value: number) => {
            return modelData.data?.[modelData.keys[value]] || '';
          },
        },
      };
    }
    return merge({}, defaultOptions, options);
  }, [searchData, modelData]);

  useEffect(() => {
    if (tableType) {
      if (searchData) {
        chartRef.current?.getEchartsInstance?.()?.clear?.();
        const series: any = [];
        const dataSource: TypeChartDataType[] = [];
        const deviceIdkeyIndex: Record<string, number> = {};
        searchData.keyValue?.forEach?.(({ name, key, deviceName, deviceId }, index) => {
          series?.push({
            type: 'line',
          });
          dataSource.push({
            name: deviceName + '\n' + name,
            data: [],
            unit: modelMap[key + '-' + deviceId]?.specs?.unit,
          });
          deviceIdkeyIndex[(deviceId ?? '') + (key ?? '')] = index;
        });
        const labels: string[] = [];
        data?.forEach?.(({ time, devices }) => {
          if (labels[labels.length - 1] !== time) {
            labels.push(time || '');
          }
          devices?.forEach?.((item) => {
            let value = item.value;
            if (modelData.type == DeviceModelTypeEnum.Enum) {
              value = modelData.keys.findIndex((key) => key == (item?.value as any));
            }
            dataSource[deviceIdkeyIndex[(item.deviceId ?? '') + (item.key ?? '')]]?.data?.push({
              label: time || '',
              value: value,
            });
          });
        });
        setChartData(dataSource);
        setAllLabel(labels);
      } else {
        chartRef.current?.getEchartsInstance?.()?.clear?.();
        setChartData([]);
        setAllLabel([]);
      }
    }
  }, [tableType, data]);

  return (
    <>
      <TypeChart
        chartRef={chartRef}
        type={chartTypeEnum.Label}
        option={chartOptions}
        style={{ height: height || 'calc(100vh - 320px)' }}
        data={chartData}
        allLabel={allLabel}
        max={modelData.type == DeviceModelTypeEnum.Enum ? modelData.keys.length - 1 : 0}
      />
    </>
  );
});

export default memo(Chart);
