/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-01 15:27:03
 * @LastEditTime: 2023-09-21 16:46:19
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SiteMap\config.ts
 */

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
  { name: '台湾省', adCode: 710000, lnglat: [121.5135, 25.0308] },
  { name: '黑龙江省', adCode: 230000, lnglat: [127.9688, 45.368] },
  { name: '内蒙古自治区', adCode: 150000, lnglat: [110.3467, 41.4899] },
  { name: '吉林省', adCode: 220000, lnglat: [125.8154, 44.2584] },
  { name: '北京市', adCode: 110000, lnglat: [116.4551, 40.2539] },
  { name: '辽宁省', adCode: 210000, lnglat: [123.1238, 42.1216] },
  { name: '河北省', adCode: 130000, lnglat: [114.4995, 38.1006] },
  { name: '天津市', adCode: 120000, lnglat: [117.4219, 39.4189] },
  { name: '山西省', adCode: 140000, lnglat: [112.3352, 37.9413] },
  { name: '陕西省', adCode: 610000, lnglat: [109.1162, 34.2004] },
  { name: '甘肃省', adCode: 620000, lnglat: [103.5901, 36.3043] },
  { name: '宁夏', adCode: 640000, lnglat: [106.3586, 38.1775] },
  { name: '青海省', adCode: 630000, lnglat: [101.4038, 36.8207] },
  { name: '新疆维吾尔自治区', adCode: 650000, lnglat: [87.9236, 43.5883] },
  { name: '西藏自治区', adCode: 540000, lnglat: [91.11, 29.97] },
  { name: '四川省', adCode: 510000, lnglat: [103.9526, 30.7617] },
  { name: '重庆市', adCode: 500000, lnglat: [108.384366, 30.439702] },
  { name: '山东省', adCode: 370000, lnglat: [117.1582, 36.8701] },
  { name: '河南省', adCode: 410000, lnglat: [113.4668, 34.6234] },
  { name: '江苏省', adCode: 320000, lnglat: [118.8062, 31.9208] },
  { name: '安徽省', adCode: 340000, lnglat: [117.29, 32.0581] },
  { name: '湖北省', adCode: 420000, lnglat: [114.3896, 30.6628] },
  { name: '浙江省', adCode: 330000, lnglat: [119.5313, 29.8773] },
  { name: '福建省', adCode: 350000, lnglat: [119.4543, 25.9222] },
  { name: '江西省', adCode: 360000, lnglat: [116.0046, 28.6633] },
  { name: '湖南省', adCode: 430000, lnglat: [113.0823, 28.2568] },
  { name: '贵州省', adCode: 520000, lnglat: [106.6992, 26.7682] },
  { name: '云南省', adCode: 530000, lnglat: [102.9199, 25.4663] },
  { name: '广东省', adCode: 440000, lnglat: [113.12244, 23.009505] },
  { name: '广西省', adCode: 450000, lnglat: [108.479, 23.1152] },
  { name: '海南省', adCode: 460000, lnglat: [110.3893, 19.8516] },
  { name: '上海市', adCode: 310000, lnglat: [121.4648, 31.2891] },
  { name: '香港特别行政区', adCode: 810000, lnglat: [114.173355, 22.320048] },
  { name: '澳门', adCode: 820000, lnglat: [113.54909, 22.198951] },
];
