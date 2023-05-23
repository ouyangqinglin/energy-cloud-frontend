import { ProColumns } from '@ant-design/pro-table';

export type CustomTableProps<D, V> = {
  toolbar?: {
    buttonText?: string;
    onChange: () => void;
  };
  option?: {
    modalDeleteText?: string;
    onDeleteChange?: ProColumns<D, V>['render'];
    onEditChange?: ProColumns<D, V>['render'];
    onDetailChange?: ProColumns<D, V>['render'];
    onEnterChange?: ProColumns<D, V>['render'];
  };
};
