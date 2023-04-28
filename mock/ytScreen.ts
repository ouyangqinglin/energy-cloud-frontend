import { Request, Response } from 'express';

export default {
  'GET /api/screen/device/1': {
    msg: '操作成功',
    code: 200,
    data: {
      name: '720KW充电桩',
      aVoltage: '380V',
      bVoltage: '380V',
      cVoltage: '380V',
      aElectric: '10A',
      bElectric: '10A',
      cElectric: '10A',
      currentPower: '100KW',
      todayCharge: '100KW',
      totalCharge: '100KW',
      todayChargeRevenue: '288元',
      totalChargeRevenue: '1,288元',
      aGun1: 1,
      bGun1: 0,
      aGun2: 0,
      bGun2: 1,
      aGun3: 0,
      bGun3: 1,
      aGun4: 0,
      bGun4: 0,
    },
  },
  'GET /api/screen/siteInfo': {
    msg: '操作成功',
    code: 200,
    data: {
      siteName: '永泰光储充示范站',
      siteType: '光储充站',
      voltageLevel: '0.4KW',
      transformerCapacity: '800kW',
      photovoltaicPanel: '280kWp',
      energyStorageCapacity: '500kWh/200kW',
      chargingStation: '500kWh',
      location: '深圳市龙华区观湖街道鹭湖社区观',
    },
  },
};
