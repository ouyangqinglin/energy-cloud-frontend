import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useRequest } from 'umi';
import styles from '../index.less';
import { Divider, Progress } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import DeviceImg from '@/assets/image/masterSlaveGroup/device.png';
import IconVoltage from '@/assets/image/masterSlaveGroup/icon_voltage.png';
import IconTemp from '@/assets/image/masterSlaveGroup/icon_temp.png';
import IconCharge from '@/assets/image/masterSlaveGroup/icon_charge.png';
import IconDisCharge from '@/assets/image/masterSlaveGroup/icon_discharge.png';
import IconStewing from '@/assets/image/masterSlaveGroup/icon_stewing.png';
import { DeviceDataType, EmsDevicesType, getWholeDeviceTree } from '@/services/equipment';
import { useSubscribe } from '@/hooks';
import { energyType } from '../../type';
import { DeviceProductTypeEnum } from '@/utils/dictionary';

//获取实时数据订阅id
const getDataIds = (data: DeviceDataType[]): string[] => {
  const ids: string[] = [];
  data?.forEach?.((item) => {
    if (
      item?.productTypeId &&
      [DeviceProductTypeEnum.Pcs, DeviceProductTypeEnum.BatteryStack].includes(item?.productTypeId)
    ) {
      ids.push(item?.id || '');
    }
    if (item?.children && item.children.length) {
      ids.push(...getDataIds(item.children));
    }
  });
  return ids;
};

const chargeFormat = (value: string) => {
  const map: Record<string, any> = {
    0: { text: '静置', color: '', icon: IconStewing },
    1: { text: '放电', color: '#FF974A', icon: IconDisCharge },
    2: { text: '充电', color: '#007DFF', icon: IconCharge },
  };
  return {
    content: <span className={map[value]?.color}>{map[value]?.text || '静置'}</span>,
    icon: map[value]?.icon || IconStewing,
  };
};

export type DeviceItemProps = {
  onChildData: any; //传给父组件数据
  isChangeWidth: Boolean; //是否改变线条宽度
  deviceData: EmsDevicesType;
  onClickDeviceData: any;
  onRealTimeDataChange?: (deviceId: string, data: Record<string, any>) => void;
};

const DeviceItem: React.FC<DeviceItemProps> = (props) => {
  const { onChildData, isChangeWidth, deviceData, onClickDeviceData, onRealTimeDataChange } = props;

  const deviceRef = useRef(null);
  const [deviceIds, setDeviceIds] = useState<string[]>();
  const realTimeData = useSubscribe(deviceIds, true);
  const [deviceWidth, setDeviceWidth] = useState('');
  const { run } = useRequest(getWholeDeviceTree, {
    manual: true,
  });

  const onDeviceDetail = useCallback(() => {
    onClickDeviceData(true, deviceData?.deviceId);
  }, [deviceData]);

  useEffect(() => {
    if (deviceData?.deviceId) {
      run({ deviceId: deviceData?.deviceId }).then((data) => {
        setDeviceIds(getDataIds(data?.children || []));
      });
    }
  }, [deviceData?.deviceId]);

  useEffect(() => {
    if (deviceRef.current || isChangeWidth) {
      setDeviceWidth(deviceRef.current?.offsetWidth);
    }
    onChildData(deviceWidth);
  }, [deviceWidth, deviceRef.current, isChangeWidth]);

  useEffect(() => {
    if (deviceData?.deviceId) {
      onRealTimeDataChange?.(deviceData?.deviceId, realTimeData);
    }
  }, [realTimeData]);

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
            <div className={styles.deviceName}>{deviceData?.deviceName || '--'}</div>
            <div>
              <img src={chargeFormat(realTimeData.CADI)?.icon} className={styles.chargeImg} />
              {chargeFormat(realTimeData.CADI)?.content}
            </div>
          </div>
        </div>

        <div className={styles.bottomDeviceDiv}>
          <div className={styles.battery}>
            <Progress
              percent={realTimeData?.SOC || '--'}
              format={(percent) => `SOC ${percent}%`}
              size={'default'}
              strokeColor={'#00B42A'}
            />
          </div>
          <div className={styles.battery} style={{ marginTop: '10px' }}>
            <Progress
              percent={realTimeData?.SOH || '--'}
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
              <div>{realTimeData?.TotalBatteryVoltage || '--'}</div>
            </div>
            <div className={styles.verticalDiv}>
              <Divider type="vertical" />
            </div>
            <div className={styles.pressureCard}>
              <div>
                <span className={styles.pressFont}>I</span>
                <span className={styles.unitFont}>{'(A)'}</span>
              </div>
              <div>{realTimeData?.TotalBatteryCurrent || '--'}</div>
            </div>
            <div className={styles.verticalDiv}>
              <Divider type="vertical" />
            </div>
            <div className={styles.pressureCard}>
              <div>
                <span className={styles.pressFont}>P</span>
                <span className={styles.unitFont}>{'(KW)'}</span>
              </div>
              <div>{realTimeData?.P || '--'}</div>
            </div>
          </div>
          <div className={styles.peakBox}>
            <div className="flex">
              <img src={IconVoltage} className={styles.voltageImg} />
              <div>
                <span className={styles.pressFont}>{realTimeData?.MVVOASU || '--'}</span>
                <span className={styles.unitFont}>V</span>
              </div>
              <ArrowUpOutlined />
              <div className="flex1"></div>
              <div>
                <span className={styles.pressFont}>
                  {realTimeData?.MaximumIndividualTemperature || '--'}
                </span>
              </div>
              <span className={styles.unitFont}>V</span>
              <ArrowDownOutlined />
            </div>
            <div className="flex mt12">
              <img src={IconTemp} className={styles.voltageImg} />
              <div>
                <span className={styles.pressFont}>{realTimeData?.MVVOSU || '--'}</span>
                <span className={styles.unitFont}>℃</span>
              </div>
              <ArrowUpOutlined />
              <div className="flex1"></div>
              <div>
                <span className={styles.pressFont}>{realTimeData?.LVOMT || '--'}</span>
                <span className={styles.unitFont}>℃</span>
              </div>
              <ArrowDownOutlined />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviceItem;
