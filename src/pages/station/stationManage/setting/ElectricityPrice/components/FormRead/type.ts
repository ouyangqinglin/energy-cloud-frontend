import type { FormOperations } from '@/components/YTModalForm/typing';
import type { ProRequestData } from '@ant-design/pro-components';
import type { ProFormColumnsType } from '@ant-design/pro-form';

export type FormReadBaseProps = {
  visible: boolean;
  onVisibleChange: (state: boolean) => void;
  operations: FormOperations;
  initialValues?: any;
  id?: string;
  setType?: string;
};

export type FormReadProps<T, U> = {
  title: string;
  setType?: string;
  request?: ProRequestData<T, U>;
  columns: (setType: any) => ProFormColumnsType[];
} & FormReadBaseProps;
