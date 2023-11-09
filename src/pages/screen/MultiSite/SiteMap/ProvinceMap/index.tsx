/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-05 09:43:40
 * @LastEditTime: 2023-09-12 15:49:48
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SiteMap\ProvinceMap\index.tsx
 */
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
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

export type ProvinceMapProps = {
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
  const { adCode, style, onBack } = props;

  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState<ECharts>();
  const [isRegisterMap, { setTrue, setFalse }] = useBoolean(false);
  const [mapLoading, { setTrue: setMapLoadingTrue, setFalse: setMapLoadingFalse }] =
    useBoolean(false);
  const { data: provinceData, run } = useRequest(() => getProvinceData({ type: 1, code: adCode }), {
    pollingInterval: REQUEST_INTERVAL_5_MINUTE,
  });

  const options = useMemo(() => {
    if (isRegisterMap && adCode != 100000) {
      const option = merge({}, defaultMapOption);
      option.tooltip.formatter = '{b}';
      option.geo.map = '' + adCode;
      option.geo.zoom = 1;
      option.geo.top = 63;
      option.series[0].type = 'effectScatter';
      option.series[0].symbolSize = [10, 10];
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
      return option;
    } else {
      return;
    }
  }, [isRegisterMap, provinceData, adCode]);

  useEffect(() => {
    if (adCode != 100000) {
      const chart = echarts.init(chartRef?.current);
      setChartInstance(chart);
      run();
    }
  }, [adCode]);

  useEffect(() => {
    if (options) {
      chartInstance?.setOption?.(options);
      //   chartInstance?.on("georoam", function(params:any) {
      //     let option:any = chartInstance?.getOption(); //获得option对象
      //     if (params.zoom != null && params.zoom != undefined) {
      //         //捕捉到缩放时
      //         option.geo.zoom = option.series[1].zoom; //下层geo的缩放等级跟着上层的geo一起改变
      //         option.geo.center = option.series[1].center; //下层的geo的中心位置随着上层geo一起改变
      //         option.geo.animationDurationUpdate=0;//防止地图缩放卡顿
      //         option.series[1].animationDurationUpdate = 0;//防止地图缩放卡顿
      //     } else {
      //         //捕捉到拖曳时
      //         options.geo.center = option.series[1].center; //下层的geo的中心位置随着上层geo一起改变
      //     }
      //     chartInstance?.setOption(option); //设置option
      //  });
    }
  }, [options, chartInstance]);

  useEffect(() => {
    const link = adCodeGeoJsonMap.get(adCode);
    if (link) {
      setMapLoadingTrue();
      request(link).then((provinceRes) => {
        echarts.registerMap('' + adCode, provinceRes);
        request('/chinaMap/china.json').then((res) => {
          const provinceGeoData = getProvinceGeoByAdCode(adCode, res);
          echarts.registerMap('Outline' + adCode, provinceGeoData);
          echarts.registerMap('Outline1' + adCode, provinceGeoData);
          setTrue();
          setMapLoadingFalse();
          chartInstance?.dispatchAction({
            type: 'restore',
          }); //每次渲染前都要还原地图，防止沿用前一次缩放拖拽
        });
      });
    } else {
      setFalse();
    }
  }, [adCode, chartInstance]);

  return (
    <>
      <Cell style={style} cursor="default" width={1026} height={730} left={0} top={0}>
        <div className={styles.back} onClick={onBack}>
          <img src={IconBack} />
          返回
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
