/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-12 14:14:19
 * @LastEditTime: 2023-12-14 09:01:36
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
import { formatMessage } from '@/utils';

enum colorEnum {
  Charge = 'rgba(0, 125, 255, 1)',
  DisCharge = 'rgba(255, 151, 74, 1)',
}
export enum EnergySourceEnum {
  SiteMonitor,
  DeviceManage,
}
const Power: React.FC<ComProps> = (props) => {
  const { deviceData, loading, source, deviceKey } = props;
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
      grid: {
        top: 30,
        bottom: 50,
        right: 60,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const { value, name } = (params || [{}])[0];
          const result = [name];
          if (typeof value[1] === 'number') {
            result.push(
              value[1] > 0
                ? value[1] +
                    `kW（<span style="color:${colorEnum.DisCharge}">${formatMessage({
                      id: 'siteMonitor.discharge',
                      defaultMessage: '放电',
                    })}</span>）`
                : value[1] +
                    `kW（<span style="color:${colorEnum.Charge}">${formatMessage({
                      id: 'siteMonitor.charge',
                      defaultMessage: '充电',
                    })}</span>）`,
            );
          } else {
            result.push('-');
          }
          return result.join('<br/>');
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
        },
      ],
      visualMap: {
        show: false,
        pieces: [
          {
            gt: 0.1,
            color: colorEnum.DisCharge,
          },
          {
            lte: 0,
            color: colorEnum.Charge,
          },
        ],
      },
      yAxis: {
        name: formatMessage({ id: 'common.unit', defaultMessage: '单位' }) + '（kW）',
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
                  formatter: `{dis|${formatMessage({
                    id: 'siteMonitor.discharge',
                    defaultMessage: '放电',
                  })}}\n\n\n\n\n${formatMessage({
                    id: 'siteMonitor.charge',
                    defaultMessage: '充电',
                  })}`,
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
  }, [deviceData]);

  const onChange = useCallback((value: Moment | null) => {
    setDate(value || moment());
  }, []);

  useEffect(() => {
    if (deviceData?.deviceId && deviceData?.children) {
      //只有点击父节点才调此接口
      run({
        deviceId: deviceKey || deviceData?.deviceId,
        date: date.format('YYYY-MM-DD'),
        visitType: source == EnergySourceEnum.SiteMonitor ? 0 : 1,
      });
    }
  }, [deviceData?.deviceId, date, deviceKey]);

  useEffect(() => {
    if (deviceKey || deviceData?.deviceId) {
      //切换单元时调此接口
      run({
        deviceId: deviceKey || deviceData?.deviceId,
        date: date.format('YYYY-MM-DD'),
        visitType: source == EnergySourceEnum.SiteMonitor ? 0 : 1,
      });
    }
  }, [deviceData?.deviceId, date, deviceKey]);

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
              <label className={`flex1 ${styles.label}`}>
                {source == EnergySourceEnum.SiteMonitor
                  ? formatMessage({
                      id: 'siteMonitor.storageUnitPower',
                      defaultMessage: '储能单元功率',
                    })
                  : formatMessage({ id: 'siteMonitor.storagePower', defaultMessage: '储能功率' })}
              </label>
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
