import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useRequest, useHistory } from 'umi';
import styles from './index.less';
import { Divider, Progress } from 'antd';
import DeviceImg from '@/assets/image/masterSlaveGroup/device.png';
import IconCharge from '@/assets/image/masterSlaveGroup/icon_charge.png';
import IconDisCharge from '@/assets/image/masterSlaveGroup/icon_discharge.png';
import IconStewing from '@/assets/image/masterSlaveGroup/icon_stewing.png';
import { formatMessage } from '@/utils';
import { DeviceDataType, getWholeDeviceTree } from '@/services/equipment';
import { useSubscribe } from '@/hooks';
import { DeviceMasterMode, DeviceProductTypeEnum } from '@/utils/dictionary';
import { maxConfig, peakItems } from './helper';
import Detail from '@/components/Detail';
import { deviceAlarmStatusFormat, onlineStatusFormat } from '@/utils/format';

//获取实时数据订阅id
const getDataIds = (data: DeviceDataType[]): string[] => {
  const ids: string[] = [];
  data?.forEach?.((item) => {
    if (
      item?.productTypeId &&
      [
        DeviceProductTypeEnum.Pcs,
        DeviceProductTypeEnum.BatteryStack,
        DeviceProductTypeEnum.BatteryCluster,
      ].includes(item?.productTypeId)
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
    content: (
      <span className={map[value]?.color}>
        {map[value]?.text || formatMessage({ id: 'device.stewing', defaultMessage: '静置' })}
      </span>
    ),
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

  const history = useHistory();
  const [deviceIds, setDeviceIds] = useState<string[]>();
  const realTimeData = useSubscribe(deviceIds, true);
  const { run } = useRequest(getWholeDeviceTree, {
    manual: true,
  });

  const onDeviceDetail = useCallback(() => {
    onClickDeviceData(true, deviceData?.deviceId);
  }, [deviceData]);

  const onAlarmClick = useCallback(() => {
    history.push({
      pathname: '/alarm/current',
      search: `?siteId=${deviceData?.siteId}&deviceName=${deviceData?.deviceName}`,
    });
  }, [deviceData?.siteId]);

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
          <div className={styles.chargeStaus}>
            <div className={'flex'}>
              {formatMessage({ id: 'siteMonitor.communication', defaultMessage: '通信' })}：
              {onlineStatusFormat(deviceData?.status ?? (deviceData?.networkStatus as any))}
            </div>
            <div className={'flex'}>
              {formatMessage({ id: 'common.warning', defaultMessage: '告警' })}：
              {deviceAlarmStatusFormat((deviceData?.alarmStatus ?? '') as string)}
              <span className="cursor ml8" onClick={onAlarmClick}>
                {!!deviceData?.alarmCount && deviceData?.alarmCount}
              </span>
            </div>
          </div>
          <Divider className={styles.divider} type="vertical" />
          <div className={styles.energyInfo}>
            <div
              className={`w-full ellipsis ${styles.deviceName}`}
              title={deviceData?.deviceName || '--'}
            >
              {deviceData?.masterSlaveMode == DeviceMasterMode.Slave
                ? `(${formatMessage({ id: 'common.slave', defaultMessage: '从' })})`
                : `(${formatMessage({ id: 'common.master', defaultMessage: '主' })})`}
              {deviceData?.deviceName || '--'}
            </div>
            <img className={styles.chargeImg} src={chargeFormat(realTimeData.CADI)?.icon} />
            <div>{chargeFormat(realTimeData.CADI)?.content}</div>
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
          <div className={`${styles.maxContain}`}>
            <div className={`flex flex-between px12 py8 mb16 ${styles.maxContent}`}>{maxItems}</div>
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
              className={`mt14 mb16 ${styles.progress}`}
              percent={realTimeData?.SOH || '--'}
              format={(percent) => `SOH ${percent}%`}
              size={'default'}
              strokeColor={'#007DFF'}
              trailColor="#C9CDD4"
              strokeWidth={20}
            />
            <div>
              <Detail items={peakItems} data={realTimeData} column={1} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviceItem;
