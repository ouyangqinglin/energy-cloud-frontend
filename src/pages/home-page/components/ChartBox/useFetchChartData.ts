import { TimeType } from '@/components/TimeButtonGroup';
import moment from 'moment';
import { useEffect, useMemo } from 'react';
import { useRequest } from 'umi';
import { SubSystemType } from '../..';
import { getEIChartData, getESChartData, getPVChartData } from './service';

export const useFetchChartData = (
  date: moment.Moment,
  subSystemType: SubSystemType,
  timeType: TimeType,
) => {
  const { run: runForPV, data: dataPV } = useRequest(getPVChartData, { manual: true });
  const { run: runForES, data: dataES } = useRequest(getESChartData, { manual: true });
  const { run: runForEI, data: dataEI } = useRequest(getEIChartData, { manual: true });

  useEffect(() => {
    const transformDate = date ? date.format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');

    switch (subSystemType) {
      case SubSystemType.EI:
        runForEI({ type: timeType, date: transformDate });
        break;
      case SubSystemType.ES:
        runForES({ type: timeType, date: transformDate });
        break;
      case SubSystemType.PV:
        runForPV({ type: timeType, date: transformDate });
        break;
    }
  }, [date, runForEI, runForES, runForPV, subSystemType, timeType]);

  const chartData = useMemo(() => {
    switch (subSystemType) {
      case SubSystemType.EI:
        return dataEI;
      case SubSystemType.ES:
        return dataES;
      case SubSystemType.PV:
        return dataPV;
      default:
        return dataPV;
    }
  }, [dataEI, dataES, dataPV, subSystemType]);

  return {
    chartData,
  };
};
