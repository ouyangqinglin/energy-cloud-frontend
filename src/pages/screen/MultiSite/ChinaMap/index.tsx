import React, { useEffect } from 'react';
import Cell from '../../components/LayoutCell';
import { request } from 'umi';
import * as echarts from 'echarts';
import { chinaMapOutline, chinaMap } from './config';

const geoCoordMap = {
  台湾: [121.5135, 25.0308],
  黑龙江: [127.9688, 45.368],
  内蒙古: [110.3467, 41.4899],
  吉林: [125.8154, 44.2584],
  北京市: [116.4551, 40.2539],
  辽宁: [123.1238, 42.1216],
  河北: [114.4995, 38.1006],
  天津: [117.4219, 39.4189],
  山西: [112.3352, 37.9413],
  陕西: [109.1162, 34.2004],
  甘肃: [103.5901, 36.3043],
  宁夏: [106.3586, 38.1775],
  青海: [101.4038, 36.8207],
  新疆: [87.9236, 43.5883],
  西藏: [91.11, 29.97],
  四川: [103.9526, 30.7617],
  重庆: [108.384366, 30.439702],
  山东: [117.1582, 36.8701],
  河南: [113.4668, 34.6234],
  江苏: [118.8062, 31.9208],
  安徽: [117.29, 32.0581],
  湖北: [114.3896, 30.6628],
  浙江: [119.5313, 29.8773],
  福建: [119.4543, 25.9222],
  江西: [116.0046, 28.6633],
  湖南: [113.0823, 28.2568],
  贵州: [106.6992, 26.7682],
  云南: [102.9199, 25.4663],
  广东: [113.12244, 23.009505],
  广西: [108.479, 23.1152],
  海南: [110.3893, 19.8516],
  上海: [121.4648, 31.2891],
};
const data = [
  { name: '北京', value: 199 },
  { name: '天津', value: 42 },
  { name: '河北', value: 102 },
  { name: '山西', value: 81 },
  { name: '内蒙古', value: 47 },
  { name: '辽宁', value: 67 },
  { name: '吉林', value: 82 },
  { name: '黑龙江', value: 123 },
  { name: '上海', value: 24 },
  { name: '江苏', value: 92 },
  { name: '浙江', value: 114 },
  { name: '安徽', value: 109 },
  { name: '福建', value: 116 },
  { name: '江西', value: 91 },
  { name: '山东', value: 119 },
  { name: '河南', value: 137 },
  { name: '湖北', value: 116 },
  { name: '湖南', value: 114 },
  { name: '重庆', value: 91 },
  { name: '四川', value: 125 },
  { name: '贵州', value: 62 },
  { name: '云南', value: 83 },
  { name: '西藏', value: 9 },
  { name: '陕西', value: 80 },
  { name: '甘肃', value: 56 },
  { name: '青海', value: 10 },
  { name: '宁夏', value: 18 },
  { name: '新疆', value: 180 },
  { name: '广东', value: 123 },
  { name: '广西', value: 59 },
  { name: '海南', value: 14 },
];
const convertData = function (value: any[]) {
  const res = [];
  for (let i = 0; i < value.length; i++) {
    const geoCoord = geoCoordMap[value[i].name];
    if (geoCoord) {
      res.push({
        name: value[i].name,
        value: geoCoord.concat(value[i].value),
      });
    }
  }
  return res;
};

