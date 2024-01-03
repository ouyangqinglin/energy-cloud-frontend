﻿/* *
 *
 * @author whiteshader@163.com
 * @datetime  2022/02/22
 *
 * */
import { MenuDataItem } from '@ant-design/pro-components';

export type RouterType = Omit<MenuDataItem, 'routes'> & {
  routes?: MenuDataItem[];
};

const routers: RouterType[] = [
  {
    path: '/index',
    name: 'index',
    component: '@/layouts/TabsLayout',
    locale: 'menu.index',
    routes: [
      {
        path: '/index',
        redirect: '/index/station',
      },
      {
        path: 'station',
        name: 'indexStation',
        component: './home-page',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.index',
      },
    ],
  },
  {
    path: '/screen',
    name: 'screen',
    layout: false,
    routes: [
      {
        path: '/screen',
        redirect: '/screen/demo-station',
      },
      {
        path: 'demo-station',
        name: 'demoStation',
        component: './screen/index',
      },
      {
        path: 'multi-site',
        name: 'multiSite',
        component: './screen/MultiSite',
      },
      {
        path: 'jiecheng',
        name: 'customScreen',
        component: './screen/customScreen',
      },
    ],
  },
  {
    path: '/station',
    name: 'station',
    component: '@/layouts/TabsLayout',
    locale: 'menu.station',
    routes: [
      {
        path: '/station',
        redirect: '/station/station-list',
      },
      {
        path: '/station/yt-station',
        name: 'ytStaion',
        component: './station/ytStation',
      },
      {
        path: 'station-list',
        name: 'stationList',
        component: './station/stationList',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.station.list',
      },
      {
        path: 'device-detail',
        component: './equipment/DeviceDetail',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.device.deviceMonitor',
      },
      {
        path: 'setting',
        name: 'setting',
        component: './station/Setting',
        wrappers: ['@/components/KeepAlive'],
        //keepAlive: true,
        locale: 'menu.station.setting',
      },
      {
        path: 'custom-page',
        name: 'customPage',
        component: './station/customPage',
      },
    ],
  },
  {
    path: '/exchange-monitor',
    component: '@/layouts/TabsLayout',
    locale: 'menu.exchangeMonitor',
    routes: [
      {
        path: '/exchange-monitor',
        redirect: '/exchange-monitor/real-time-monitor',
      },
      {
        path: 'real-time-monitor',
        name: 'realTimeMonitor',
        component: './exchange-monitor/RealTimeMonitor',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.exchangeMonitor.realTimeMonitor',
      },
      {
        path: 'charge-record',
        name: 'chargeRecord',
        component: './exchange-monitor/ChargeRecord',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.exchangeMonitor.chargeRecord',
      },
      {
        path: 'exchange-record',
        name: 'exchangeRecord',
        component: './exchange-monitor/ExchangeRecord',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.exchangeMonitor.exchangeRecord',
      },
      {
        path: 'travel-record',
        name: 'travelRecord',
        component: './exchange-monitor/TravelRecord',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.exchangeMonitor.travelRecord',
      },
    ],
  },
  {
    path: '/site-monitor',
    component: '@/layouts/TabsLayout',
    locale: 'menu.siteMonitor',
    routes: [
      {
        path: '/site-monitor',
        redirect: '/site-monitor/overview',
      },
      {
        path: 'overview',
        name: 'overview',
        component: './site-monitor/Overview',
        wrappers: ['@/components/KeepAlive'],
        //keepAlive: true,
        locale: 'menu.siteMonitor.overview',
      },
      {
        path: 'topo',
        name: 'topo',
        component: './site-monitor/Topo',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.siteMonitor.topo',
      },
      {
        path: 'electric-generate',
        name: 'electricGenerate',
        component: './site-monitor/ElectricGenerate',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.siteMonitor.electricGenerate',
      },
      {
        path: 'energy',
        name: 'energy',
        component: './site-monitor/Energy',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.siteMonitor.energy',
      },
      {
        path: 'electric-consumer',
        name: 'electricConsumer',
        component: './site-monitor/ElectricConsumer',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.siteMonitor.electricConsumer',
      },
      {
        path: 'device-monitor',
        name: 'deviceMonitor',
        component: './site-monitor/Device',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.siteMonitor.deviceMonitor',
      },
      {
        path: 'device-detail',
        component: './site-monitor/DeviceMonitor',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.siteMonitor.deviceDetail',
      },
      {
        path: 'run-log',
        name: 'runLog',
        component: './site-monitor/RunLog',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.siteMonitor.runLog',
      },
    ],
  },
  {
    path: '/station-manage',
    name: 'stationManage',
    component: '@/layouts/TabsLayout',
    routes: [
      {
        path: '/station-manage',
        redirect: '/station-manage/operation-monitor',
      },
      {
        path: '/station-manage/operation-monitor',
        name: 'operationMonitor',
        component: './station/stationManage/operationMonitor',
      },
      {
        path: '/station-manage/station',
        name: 'station',
        component: './station/stationManage/station',
      },
      {
        path: '/station-manage/report',
        name: 'report',
        component: './station/stationManage/report',
      },
      {
        path: '/station-manage/stat',
        name: 'stat',
        component: './station/stationManage/stat',
      },
      {
        path: '/station-manage/setting',
        name: 'setting',
        component: './station/stationManage/setting/index',
      },
    ],
  },
  {
    path: '/data-manage',
    name: 'dataManage',
    component: '@/layouts/TabsLayout',
    locale: 'menu.dataManage',
    routes: [
      {
        path: '/data-manage',
        redirect: '/data-manage/search',
      },
      {
        path: 'search',
        name: 'search',
        component: './data-manage/search',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.dataManage.search',
      },
      {
        path: 'report',
        name: 'report',
        component: './data-manage/report',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.dataManage.report',
      },
      {
        path: 'fault-tracing',
        name: 'faultTracing',
        component: './data-manage/faultTracing',
        wrappers: ['@/components/KeepAlive'],
      },
      {
        path: 'prediction',
        name: 'prediction',
        component: './data-manage/prediction',
        wrappers: ['@/components/KeepAlive'],
      },
    ],
  },
  {
    path: '/alarm',
    component: '@/layouts/TabsLayout',
    locale: 'menu.alarm',
    routes: [
      {
        path: '/alarm',
        redirect: '/alarm/current',
      },
      {
        path: 'current',
        name: 'current',
        component: './alarm/Current',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.alarm.current',
      },
      {
        path: 'history',
        name: 'history',
        component: './alarm/History',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.alarm.history',
      },
      {
        path: 'setting',
        name: 'alarmSetting',
        component: './alarm/Setting',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.alarm.setting',
      },
    ],
  },
  {
    path: '/equipment',
    name: 'equipment',
    component: '@/layouts/TabsLayout',
    locale: 'menu.deviceManage',
    routes: [
      {
        path: '/equipment',
        redirect: '/equipment/equipment-list',
      },
      {
        path: 'equipment-list',
        name: 'equipmentList',
        component: './equipment/equipment-list',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.deviceManage.deviceList',
      },
      {
        path: 'car-list',
        name: 'carList',
        component: './equipment/car-list',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.deviceManage.carList',
      },
      {
        path: 'battery-list',
        name: 'batteryList',
        component: './equipment/battery-list',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.deviceManage.batteryList',
      },
      {
        path: 'remote-upgrade',
        name: 'remoteUpgrade',
        component: './equipment/remote-upgrade',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.deviceManage.upgradeManage',
      },
      {
        path: 'device-detail',
        component: './equipment/DeviceDetail',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.device.deviceMonitor',
      },
    ],
  },
  {
    path: '/partner',
    name: 'partner',
    component: '@/layouts/TabsLayout',
    routes: [
      {
        path: '/partner',
        redirect: '/partner/service',
      },
      {
        path: 'service',
        name: 'service',
        component: './partner/service',
        wrappers: ['@/components/KeepAlive'],
      },
      {
        path: 'agent',
        name: 'agent',
        component: './partner/agent',
        wrappers: ['@/components/KeepAlive'],
      },
    ],
  },
  //升级管理
  {
    path: '/remote-upgrade',
    name: 'remote-upgrade',
    component: '@/layouts/TabsLayout',
    routes: [
      {
        path: '/remote-upgrade',
        redirect: '/remote-upgrade/package',
      },
      {
        path: 'package',
        name: 'remoteUpgradePackage',
        component: './remote-upgrade/package',
        wrappers: ['@/components/KeepAlive'],
      },
      {
        path: 'log',
        name: 'remoteUpgradeLog',
        component: './remote-upgrade/log',
        wrappers: ['@/components/KeepAlive'],
      },
    ],
  },
  {
    path: '/work-order',
    name: 'workOrder',
    component: '@/layouts/TabsLayout',
    locale: 'menu.workOrder',
    routes: [
      {
        path: '/work-order',
        redirect: '/work-order/install',
      },
      {
        path: 'install',
        name: 'install',
        component: './work-order/install',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.workOrder.install',
      },
      {
        path: 'maintenance',
        name: 'maintenance',
        component: './work-order/maintenance',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.workOrder.maintenance',
      },
      {
        path: 'fault',
        name: 'fault',
        component: './work-order/fault',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.workOrder.fault',
      },
    ],
  },
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        layout: false,
        name: 'login',
        component: './user/login',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        name: 'register-result',
        icon: 'smile',
        path: '/user/register-result',
        component: './user/register-result',
      },
      {
        name: 'register',
        icon: 'smile',
        path: '/user/register',
        component: './user/register',
      },
      {
        component: '404',
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    component: '@/layouts/TabsLayout',
    routes: [
      {
        path: '/dashboard',
        redirect: '/dashboard/analysis',
      },
      {
        name: 'analysis',
        icon: 'smile',
        path: '/dashboard/analysis',
        component: './dashboard/analysis',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        locale: 'menu.dashboard.analysis',
      },
      {
        name: 'monitor',
        icon: 'smile',
        path: '/dashboard/monitor',
        component: './dashboard/monitor',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        locale: 'menu.dashboard.monitor',
      },
      {
        name: 'workplace',
        icon: 'smile',
        path: '/dashboard/workplace',
        component: './dashboard/workplace',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        locale: 'menu.dashboard.workplace',
      },
    ],
  },
  {
    name: 'account',
    icon: 'user',
    path: '/account',
    component: '@/layouts/TabsLayout',
    routes: [
      {
        path: '/account',
        redirect: '/account/center',
      },
      {
        name: 'center',
        icon: 'smile',
        path: '/account/center',
        component: './account/center',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        locale: 'menu.account.center',
      },
      {
        name: 'settings',
        icon: 'smile',
        path: '/account/settings',
        component: './account/settings',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        locale: 'menu.account.settings',
      },
    ],
  },
  {
    path: '/system',
    name: 'system',
    icon: 'BugOutlined',
    component: '@/layouts/TabsLayout',
    locale: 'menu.systemManage',
    routes: [
      {
        path: '/system',
        redirect: '/system/notice',
      },
      {
        path: 'authorization',
        name: 'authorization',
        component: 'system/authorization',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.systemManage.authorization',
      },
      {
        path: '/system/user',
        name: 'user',
        icon: 'PartitionOutlined',
        component: 'system/UserManage',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.title.user',
      },
      {
        path: '/system/menu',
        name: 'menu',
        icon: 'PartitionOutlined',
        component: 'system/menu/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.title.menu',
      },
      {
        path: '/system/role',
        name: 'role',
        icon: 'PartitionOutlined',
        component: 'system/role/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.title.role',
      },
      {
        path: '/system/org',
        name: 'org',
        icon: 'PartitionOutlined',
        component: 'system/dept/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
      },
      {
        path: '/system/organization',
        name: 'organization',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        component: 'system/organization/index',
        locale: 'menu.systemManage.organization',
      },
      {
        path: '/system/post',
        name: 'post',
        icon: 'PartitionOutlined',
        component: 'system/post/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.title.post',
      },
      {
        path: '/system/dict',
        name: 'dict',
        icon: 'PartitionOutlined',
        component: 'system/dict/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.title.dict',
      },
      {
        path: '/system/dict-data/index/:id?',
        name: 'dictData',
        icon: 'PartitionOutlined',
        component: 'system/dictData/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.title.dictData',
      },
      {
        path: '/system/config',
        name: 'config',
        icon: 'PartitionOutlined',
        component: 'system/config/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.title.config',
      },
      {
        path: '/system/notice',
        name: 'notice',
        icon: 'PartitionOutlined',
        component: 'system/notice/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.title.notice',
      },
      {
        path: '/system/operlog',
        name: 'operlog',
        icon: 'PartitionOutlined',
        component: 'monitor/operlog',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.title.operlog',
      },
      {
        path: 'product',
        name: 'product',
        component: 'product-manage/Product',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.systemManage.product',
      },
      {
        path: 'product-detail',
        name: 'productDetail',
        component: 'product-manage/ProductDetail',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.system.productDetail',
      },
      {
        path: '/system/version',
        name: 'version',
        icon: 'PartitionOutlined',
        component: 'system/version/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.version',
      },
    ],
  },
  {
    name: 'user-manager',
    path: '/user-manager',
    component: '@/layouts/TabsLayout',
    routes: [
      {
        path: '/user-manager',
        redirect: '/user-manager/accounts',
      },
      {
        name: 'accounts',
        icon: 'PartitionOutlined',
        path: '/user-manager/accounts',
        component: 'user-manager/accounts',
        wrappers: ['@/components/KeepAlive'],
      },
      {
        path: 'authority',
        name: 'authority',
        component: './user-manager/authority',
        wrappers: ['@/components/KeepAlive'],
      },
    ],
  },
  {
    name: 'monitor',
    icon: 'BugOutlined',
    path: '/monitor',
    component: '@/layouts/TabsLayout',
    routes: [
      {
        path: '/',
        redirect: '/monitor/online',
      },
      {
        name: 'onlineUser',
        icon: 'PartitionOutlined',
        path: '/monitor/online',
        component: 'monitor/online',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        locale: 'menu.title.onlineUser',
      },
      {
        name: 'job',
        icon: 'PartitionOutlined',
        path: '/monitor/job',
        component: 'monitor/job',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        locale: 'menu.title.job',
      },
      {
        name: 'joblog',
        icon: 'PartitionOutlined',
        path: '/monitor/job-log/index/:jobId?',
        component: 'monitor/joblog',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        locale: 'menu.title.joblog',
      },
      {
        name: 'druid',
        icon: 'PartitionOutlined',
        path: '/monitor/druid',
        component: 'monitor/druid',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        locale: 'menu.title.druid',
      },
      {
        name: 'serverInfo',
        icon: 'PartitionOutlined',
        path: '/monitor/server',
        component: 'monitor/server',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        locale: 'menu.title.serverInfo',
      },
      {
        name: 'cacheInfo',
        icon: 'PartitionOutlined',
        path: '/monitor/cache',
        component: 'monitor/cache',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        locale: 'menu.title.cacheInfo',
      },
      {
        name: 'cacheList',
        icon: 'PartitionOutlined',
        path: '/monitor/cacheList',
        component: 'monitor/cacheList',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        locale: 'menu.title.cacheList',
      },
    ],
  },
  {
    name: 'tool',
    icon: 'BugOutlined',
    path: '/tool',
    component: '@/layouts/TabsLayout',
    routes: [
      {
        path: '/',
        redirect: '/tool/gen',
      },
      {
        name: 'gen',
        icon: 'PartitionOutlined',
        path: '/tool/gen',
        component: 'tool/gen/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        locale: 'menu.title.gen',
      },
      {
        name: 'design',
        icon: 'PartitionOutlined',
        path: '/tool/build',
        component: 'tool/builder',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        locale: 'menu.title.design',
      },
      {
        name: 'swagger',
        icon: 'PartitionOutlined',
        path: '/tool/swagger',
        component: 'tool/swagger',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        locale: 'menu.title.swagger',
      },
    ],
  },
  {
    path: '/',
    component: '@/layouts/TabsLayout',
    routes: [
      {
        path: '/',
        redirect: '/index',
      },
      {
        path: 'workbench',
        name: 'workbench',
        component: 'workbench',
        wrappers: ['@/components/KeepAlive'],
        keepAlive: true,
        locale: 'menu.workbench',
        access: 'workbench',
      },
    ],
  },
  {
    path: '/download',
    layout: false,
    routes: [
      {
        path: '/download/app',
        name: 'download-app',
        component: './download/downloadApp',
      },
      {
        component: '404',
      },
    ],
  },
  {
    component: './404',
  },
];

const getPathLocaleMap = (data: RouterType[], parentPath = ''): Record<string, string> => {
  let pathLocalMap: Record<string, string> = {};
  data?.forEach((item) => {
    const path = item?.path?.startsWith?.('/') ? item?.path : parentPath + '/' + item?.path;
    if (item?.locale) {
      pathLocalMap[path] = item?.locale;
    }
    if (item?.routes && item?.routes?.length) {
      const result = getPathLocaleMap(item.routes, path);
      Object.assign(pathLocalMap, result);
    }
  });
  return pathLocalMap;
};

export default routers;

export { getPathLocaleMap };
