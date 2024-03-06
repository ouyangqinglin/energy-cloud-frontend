import { Modal, Descriptions, Button } from 'antd';
import type { OrderDataType } from '../data';
import { formatMessage } from '@/utils';
import { columns } from '../config';

const columnstitle: Partial<{ string: string }> = {};
columns(true).forEach((item) => {
  columnstitle[item.dataIndex] = item.title;
});
export type DetailProps = {
  onCancel: () => void;
  visible: boolean;
  values: OrderDataType;
};
const OrderDetail: React.FC<DetailProps> = (props) => {
  const { visible, values, onCancel } = props;
  const handleCancel = () => {
    onCancel();
  };
  return (
    <Modal
      width={800}
      title={formatMessage({ id: 'device.orderDetail', defaultMessage: '订单详情' })}
      visible={visible}
      destroyOnClose
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          {formatMessage({ id: 'system.close', defaultMessage: '关闭' })}
        </Button>,
      ]}
    >
      <Descriptions column={24}>
        {Object.keys(values).map((item) => {
          const label = columnstitle[item as keyof typeof columnstitle];
          return (
            <Descriptions.Item label={label} key={item} span={8}>
              {values[item as keyof typeof values] || '-'}
            </Descriptions.Item>
          );
        })}
      </Descriptions>
    </Modal>
  );
};
export default OrderDetail;
