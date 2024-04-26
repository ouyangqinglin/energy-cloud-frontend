/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-01 15:10:57
 * @LastEditTime: 2024-04-26 10:40:53
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SiteMap\index.tsx
 */

import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Cell from '../../components/LayoutCell';
import { request, useRequest } from 'umi';
import * as echarts from 'echarts';
import type { ECharts } from 'echarts';
import { CountryDataType, GeoCoordDataType, MapTypeEnum, asyncMap, geoCoordData } from './config';
import SiteStatus from './SiteStatus';
import { defaultMapOption } from '@/components/Chart/config';
import { merge } from 'lodash';
import { useBoolean } from 'ahooks';
import { getCountryData } from './service';
import { REQUEST_INTERVAL_5_MINUTE } from '../config';
import { arrayToMap, formatMessage } from '@/utils';
import IconDot from '@/assets/image/multi-site/dot.png';
import ProvinceMap from './ProvinceMap';
import { Spin } from 'antd';

const geoCodeMap = arrayToMap(geoCoordData, 'adCode', 'lnglat');
const geoCodeNameMap = arrayToMap(geoCoordData, 'adCode', 'name');

const getGeoData = function (data: CountryDataType[]) {
  const result: GeoCoordDataType[] = [];
  data?.map?.((item) => {
    const geoData = geoCodeMap[item?.provinceCode || ''];
    result.push({
      name: geoCodeNameMap[item?.provinceCode || ''] || '',
      value: [...(geoData || []), item?.siteNum || 0],
    });
  });
  return result;
};

const getAdCodeByName = (name: string) => {
  let adCode: number = 0;
  for (let i = 0; i < geoCoordData.length; i++) {
    if (geoCoordData[i].name == name) {
      adCode = geoCoordData[i].adCode || 0;
      break;
    }
  }
  return adCode;
};

const SiteMap: React.FC = () => {
  const { data: countryData } = useRequest(getCountryData, {
    pollingInterval: REQUEST_INTERVAL_5_MINUTE,
  });

  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState<ECharts>();
  const [isRegisterMap, { setTrue }] = useBoolean(false);
  const [mapLoading, { setTrue: setMapLoadingTrue, setFalse: setMapLoadingFalse }] =
    useBoolean(false);
  const [chinaData, setChinaData] = useState<any>();
  const [adCode, setAdCode] = useState(100000);

  const options = useMemo(() => {
    if (isRegisterMap) {
      const option = merge({}, defaultMapOption);
      option.series[0].symbol = 'image://' + IconDot;
      option.series[0].data = getGeoData(countryData);
      return option;
    } else {
      return;
    }
  }, [isRegisterMap, countryData]);

  const onEchartClick = useCallback((params) => {
    const code = getAdCodeByName(params?.name);
    if (code) {
      setAdCode(code);
    }
  }, []);

  const onLinkChinaMap = useCallback(() => {
    setAdCode(100000);
    chartInstance?.dispatchAction({
      type: 'restore',
    }); //每次渲染前都要还原地图，防止沿用前一次缩放拖拽
  }, [chartInstance]);

  useEffect(() => {
    const chart = echarts.init(chartRef?.current);
    setChartInstance(chart);
    chart.on('georoam', (params) => {
      asyncMap(chart, params, MapTypeEnum.Country);
    });
  }, []);

  useEffect(() => {
    if (options) {
      chartInstance?.setOption?.(options);
    }
  }, [options, chartInstance]);

  useEffect(() => {
    setMapLoadingTrue();
    request('/chinaMap/china.json').then((chinaRes) => {
      chinaRes?.features?.forEach?.((features: any) => {
        if (features?.properties?.name) {
          features.properties.name = formatMessage({ id: features.properties.name });
        }
      });
      setChinaData(chinaRes);
      echarts.registerMap('china1', chinaRes);
      request('/chinaMap/china-outline.json').then((res) => {
        setMapLoadingFalse();
        echarts.registerMap('chinaMapOutline', res);
        echarts.registerMap('chinaMapOutline1', res);
        setTrue();
      });
    });
  }, []);

  useEffect(() => {
    chartInstance?.on?.('click', onEchartClick);
    return () => {
      chartInstance?.off?.('click', onEchartClick);
    };
  }, [chartInstance]);

  return (
    <>
      <Cell cursor="default" width={1026} height={730} left={447} top={222}>
        <SiteStatus
          type={adCode == 100000 ? MapTypeEnum.Country : MapTypeEnum.Province}
          code={adCode}
        />
        <div
          ref={chartRef}
          style={{
            height: '100%',
            display: adCode == 100000 && !mapLoading ? 'block' : 'none',
          }}
        ></div>
        {mapLoading ? (
          <div className="flex flex-center h-full">
            <Spin size="large" />
          </div>
        ) : (
          <></>
        )}
        <ProvinceMap
          chinaData={chinaData}
          adCode={adCode}
          style={{ display: adCode == 100000 ? 'none' : 'block' }}
          onBack={onLinkChinaMap}
        />
      </Cell>
    </>
  );
};

export default SiteMap;
