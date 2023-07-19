import type { FormOperations, YTModalFormProps } from '@/components/YTModalForm/typing';
import type { ProRequestData } from '@ant-design/pro-components';
import type { ProFormColumnsType } from '@ant-design/pro-form';

export type FormReadBaseProps = {
  visible: boolean;
  onVisibleChange: (state: boolean) => void;
  operations: FormOperations;
  initialValues?: any;
  id?: number;
  keyForId?: string;
};

export type FormReadProps<T, U> = {
  titleRead: string;
  columns: (timeColum: ProFormColumnsType) => ProFormColumnsType[];
  request?: ProRequestData<T, U>;
} & FormReadBaseProps &
  YTModalFormProps<T, U>;
