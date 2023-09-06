/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-05 09:43:40
 * @LastEditTime: 2023-09-05 19:53:12
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SiteMap\ProvinceMap\index.tsx
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { request, useRequest } from 'umi';
import { getProvinceData } from './service';
import { REQUEST_INTERVAL_5_MINUTE } from '../../config';
import * as echarts from 'echarts';
import type { ECharts } from 'echarts';
import { useBoolean } from 'ahooks';
import { merge } from 'lodash';
import { defaultMapOption } from '@/components/Chart/config';
import Cell from '@/pages/screen/components/LayoutCell';
import { adCodeGeoJsonMap } from './config';

export type ProvinceMapProps = {
  adCode: number;
  style?: React.CSSProperties;
};

export type GeoDataType = {
  type: string;
  features: {
    type: string;
    properties: {
      adcode: number;
    };
  }[];
};

const getProvinceGeoByAdCode = (adCode: number, data: GeoDataType) => {
  const result: GeoDataType = {
    type: 'FeatureCollection',
    features: [],
  };
  for (let i = 0; i < data?.features?.length; i++) {
    if (data?.features?.[i]?.properties?.adcode == adCode) {
      result.features.push(data.features[i]);
      break;
    }
  }
  return result as any;
};

const ProvinceMap: React.FC<ProvinceMapProps> = (props) => {
  const { adCode, style } = props;

  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState<ECharts>();
  const [isRegisterMap, { setTrue }] = useBoolean(false);
  const { data: provinceData } = useRequest(() => getProvinceData({ type: 1, code: adCode }), {
    pollingInterval: REQUEST_INTERVAL_5_MINUTE,
  });

  const options = useMemo(() => {
    if (isRegisterMap) {
      const option = merge({}, defaultMapOption);
      option.geo.map = '' + adCode;
      option.geo.zoom = 1;
      option.geo.top = 63;
      option.series[0].type = 'effectScatter';
      option.series[0].itemStyle = {
        normal: {
          color: '#ffd422',
          shadowBlur: 10,
          shadowColor: '#ffd422',
        },
      };
      option.series[0].data = provinceData?.map?.((item) => {
        return { name: item.name, value: [item.longitude, item.latitude] };
      });
      option.series[1].map = 'Outline' + adCode;
      option.series[2].map = 'Outline1' + adCode;
      return option;
    } else {
      return;
    }
  }, [isRegisterMap, provinceData, adCode]);

  useEffect(() => {
    if (adCode != 100000) {
      const chart = echarts.init(chartRef?.current);
      setChartInstance(chart);
    }
  }, [adCode]);

  useEffect(() => {
    if (options) {
      chartInstance?.setOption?.(options);
    }
  }, [options, chartInstance]);

  useEffect(() => {
    const link = adCodeGeoJsonMap.get(adCode);
    if (link) {
      request(link).then((provinceRes) => {
        echarts.registerMap('' + adCode, provinceRes);
        request('/chinaMap/china.json').then((res) => {
          const provinceGeoData = getProvinceGeoByAdCode(adCode, res);
          echarts.registerMap('Outline' + adCode, provinceGeoData);
          echarts.registerMap('Outline1' + adCode, provinceGeoData);
          setTrue();
        });
      });
    }
  }, [adCode]);

  return (
    <>
      <Cell style={style} cursor="default" width={1026} height={730} left={0} top={0}>
        <div ref={chartRef} style={{ height: '100%' }}></div>
      </Cell>
    </>
  );
};

export default ProvinceMap;
