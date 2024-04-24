import {
  deleteChargingPrice,
  getChargingElectricityPriceList,
  getMarketDefaultPrice,
  updateStatus,
} from './service';
import { columns } from './config';
import { FormUpdateForCharging } from './FormUpdate';
import { FormReadForCharging } from './FormRead';
import type { ActionType } from '@ant-design/pro-table';
import FormTableList from '../components/FormTableList';

const PriceChargingList = (props: { actionRef?: React.Ref<ActionType>; priceType: string }) => {
  return (
    <FormTableList
      formReadChild={FormReadForCharging}
      formUpdateChild={FormUpdateForCharging}
      columns={columns}
      onChangeStatus={updateStatus}
      request={(params) => getChargingElectricityPriceList(params)}
      onDeleteChange={async (params) => await deleteChargingPrice(params)}
      requestDefaultPrice={getMarketDefaultPrice}
      {...props}
    />
  );
};

export default PriceChargingList;
