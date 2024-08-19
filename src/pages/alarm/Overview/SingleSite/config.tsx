import { formatMessage } from '@/utils';
import type { ProColumns } from '@ant-design/pro-components';
import { getSitesList } from '@/services/station';
import moment from 'moment';
import { alarmLevelMap } from '@/components/Alarm/AlarmTable';
import { Badge } from 'antd';
import type { TypeChartDataType } from '@/components/Chart/TypeChart';

export type FrequencyVOList = {
  id: number;
  alarmName: string;
  level: string;
  alarmNum: number;
};

export type Statistics = {
  total: number;
  alarmInfoMap: {
    alarm: {
      eliminatedNum: number;
      inProgressNum: number;
      num: number;
      proportion: number;
    };
    error: {
      eliminatedNum: number;
      inProgressNum: number;
      num: number;
      proportion: number;
    };
    info: {
      eliminatedNum: number;
      inProgressNum: number;
      num: number;
      proportion: number;
    };
    warn: {
      eliminatedNum: number;
      inProgressNum: number;
      num: number;
      proportion: number;
    };
  };
};

export type SiteDataType = {
  alarmStatistics: Statistics;
  alarmDistributionVOList: {
    productTypeId: number;
    productTypeName: string;
    total: number;
    eliminatedNum: number;
    notEliminatedNum: number;
  }[];
  alarmFrequencyVOList: FrequencyVOList[];
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

export type BarDataType = {
  label: string;
  value: number;
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

export const alarmTitle = {
  text: 0,
  subtext: formatMessage({ id: 'dataManage.1022', defaultMessage: '告警总数' }),
};

export const pieConfig = (
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
      return `${row?.name} ${row?.value} （${row?.percent}）`;
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
      return [`${params.marker}${row.name} ${row.value}（${row?.percent}）`, `${row.text}`].join(
        '\n',
      );
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
      radius: ['30%', '50%'],
      data: data,
      label: {
        show: false,
      },
    },
  ],
});

export const barConfig = (data: TypeChartDataType[] = []) => ({
  grid: {
    bottom: 50,
  },
  legend: {
    icon: 'rect',
    top: 'bottom',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  series: data.map((i) => ({ type: i.type, color: i.color, barMaxWidth: 30, stack: 'Ad' })),
});

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

export const filterColumns = (
  siteSearchColumn: ProColumns<FrequencyVOList>,
): ProColumns<FrequencyVOList>[] => [
  siteSearchColumn,
  {
    title: formatMessage({ id: 'alarmManage.1004', defaultMessage: '告警时间' }),
    dataIndex: 'time',
    valueType: 'dateRange',
    initialValue: [moment().subtract(1, 'week'), moment()],
    formItemProps: {
      rules: [
        {
          required: true,
          message:
            formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }) +
            formatMessage({ id: 'common.time', defaultMessage: '时间' }),
        },
      ],
    },
  },
];

export const columns: ProColumns[] = [
  {
    title: formatMessage({ id: 'alarmManage.1009', defaultMessage: '排名' }),
    dataIndex: 'index',
    valueType: 'index',
    render(_, record, index) {
      const rank = index + 1;
      return <Badge count={rank} showZero color={rank <= 3 ? '#007DFF' : '#858689'} />;
    },
    width: 80,
  },
  {
    title: formatMessage({ id: 'alarmManage.alarmLevel', defaultMessage: '告警级别' }),
    dataIndex: 'level',
    hideInSearch: true,
    valueEnum: alarmLevelMap,
  },
  {
    title: formatMessage({ id: 'alarmManage.alarmName', defaultMessage: '告警名称' }),
    dataIndex: 'alarmName',
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'alarmManage.1008', defaultMessage: '告警次数' }),
    dataIndex: 'alarmNum',
    hideInSearch: true,
  },
];
