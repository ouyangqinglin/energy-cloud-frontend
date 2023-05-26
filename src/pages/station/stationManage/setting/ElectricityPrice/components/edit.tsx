import type { ProFormColumnsType } from '@ant-design/pro-form';
import { getCustomerInfo, saveCustomerInfo } from '../service';
import YTModalForm from '@/components/YTModalForm';
import type { FormOperations } from '@/components/YTModalForm/typing';

export const UpdateModal = (props: {
  visible: boolean;
  onVisibleChange: (state: boolean) => void;
  operations: FormOperations;
  initialValues?: any;
}) => {
  return (
    <YTModalForm<any>
      layoutType={'ModalForm'}
      title={'新增账号'}
      columns={[]}
      onFinish={async (values) => {
        console.log(values);
        await saveCustomerInfo(values);
        return true;
      }}
      request={(param) => {
        return getCustomerInfo(param).then((res) => {
          return res.data;
        });
      }}
      {...props}
    />
  );
};
