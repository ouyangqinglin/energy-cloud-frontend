import { TimeType } from '@/components/TimeButtonGroup';
import moment from 'moment';
import { useEffect, useMemo } from 'react';
import { useRequest } from 'umi';
import { SubSystemType } from '../..';
import {
  getEIChartData,
  getESChartData,
  getPVChartData,
  getCSChartData,
  getELECChartData,
} from './service';

export const useFetchChartData = (
  date: moment.Moment,
  subSystemType: SubSystemType,
  timeType: TimeType,
  siteType?: string,
) => {
  const { run: runForELEC, data: dataELEC } = useRequest(getELECChartData, { manual: true });
  const { run: runForPV, data: dataPV } = useRequest(getPVChartData, { manual: true });
  const { run: runForES, data: dataES } = useRequest(getESChartData, { manual: true });
  const { run: runForEI, data: dataEI } = useRequest(getEIChartData, { manual: true });
  const { run: runForCS, data: dataCS } = useRequest(getCSChartData, { manual: true });

  useEffect(() => {
    const transformDate = date ? date.format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
    const params = {
      type: timeType,
      date: transformDate,
      ...(siteType ? { energyOptions: siteType } : {}),
    };
    switch (subSystemType) {
      case SubSystemType.ELEC:
        runForELEC(params);
        break;
      case SubSystemType.EI:
        runForEI(params);
        break;
      case SubSystemType.ES:
        runForES(params);
        break;
      case SubSystemType.PV:
        runForPV(params);
        break;
      case SubSystemType.CS:
        runForCS(params);
        break;
    }
  }, [date, runForEI, runForES, runForPV, runForELEC, siteType, subSystemType, timeType]);

  const chartData = useMemo(() => {
    switch (subSystemType) {
      case SubSystemType.ELEC:
        return dataELEC;
      case SubSystemType.EI:
        return dataEI;
      case SubSystemType.ES:
        return dataES;
      case SubSystemType.PV:
        return dataPV;
      case SubSystemType.CS:
        return dataCS;
      default:
        return dataPV;
    }
  }, [dataELEC, dataEI, dataES, dataPV, dataCS, subSystemType]);

  return {
    chartData,
  };
};
