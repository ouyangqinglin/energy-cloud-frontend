import { useCallback, useRef, useState } from 'react';
import type { VersionInfo } from './type';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { columns } from './config';
import { getVersionList } from './service';
import StationForm from './components/edit';
import Read from './components/read';
import { FormOperations } from '@/components/YTModalForm/typing';
import { ActionType } from '@ant-design/pro-components';
import { formatMessage } from '@/utils';

const Operator = () => {
  const [open, setOpen] = useState(false);
  const [operations, setOperations] = useState(FormOperations.CREATE);
  const [initialValues, setInitialValues] = useState<VersionInfo>({} as VersionInfo);
  const actionRef = useRef<ActionType>(null);

  const customConfig: YTProTableCustomProps<VersionInfo, any> = {
    toolBarRenderOptions: {
      add: {
        show: true,
        onClick() {
          setInitialValues({} as VersionInfo);
          setOperations(FormOperations.CREATE);
          setOpen(true);
        },
        text: formatMessage({ id: 'common.newBuilt', defaultMessage: '新建' }),
      },
    },
    option: {
      onDetailChange(_, entity) {
        console.log(entity);

        setInitialValues({ ...entity });
        setOperations(FormOperations.READ);
        setOpen(true);
      },
      // modalDeleteText: formatMessage({
      //   id: 'system.deleteVersionConfirm',
      //   defaultMessage: '您确认要删除该版本吗？删除之后无法恢复！',
      // }),
    },
  };

  const onSuccess = useCallback(() => {
    actionRef?.current?.reload?.();
  }, [actionRef]);

  const requestList: YTProTableCustomProps<VersionInfo, VersionInfo>['request'] = (params) => {
    params.appType = 1;
    return getVersionList(params);
  };
  return (
    <>
      <YTProTable<VersionInfo, VersionInfo>
        columns={columns}
        actionRef={actionRef}
        {...customConfig}
        request={requestList}
        rowKey="id"
      />
      <StationForm
        open={open && operations === FormOperations.CREATE}
        type={operations}
        onOpenChange={setOpen}
        onSuccess={onSuccess}
        initialValues={initialValues}
      />
      <Read
        open={open && operations === FormOperations.READ}
        onOpenChange={setOpen}
        initialValues={initialValues}
      />
    </>
  );
};

export default Operator;
