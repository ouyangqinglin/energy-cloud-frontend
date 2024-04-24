/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-01 15:27:03
 * @LastEditTime: 2024-04-23 15:38:14
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SiteMap\config.ts
 */
import { formatMessage, isEmpty } from '@/utils';
import type { ECharts } from 'echarts';

export enum MapTypeEnum {
  Country,
  Province,
}

export type CountryDataType = {
  provinceCode?: string;
  provinceName?: string;
  siteNum?: number;
};

export type GeoCoordDataType = {
  name: string;
  adCode?: number;
  lnglat?: number[];
  value?: number[];
};

export const geoCoordData: GeoCoordDataType[] = [
  {
    name: formatMessage({ id: 'map.tw', defaultMessage: '台湾省' }),
    adCode: 710000,
    lnglat: [121.5135, 25.0308],
  },
  {
    name: formatMessage({ id: 'map.hlj', defaultMessage: '黑龙江省' }),
    adCode: 230000,
    lnglat: [127.9688, 45.368],
  },
  {
    name: formatMessage({ id: 'map.nm', defaultMessage: '内蒙古自治区' }),
    adCode: 150000,
    lnglat: [110.3467, 41.4899],
  },
  {
    name: formatMessage({ id: 'map.jl', defaultMessage: '吉林省' }),
    adCode: 220000,
    lnglat: [125.8154, 44.2584],
  },
  {
    name: formatMessage({ id: 'map.bj', defaultMessage: '北京市' }),
    adCode: 110000,
    lnglat: [116.4551, 40.2539],
  },
  {
    name: formatMessage({ id: 'map.ln', defaultMessage: '辽宁省' }),
    adCode: 210000,
    lnglat: [123.1238, 42.1216],
  },
  {
    name: formatMessage({ id: 'map.hb', defaultMessage: '河北省' }),
    adCode: 130000,
    lnglat: [114.4995, 38.1006],
  },
  {
    name: formatMessage({ id: 'map.tj', defaultMessage: '天津市' }),
    adCode: 120000,
    lnglat: [117.4219, 39.4189],
  },
  {
    name: formatMessage({ id: 'map.sx', defaultMessage: '山西省' }),
    adCode: 140000,
    lnglat: [112.3352, 37.9413],
  },
  {
    name: formatMessage({ id: 'map.shanx', defaultMessage: '陕西省' }),
    adCode: 610000,
    lnglat: [109.1162, 34.2004],
  },
  {
    name: formatMessage({ id: 'map.gs', defaultMessage: '甘肃省' }),
    adCode: 620000,
    lnglat: [103.5901, 36.3043],
  },
  {
    name: formatMessage({ id: 'map.nx', defaultMessage: '宁夏' }),
    adCode: 640000,
    lnglat: [106.3586, 38.1775],
  },
  {
    name: formatMessage({ id: 'map.qh', defaultMessage: '青海省' }),
    adCode: 630000,
    lnglat: [101.4038, 36.8207],
  },
  {
    name: formatMessage({ id: 'map.xj', defaultMessage: '新疆维吾尔自治区' }),
    adCode: 650000,
    lnglat: [87.9236, 43.5883],
  },
  {
    name: formatMessage({ id: 'map.xz', defaultMessage: '西藏自治区' }),
    adCode: 540000,
    lnglat: [91.11, 29.97],
  },
  {
    name: formatMessage({ id: 'map.sc', defaultMessage: '四川省' }),
    adCode: 510000,
    lnglat: [103.9526, 30.7617],
  },
  {
    name: formatMessage({ id: 'map.cq', defaultMessage: '重庆市' }),
    adCode: 500000,
    lnglat: [108.384366, 30.439702],
  },
  {
    name: formatMessage({ id: 'map.sd', defaultMessage: '山东省' }),
    adCode: 370000,
    lnglat: [117.1582, 36.8701],
  },
  {
    name: formatMessage({ id: 'map.hn', defaultMessage: '河南省' }),
    adCode: 410000,
    lnglat: [113.4668, 34.6234],
  },
  {
    name: formatMessage({ id: 'map.js', defaultMessage: '江苏省' }),
    adCode: 320000,
    lnglat: [118.8062, 31.9208],
  },
  {
    name: formatMessage({ id: 'map.ah', defaultMessage: '安徽省' }),
    adCode: 340000,
    lnglat: [117.29, 32.0581],
  },
  {
    name: formatMessage({ id: 'map.hub', defaultMessage: '湖北省' }),
    adCode: 420000,
    lnglat: [114.3896, 30.6628],
  },
  {
    name: formatMessage({ id: 'map.zj', defaultMessage: '浙江省' }),
    adCode: 330000,
    lnglat: [119.5313, 29.8773],
  },
  {
    name: formatMessage({ id: 'map.fj', defaultMessage: '福建省' }),
    adCode: 350000,
    lnglat: [119.4543, 25.9222],
  },
  {
    name: formatMessage({ id: 'map.jx', defaultMessage: '江西省' }),
    adCode: 360000,
    lnglat: [116.0046, 28.6633],
  },
  {
    name: formatMessage({ id: 'map.hun', defaultMessage: '湖南省' }),
    adCode: 430000,
    lnglat: [113.0823, 28.2568],
  },
  {
    name: formatMessage({ id: 'map.gz', defaultMessage: '贵州省' }),
    adCode: 520000,
    lnglat: [106.6992, 26.7682],
  },
  {
    name: formatMessage({ id: 'map.yn', defaultMessage: '云南省' }),
    adCode: 530000,
    lnglat: [102.9199, 25.4663],
  },
  {
    name: formatMessage({ id: 'map.gd', defaultMessage: '广东省' }),
    adCode: 440000,
    lnglat: [113.12244, 23.009505],
  },
  {
    name: formatMessage({ id: 'map.gx', defaultMessage: '广西省' }),
    adCode: 450000,
    lnglat: [108.479, 23.1152],
  },
  {
    name: formatMessage({ id: 'map.hain', defaultMessage: '海南省' }),
    adCode: 460000,
    lnglat: [110.3893, 19.8516],
  },
  {
    name: formatMessage({ id: 'map.sh', defaultMessage: '上海市' }),
    adCode: 310000,
    lnglat: [121.4648, 31.2891],
  },
  {
    name: formatMessage({ id: 'map.xg', defaultMessage: '香港特别行政区' }),
    adCode: 810000,
    lnglat: [114.173355, 22.320048],
  },
  {
    name: formatMessage({ id: 'map.am', defaultMessage: '澳门' }),
    adCode: 820000,
    lnglat: [113.54909, 22.198951],
  },
];

export const asyncMap = (chart: ECharts, params: any, type: MapTypeEnum) => {
  const option: any = chart.getOption();
  const zoom = option.geo[0].zoom / (type == MapTypeEnum.Country ? 1.5 : 1);
  const center = option.geo[0].center;
  const top = option.geo[0].top;
  if (!isEmpty(params?.zoom)) {
    option.series[1].zoom = zoom;
    option.series[2].zoom = zoom;
    option.series[1].center = center;
    option.series[2].center = center;
  } else {
    option.series[1].center = center;
    option.series[2].center = center;
  }
  option.series[1].top = top;
  option.series[2].top = top + 10;

  chart.setOption(option);
};
