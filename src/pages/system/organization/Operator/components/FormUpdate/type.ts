import type { FormOperations } from '@/components/YTModalForm/typing';
import type { ProRequestData } from '@ant-design/pro-components';
import type { ProFormColumnsType } from '@ant-design/pro-form';

export type FormUpdateBaseProps = {
  visible: boolean;
  onVisibleChange: (state: boolean) => void;
  operations: FormOperations;
  initialValues?: any;
  id?: number;
  onSuccess?: () => void;
};

export type FormUpdateProps<T, U> = {
  titleUpdate: string;
  titleCreate: string;
  onFinishUpdate: ProRequestData<T, U>;
  onFinishCreate: ProRequestData<T, U>;
  columns: (timeColum: ProFormColumnsType) => ProFormColumnsType[];
  request?: ProRequestData<T, U>;
} & FormUpdateBaseProps;
