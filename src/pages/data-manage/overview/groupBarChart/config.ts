import { formatMessage } from '@/utils';
import { SiteTypeStrEnum } from '@/utils/enum';

export type SiteDataType = {
  totalSiteCount: number | null;
  commissioningCount: number;
  constructCount: number;
  alarmSiteCount: number;
  normalSiteCount: number;
  siteTypeGroupCount: Record<
    number,
    {
      name: string;
      count: number;
      percent: number;
      alarmCount: number;
      normalCount: number;
    }
  >;
};

export type DeviceDataType = {
  totalCount: number | null;
  installCount: number;
  noInstallCount: number;
  onlineCount: number;
  offlineCount: number;
  map: Record<
    number,
    {
      total: number;
      name: string;
      onlineCount: number;
      offlineCount: number;
      percent: number;
    }
  >;
};

export type AlarmDataType = {
  totalCount: number | null;
  alarmCount: number;
  eliminatedCount: number;
  map: Record<
    string,
    {
      alarm: number;
      eliminated: number;
      total: number;
      percent: number;
    }
  >;
};

export type PieDataType = {
  name: string;
  value: number;
  percent?: string;
  text: string;
};

export const enum deviceTypeStrEnum {
  OTHER = '0',
  PV = '513',
  ES = '514',
  CS = '515',
}

export const enum alarmTypeStrEnum {
  INFO = 'info',
  WARN = 'warn',
  ALARM = 'alarm',
  ERROR = 'error',
}

export const siteTitle = {
  text: 0,
  subtext: formatMessage({ id: 'dataManage.1020', defaultMessage: '站点总数' }),
};
export const deviceTitle = {
  text: 0,
  subtext: formatMessage({ id: 'dataManage.1021', defaultMessage: '设备总数' }),
};
export const alarmTitle = {
  text: 0,
  subtext: formatMessage({ id: 'dataManage.1022', defaultMessage: '告警总数' }),
};

export const barConfig = (
  data: PieDataType[] = [],
  total = { text: 0, subtext: '总数' },
  colors: string[] = [],
) => ({
  color: colors,
  legend: {
    bottom: '-1%',
    itemWidth: 8, // 设置图例图形的宽度
    itemHeight: 8, // 设置图例图形的高度
    icon: 'circle',
    textStyle: {
      color: '#000',
    },
    formatter: (name: string) => {
      const row: any = data.find((i: any) => i.name == name);
      return `${row.name} ${row.percent}`;
    },
  },
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(9,12,21,0.8)',
    textStyle: {
      color: 'white',
    },
    formatter: (params: any) => {
      const row = params.data;
      return `${params.marker}${row.name} ${formatMessage({
        id: 'dataManage.1032',
        defaultMessage: '总数',
      })}：${row.value} ${row.text}`;
    },
  },
  title: {
    text: total.text,
    left: 'center',
    top: 'center',
    itemGap: 5,
    textVerticalAlign: 'top',
    subtext: total.subtext,
    textStyle: {
      fontSize: 20,
      lineHeight: 20,
      color: '#000',
      fontWeight: 500,
    },
    subtextStyle: {
      fontSize: 12,
      lineHeight: 14,
      color: '#000',
    },
  },
  series: [
    {
      type: 'pie',
      radius: ['40%', '60%'],
      data: data,
      label: {
        show: false,
      },
    },
  ],
});

export const siteMap = new Map([
  [
    SiteTypeStrEnum.PV,
    {
      name: formatMessage({ id: 'dataManage.1023', defaultMessage: '光伏站点' }),
      color: '#FFC542',
    },
  ],
  [
    SiteTypeStrEnum.ES,
    {
      name: formatMessage({ id: 'dataManage.1024', defaultMessage: '储能站点' }),
      color: '#007DFF',
    },
  ],
  [
    SiteTypeStrEnum.CS,
    {
      name: formatMessage({ id: 'dataManage.1025', defaultMessage: '充电站点' }),
      color: '#3DD598',
    },
  ],
  [
    SiteTypeStrEnum.ES_CS,
    {
      name: formatMessage({ id: 'dataManage.1026', defaultMessage: '储充站点' }),
      color: '#FF9AD5',
    },
  ],
  [
    SiteTypeStrEnum.PV_CS,
    {
      name: formatMessage({ id: 'dataManage.1027', defaultMessage: '光充站点' }),
      color: '#FF974A',
    },
  ],
  [
    SiteTypeStrEnum.PV_ES,
    {
      name: formatMessage({ id: 'dataManage.1028', defaultMessage: '光储站点' }),
      color: '#50B5FF',
    },
  ],
  [
    SiteTypeStrEnum.PV_ES_CS,
    {
      name: formatMessage({ id: 'dataManage.1029', defaultMessage: '光储充站点' }),
      color: '#FF7B7B',
    },
  ],
  [
    SiteTypeStrEnum.OTHER,
    {
      name: formatMessage({ id: 'dataManage.1031', defaultMessage: '暂无' }),
      color: '#7A79FF',
    },
  ],
]);

export const deviceMap = new Map([
  [
    deviceTypeStrEnum.PV,
    {
      name: formatMessage({ id: 'device.pv', defaultMessage: '光伏' }),
      color: '#FFC542',
    },
  ],
  [
    deviceTypeStrEnum.ES,
    {
      name: formatMessage({ id: 'device.storage', defaultMessage: '储能' }),
      color: '#007DFF',
    },
  ],
  [
    deviceTypeStrEnum.CS,
    {
      name: formatMessage({ id: 'device.chargingPile', defaultMessage: '充电桩' }),
      color: '#007DFF',
    },
  ],
  [
    deviceTypeStrEnum.OTHER,
    {
      name: formatMessage({ id: 'dataManage.1030', defaultMessage: '其他' }),
      color: '#7A79FF',
    },
  ],
]);

export const alarmMap = new Map([
  [
    alarmTypeStrEnum.INFO,
    {
      name: formatMessage({ id: 'alarmManage.tips', defaultMessage: '提示' }),
      color: '#159aff',
    },
  ],
  [
    alarmTypeStrEnum.WARN,
    {
      name: formatMessage({ id: 'alarmManage.secondary', defaultMessage: '次要' }),
      color: '#01cfa1',
    },
  ],
  [
    alarmTypeStrEnum.ALARM,
    {
      name: formatMessage({ id: 'alarmManage.importance', defaultMessage: '重要' }),
      color: '#ffc22a',
    },
  ],
  [
    alarmTypeStrEnum.ERROR,
    {
      name: formatMessage({ id: 'alarmManage.emergent', defaultMessage: '紧急' }),
      color: '#f75f5f',
    },
  ],
]);
