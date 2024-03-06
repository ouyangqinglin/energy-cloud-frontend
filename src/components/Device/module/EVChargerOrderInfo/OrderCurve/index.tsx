import { Modal, Button } from 'antd';
import TypeChart from '@/components/Chart/TypeChart';
import { chartTypeEnum } from '@/components/Chart/config';
import { useRef } from 'react';
import moment from 'moment';
import { option } from '../config';
import { formatMessage } from '@/utils';
import type { OrderDataType } from '../data';

export type DetailProps = {
  onCancel: () => void;
  visible: boolean;
  values: OrderDataType;
};
const OrderCurve: React.FC<DetailProps> = (props) => {
  const { visible, values, onCancel } = props;
  const chartRef = useRef() as any;
  const handleCancel = () => {
    onCancel();
  };
  //mock
  const ChartData = [
    {
      name: formatMessage({ id: 'device.SOC', defaultMessage: 'SOC' }),
      data: [
        { label: '2024-03-05 08:10:00', value: 30 },
        { label: '2024-03-05 08:15:00', value: 50 },
      ],
    },
    {
      name: formatMessage({
        id: 'device.chargeAmount',
        defaultMessage: '已充电量',
      }),
      data: [
        { label: '2024-03-05 04:10:00', value: 10 },
        { label: '2024-03-05 04:15:00', value: 20 },
      ],
    },
  ];
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
        type={chartTypeEnum.Day}
        step={5}
        chartRef={chartRef}
        date={moment()}
        option={option}
        style={{ height: '400px' }}
        data={ChartData}
      />
    </Modal>
  );
};
export default OrderCurve;
