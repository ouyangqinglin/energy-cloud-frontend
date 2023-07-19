import YTModalForm from '@/components/YTModalForm';
import { FormUpdateBaseProps } from '../../components/FormUpdate/type';
import { getInstallationWorkOrder } from '../service';
import { InstallOrderUpdateInfo } from '../type';
import { columnsRead } from './config';

const DEFAULT_PROPS = {
  layout: 'vertical' as 'vertical',
  labelCol: { flex: 'auto' },
  wrapperCol: { flex: 'auto' },
};

const Read = (props: FormUpdateBaseProps) => {
  return (
    <YTModalForm<InstallOrderUpdateInfo>
      title="查看安装工单"
      columns={columnsRead}
      {...DEFAULT_PROPS}
      layoutType={'ModalForm'}
      request={() => getInstallationWorkOrder({ id: props.id })}
      {...props}
    />
  );
};

export default Read;
