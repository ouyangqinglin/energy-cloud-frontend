import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import styles from '../index.less';
import { Divider, Progress } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import DeviceImg from '@/assets/image/masterSlaveGroup/device.png';
import IconVoltage from '@/assets/image/masterSlaveGroup/icon_voltage.png';
import IconTemp from '@/assets/image/masterSlaveGroup/icon_temp.png';
import IconCharge from '@/assets/image/masterSlaveGroup/icon_charge.png';
import IconDisCharge from '@/assets/image/masterSlaveGroup/icon_discharge.png';
import IconStewing from '@/assets/image/masterSlaveGroup/icon_stewing.png';
import { EmsDevicesType } from '@/services/equipment';

export type DeviceItemProps = {
  realtimeData: any; //实时数据对象
  onChildData: any; //传给父组件数据
  isChangeWidth: Boolean; //是否改变线条宽度
  allDeviceData: EmsDevicesType;
  onClickDeviceData: any;
};

const DeviceItem: React.FC<DeviceItemProps> = (props) => {
  const { realtimeData, onChildData, isChangeWidth, allDeviceData, onClickDeviceData } = props;
  const deviceRef = useRef(null);
  const [deviceWidth, setDeviceWidth] = useState('');
  useEffect(() => {
    if (deviceRef.current || isChangeWidth) {
      setDeviceWidth(deviceRef.current.offsetWidth);
    }
    onChildData(deviceWidth);
  }, [deviceWidth, deviceRef.current, isChangeWidth]);
  //点击进入设备详情
  const onDeviceDetail = useCallback(() => {
    onClickDeviceData(true, allDeviceData?.deviceId);
  }, [allDeviceData]);

  return (
    <>
      <div className={styles.deviceItemDiv} ref={deviceRef}>
        <div className={styles.topDeviceDiv}>
          {/* 竖向直线 */}
          <div className={styles.verticalDiv}>
            <Divider type="vertical" />
          </div>
          <div className={styles.imgBox} onClick={onDeviceDetail}>
            <img src={DeviceImg} alt="设备图" className={styles.imgDiv} />
          </div>
          {/* 充放电状态 */}
          <div className={styles.chargeStaus}>
            <div className={styles.deviceName}>{allDeviceData?.deviceName || '--'}</div>
            <div>
              <img
                src={
                  realtimeData?.P > 0
                    ? IconDisCharge
                    : realtimeData?.P < 0
                    ? IconCharge
                    : IconStewing
                }
                className={styles.chargeImg}
              />
              <span
                style={
                  realtimeData?.P > 0
                    ? { color: '#FF974A' }
                    : realtimeData?.P < 0
                    ? { color: '#007DFF' }
                    : { color: '#606266' }
                }
              >
                {realtimeData?.P > 0 ? '放电' : realtimeData?.P < 0 ? '充电' : '静置'}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.bottomDeviceDiv}>
          <div className={styles.battery}>
            <Progress
              percent={realtimeData?.SOC || '--'}
              format={(percent) => `SOC ${percent}%`}
              size={'default'}
              strokeColor={'#00B42A'}
            />
          </div>
          <div className={styles.battery} style={{ marginTop: '10px' }}>
            <Progress
              percent={realtimeData?.SOH || '--'}
              format={(percent) => `SOH ${percent}%`}
              size={'default'}
              strokeColor={'#007DFF'}
            />
          </div>

          <div className={styles.deviceParameterBox}>
            <div className={styles.pressureCard}>
              <div>
                <span className={styles.pressFont}>U</span>
                <span className={styles.unitFont}>{'(V)'}</span>
              </div>
              <div>{realtimeData?.TotalBatteryVoltage || '--'}</div>
            </div>
            <div className={styles.verticalDiv}>
              <Divider type="vertical" />
            </div>
            <div className={styles.pressureCard}>
              <div>
                <span className={styles.pressFont}>I</span>
                <span className={styles.unitFont}>{'(A)'}</span>
              </div>
              <div>{realtimeData?.TotalBatteryCurrent || '--'}</div>
            </div>
            <div className={styles.verticalDiv}>
              <Divider type="vertical" />
            </div>
            <div className={styles.pressureCard}>
              <div>
                <span className={styles.pressFont}>P</span>
                <span className={styles.unitFont}>{'(KW)'}</span>
              </div>
              <div>{realtimeData?.P || '--'}</div>
            </div>
          </div>
          {/* 最下面的小盒子 */}
          <div className={styles.peakBox}>
            <div className={styles.leftpeakBox}>
              {/* 电压极大值 */}
              <div>
                <img src={IconVoltage} className={styles.voltageImg} />
                <span className={styles.pressFont}>{realtimeData?.MVVOASU || '--'}</span>
                <span className={styles.unitFont}>V</span>
                <ArrowUpOutlined />
              </div>
              {/* 电压极小值 */}
              <div className={styles.iconTop}>
                <img src={IconVoltage} className={styles.voltageImg} />
                <span className={styles.pressFont}>{realtimeData?.MVVOSU || '--'}</span>
                <span className={styles.unitFont}>℃</span>
                <ArrowUpOutlined />
              </div>
            </div>
            <div className={styles.rightpeakBox}>
              {/* 温度最高值 */}
              <div>
                <span className={styles.pressFont}>
                  {realtimeData?.MaximumIndividualTemperature || '--'}
                </span>
                <span className={styles.unitFont}>V</span>
                <ArrowDownOutlined />
              </div>
              {/* 温度最低值 */}
              <div className={styles.iconTop}>
                <span className={styles.pressFont}>{realtimeData?.LVOMT || '--'}</span>
                <span className={styles.unitFont}>℃</span>
                <ArrowDownOutlined />
              </div>
            </div>

            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviceItem;
