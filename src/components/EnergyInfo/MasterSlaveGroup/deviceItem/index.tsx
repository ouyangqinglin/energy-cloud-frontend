import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useRequest } from 'umi';
import styles from './index.less';
import { Divider, Progress } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import DeviceImg from '@/assets/image/masterSlaveGroup/device.png';
import IconVoltage from '@/assets/image/masterSlaveGroup/icon_voltage.png';
import IconTemp from '@/assets/image/masterSlaveGroup/icon_temp.png';
import IconCharge from '@/assets/image/masterSlaveGroup/icon_charge.png';
import IconDisCharge from '@/assets/image/masterSlaveGroup/icon_discharge.png';
import IconStewing from '@/assets/image/masterSlaveGroup/icon_stewing.png';
import { formatMessage } from '@/utils';
import { DeviceDataType, getWholeDeviceTree } from '@/services/equipment';
import { useSubscribe } from '@/hooks';
import { DeviceMasterMode, DeviceProductTypeEnum } from '@/utils/dictionary';
import { maxConfig } from './helper';

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
    0: {
      text: formatMessage({ id: 'device.stewing', defaultMessage: '静置' }),
      color: '',
      icon: IconStewing,
    },
    1: {
      text: formatMessage({ id: 'device.discharge', defaultMessage: '放电' }),
      color: '#FF974A',
      icon: IconDisCharge,
    },
    2: {
      text: formatMessage({ id: 'device.charge', defaultMessage: '充电' }),
      color: '#007DFF',
      icon: IconCharge,
    },
  };
  return {
    content: <span className={map[value]?.color}>{map[value]?.text || '静置'}</span>,
    icon: map[value]?.icon || IconStewing,
  };
};

export type DeviceItemProps = {
  deviceData: DeviceDataType;
  onClickDeviceData: any;
  onRealTimeDataChange?: (deviceId: string, data: Record<string, any>) => void;
};

const DeviceItem: React.FC<DeviceItemProps> = (props) => {
  const { deviceData, onClickDeviceData, onRealTimeDataChange } = props;

  const [deviceIds, setDeviceIds] = useState<string[]>();
  const realTimeData = useSubscribe(deviceIds, true);
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
    if (deviceData?.deviceId) {
      onRealTimeDataChange?.(deviceData?.deviceId, realTimeData);
    }
  }, [realTimeData]);

  const maxItems = useMemo(() => {
    const items: React.ReactNode[] = [];
    maxConfig.forEach((item, index) => {
      if (index) {
        items.push(<Divider style={{ height: '28px' }} type="vertical" />);
      }
      items.push(
        <div key={item.field}>
          <div className="mb6">
            <span>{item.label}</span>
            <span className={styles.maxUnit}>{item.unit}</span>
          </div>
          <div>{realTimeData?.[item.field] ?? '--'}</div>
        </div>,
      );
    });
    return items;
  }, [realTimeData]);

  return (
    <>
      <div className={styles.contain}>
        <div className={styles.topLineContain}>
          <Divider style={{ height: '86px' }} type="vertical" />
          <div className={styles.chargeStaus}>
            <div className={`w-full pl7 ellipsis ${styles.deviceName}`}>
              {deviceData?.deviceName || '--'}
              {deviceData?.masterSlaveMode == DeviceMasterMode.Slave
                ? `(${formatMessage({ id: 'common.slave', defaultMessage: '从' })})`
                : `(${formatMessage({ id: 'common.master', defaultMessage: '主' })})`}
            </div>
            <div className="flex">
              <img className={styles.chargeImg} src={chargeFormat(realTimeData.CADI)?.icon} />
              {chargeFormat(realTimeData.CADI)?.content}
            </div>
          </div>
        </div>
        <div className="my6" onClick={onDeviceDetail}>
          <img
            className={`cursor ${styles.deviceImg}`}
            src={DeviceImg}
            alt={formatMessage({ id: 'device.equipmentDrawing', defaultMessage: '设备图' })}
          />
        </div>

        <div className={styles.dataContain}>
          <Progress
            className={styles.progress}
            percent={realTimeData?.SOC || '--'}
            format={(percent) => `SOC ${percent}%`}
            size={'default'}
            strokeColor={'#00B42A'}
            trailColor="#C9CDD4"
            strokeWidth={20}
          />
          <Progress
            className={`my16 ${styles.progress}`}
            percent={realTimeData?.SOH || '--'}
            format={(percent) => `SOH ${percent}%`}
            size={'default'}
            strokeColor={'#007DFF'}
            trailColor="#C9CDD4"
            strokeWidth={20}
          />
          <div className={`${styles.maxContain}`}>
            <div className={`flex flex-between px12 py8 mb20 ${styles.maxContent}`}>{maxItems}</div>
            <div>
              <div className="flex">
                <img src={IconVoltage} className={styles.voltageImg} />
                <div className="ml8 mr4">
                  <span>{realTimeData?.MVVOASU ?? '--'}</span>
                  <span className={styles.maxUnit}>V</span>
                </div>
                <ArrowUpOutlined className="cl-error" />
                <div className="flex1"></div>
                <div>
                  <span>{realTimeData?.MaximumIndividualTemperature ?? '--'}</span>
                </div>
                <span className={styles.maxUnit}>V</span>
                <ArrowDownOutlined className="cl-green" />
              </div>
              <div className="flex mt12">
                <img src={IconTemp} className={styles.voltageImg} />
                <div className="ml8 mr4">
                  <span>{realTimeData?.MVVOSU ?? '--'}</span>
                  <span className={styles.maxUnit}>℃</span>
                </div>
                <ArrowUpOutlined className="cl-error" />
                <div className="flex1"></div>
                <div>
                  <span>{realTimeData?.LVOMT ?? '--'}</span>
                  <span className={styles.maxUnit}>℃</span>
                </div>
                <ArrowDownOutlined className="cl-green" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviceItem;
