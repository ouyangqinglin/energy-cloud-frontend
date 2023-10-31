import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from '../index.less';
import { Divider, Progress,  } from 'antd';
import  { ArrowUpOutlined } from '@ant-design/icons';
import DeviceImg from '@/assets/image/masterSlaveGroup/device.png';
import IconVoltage from '@/assets/image/masterSlaveGroup/icon_voltage.png';
import IconTemp from '@/assets/image/masterSlaveGroup/icon_temp.png';
import IconCharge from '@/assets/image/masterSlaveGroup/icon_charge.png';
import IconDisCharge from '@/assets/image/masterSlaveGroup/icon_discharge.png';
import IconStewing from '@/assets/image/masterSlaveGroup/icon_stewing.png';


export type DeviceItemProps = {
  realtimeData: any;//实时数据对象
  onChildData: any;
  isChangeWidth:Boolean;//是否改变线条宽度
};

const DeviceItem: React.FC<DeviceItemProps> = (props) => {
  const { realtimeData, onChildData, isChangeWidth} = props;
  const deviceRef = useRef(null);
  const [deviceWidth, setDeviceWidth] = useState('');

  useEffect(() => {
    if(deviceRef.current || isChangeWidth) {
     setDeviceWidth(deviceRef.current.offsetWidth);
    }
    onChildData(deviceWidth);
  }, [deviceWidth, deviceRef.current, isChangeWidth]);
  return (
    <>
      <div className={styles.deviceItemDiv} ref={deviceRef}> 

        <div className={styles.topDeviceDiv}>
          {/* 竖向直线 */}
          <div className={styles.verticalDiv}>
            <Divider type="vertical" />
          </div>
          <div className={styles.imgBox}>
            <img src={DeviceImg} alt="设备图" className={styles.imgDiv}/>
          </div>
          {/* 充放电状态 */}
          <div className={styles.chargeStaus}>
            <div className={styles.deviceName}>
            1#储能
            </div>
            <div>
              <img src={IconCharge} className={styles.chargeImg}/>
              <span>
                充电
              </span>
            </div>
          </div>
        </div>

        <div className={styles.bottomDeviceDiv}>
          <div className={styles.battery}>
           <Progress percent={50}  format={(percent) => `SOC ${percent}%`} size={'default'} strokeColor={'#00B42A'}/>
          </div>
          <div className={styles.battery} style={{marginTop:"10px"}}>
           <Progress percent={50}  format={(percent) => `SOC ${percent}%`} size={'default'} strokeColor={'#00B42A'}/>
          </div>

          <div className={styles.deviceParameterBox}>
            <div className={styles.pressureCard}>
              <div>
                <span>U</span>
                <span>{"(V)"}</span>
              </div>
              <div>
                805
              </div>
            </div>
            <div className={styles.verticalDiv}>
              <Divider type="vertical" />
            </div>
            <div className={styles.pressureCard}>
              <div>
                <span>U</span>
                <span>{"(V)"}</span>
              </div>
              <div>
                805
              </div>
            </div>
            <div className={styles.verticalDiv}>
              <Divider type="vertical" />
            </div>
            <div className={styles.pressureCard}>
              <div>
                <span>U</span>
                <span>{"(V)"}</span>
              </div>
              <div>
                805
              </div>
            </div>

          </div>
          {/* 最下面的小盒子 */}
          <div className={styles.peakBox}>
             <div className={styles.leftpeakBox}>
              <div>
                <img src={IconVoltage} className={styles.voltageImg}/>
                <span>3.345</span>
                <span>V</span>
                <ArrowUpOutlined />
              </div>
              <div className={styles.iconTop}>
                <img src={IconVoltage} className={styles.voltageImg}/>
                <span>3.345</span>
                <span>V</span>
                <ArrowUpOutlined />
              </div>
            </div>  
            <div className={styles.rightpeakBox}>
              <div>
                <img src={IconVoltage} className={styles.voltageImg}/>
                <span>3.345</span>
                <span>V</span>
                <ArrowUpOutlined />
              </div>
              <div className={styles.iconTop}>
                <img src={IconVoltage} className={styles.voltageImg}/>
                <span>3.345</span>
                <span>V</span>
                <ArrowUpOutlined />
              </div>
            </div> 

             <div>
              
            </div>  
          </div>

        </div>

      </div>
    </>
  );
};

export default DeviceItem;
