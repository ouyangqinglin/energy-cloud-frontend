import type { FormOperations } from '@/components/YTModalForm/typing';
import type { ProRequestData } from '@ant-design/pro-components';
import { ProFormColumnsType } from '@ant-design/pro-form';

export type FormReadBaseProps = {
  visible: boolean;
  onVisibleChange: (state: boolean) => void;
  operations: FormOperations;
  initialValues?: any;
};

export type FormReadProps<T, U> = {
  title: string;
  request?: ProRequestData<T, U>;
  columns: ProFormColumnsType[];
} & FormReadBaseProps;
