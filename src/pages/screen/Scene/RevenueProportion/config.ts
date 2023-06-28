export const pieConfig = {
  startAngle: -Math.PI,
  endAngle: Math.PI,
  tooltip: {
    domStyles: {
      'g2-tooltip': {
        border: '1px solid rgba(21, 154, 255, 0.8)',
        backgroundColor: 'rgba(9,12,21,0.8)',
        'box-shadow': '0 0 6px 0 rgba(21,154,255,0.7)',
        color: 'white',
        opacity: 1,
      },
    },
  },
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
        fontSize: 14,
        fill: 'white',
      },
    },
  },
  appendPadding: 10,
  angleField: 'value',
  colorField: 'type',
  color: ['#FFD15C', '#159AFF', '#01CFA1'],
  radius: 0.6,
  innerRadius: 0.7,
  pieStyle: {
    lineWidth: 0,
  },
  label: {
    type: 'spider',
    offset: 20,
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
