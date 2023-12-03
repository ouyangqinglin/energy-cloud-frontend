/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-02 15:51:12
 * @LastEditTime: 2023-12-02 15:51:13
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\home-page\ExchangeSite\service.ts
 */

import request from '@/utils/request';
import SiteData from './SiteMap/site.json';
import VehicleData from './SiteMap/vehicle.json';
import AllData from './LineChart/energy.json';
import BatteryData from './LineChart/battery.json';
import ExchangeData from './LineChart/exchange.json';

const statisticsData = {
  code: 200,
  data: {
    site: 12,
    driving: 11,
    static: 0,
    offline: 178,
    sleep: 12,
  },
};

const totalData = {
  data: {
    areaList: [],
    batteryMap: {
      '00': 139,
    },
    carPercent: 0.33,
    exchangeCount: 3599,
    gps: {
      '00': 61,
      '01': 140,
    },
    reduceCarbon: 435.22,
    stationNum: 12,
    totalDischarge: 576668.67,
    totalDischargeUse: 1.37,
    totalEnergy: 579183.61,
    totalEnergyUse: 1.3849,
    totalMile: 418225.0,
    totalVehicle: 201,
    totalBattery: 139,
    site: 12,
    driving: 11,
    static: 0,
    offline: 178,
    sleep: 12,
  },
  messge: '',
  status: 200,
};

export const getSite = () => {
  return Promise.resolve(SiteData);
};

export const getVehicle = () => {
  return Promise.resolve(VehicleData);
};

export const getStatistics = () => {
  return Promise.resolve(totalData);
};

export const getLineAllData = () => {
  return Promise.resolve(AllData as any);
};

export const getLineBatteryData = () => {
  return Promise.resolve(BatteryData as any);
};

export const getLineExchangeData = () => {
  return Promise.resolve(ExchangeData as any);
};
