import YTProTable from '@/components/YTProTable';
import YTDivider from '../Divider';
import ExportButton from './Export';
import type { FormTableListBaseProps } from './type';

const FormTableList = <DataType extends Record<string, any>>(
  props: FormTableListBaseProps<DataType>,
) => {
  const { actionRef, columns, ...restProps } = props;

  return (
    <>
      <YTDivider />
      <YTProTable<DataType, any>
        toolBarRender={() => (
          <ExportButton
            data={[
              {
                key: '1',
                name: 'John Brown',
                age: 32,
              },
              {
                key: '2',
                name: 'Jim Green',
                age: 42,
              },
              {
                key: '3',
                name: 'Joe Black',
                age: 30,
              },
            ]}
          />
        )}
        actionRef={actionRef}
        columns={columns}
        {...restProps}
      />
    </>
  );
};

export default FormTableList;
