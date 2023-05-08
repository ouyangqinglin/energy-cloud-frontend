import { Request, Response } from 'express';

export default {
  'GET /api/screen/weather/1': {
    msg: '操作成功',
    code: 200,
    data: {
      weather: '晴',
    },
  },
  'GET /api/screen/device/1': {
    msg: '操作成功',
    code: 200,
    data: {
      online: 0,
      code: '12345',
      model: 'Ener Smart 215-P100A',
      sn: '123456',
      name: '1#储能',
      type: '工商业家储',
      childSystem: '储能',
      createdTime: '2023-4-26 16:25:00',
      activeTime: '2023-4-26 16:25:00',
      onlineTime: '2023-4-26 16:25:00',
      creator: '王某某',
      onlineHour: '1天22h',
      station: '光储充示范站',

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
      chart: [
        { time: '03:00', value: 20 },
        { time: '04:00', value: 30 },
        { time: '05:00', value: 40 },
        { time: '06:00', value: 60 },
        { time: '07:00', value: 20 },
        { time: '08:00', value: 30 },
        { time: '09:00', value: 100 },
        { time: '10:00', value: 150 },
        { time: '11:00', value: 0 },
        { time: '12:00', value: 40 },
        { time: '13:00', value: 80 },
        { time: '14:00', value: 90 },
        { time: '15:00', value: 150 },
      ],
      loop: {
        aVoltage: '380V',
        bVoltage: '380V',
        cVoltage: '380V',
        aElectric: '10A',
        bElectric: '10A',
        cElectric: '10A',
        abVoltage: '380V',
        bcVoltage: '380V',
        caVoltage: '380V',
        totalActive: '100KW',
        totalReactive: '100KW',
        totalApparent: '100KW',
        totalPower: 0.8,
        forwardActive: '100KW',
        reverseActive: '100KW',
        forwardReactive: '100KW',
        reverseReactive: '100KW',
      },
      product: {
        model: 'YTEDC1',
        type: '充电桩',
        company: ' 永泰数能',
        desc: 'YTEDC1为全新一代一体式电动汽车直流恒功率快速充电桩。系统内置30/40kW恒功率充电模块，最高输出电压1000V，满足各类车辆充电需求。模块采用隔离风道灌胶设计，可靠性高，可应用干各类恶劣环境的场景。系统兼容60~320kW功率配置兼容单枪双枪及功率分配, 兼容多桩环网方案，可广泛应用于各类公共及专用充电场站。',
      },
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
  'GET /api/screen/charging/station': {
    msg: '操作成功',
    code: 200,
    data: {
      chargingPower: '100kW',
      chargingCapacityToday: '100kWh',
      gunIdle: '8',
      gunInUse: '4',
      earningsToday: '100元',
    },
  },
  'GET /api/screen/energy/storage': {
    msg: '操作成功',
    code: 200,
    data: {
      realtimeStatus: 1,
      chargingAndDischargingPower: '100kW',
      soc: '33.33%',
      soh: '99.33%',
    },
  },
};
