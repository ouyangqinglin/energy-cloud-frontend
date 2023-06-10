export const pieConfig = {
  startAngle: -Math.PI,
  endAngle: Math.PI,
  legend: {
    layout: 'horizontal',
    position: 'bottom',
    marker: {
      symbol: 'square',
    },
    itemName: {
      style: {
        fill: '#ACCCEC',
      },
    },
    itemValue: {
      formatter: (text: string) => text,
      style: {
        fill: 'white',
      },
    },
  },
  appendPadding: 10,
  angleField: 'value',
  colorField: 'type',
  color: ['#01cfa1', '#ffe04d', '#159aff'],
  radius: 0.7,
  innerRadius: 0.7,
  pieStyle: {
    lineWidth: 0,
  },
  label: {
    type: 'spider',
    offset: 40,
    labelHeight: 40,
    formatter: (data: any, mappingData: any) => {
      return '';
    },
  },
  interactions: [
    {
      type: 'element-selected',
    },
    {
      type: 'element-active',
    },
  ],
  statistic: {
    title: false,
    content: {
      customHtml:
        '<div><span style="color:white;font-size:24px">12345</span><div style="font-size:12px;color:#ACCCEC;">总收益(元)</div></div>',
    },
  },
};
