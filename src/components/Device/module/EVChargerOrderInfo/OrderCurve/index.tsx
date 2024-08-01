import { Modal, Button } from 'antd';
import TypeChart from '@/components/Chart/TypeChart';
import { chartTypeEnum } from '@/components/Chart/config';
import { useRef, useState, useEffect, useCallback } from 'react';
import { getytOrdercurve } from '@/services/equipment';
import moment from 'moment';
import { option } from '../config';
import { formatMessage } from '@/utils';
import { cloneDeep } from 'lodash';
import type OrderDataType from '../data';

const defaultChartData = [
  { data: [] as any, name: formatMessage({ id: 'device.SOC', defaultMessage: 'SOC' }) },
  {
    data: [] as any,
    name: formatMessage({ id: 'device.chargeAmount', defaultMessage: '已充电量' }),
  },
  {
    data: [] as any,
    name: formatMessage({ id: 'device.demandVoltage', defaultMessage: '需求电压' }),
  },
  {
    data: [] as any,
    name: formatMessage({ id: 'device.chargeOutputVoltage', defaultMessage: '充电输出电压' }),
  },
  {
    data: [] as any,
    name: formatMessage({ id: 'device.demandCurrent', defaultMessage: '需求电流' }),
  },
  {
    data: [] as any,
    name: formatMessage({ id: 'device.outputCurrent', defaultMessage: '充电输出电流' }),
  },
];
export type DetailProps = {
  onCancel: () => void;
  visible: boolean;
  orderId: number | string;
  values: OrderDataType;
};
const OrderCurve: React.FC<DetailProps> = (props) => {
  const { visible, onCancel, orderId, values } = props;
  const chartRef = useRef() as any;
  const [ChartData, setChartData] = useState(defaultChartData);
  const [allLabel, setAllLabel] = useState([]);

  const handleCancel = () => {
    onCancel();
  };

  const collectRequestParams = useCallback(() => {
    const deviceId = values.deviceId;
    const startTime = values.startTime;
    const endTime = values.endTime;
    const keyValue = [
      {
        key: 'SOC',
        deviceId,
        type: 'double',
        name: 'SOC',
      },
      {
        key: 'mq',
        deviceId,
        type: 'double',
        name: '已充电量',
      },
      {
        key: 'gxqu',
        deviceId,
        type: 'double',
        name: '需求电压',
      },
      {
        key: 'gcu',
        deviceId,
        type: 'double',
        name: '充电输出电压',
      },
      {
        key: 'gxqi',
        deviceId,
        type: 'double',
        name: '需求电流',
      },
      {
        key: 'gci',
        deviceId,
        type: 'double',
        name: '充电输出电流',
      },
    ];
    return { startTime, endTime, keyValue };
  }, [orderId, values]);

  const getChartData = async (id: number | string) => {
    if (id) {
      const params = collectRequestParams();
      getytOrdercurve(params).then(({ data }) => {
        if (!data || !data.length) return;
        const currentAllLabel: any = [];
        const currentVChartData = cloneDeep(defaultChartData);
        data.forEach((item, index) => {
          if (!item.devices || !item.devices.length) return;
          // @ts-ignore
          const currentLabel = moment(item.time).format('HH:mm:ss');
          currentAllLabel.push(currentLabel);
          // @ts-ignore
          setAllLabel([...currentAllLabel].reverse());
          item.devices.forEach((device: any) => {
            switch (device.key) {
              case 'SOC':
                currentVChartData[0].data.push({ label: currentLabel, value: device.value });
                break;
              case 'mq':
                currentVChartData[1].data.push({ label: currentLabel, value: device.value });
                break;
              case 'gxqu':
                currentVChartData[2].data.push({ label: currentLabel, value: device.value });
                break;
              case 'gcu':
                currentVChartData[3].data.push({ label: currentLabel, value: device.value });
                break;
              case 'gxqi':
                currentVChartData[4].data.push({ label: currentLabel, value: device.value });
                break;
              case 'gci':
                currentVChartData[5].data.push({ label: currentLabel, value: device.value });
                break;
              default:
                break;
            }
          });
        });
        setChartData(currentVChartData);
      });
    }
  };

  useEffect(() => {
    if (orderId) {
      getChartData(orderId || '');
      const timer = setInterval(() => {
        getChartData(orderId || '');
      }, 5 * 60 * 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [orderId]);

  return (
    <Modal
      width={800}
      title={formatMessage({ id: 'device.chargingCurve', defaultMessage: '充电曲线' })}
      open={visible}
      destroyOnClose
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          关闭
        </Button>,
      ]}
    >
      <TypeChart
        allLabel={allLabel}
        chartRef={chartRef}
        type={chartTypeEnum.Label}
        option={option}
        style={{ height: '400px' }}
        data={ChartData}
      />
    </Modal>
  );
};
export default OrderCurve;
