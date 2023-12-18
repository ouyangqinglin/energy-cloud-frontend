/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-05 09:43:40
 * @LastEditTime: 2023-12-13 11:16:26
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SiteMap\ProvinceMap\index.tsx
 */
import React, { useEffect, useRef, useState, useCallback } from 'react';
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
import IconBack from '@/assets/image/multi-site/icon_返回@2x.png';
import styles from './index.less';
import { Spin } from 'antd';
import { SiteDataType } from '@/services/station';
import { MapTypeEnum, asyncMap } from '../config';
import { formatMessage } from '@/utils';

export type ProvinceMapProps = {
  chinaData: any;
  adCode: number;
  style?: React.CSSProperties;
  onBack?: () => void;
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
  const { adCode, chinaData, style, onBack } = props;

  const chartRef = useRef(null);
  const instanceRef = useRef<any>(null);
  const [mapLoading, { setTrue: setMapLoadingTrue, setFalse: setMapLoadingFalse }] =
    useBoolean(false);
  const { run } = useRequest(() => getProvinceData({ type: 1, code: adCode }), {
    pollingInterval: REQUEST_INTERVAL_5_MINUTE,
  });

  const changeMap = useCallback(
    (provinceData: SiteDataType[]) => {
      const option = merge({}, defaultMapOption);
      option.tooltip.formatter = '{b}';
      option.geo.map = '' + adCode;
      option.geo.zoom = 1;
      option.geo.top = 63;
      option.series[0].type = 'effectScatter';
      option.series[0].label.show = false;
      option.series[0].symbolSize = [5, 5];
      option.series[0].itemStyle = {
        normal: {
          color: '#ffd422',
          shadowBlur: 10,
          shadowColor: '#ffd422',
        },
      };
      option.series[0].data = provinceData?.map?.((item) => {
        return { name: item.name, value: [item.longitude, item.latitude, ''] };
      });
      option.series[1].map = 'Outline' + adCode;
      option.series[2].map = 'Outline1' + adCode;
      instanceRef.current?.setOption?.(option);
      setMapLoadingFalse();
    },
    [adCode],
  );

  useEffect(() => {
    if (adCode != 100000) {
      if (!instanceRef.current) {
        const chart = echarts.init(chartRef?.current);
        instanceRef.current = chart;
        chart.on('georoam', (params) => {
          asyncMap(chart, params, MapTypeEnum.Province);
        });
      }
    }
  }, [adCode]);

  useEffect(() => {
    if (adCode != 100000) {
      const link = adCodeGeoJsonMap.get(adCode);
      setMapLoadingTrue();
      if (link) {
        request(link).then((provinceRes) => {
          echarts.registerMap('' + adCode, provinceRes);
          const provinceGeoData = getProvinceGeoByAdCode(adCode, chinaData);
          echarts.registerMap('Outline' + adCode, provinceGeoData);
          echarts.registerMap('Outline1' + adCode, provinceGeoData);
          instanceRef.current?.dispatchAction({
            type: 'restore',
          }); //每次渲染前都要还原地图，防止沿用前一次缩放拖拽

          run()
            .then((provinceData) => {
              changeMap(provinceData);
            })
            .catch(() => {
              changeMap([]);
            });
        });
      }
    }
  }, [adCode]);

  return (
    <>
      <Cell style={style} cursor="default" width={1026} height={730} left={0} top={0}>
        <div className={styles.back} onClick={onBack}>
          <img src={IconBack} />
          {formatMessage({ id: 'screen.return', defaultMessage: '返回' })}
        </div>
        <div
          ref={chartRef}
          style={{ height: '100%', display: mapLoading ? 'none' : 'block' }}
        ></div>
        {mapLoading ? (
          <div className="flex flex-center h-full">
            <Spin size="large" />
          </div>
        ) : (
          <></>
        )}
      </Cell>
    </>
  );
};

export default ProvinceMap;
