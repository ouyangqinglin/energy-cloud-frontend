/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-04 15:56:49
 * @LastEditTime: 2023-12-04 16:42:06
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\home-page\ExchangeSite\Pie\index.tsx
 */
import React, { useCallback, useEffect, useState } from 'react';
import RightStatistics, { PieTypeEnum } from '../Stastistics/Right';
import VehicleChart from '../VehicleChart';

export type PieType = {
  data?: Record<string, any>;
};

const vehicleConfigMap = new Map([
  ['driving', '行驶车辆'],
  ['static', '静止车辆'],
  ['sleep', '休眠车辆'],
  ['offline', '离线车辆'],
]);

const siteConfigMap = new Map([
  ['siteOperate', '运营中'],
  ['siteOffOperate', '停运中'],
  ['siteBuild', '建设中'],
]);

const batteryConfigMap = new Map([
  ['batteryCharge', '充电'],
  ['batteryDisCharge', '放电'],
  ['batterySleep', '待机'],
]);

const configMap = new Map([
  [PieTypeEnum.Vehicle, vehicleConfigMap],
  [PieTypeEnum.Site, siteConfigMap],
  [PieTypeEnum.Battery, batteryConfigMap],
]);

const getOptionByType = (type: PieTypeEnum, data: any) => {
  const options: any = {
    tooltip: {
      formatter: (params: any) => {
        return `${configMap.get(type)?.get(params?.value?.[0])} ${params?.value[1]}`;
      },
    },
    legend: {
      formatter: (field: string) => {
        return `${configMap.get(type)?.get(field)} ${data?.[field] ?? 0}`;
      },
    },
    dataset: {
      source: [],
    },
  };
  configMap.get(type)?.forEach((_, key) => {
    options.dataset.source.push([key, data?.[key] ?? 0]);
  });
  return options;
};

const Pie: React.FC<PieType> = (props) => {
  const { data } = props;
  const [type, setType] = useState(PieTypeEnum.Vehicle);
  const [option, setOption] = useState<any>({});

  const onChange = useCallback((value: PieTypeEnum) => {
    setType(value);
  }, []);

  useEffect(() => {
    setOption(getOptionByType(type, data));
  }, [data, type]);

  return (
    <>
      <RightStatistics className="mb20" data={data} onChange={onChange} />
      <VehicleChart option={option} />
    </>
  );
};

export default Pie;
