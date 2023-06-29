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
    layout: false,
    component: '@/layouts',
    routes: [
      {
        path: '/index',
        redirect: '/index/station',
      },
      {
        path: 'station',
        name: 'indexStation',
        component: './home-page',
      },
    ],
  },
  {
    path: '/screen',
    name: 'screen',
    layout: false,
    menu: 'top',
    component: '@/layouts',
    routes: [
      {
        path: '/screen',
        redirect: '/screen/demo-station',
      },
      {
        path: '/screen/demo-station',
        name: 'demoStation',
        component: './screen/index',
      },
    ],
  },
  {
    path: '/station',
    name: 'station',
    layout: false,
    menu: 'sider',
    component: '@/layouts',
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
      },
      {
        path: 'custom-page',
        name: 'customPage',
        component: './station/customPage',
      },
    ],
  },
  {
    path: '/station-manage',
    name: 'stationManage',
    layout: false,
    menu: 'top',
    component: '@/layouts',
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
        path: '/station-manage/device',
        name: 'device',
        component: './station/stationManage/device',
      },
      {
        path: '/station-manage/alarm',
        name: 'alarm',
        component: './station/stationManage/alarm',
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
    path: '/equipment',
    name: 'equipment',
    layout: false,
    menu: 'sider',
    component: '@/layouts',
    routes: [
      {
        path: '/equipment',
        redirect: '/equipment/equipment-list',
      },
      {
        path: 'equipment-list',
        name: 'equipmentList',
        component: './equipment/equipment-list',
      },
      {
        path: 'alarm',
        name: 'alarm',
        component: './equipment/alarm',
      },
      {
        path: 'operation-log',
        name: 'operationLog',
        component: './equipment/operationLog',
      },
    ],
  },
  {
    path: '/data-manage',
    name: 'dataManage',
    layout: false,
    menu: 'sider',
    component: '@/layouts',
    routes: [
      {
        path: '/data-manage',
        redirect: '/data-manage/search',
      },
      {
        path: 'search',
        name: 'search',
        component: './data-manage/search',
      },
      {
        path: 'report',
        name: 'report',
        component: './data-manage/report',
      },
      {
        path: 'fault-tracing',
        name: 'faultTracing',
        component: './data-manage/faultTracing',
      },
      {
        path: 'prediction',
        name: 'prediction',
        component: './data-manage/prediction',
      },
    ],
  },
  {
    path: '/partner',
    name: 'partner',
    layout: false,
    menu: 'sider',
    component: '@/layouts',
    routes: [
      {
        path: '/partner',
        redirect: '/partner/service',
      },
      {
        path: 'service',
        name: 'service',
        component: './partner/service',
      },
    ],
  },
  {
    path: '/remote-upgrade',
    name: 'remote-upgrade',
    layout: false,
    menu: 'sider',
    component: '@/layouts',
    routes: [
      {
        path: '/remote-upgrade',
        redirect: '/remote-upgrade/index',
      },
      {
        path: 'index',
        name: 'remoteUpgradeIndex',
        component: './remote-upgrade',
      },
    ],
  },
  {
    path: '/work-order',
    name: 'workOrder',
    layout: false,
    menu: 'sider',
    component: '@/layouts',
    routes: [
      {
        path: '/work-order',
        redirect: '/work-order/install',
      },
      {
        path: 'install',
        name: 'install',
        component: './work-order/install',
      },
      {
        path: 'maintenance',
        name: 'maintenance',
        component: './work-order/maintenance',
      },
      {
        path: 'fault',
        name: 'fault',
        component: './work-order/fault',
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
    layout: false,
    menu: 'sider',
    component: '@/layouts',
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
    layout: false,
    component: '@/layouts',
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
    layout: false,
    menu: 'sider',
    component: '@/layouts',
    routes: [
      {
        path: '/',
        redirect: '/system/user',
      },
      {
        path: 'authorization',
        name: 'authorization',
        component: 'system/authorization',
      },
      {
        name: 'user',
        icon: 'PartitionOutlined',
        path: '/system/user',
        component: 'system/user/index',
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
        name: 'dept',
        icon: 'PartitionOutlined',
        path: '/system/dept',
        component: 'system/dept/index',
        access: 'authorize',
        wrappers: ['@/components/KeepAlive'],
        KeepAlive: true,
        title: 'menu.title.dept',
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
        name: 'log',
        icon: 'BugOutlined',
        path: '/system/log/',
        routes: [
          {
            path: '/',
            redirect: '/system/log/operlog',
          },
          {
            name: 'operlog',
            icon: 'PartitionOutlined',
            path: '/system/log/operlog',
            component: 'monitor/operlog',
            access: 'authorize',
            wrappers: ['@/components/KeepAlive'],
            KeepAlive: true,
            title: 'menu.title.operlog',
          },
          {
            name: 'loginInfo',
            icon: 'PartitionOutlined',
            path: '/system/log/logininfor',
            component: 'monitor/logininfor',
            access: 'authorize',
            wrappers: ['@/components/KeepAlive'],
            KeepAlive: true,
            title: 'menu.title.loginInfo',
          },
        ],
      },
    ],
  },
  {
    name: 'user-manager',
    path: '/user-manager',
    layout: false,
    menu: 'sider',
    component: '@/layouts',
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
      },
      {
        path: 'authority',
        name: 'authority',
        component: './user-manager/authority',
      },
    ],
  },
  {
    name: 'monitor',
    icon: 'BugOutlined',
    path: '/monitor',
    layout: false,
    menu: 'sider',
    component: '@/layouts',
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
    layout: false,
    menu: 'sider',
    component: '@/layouts',
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
    redirect: '/index',
  },
  {
    component: './404',
  },
];
