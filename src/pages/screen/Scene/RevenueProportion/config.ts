import { formatMessage } from '@/utils';

export const pieConfig = (data = [], total = 0) => ({
  color: ['#FFD15C', '#159AFF', '#01CFA1'],
  legend: {
    bottom: '1%',
    itemWidth: 8, // 设置图例图形的宽度
    itemHeight: 8, // 设置图例图形的高度
    itemGap: 20,
    textStyle: {
      color: '#fff',
    },
    formatter: (name: string) => {
      const row: any = data.find((i: any) => i.name == name);
      return row.text;
    },
  },
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(9,12,21,0.8)',
    textStyle: {
      color: 'white',
    },
  },
  title: {
    text: total,
    left: 'center',
    top: 'center',
    itemGap: 5,
    textVerticalAlign: 'top',
    subtext: `${formatMessage({
      id: 'device.totalRevenue',
      defaultMessage: '总收益',
    })}${formatMessage({ id: 'device.unitRevenue', defaultMessage: '(元)' })}`,
    textStyle: {
      fontSize: 20,
      lineHeight: 20,
      fontWeight: 300,
      color: '#fff',
    },
    subtextStyle: {
      fontSize: 12,
      lineHeight: 14,
      color: '#ACCCEC',
    },
  },
  series: [
    {
      type: 'pie',
      radius: ['40%', '60%'],
      data: data,
      label: {
        alignTo: 'edge',
        formatter: `{name|{b}}\n{value|{c}}`,
        minMargin: 5,
        edgeDistance: 10,
        lineHeight: 15,
        rich: {
          name: {
            fontSize: 12,
            fontWeight: 400,
            color: 'auto',
          },
          value: {
            fontSize: 20,
            lineHeight: 22,
            color: '#ACCCEC',
          },
        },
      },
    },
  ],
});
