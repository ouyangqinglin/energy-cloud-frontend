
import FullScreen from '../../components/FullScreen';
import { Col, Row } from 'antd';
import styles from '../index.less';
import Header from '../components/header';
import { Card, List } from 'antd';
import TypeChart, { TypeChartDataType } from '@/components/Chart/TypeChart';
import {useEffect, useState, useCallback, useMemo, useRef } from 'react';
//import { useRequest } from 'umi';
//import EChartsReact from 'echarts-for-react';
import Chart from '@/components/Chart';
import {photovoltaicOption, energyStorageOption, energyOption} from './config'
import {getStorageData, getChargePileData, getEnergyConsumptionData, getPvData, getTotalData, getSiteIncomeData} from './service'
import  ScrollTable from '../components/scrollTable';
// import { AllBatteryDataType } from './type'
// import { Data } from '@/components/YTIcons/YTSvg';
import { merge } from 'lodash';
const CustomLayout = () => {
  const [storageChartData, setStorageChartData] = useState<TypeChartDataType[]>();//储能图表数据
  const [chargeTotalNum, setChargeTotalNum]  = useState();//储能充电量
  const [disChargeTotalNum, setDisChargeTotalNum]  = useState();//储能放电量

  const [energyChartData, setEnergyChartData] = useState<TypeChartDataType[]>();
  const [voltaicData, setVoltaicData] = useState<TypeChartDataType[]>();
  const [voltaicTotalNum, setVoltaicTotalNum] = useState();
  
  const [totalData, setTotalData] = useState({});//汇总数据
  const [batteryData, setBatteryData] = useState([]); //充电桩表格数据
  const [batteryChargeData, setBatteryChargeData] = useState(); //充电桩-总充电量
  const [batteryIncomeData, setBatteryIncomeData] = useState(); //充电桩-总收益
  //const [allBatteryData, setAllBatteryData] = useState(); //充电桩所有表格数据

  const [siteIncomeData, setSiteIncomeData] = useState([]); //站点收益表格数据
  const [siteIncomeTotal, setSiteIncomeTotal] = useState([]); //站点--总收益

  const getPhotovoltaicOption = useCallback(() => photovoltaicOption(voltaicData,''), [voltaicData]);//光伏历史数据
  //const getEnergyStorageOption = useCallback(() => energyStorageOption(storageChartData,''), [storageChartData]);//储能历史数据
  const getEnergyOption = useCallback(() => energyOption(energyChartData,''), [energyChartData]);//能耗历史数据
  // const { data: storageChartData, run } = useRequest(getStorageData, {
  //   manual: true,
  // });
  const chartRef = useRef(null);
  const newStorageOption = useMemo(() => {
    let xdata: any[] = [];
    let ydata: any[] = [];
    let zdata: any[] = [];
    if (storageChartData) {
      storageChartData.forEach((element: any) => {
        xdata.push(element.x+'' || '-');
        ydata.push(element.y+'' || '-');
        zdata.push(element.z+'' || '-');
      });
    }
    let option = {
      xAxis: {
        data: xdata,
      },
      series: [
        {
          name: '充电量',
          type: 'line', // 折现/面积图
          //data: [820, 932, 901, 934, 1290, 1330, 1320],
          data: ydata,
          itemStyle: {
            color: '#24def3'
          },
          symbol: 'emptyCircle', // 几何圆
          symbolSize: 5,
          areaStyle: { // 区域填充样式
            color: { // 填充的颜色 // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
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
                  color: '#121f35' // 100% 处的颜色
                }
              ],
              global: false, // 缺省为 false
            }
          },
          xAxisIndex: 0 
        },
        {
          name: '放电量',
          type: 'line',
          //data: [820, 932, 901, 934, 1290, 1330, 1320],
          data: zdata,
          itemStyle: {
            color: '#24def3'
          },
          symbol: 'emptyCircle', // 几何圆
          symbolSize: 5,
          areaStyle: { // 区域填充样式
            color: { // 填充的颜色 // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
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
                  color: '#121f35' // 100% 处的颜色
                }
              ],
              global: false, // 缺省为 false
            }
          },
          xAxisIndex: 0 
        }
      ],
      legend: {
        icon: 'rect',
        itemWidth: 10,
        itemHeight: 10,
        left:'20',
        textStyle: {
          fontSize: '12',
          color:'rgb(255, 255, 255,0.6)'
        }
      },
    };
    return merge({}, energyStorageOption, option);
  }, [energyStorageOption, storageChartData]);

  const statisticalData = [
    {
      title: '累计发电量/KWH',
      field: 'generate'
    },
    {
      title: '累计充电量/KWH',
      field: 'charge'
    },
    {
      title: '累计放电量/KWH',
      field: 'discharge'
    },
    {
      title: '节省碳排放量/吨',
      field: 'co2'
    },
    {
      title: '累计收益/元',
      field: 'income'
    },
  ]; 
  useEffect(() => {
    //获取储能数据
    const energyStorageTimer = setInterval(() => {
      getStorageData().then(({ data }) => {
        let list = data?.list || [];
        setStorageChartData(list);

        let chargeTotal = data?.otherTotal || "--" ;
        let disChargeTotal = data?.total || "--" ;
        setChargeTotalNum(chargeTotal);
        setDisChargeTotalNum(disChargeTotal);
        //刷新echarts列表
        //chartRef.refresh();

        return () => {
          clearInterval(energyStorageTimer);
        };
      });
     }, 1000*60);
    
    getEnergyConsumptionData().then(({ data }) => {
      let list = data?.list || [];
      setEnergyChartData(list);
    }); 
    getPvData().then(({ data }) => {
      let list = data?.list || [];
      setVoltaicData(list);
      setVoltaicTotalNum(data?.total || '--');
    }); 
    getTotalData().then(({ data }) => {
      setTotalData(data);
    }); 
    //获取充电桩表格数据
    getChargePileData().then(({ data }) => {
      let list = data?.list || [];
      if(list&&list.length>0) {
       
      }
      setBatteryData(list);
      setBatteryChargeData(data?.total || '--');
      setBatteryIncomeData(data?.otherTotal || '--');
    }); 
    //获取站点收益数据
    getSiteIncomeData().then(({ data }) => {
      let siteIncomelist = data?.list || [];
      setSiteIncomeData(siteIncomelist);
      setSiteIncomeTotal(data?.total || '--');
    }); 
  }, [storageChartData]);
  const columns = [
    {
      title: '日期',
      dataIndex: 'x',
    },
    {
      title: '充电量',
      dataIndex: 'y',
    },
  ];
  const getRowClassName = (record: any, index: number) => {
    let className = '';
    className = index % 2 === 0 ? "oddRow" : "evenRow";
    return className;
  }
  return (
    <>
      <Header /> 
      <Row>
        <Col span={15} className={styles.fontColor}>
        <List
        grid={{
          gutter: 0,
          column: 5,
        }}
        bordered={false}
        className={styles.statisticCard}
        dataSource={statisticalData}
        renderItem={(item) => (
          <List.Item className={styles.realtimeStatistic}>
            <div>
             <Card title={item.title} bordered={false} className={styles.realtimeStatistiCard}>{totalData[item.field] || ''}</Card>
            </div>
          </List.Item>
        )}
      />
      {/* 曲线图 */}
      <div  className={styles.chartBox}>
        <div className={styles.chartDiv}>
            <div className={styles.chartLable}>光伏 (近30天发电量/kWh)</div>
            <div className={styles.voltaicDiv}>
              <div className={styles.subLeft}>
                <div>近30天总充电量/kWh</div>
                <div className={styles.numSize}>{voltaicTotalNum}</div>
              </div>
            </div>
            <Chart  option={getPhotovoltaicOption()} style={{ height: 'calc(100% - 30px)' }} calculateMax={false}/>
        </div>
        <div className={styles.chartDiv}>
            <div className={styles.chartLable}>储能 (近30天充、放电量/kWh)</div>
            <div className={styles.energyDiv}>
              <div className={styles.subLeft}>
                <div>近30天总充电量/kWh</div>
                <div className={styles.numSize}>{chargeTotalNum}</div>
              </div>
              <div className={styles.subLeft}>
                <div>近30天总放电量/kWh</div>
                <div className={styles.numSize}>{disChargeTotalNum}</div>
              </div>
            </div>
            <TypeChart option={newStorageOption}  style={{ height: 'calc(100% - 30px)',marginTop: '0px',}} calculateMax={false} ref={chartRef}/>
        </div>
      </div>
            
        </Col>
        {/* 右边 */}
        <Col span={9}>
          <div className={styles.rightCol}>
            <div className={styles.energyChart}>
                <div className={styles.chartLable}>能耗（kwh）</div>
                <TypeChart option={getEnergyOption()} data={storageChartData} style={{ height: 'calc(100% - 30px)' }} calculateMax={false}/>
            </div>
            {/* 滚动table */}

            <div className={styles.scrollLayout}>
              <div className={styles.scrollTableBox}>
                
                <div className={styles.leftBox}> 
                  <div className={styles.title}>充电桩（每日充电量/kWh）</div>
                  <div className={styles.subDiv}>
                    <div className={styles.subLeft}>
                      <div>近30天总收益/元</div>
                      <div className={styles.numSize}>{batteryIncomeData}</div>
                    </div>
                    <div className={styles.subLeft}>
                      <div>近30天总充电量/kWh</div>
                      <div className={styles.numSize}>{batteryChargeData}</div>
                    </div>
                  </div>
                  <div className={styles.leftDiv}>
                    <ScrollTable columns={columns} dataSource={batteryData} scroll={{ y: 300 }} className={styles.leftTable}/>
                  </div>
                </div>

                <div className={styles.rightBox}> 
                  <div className={styles.title}>站点产生收益（近30天收益）</div>
                  <div className={styles.subDiv}>
                    <div className={styles.subLeft}>
                      <div>近30天总收益/元</div>
                      <div className={styles.numSize}>{siteIncomeTotal}</div>
                    </div>
                  </div>
                  <div className={styles.rightDiv}>
                    <ScrollTable columns={columns} dataSource={siteIncomeData} scroll={{ y: 300 }} className={styles.rightTable} rowClassName={getRowClassName()}/>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </Col>
      </Row>

      <FullScreen />
    </>
  );
};
export default CustomLayout;
