
import FullScreen from '../../components/FullScreen';
import { Col, Row } from 'antd';
import styles from '../index.less';
import Header from '../components/header';
import { Card, List } from 'antd';
import TypeChart, { TypeChartDataType } from '@/components/Chart/TypeChart';
import {useMemo, useEffect, useState, useCallback } from 'react';
//import EChartsReact from 'echarts-for-react';
import Chart from '@/components/Chart';
import {photovoltaicOption, energyStorageOption, energyOption} from './config'
import {getStorageData} from './service'
import  ScrollTable from '../components/scrollTable';

const CustomLayout = () => {
  const [storageChartData, setStorageChartData] = useState<TypeChartDataType[]>();
  const voltaicData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const getPhotovoltaicOption = useCallback(() => photovoltaicOption(voltaicData,'光伏近30天总发电量/kWh'), [voltaicData]);
  const getEnergyStorageOption = useCallback(() => energyStorageOption(storageChartData,'光666近30天总发电量/kWh'), [storageChartData]);
  const getEnergyOption = useCallback(() => energyOption(storageChartData,'888666近30天总发电量/kWh'), [storageChartData]);
  const statisticalData = [
    {
      title: '累计充电量/KWH',
    },
    {
      title: '累计放电量/KWH',
    },
    {
      title: '节省碳排放量/吨',
    },
    {
      title: '累计收益/元',
    },
    {
      title: '累计收益/元',
    },
  ]; 
  useEffect(() => {
    getStorageData('').then(({ data }) => {
      let test =  [
        {
          "x": "09-19",
          "y": 10,
          "z": 20
        },
        {
          "x": "09-19",
          "y": 30,
          "z": 340
        }
      ]
      let list = data?.list || test;
      setStorageChartData(list);
    });
   
  }, []);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
  ];

  const dataSource = [];
  for (let i = 0; i < 12; i++) {
    dataSource.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
    });
  }
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
          gutter: 16,
          column: 5,
        }}
        bordered={false}
        className={styles.statisticCard}
        dataSource={statisticalData}
        renderItem={(item) => (
          <List.Item className={styles.realtimeStatistic}>
            <div>
             <Card title={item.title} bordered={false}>Card</Card>
            </div>
          </List.Item>
        )}
      />
      {/* 曲线图 */}
      <div  className={styles.chartBox}>
        <div className={styles.chartDiv}>
            <div className={styles.chartLable}>光伏 (近30天发电量/kWh)</div>
            <Chart  option={getPhotovoltaicOption()} style={{ height: 'calc(100% - 30px)' }} calculateMax={false}/>
        </div>
        <div className={styles.chartDiv}>
            <div className={styles.chartLable}>储能 (近30天充、放电量/kWh)</div>
            <TypeChart option={getEnergyStorageOption()}  style={{ height: 'calc(100% - 30px)',marginTop: '0px',}} calculateMax={false}/>
        </div>
      </div>
            
        </Col>
        {/* 右边 */}
        <Col span={9}>
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
                    <div className={styles.numSize}>5568</div>
                  </div>
                  <div className={styles.subLeft}>
                    <div>近30天总充电量/kWh</div>
                    <div className={styles.numSize}>1654.42</div>
                  </div>
                </div>
                <div className={styles.leftDiv}>
                  <ScrollTable columns={columns} dataSource={dataSource} scroll={{ y: 300 }} className={styles.leftTable}/>
                </div>
              </div>

              <div className={styles.rightBox}> 
                <div className={styles.title}>充电桩（每日充电量/kWh）</div>
                <div className={styles.subDiv}>
                  <div className={styles.subLeft}>
                    <div>近30天总收益/元</div>
                    <div className={styles.numSize}>5568</div>
                  </div>
                </div>
                <div className={styles.rightDiv}>
                  <ScrollTable columns={columns} dataSource={dataSource} scroll={{ y: 300 }} className={styles.rightTable} rowClassName={getRowClassName()}/>
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
