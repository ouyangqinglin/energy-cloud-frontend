// export const photovoltaicOption: (
//   data: any, title: any
// )=> {} = (data, title) =>

import { formatMessage } from '@/utils';

export const photovoltaicOption = (data: any, title: any): any => {
  const xdata: any[] = []; //横坐标
  const ydata: any[] = []; //纵坐标
  if (data) {
    data.forEach((element: any) => {
      xdata.push(element.x + '' || '-');
      ydata.push(element.y + '' || '-');
    });
  }
  return {
    title: [
      // {
      //   right: '10',
      //   text: title,
      //   textStyle: {
      //     lineHeight: '45',
      //     color: 'white'
      //   }
      // }
    ],
    tooltip: {
      trigger: 'axis',
      // formatter:(params)=>{

      // },
      show: true,
      showContent: true,
      backgroundColor: '#fff',
      extraCssText: 'box-shadow:-2px 0px 9px 2px rgba(61,126,255,0.45)',
      padding: 10, // 内边距
      axisPointer: {
        //纵向指示线
        type: 'line',
      },
    },
    xAxis: {
      type: 'category',
      data: xdata,
      color: '#323e52',
      axisLabel: {
        textStyle: {
          fontSize: 12,
          fontFamily: 'Microsoft YaHei',
          textAlign: 'center',
          color: '#c2cbf2',
        },
      },
      position: 'bottom',
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.1)',
          type: 'solid',
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false, //刻度线
      },
    },
    yAxis: {
      name: '',
      type: 'value',
      silent: true,
      axisLabel: {
        textStyle: {
          fontSize: 12,
          fontFamily: 'Microsoft YaHei',
          textAlign: 'right',
          color: '#c2cbf2',
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#232842',
          type: 'solid',
        },
      },
    },
    series: [
      {
        //name: '盈利资金(万)',
        type: 'line', // 折现/面积图
        data: ydata,
        itemStyle: {
          color: '#24def3',
        },
        symbol: 'emptyCircle', // 几何圆
        symbolSize: 5,
        areaStyle: {
          // 区域填充样式
          color: {
            // 填充的颜色 // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#25eaff', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#121f35', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        xAxisIndex: 0,
      },
    ],
    grid: {
      show: true,
      top: 60,
      bottom: 60,
      borderColor: 'transparent',
      backgroundColor: 'transparent',
    },
  };
};
export const energyStorageOption = {
  title: [
    // {
    //   left: '50',
    //   text: title,
    //   textStyle: {
    //     lineHeight: '45',
    //     color: 'white'
    //   }
    // },
  ],
  xAxis: {
    type: 'category',
    data: [],
    color: '#323e52',
    axisLabel: {
      textStyle: {
        fontSize: 12,
        fontFamily: 'Microsoft YaHei',
        textAlign: 'center',
        color: '#c2cbf2',
      },
    },
    position: 'bottom',
    axisLine: {
      lineStyle: {
        color: 'rgba(255,255,255,0.1)',
        type: 'solid',
      },
    },
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false, //刻度线
    },
  },
  yAxis: {
    name: '',
    type: 'value',
    silent: true,
    axisLabel: {
      textStyle: {
        fontSize: 12,
        fontFamily: 'Microsoft YaHei',
        textAlign: 'right',
        color: '#c2cbf2',
      },
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#232842',
        type: 'solid',
      },
    },
  },
  legend: {
    icon: 'rect',
    itemWidth: 10,
    itemHeight: 10,
    left: '20',
    textStyle: {
      fontSize: '12',
      color: 'rgb(255, 255, 255,0.6)',
    },
  },
  series: [
    {
      name: formatMessage({ id: 'screen.chargingCapacity', defaultMessage: '充电量' }),
      type: 'line', // 折现/面积图
      //data: [820, 932, 901, 934, 1290, 1330, 1320],
      data: [],
      itemStyle: {
        color: 'rgb(10,115,255)',
      },
      symbol: 'emptyCircle', // 几何圆
      symbolSize: 5,
      areaStyle: {
        // 区域填充样式
        color: {
          // 填充的颜色 // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgb(10,115,255)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#121f35', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
      xAxisIndex: 0,
    },
    {
      name: formatMessage({ id: 'screen.dischargingCapacity', defaultMessage: '放电量' }),
      type: 'line',
      //data: [820, 932, 901, 934, 1290, 1330, 1320],
      data: [],
      itemStyle: {
        color: '#24def3',
      },
      symbol: 'emptyCircle', // 几何圆
      symbolSize: 5,
      areaStyle: {
        // 区域填充样式
        color: {
          // 填充的颜色 // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgb(8, 77, 170,0.2)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#121f35', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
      xAxisIndex: 0,
    },
  ],
  grid: {
    show: true,
    top: 60,
    bottom: 60,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
};
export const energyOption = (data: any, title: any): any => {
  const xdata: any[] = [];
  const ydata: any[] = [];
  const zdata: any[] = [];
  if (data) {
    data.forEach((element: any) => {
      xdata.push(element.x + '' || '-');
      ydata.push(element.y + '' || '-');
      zdata.push(element.z + '' || '-');
    });
  }

  return {
    title: [
      {
        right: '10',
        text: title,
        textStyle: {
          lineHeight: '45',
          color: 'white',
        },
      },
    ],
    xAxis: {
      type: 'category',
      data: xdata,
      color: '#323e52',
      axisLabel: {
        textStyle: {
          fontSize: 12,
          fontFamily: 'Microsoft YaHei',
          textAlign: 'center',
          color: '#c2cbf2',
        },
      },
      position: 'bottom',
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.1)',
          type: 'solid',
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false, //刻度线
      },
    },
    yAxis: {
      name: '',
      type: 'value',
      silent: true,
      axisLabel: {
        textStyle: {
          fontSize: 12,
          fontFamily: 'Microsoft YaHei',
          textAlign: 'right',
          color: '#c2cbf2',
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#232842',
          type: 'solid',
        },
      },
    },
    legend: {
      icon: 'rect',
      itemWidth: 10,
      itemHeight: 10,
      left: '20',
      textStyle: {
        fontSize: '12',
        color: 'rgb(255, 255, 255,0.6)',
      },
    },
    series: [
      {
        name: formatMessage({ id: 'screen.today', defaultMessage: '今日' }),
        type: 'line', // 折现/面积图
        data: ydata,
        itemStyle: {
          color: 'rgb(10,115,255)',
        },
        symbol: 'emptyCircle', // 几何圆
        symbolSize: 5,
        areaStyle: {
          // 区域填充样式
          color: {
            // 填充的颜色 // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgb(10,115,255)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#121f35', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        xAxisIndex: 0,
      },
      {
        name: formatMessage({ id: 'screen.yesterday', defaultMessage: '昨日' }),
        type: 'line',
        data: zdata,
        itemStyle: {
          color: '#24def3',
        },
        symbol: 'emptyCircle', // 几何圆
        symbolSize: 5,
        areaStyle: {
          // 区域填充样式
          color: {
            // 填充的颜色 // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgb(8, 77, 170,0.2)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#121f35', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        xAxisIndex: 0,
      },
    ],
    grid: {
      show: true,
      top: 60,
      bottom: 60,
      borderColor: 'transparent',
      backgroundColor: 'transparent',
    },
  };
};
