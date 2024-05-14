import TimeButtonGroup, { TimeType } from '@/components/TimeButtonGroup';
import { useToggle } from 'ahooks';
import { DatePicker } from 'antd';
import moment from 'moment';
import { useEffect, useMemo, useRef } from 'react';
import { useState } from 'react';
import { SiteTypeEnum } from '@/utils/dict';
import { SubSystemType } from '../..';
import styles from './index.less';
import RenderTitle from './RenderTitle';
import { useFetchChartData } from './useFetchChartData';
import TypeChart from '@/components/Chart/TypeChart';
import { cloneDeep } from 'lodash';
import { formatMessage } from '@/utils';

const ChartBox = ({
  type: subSystemType,
  siteType = '',
}: {
  type: SubSystemType;
  siteType?: string;
}) => {
  const [picker, setPicker] = useState<
    'year' | 'month' | 'time' | 'date' | 'week' | 'quarter' | undefined
  >();
  const [timeType, setTimeType] = useState<TimeType>(TimeType.DAY);
  const [showDatePicker, { set }] = useToggle(true);
  const [date, setDate] = useState(moment());
  const [allLabel, setAllLabel] = useState<string[]>([]);
  const [option, setOption] = useState<any>();
  const resetDate = () => setDate(moment());
  const chartRef = useRef();
  const { chartData } = useFetchChartData(date, subSystemType, timeType, siteType) as any;

  const onChange = (value: any) => {
    setDate(value);
  };
  // useEffect(() => {
  //   chartRef?.current?.getEchartsInstance()?.clear?.();
  // }, [siteType]);

  const timeTypeChange = (type: TimeType) => {
    chartRef?.current?.getEchartsInstance()?.clear?.();
    setTimeType(type);
    resetDate();
    switch (type) {
      case TimeType.DAY:
        setPicker('date');
        set(true);
        break;
      case TimeType.MONTH:
        setPicker('month');
        set(true);
        break;
      case TimeType.YEAR:
        setPicker('year');
        set(true);
        break;
      case TimeType.TOTAL:
        set(false);
        break;
    }
  };
  /*
   *@Author: aoshilin
   *@Date: 2023-12-13 16:12:04
   *@parms: data
   *@Description: 收益图标数据处理
   */
  const incomeHandle = (isDay: boolean, data: any) => {
    const labelAry: string[] = [];
    const result = data.map((item: any) => {
      const label = isDay ? item.timeDimension : item.timeDimension;
      labelAry.push(label);
      return {
        label,
        value: item.amount,
      };
    });
    if (timeType == TimeType.TOTAL) setAllLabel(labelAry);
    return result;
  };
  /*
   *@Author: aoshilin
   *@Date: 2023-12-13 10:40:01
   *@parms: isDay boolean 判断选择是否为天
   *@Description: 图标数据处理
   */
  const chartDataHandle = (isDay: boolean, data: any) => {
    const labelAry: string[] = [];
    const result = data.map((item: any) => {
      const label = isDay ? item.eventTs : item.timeDimension;
      labelAry.push(label);
      return {
        label,
        value: isDay ? item.doubleVal : item.electricity,
      };
    });
    if (timeType == TimeType.TOTAL) setAllLabel(labelAry);
    return result;
  };

  /*
   *@Author: aoshilin
   *@Date: 2023-12-13 10:51:02
   *@parms:
   *@Description: 图表配置处理
   */
  const optionHandle = (isDay: boolean, series: any[]) => {
    const config = {
      color: ['#3DD598', '#007DFF'],
      yAxis: {
        type: 'value',
        name: `${formatMessage({ id: 'index.chart.unit', defaultMessage: '单位' })}${
          subSystemType == 2
            ? '(' + formatMessage({ id: 'index.chart.money', defaultMessage: '元' }) + ')'
            : timeType == TimeType.DAY
            ? '(kW)'
            : '(kWh)'
        }`,
        nameLocation: 'end',
        splitLine: {
          lineStyle: {
            type: 'dashed', //虚线
          },
        },
      },
      grid: {
        top: 30,
        bottom: 50,
        right: 15,
        left: 0,
      },
      legend: {
        show: true,
        icon: 'rect',
        top: 'bottom',
        itemHeight: 10,
        itemWidth: 10,
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params: any[]) {
          console.log('params>>', params);
          let result = params[0].name + '<br />';
          params.forEach((item, index) => {
            let seriesName = item.seriesName;
            const value = item.value[index + 1] || 0;
            if (subSystemType !== 2) {
              //除了收益，其他加上单位
              seriesName += timeType == TimeType.DAY ? '(kW)' : '(kWh)';
            }
            let lable = `${item.marker} ${seriesName}: ${value}`;
            if (subSystemType == 1 && timeType == TimeType.DAY) {
              //储能系统为日做处理
              if (value)
                value >= 0
                  ? (lable += `(${formatMessage({
                      id: 'device.charge',
                      defaultMessage: '充电',
                    })})`)
                  : (lable += `(${formatMessage({
                      id: 'device.discharge',
                      defaultMessage: '放电',
                    })})`);
            }
            result += `${lable}<br />`;
          });
          return result;
        },
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
      series,
    };
    setOption(config);
  };

  const typeChartData = useMemo(() => {
    let data = [];
    const result: { name: string; data: any; itemStyle: any }[] = [];
    const isDay = timeType === TimeType.DAY;
    const isTotal = timeType === TimeType.TOTAL;
    let series: any[] = [
      {
        type: isDay ? 'line' : 'bar',
        barWidth: isTotal ? '22px' : '10px',
        name: '',
        color: '#159AFF',
        showSymbol: false,
      },
    ];
    switch (subSystemType) {
      case 0: //光伏
        series[0].name = isDay
          ? formatMessage({
              id: 'index.chart.powerGenerationEffective',
              defaultMessage: '发电功率',
            })
          : formatMessage({ id: 'index.chart.powerGeneration', defaultMessage: '发电量' });
        data = isDay ? chartData?.pvPower || [] : chartData?.pvPowerGeneration || [];
        result.push({
          name: series[0].name,
          data: chartDataHandle(isDay, data),
          itemStyle: { color: '#FFC542' },
        });
        break;
      case 1: //储能
        if (isDay) {
          series[0].name = formatMessage({
            id: 'index.chart.energyTotalPower',
            defaultMessage: '储能总功率',
          });
          data = chartData?.esPower || [];
          result.push({
            name: series[0].name,
            data: chartDataHandle(isDay, data),
            itemStyle: { color: '#007DFF' },
          });
        } else {
          series[0].name = formatMessage({
            id: 'index.chart.powerCharge',
            defaultMessage: '充电量',
          });
          data = chartData?.charge || [];
          result.push({
            name: series[0].name,
            data: chartDataHandle(isDay, data),
            itemStyle: { color: '#007DFF' },
          });
          const pushData = cloneDeep(series[0]);
          pushData.name = formatMessage({
            id: 'index.chart.powerDischarge',
            defaultMessage: '放电量',
          });
          pushData.color = '#11DA81';
          series.push(pushData);
          data = chartData?.discharge || [];
          result.push({
            name: pushData.name,
            data: chartDataHandle(isDay, data),
            itemStyle: { color: '#FF974A' },
          });
        }
        break;
      case 2: //收益
        const deepData = cloneDeep(series[0]);
        deepData.stack = '收益';
        series = [];
        //光伏收益/元
        let isCanUser = ![SiteTypeEnum.ES, SiteTypeEnum.CS, SiteTypeEnum.ES_CS].includes(
          Number(siteType || ''),
        );
        if (isCanUser) {
          const name = formatMessage({ id: 'index.chart.pvIncome', defaultMessage: '光伏收益/元' });
          series.push({
            ...deepData,
            name,
            type: 'bar',
            color: '#ffd15c',
            barGap: '-100%',
          });
          data = chartData?.pvIncome || [];
          result.push({ name, data: incomeHandle(isDay, data), itemStyle: { color: '#FFD15C' } });
        }
        // 储能收益/元
        isCanUser = ![SiteTypeEnum.PV, SiteTypeEnum.CS].includes(Number(siteType || ''));
        if (isCanUser) {
          const name = formatMessage({
            id: 'index.chart.energyIncome',
            defaultMessage: '储能收益/元',
          });
          series.push({
            ...deepData,
            name,
            type: 'bar',
            color: '#159aff',
            barGap: '-100%',
          });
          data = chartData?.esIncome || [];
          result.push({ name, data: incomeHandle(isDay, data), itemStyle: { color: '#007DFF' } });
        }
        //充电桩收益/元
        isCanUser = ![SiteTypeEnum.PV, SiteTypeEnum.ES, SiteTypeEnum.PV_ES].includes(
          Number(siteType || ''),
        );
        if (isCanUser) {
          const name = formatMessage({
            id: 'index.chart.chargeIncome',
            defaultMessage: '充电桩收益/元',
          });
          series.push({
            ...deepData,
            name: name,
            type: 'bar',
            color: '#01cfa1',
          });
          data = chartData?.csIncome || [];
          result.push({ name, data: incomeHandle(isDay, data), itemStyle: { color: '#3DD598' } });
        }
        //总收益/元
        const name = formatMessage({ id: 'index.chart.totalIncome', defaultMessage: '总收益/元' });
        series.push({
          ...deepData,
          stack: '',
          name,
          type: 'line',
          color: '#FF7B7B',
        });
        data = chartData?.income || [];
        result.push({ name, data: incomeHandle(isDay, data), itemStyle: { color: '#FF7B7B' } });
        break;
      case 3: //充电桩
        series[0].name = isDay
          ? formatMessage({ id: 'index.chart.chargePower', defaultMessage: '充电功率' })
          : formatMessage({ id: 'index.chart.powerCharge', defaultMessage: '充电量' });
        data = isDay ? chartData?.csPower || [] : chartData?.powerConsumption || [];
        result.push({
          name: series[0].name,
          data: chartDataHandle(isDay, data),
          itemStyle: { color: '#3DD598' },
        });
        break;
      case 4: //市电
        series[0].name = isDay
          ? formatMessage({ id: 'index.chart.power', defaultMessage: '功率' })
          : formatMessage({ id: 'index.chart.powerConsum', defaultMessage: '用电量' });
        data = isDay ? chartData?.mePower || [] : (chartData?.meConsumption || []).reverse();
        result.push({
          name: series[0].name,
          data: chartDataHandle(isDay, data),
          itemStyle: { color: '#FF7B7B' },
        });
        break;
      default:
        return;
    }

    optionHandle(isDay, series);
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData, subSystemType, timeType]);

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.topBar}>
        <div className={styles.timeForm}>
          {showDatePicker && (
            <DatePicker defaultValue={date} value={date} onChange={onChange} picker={picker} />
          )}
          <TimeButtonGroup
            style={{
              marginLeft: 20,
            }}
            onChange={timeTypeChange}
          />
        </div>
        <RenderTitle
          timeType={timeType}
          chartData={chartData}
          subSystemType={subSystemType}
          siteType={siteType}
        />
      </div>
      <TypeChart
        type={timeType}
        step={subSystemType == SubSystemType.EI ? 30 : 5}
        chartRef={chartRef}
        date={date}
        option={option}
        style={{ height: '400px' }}
        data={typeChartData}
        allLabel={allLabel}
      />
    </div>
  );
};

export default ChartBox;
