﻿/* *
 *
 * @author whiteshader@163.com
 * @datetime  2022/02/22
 *
 * */

export default [
  {
    path: '/index',
    name: 'index',
    component: '@/layouts/TabsLayout',
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
        title: 'menu.index',
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
    ],
  },
  {
    path: '/station',
    name: 'station',
    component: '@/layouts/TabsLayout',
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
        title: 'menu.station.list',
      },
      {
        path: 'device-detail',
        component: './equipment/DeviceDetail',
        wrappers: ['@/components/KeepAlive'],
        title: 'menu.device.deviceMonitor',
      },
      {
        path: 'setting',
        component: './station/Setting',
        wrappers: ['@/components/KeepAlive'],
        title: 'menu.station.setting',
      },
      {
        path: 'custom-page',
        name: 'customPage',
        component: './station/customPage',
      },
    ],
  },
  {
    path: '/site-monitor',
    component: '@/layouts/TabsLayout',
    routes: [
      {
        path: '/site-monitor',
        redirect: '/site-monitor/overview',
      },
      {
        path: 'overview',
        component: './site-monitor/Overview',
        wrappers: ['@/components/KeepAlive'],
      },
      {
        path: 'topo',
        component: './site-monitor/Topo',
        wrappers: ['@/components/KeepAlive'],
      },
      {
        path: 'electric-generate',
        component: './site-monitor/ElectricGenerate',
        wrappers: ['@/components/KeepAlive'],
        title: 'menu.siteMonitor.electricGenerate',
      },
      {
        path: 'energy',
        component: './site-monitor/Energy',
        wrappers: ['@/components/KeepAlive'],
        title: 'menu.siteMonitor.energy',
      },
      {
        path: 'electric-consumer',
        component: './site-monitor/ElectricConsumer',
        wrappers: ['@/components/KeepAlive'],
        title: 'menu.siteMonitor.electricConsumer',
      },
      {
        path: 'device-monitor',
        component: './site-monitor/Device',
        wrappers: ['@/components/KeepAlive'],
      },
      {
        path: 'device-detail',
        component: './site-monitor/DeviceMonitor',
        wrappers: ['@/components/KeepAlive'],
        title: 'menu.siteMonitor.deviceDetail',
      },
      {
        path: 'run-log',
        component: './site-monitor/RunLog',
        wrappers: ['@/components/KeepAlive'],
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
      },
      {
        path: 'report',
        name: 'report',
        component: './data-manage/report',
        wrappers: ['@/components/KeepAlive'],
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
    routes: [
      {
        path: 'current',
        component: './alarm/Current',
        wrappers: ['@/components/KeepAlive'],
      },
      {
        path: 'history',
        component: './alarm/History',
        wrappers: ['@/components/KeepAlive'],
      },
      {
        path: 'setting',
        component: './alarm/Setting',
        wrappers: ['@/components/KeepAlive'],
      },
    ],
  },
  {
    path: '/equipment',
    name: 'equipment',
    component: '@/layouts/TabsLayout',
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
      },
      {
        path: 'remote-upgrade',
        name: 'remoteUpgrade',
        component: './equipment/remote-upgrade',
        wrappers: ['@/components/KeepAlive'],
      },
      {
        path: 'device-detail',
        component: './equipment/DeviceDetail',
        wrappers: ['@/components/KeepAlive'],
        title: 'menu.device.deviceMonitor',
      },

      // {
      //   path: 'upgrade',
      //   routes: [
      //     {
      //       path: '/equipment/upgrade',
      //       redirect: '/equipment/upgrade/package',
      //     },
      //     {
      //       path: 'package',
      //       name: 'remoteUpgradePackage',
      //       component: './remote-upgrade/package',
      //       wrappers: ['@/components/KeepAlive'],
      //     },
      //     {
      //       path: 'log',
      //       name: 'remoteUpgradeLog',
      //       component: './remote-upgrade/log',
      //       wrappers: ['@/components/KeepAlive'],
      //     },
      //   ],
      // },
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
      },
      {
        path: 'maintenance',
        name: 'maintenance',
        component: './work-order/maintenance',
        wrappers: ['@/components/KeepAlive'],
      },
      {
        path: 'fault',
        name: 'fault',
        component: './work-order/fault',
        wrappers: ['@/components/KeepAlive'],
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
        title: 'menu.dashboard.analysis',
      },
      {
        name: 'monitor',
        icon: 'smile',
        path: '/dashboard/monitor',
        component: './dashboard/monitor',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.dashboard.monitor',
      },
      {
        name: 'workplace',
        icon: 'smile',
        path: '/dashboard/workplace',
        component: './dashboard/workplace',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.dashboard.workplace',
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
        title: 'menu.account.center',
      },
      {
        name: 'settings',
        icon: 'smile',
        path: '/account/settings',
        component: './account/settings',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.account.settings',
      },
    ],
  },
  {
    name: 'system',
    icon: 'BugOutlined',
    path: '/system',
    component: '@/layouts/TabsLayout',
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
      },
      {
        name: 'user',
        icon: 'PartitionOutlined',
        path: '/system/user',
        component: 'system/UserManage',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.user',
      },
      {
        name: 'menu',
        icon: 'PartitionOutlined',
        path: '/system/menu',
        component: 'system/menu/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.menu',
      },
      {
        name: 'role',
        icon: 'PartitionOutlined',
        path: '/system/role',
        component: 'system/role/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.role',
      },
      {
        name: 'org',
        icon: 'PartitionOutlined',
        path: '/system/org',
        component: 'system/dept/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
      },
      {
        name: 'organization',
        path: '/system/organization',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        component: 'system/organization/index',
      },
      {
        name: 'post',
        icon: 'PartitionOutlined',
        path: '/system/post',
        component: 'system/post/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.post',
      },
      {
        name: 'dict',
        icon: 'PartitionOutlined',
        path: '/system/dict',
        component: 'system/dict/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.dict',
      },
      {
        name: 'dictData',
        icon: 'PartitionOutlined',
        path: '/system/dict-data/index/:id?',
        component: 'system/dictData/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.dictData',
      },
      {
        name: 'config',
        icon: 'PartitionOutlined',
        path: '/system/config',
        component: 'system/config/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.config',
      },
      {
        name: 'notice',
        icon: 'PartitionOutlined',
        path: '/system/notice',
        component: 'system/notice/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.notice',
      },
      {
        name: 'operlog',
        icon: 'PartitionOutlined',
        path: '/system/operlog',
        component: 'monitor/operlog',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.operlog',
      },
      {
        path: 'product',
        name: 'product',
        component: 'product-manage/Product',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
      },
      {
        path: 'product-detail',
        name: 'productDetail',
        component: 'product-manage/ProductDetail',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.system.productDetail',
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
        title: 'menu.title.onlineUser',
      },
      {
        name: 'job',
        icon: 'PartitionOutlined',
        path: '/monitor/job',
        component: 'monitor/job',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.job',
      },
      {
        name: 'joblog',
        icon: 'PartitionOutlined',
        path: '/monitor/job-log/index/:jobId?',
        component: 'monitor/joblog',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.joblog',
      },
      {
        name: 'druid',
        icon: 'PartitionOutlined',
        path: '/monitor/druid',
        component: 'monitor/druid',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.druid',
      },
      {
        name: 'serverInfo',
        icon: 'PartitionOutlined',
        path: '/monitor/server',
        component: 'monitor/server',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.serverInfo',
      },
      {
        name: 'cacheInfo',
        icon: 'PartitionOutlined',
        path: '/monitor/cache',
        component: 'monitor/cache',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.cacheInfo',
      },
      {
        name: 'cacheList',
        icon: 'PartitionOutlined',
        path: '/monitor/cacheList',
        component: 'monitor/cacheList',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.cacheList',
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
        title: 'menu.title.gen',
      },
      {
        name: 'design',
        icon: 'PartitionOutlined',
        path: '/tool/build',
        component: 'tool/builder',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.design',
      },
      {
        name: 'swagger',
        icon: 'PartitionOutlined',
        path: '/tool/swagger',
        component: 'tool/swagger',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.swagger',
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
        title: 'menu.workbench',
        access: 'workbench',
      },
    ],
  },
  {
    component: './404',
  },
];
