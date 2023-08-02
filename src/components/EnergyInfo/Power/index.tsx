/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-12 14:14:19
 * @LastEditTime: 2023-08-01 17:42:18
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\Power\index.tsx
 */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Skeleton, DatePicker } from 'antd';
import { useRequest } from 'umi';
import TypeChart, { TypeChartDataType } from '@/components/Chart/TypeChart';
import { getPower } from '../service';
import styles from '../index.less';
import moment, { Moment } from 'moment';
import { ComProps } from '../type';

enum colorEnum {
  Charge = 'rgba(255, 151, 74, 1)',
  DisCharge = 'rgba(0, 125, 255, 1)',
}

const Power: React.FC<ComProps> = (props) => {
  const { deviceData, loading } = props;

  const [date, setDate] = useState<Moment>(moment());
  const [chartData, setChartData] = useState<TypeChartDataType[]>();
  const {
    loading: powerLoading,
    data: powerData,
    run,
  } = useRequest(getPower, {
    manual: true,
    pollingInterval: 2 * 60 * 1000,
  });

  const chartOption = useMemo(() => {
    return {
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const { value, name } = (params || [{}])[0];
          const result = [name];
          if (typeof value[1] === 'number') {
            result.push(
              value[1] > 0
                ? value[1] + `(<span style="color:${colorEnum.Charge}">充电</span>)`
                : -value[1] + `(<span style="color:${colorEnum.DisCharge}">放电</span>)`,
            );
          } else {
            result.push('-');
          }
          return result.join('<br/>');
        },
      },
      grid: {
        top: 10,
        right: 40,
      },
      visualMap: {
        show: false,
        pieces: [
          {
            gt: 0.1,
            color: colorEnum.Charge,
          },
          {
            lte: 0,
            color: colorEnum.DisCharge,
          },
        ],
      },
      yAxis: {
        name: '单位（kW）',
      },
      series: [
        {
          type: 'line',
          markLine: {
            data: [
              {
                yAxis: 0,
                label: {
                  show: true,
                  color: colorEnum.Charge,
                  formatter: '充电\n\n\n\n\n{dis|放电}',
                  rich: {
                    dis: {
                      color: colorEnum.DisCharge,
                    },
                  },
                },
                lineStyle: {
                  color: 'transparent',
                },
              },
            ],
          },
        },
      ],
    };
  }, []);

  const onChange = useCallback((value: Moment | null) => {
    setDate(value || moment());
  }, []);

  useEffect(() => {
    if (deviceData?.deviceId) {
      run({ deviceId: deviceData?.deviceId, date: date.format('YYYY-MM-DD') });
    }
  }, [deviceData?.deviceId, date]);

  useEffect(() => {
    const result: TypeChartDataType = {
      name: '',
      data: powerData?.map?.((item) => ({ label: item.eventTs, value: item.doubleVal })),
    };
    setChartData([result]);
  }, [powerData]);

  return (
    <>
      <div className="card-wrap shadow p20 mb20">
        {loading || powerLoading ? (
          <>
            <div className="flex mb16">
              <div className="flex1">
                <Skeleton.Button size="small" active />
              </div>
              <Skeleton.Input size="small" active />
            </div>
            <Skeleton.Image className={`w-full ${styles.chart}`} active />
          </>
        ) : (
          <>
            <div className="flex mb16">
              <label className={`flex1 ${styles.label}`}>储能功率</label>
              <DatePicker
                defaultValue={date}
                format="YYYY-MM-DD"
                onChange={onChange}
                allowClear={false}
              />
            </div>
            <TypeChart date={date} option={chartOption} data={chartData} min={-10} />
          </>
        )}
      </div>
    </>
  );
};

export default Power;
