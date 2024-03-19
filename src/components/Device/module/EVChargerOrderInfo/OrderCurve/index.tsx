import { Modal, Button } from 'antd';
import TypeChart from '@/components/Chart/TypeChart';
import { chartTypeEnum } from '@/components/Chart/config';
import { useRef, useState, useEffect } from 'react';
import { getytOrdercurve } from '@/services/equipment';
import moment from 'moment';
import { option } from '../config';
import { formatMessage } from '@/utils';
import { cloneDeep } from 'lodash';

const defaultChartData = [
  { data: [] }, //SOC
  { data: [] }, //已充电量
];
export type DetailProps = {
  onCancel: () => void;
  visible: boolean;
  orderId: number | string;
};
const OrderCurve: React.FC<DetailProps> = (props) => {
  const { visible, onCancel, orderId } = props;
  const chartRef = useRef() as any;
  const [ChartData, setChartData] = useState(defaultChartData);
  const [allLabel, setAllLabel] = useState([]);

  const handleCancel = () => {
    onCancel();
  };
  const getChartData = (id: number | string) => {
    if (id) {
      getytOrdercurve({ id }).then(({ data }) => {
        if (!data || !data.length) return;
        const currentVChartData = cloneDeep(defaultChartData);
        const currentAllLabel: any = [];
        data.forEach((item) => {
          if (!item.values || !item.values.length) return;
          const currentValue = item.values.map((i) => {
            const currentLabel = moment(i.eventTs).format('HH:mm');
            currentAllLabel.push(currentLabel);
            setAllLabel(currentAllLabel);
            return {
              label: currentLabel,
              value: i.val,
            };
          }) as never[];
          switch (item.key) {
            case 'SOC': //SOC
              currentVChartData[0].data = currentValue;
              break;
            case 'mq': //已充电量
              currentVChartData[1].data = currentValue;
              break;
            default:
              return;
          }
        });
        setChartData(currentVChartData);
      });
    }
  };
  useEffect(() => {
    getChartData(orderId || '');
    const timer = setInterval(() => {
      getChartData(orderId || '');
    }, 5 * 60 * 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [orderId]);

  return (
    <Modal
      width={800}
      title={formatMessage({ id: 'device.SOCAndElectric', defaultMessage: 'SOC与电能' })}
      visible={visible}
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
