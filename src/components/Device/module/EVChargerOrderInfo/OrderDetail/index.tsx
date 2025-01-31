import { Modal, Descriptions, Button } from 'antd';
import type { OrderDataType } from '../data';
import { formatMessage } from '@/utils';
import { columns } from '../config';
import { ChargingType, ChargingStrategy, GunType, SourceType, ServerType } from '@/utils/dict';

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
          let value: string | number | undefined = values[item as keyof typeof values];
          switch (item) {
            case 'chargingType':
              value = ChargingType[Number(value)]?.text || ('' as any);
              break;
            case 'chargingStrategy':
              value = ChargingStrategy[Number(value)]?.text || ('' as any);
              break;
            case 'gumType':
              value = GunType[Number(value)]?.text || ('' as any);
              break;
            case 'sourceType':
              value = SourceType[Number(value)]?.text || ('' as any);
              break;
            case 'serverType':
              value = ServerType[Number(value)]?.text || ('' as any);
              break;
          }
          return label ? (
            <Descriptions.Item label={label} key={item} span={8}>
              {!value && value !== 0 ? '--' : value}
            </Descriptions.Item>
          ) : (
            ''
          );
        })}
      </Descriptions>
    </Modal>
  );
};
export default OrderDetail;