const ChinaMap: React.FC = () => {
  const init = () => {
    const chartDom = document.getElementById('chinaMap');
    const myChart = echarts.init(chartDom);
    const option = {
      tooltip: {
        trigger: 'item',
        padding: 0,
        borderColor: '#00DEFF',
        borderWidth: 0,
        formatter: function (params: any) {
          const content = `<span
          style='
          display:inline-block;
          background: rgba(12,23,39,0.8);
          border: 1px solid #00DEFF;
          padding: 5px 10px;
          font-size: 14px;
          font-weight: 400;
          color: #FFFFFF;
          border-radius: 5px;
          '>
          ${params.name}-13个站点</span> `;
          return content;
        },
      },
      geo: {
        map: 'china',
        show: true,
        roam: false,
        zoom: 1.4,
        top: 150,
        label: {
          show: true,
          color: 'rgba(118,138,162)',
          formatter: function (params: any) {
            const { name } = params;
            if (name === '河北省' || name === '天津市') {
              return '';
            }
            return name.replace('省', '').replace('市', '');
          },
        },
        itemStyle: {
          areaColor: 'rgba(8,43,86,1)',
          borderColor: 'rgba(50,90,138,1)', //线
          shadowColor: '#092f8f', //外发光
          shadowBlur: 10,
        },
        emphasis: {
          label: {
            show: true,
            color: 'white',
          },
          itemStyle: {
            areaColor: 'rgba(52,185,255,1)', //悬浮区背景
          },
        },
      },
      series: [
        {
          type: 'map',
          map: 'chinaMap',
          geoIndex: 0,
          aspectScale: 0.75, //长宽比
          showLegendSymbol: false, // 存在legend时显示
          roam: true,
          zoom: 1.14,
          animation: false,
          data: data,
          top: 200,
        },
        // 标记点
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          symbol: 'image://http://localhost:8000/dot.png',
          symbolSize: [20, 20],
          label: {
            show: true,
            color: '#34E1B6',
            fontWeight: 500,
            offset: [0, -20],
            fontSize: 10,
            formatter(value: any) {
              return value.data.value[2];
            },
          },
          data: convertData([...data]),
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke',
          },
          hoverAnimation: true,
        },
        {
          map: 'chinaMapOutline',
          silent: true,
          type: 'map',
          zoom: 0.9,
          label: {
            normal: {
              show: false,
              textStyle: {
                color: '#fff',
              },
            },
            emphasis: {
              textStyle: {
                color: '#fff',
              },
            },
          },
          top: '5%',
          roam: false,
          itemStyle: {
            normal: {
              areaColor: 'rgba(0,255,255,.02)',
              borderColor: '#00ffff',
              borderWidth: 1.5,
              shadowColor: '#00ffff',
              shadowOffsetX: 0,
              shadowOffsetY: 4,
              shadowBlur: 10,
            },
            emphasis: {
              areaColor: 'transparent', //悬浮背景
              textStyle: {
                color: '#fff',
              },
            },
          },
        },
      ],
    };
    const option2 = {
      backgroundColor: '#181F4E',
      tooltip: {
        trigger: 'item',
      },
      geo: {
        silent: true,
        map: 'chinaMapOutline',
        show: false,
        zoom: 0.8,
        top: '0%',
        label: {
          normal: {
            show: false,
            textStyle: {
              color: '#fff',
            },
          },
          emphasis: {
            textStyle: {
              color: '#fff',
            },
          },
        },

        roam: false,
        itemStyle: {
          normal: {
            areaColor: {
              type: 'linear-gradient',
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(45,68,121,0.15)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(45,68,121,0.18)', // 100% 处的颜色
                },
              ],
              global: true, // 缺省为 false
            },
            // areaColor: 'transparent',
            borderColor: '#83BAFF',
            borderWidth: 1,
            shadowColor: 'rgba(56,164,255,.26)',
            opacity: 0.5,
            shadowOffsetX: 5,
            shadowOffsetY: 5,
            shadowBlur: 5,
            show: true, // 是否显示对应地名
            textStyle: {
              //字体颜色
              color: '#797979',
            },
          },
          emphasis: {
            color: 'transparent', //悬浮背景
            textStyle: {
              color: '#fff',
            },
          },
        },
      },
      series: [
        {
          map: 'chinaMapOutline',
          silent: true,
          type: 'map',
          zoom: 0.8,
          label: {
            normal: {
              show: false,
              textStyle: {
                color: '#fff',
              },
            },
            emphasis: {
              textStyle: {
                color: '#fff',
              },
            },
          },
          top: '0%',
          roam: false,
          itemStyle: {
            normal: {
              areaColor: 'rgba(0,255,255,.02)',
              borderColor: '#00ffff',
              borderWidth: 1.5,
              shadowColor: '#00ffff',
              shadowOffsetX: 0,
              shadowOffsetY: 4,
              shadowBlur: 10,
            },
            emphasis: {
              areaColor: 'transparent', //悬浮背景
              textStyle: {
                color: '#fff',
              },
            },
          },
        },
        {
          map: 'chinaMap',
          type: 'map',
          zoom: 1.14,
          label: {
            normal: {
              show: false,
              textStyle: {
                color: '#fff',
              },
            },
            emphasis: {
              textStyle: {
                color: '#fff',
              },
            },
          },
          top: '14%',
          tooltip: {
            show: false,
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: 'transparent',
              borderColor: 'rgba(0,255,255,.1)',
              borderWidth: 1,
            },
            emphasis: {
              areaColor: 'rgba(0,255,255,.1)',
              textStyle: {
                color: 'red',
              },
            },
          },
        },
      ],
    };
    // 轮廓高亮
    myChart.setOption(option);
  };
  const getMapData = async () => {
    const chinaData = await request('/chinaMap/china.json');
    echarts.registerMap('china', chinaData);
    echarts.registerMap('chinaMap', chinaMap);
    echarts.registerMap('chinaMapOutline', chinaMapOutline);
    init();
  };
  useEffect(() => {
    getMapData();
  }, []);
  return (
    <>
      <Cell cursor="default" width={1026} height={660} left={447} top={200}>
        <div
          id="chinaMap"
          style={{
            color: 'white',
            height: '100%',
          }}
        >
          中国地图
        </div>
      </Cell>
    </>
  );
};

export default ChinaMap;
