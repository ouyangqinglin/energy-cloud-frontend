import { deletePhotovoltaicPrice, getPhotovoltaicElectricityPriceList } from './service';
import { columns } from './config';
import { FormUpdateForCharging } from './FormUpdate';
import { FormReadForCharging } from './FormRead';
import type { ActionType } from '@ant-design/pro-table';
import FormTableList from '../components/FormTableList';

const PricePhotovoltaicList = (props: { actionRef?: React.Ref<ActionType> }) => {
  return (
    <FormTableList
      formReadChild={FormReadForCharging}
      formUpdateChild={FormUpdateForCharging}
      columns={columns}
      request={(params) => getPhotovoltaicElectricityPriceList(params)}
      onDeleteChange={async (params) => await deletePhotovoltaicPrice(params)}
      {...props}
    />
  );
};

export default PricePhotovoltaicList;
