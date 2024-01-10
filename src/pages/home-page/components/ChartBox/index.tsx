import TimeButtonGroup, { TimeType } from '@/components/TimeButtonGroup';
import { useToggle } from 'ahooks';
import { DatePicker } from 'antd';
import moment from 'moment';
import { useMemo, useRef } from 'react';
import { useState } from 'react';
import { SiteTypeEnum } from '@/utils/dictionary';
import type { SubSystemType } from '../..';
import styles from './index.less';
import RenderTitle from './RenderTitle';
import { useFetchChartData } from './useFetchChartData';
import TypeChart from '@/components/Chart/TypeChart';
import { chartTypeEnum } from '@/components/Chart/config';
import { cloneDeep } from 'lodash';

const ChartBox = ({
  type: subSystemType,
  siteType,
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
        name: `单位${subSystemType == 2 ? '(元)' : '(kWh)'}`,
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
    const result: { data: any }[] = [];
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
        series[0].name = isDay ? '发电功率' : '发电量';
        data = isDay ? chartData?.pvPower || [] : chartData?.pvPowerGeneration || [];
        result.push({ data: chartDataHandle(isDay, data) });
        break;
      case 1: //储能
        if (isDay) {
          series[0].name = '储能总功率';
          data = chartData?.esPower || [];
          result.push({ data: chartDataHandle(isDay, data) });
        } else {
          series[0].name = '发电量';
          data = chartData?.charge || [];
          result.push({ data: chartDataHandle(isDay, data) });
          const pushData = cloneDeep(series[0]);
          pushData.name = '放电量';
          pushData.color = '#11DA81';
          series.push(pushData);
          data = chartData?.discharge || [];
          result.push({ data: chartDataHandle(isDay, data) });
        }
        break;
      case 2: //收益
        const deepData = cloneDeep(series[0]);
        series = [];
        //光伏收益/元
        let isCanUser = ![SiteTypeEnum.ES, SiteTypeEnum.CS, SiteTypeEnum.ES_CS].includes(
          Number(siteType || ''),
        );
        if (isCanUser) {
          series.push({
            ...deepData,
            name: '光伏收益/元',
            type: 'bar',
            color: '#ffd15c',
            barGap: '-100%',
          });
          data = chartData?.pvIncome || [];
          result.push({ data: incomeHandle(isDay, data) });
        }
        // 储能收益/元
        isCanUser = ![SiteTypeEnum.PV, SiteTypeEnum.CS].includes(Number(siteType || ''));
        if (isCanUser) {
          series.push({
            ...deepData,
            name: '储能收益/元',
            type: 'bar',
            color: '#159aff',
            barGap: '-100%',
          });
          data = chartData?.esIncome || [];
          result.push({ data: incomeHandle(isDay, data) });
        }
        //充电桩收益/元
        isCanUser = ![SiteTypeEnum.PV, SiteTypeEnum.ES, SiteTypeEnum.PV_ES].includes(
          Number(siteType || ''),
        );
        if (isCanUser) {
          series.push({ ...deepData, name: '充电桩收益/元', color: '#01cfa1' });
          data = chartData?.csIncome || [];
          result.push({ data: incomeHandle(isDay, data) });
        }
        //总收益/元
        series.push({ ...deepData, name: '总收益/元', type: 'line', color: '#FF7B7B' });
        data = chartData?.income || [];
        result.push({ data: incomeHandle(isDay, data) });
        break;
      case 3: //充电桩
        series[0].name = isDay ? '充电功率' : '充电量';
        data = isDay ? chartData?.csPower || [] : chartData?.powerConsumption || [];
        result.push({ data: chartDataHandle(isDay, data) });
        break;
      case 4: //市电
        series[0].name = isDay ? '功率' : '用电量';
        data = isDay ? chartData?.mePower || [] : (chartData?.meConsumption || []).reverse();
        result.push({ data: chartDataHandle(isDay, data) });
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
        step={subSystemType == 2 ? 10 : 5}
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
